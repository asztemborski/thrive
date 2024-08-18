import { SignUpCommand } from './sign-up.command';

import { TypedConfigModule } from 'nest-typed-config';
import { SignUpCommandHandler } from './sign-up.command-handler';

import { Test } from '@nestjs/testing';
import {
  EmailAlreadyInUseException,
  InvalidEmailProviderException,
  UsernameAlreadyInUseException,
} from '../../exceptions';
import { InvalidEmailAddressException, UsernameIsTooShortException } from '../../domain/exceptions';
import { IUserRepository, IValueHasher } from '../../contracts';
import { UserConfig } from '../../config/user.config';

const valueHasherMock = {
  hash: jest.fn(),
  verify: jest.fn(),
};

const userRepositoryMock = {
  getById: jest.fn(),
  getByEmail: jest.fn(),
  insert: jest.fn(),
  isUnique: jest.fn(),
};

const command = new SignUpCommand({
  email: 'testMail@test.com',
  username: 'testUsername',
  password: 'passwTest!@#',
});

describe('SignUpCommandHandler', () => {
  let handler: SignUpCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypedConfigModule.forRoot({
          load: [],
          schema: UserConfig,
          normalize: (config) => ({
            ...config,
            email: { bannedEmailProviders: ['bannedMail.com'] },
          }),
          validate: (config) => config,
        }),
      ],
      providers: [
        SignUpCommandHandler,
        { provide: IValueHasher, useValue: valueHasherMock },
        { provide: IUserRepository, useValue: userRepositoryMock },
      ],
    }).compile();
    handler = module.get(SignUpCommandHandler);
  });

  describe('execute', () => {
    it('should handle without any errors', () => {
      userRepositoryMock.isUnique.mockImplementation(() => [true, true]);

      expect(handler.execute(command)).resolves;
    });

    it('should throw error when banned email provider is being used', () => {
      expect(handler.execute({ ...command, email: 'test@bannedMail.com' })).rejects.toThrow(
        InvalidEmailProviderException,
      );
    });

    it('should throw error when email is taken', () => {
      userRepositoryMock.isUnique.mockImplementation(() => [false, true]);

      expect(handler.execute(command)).rejects.toThrow(EmailAlreadyInUseException);
    });

    it('should throw error when username is taken', () => {
      userRepositoryMock.isUnique.mockImplementation(() => [true, false]);

      expect(handler.execute(command)).rejects.toThrow(UsernameAlreadyInUseException);
    });

    it('should throw error when email is invalid', () => {
      userRepositoryMock.isUnique.mockImplementation(() => [true, true]);

      expect(handler.execute({ ...command, email: 'invalidEmail@w' })).rejects.toThrow(
        InvalidEmailAddressException,
      );
    });

    it('should throw error when username is less than 4 characters long', () => {
      userRepositoryMock.isUnique.mockImplementation(() => [true, true]);

      expect(handler.execute({ ...command, username: 'asd' })).rejects.toThrow(
        UsernameIsTooShortException,
      );
    });
  });
});
