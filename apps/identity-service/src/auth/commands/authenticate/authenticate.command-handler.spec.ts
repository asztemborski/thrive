import { Test } from '@nestjs/testing';

import { User } from '../../../user/domain/user.entity';
import { Email } from '../../../user/domain/email.value-object';
import { Username } from '../../../user/domain/username.value-object';
import { AuthenticateCommand } from './authenticate.command';
import { AuthenticateCommandHandler } from './authenticate.command-handler';
import { IUserRepository, IValueHasher } from '../../../user/contracts';
import { ITokenService } from '../../contracts';
import { UnauthorizedException } from '../../exceptions';

const valueHasherMock = {
  hash: jest.fn(),
  verify: jest.fn(),
};

const tokenServiceMock = {
  generateAccess: jest.fn(),
  refreshAccess: jest.fn(),
};

const userMock = new User({
  email: new Email({ address: 'test@test.com', isConfirmed: false }),
  username: new Username({ value: 'test' }),
  password: 'testPassw!@#',
});

const userRepositoryMock = {
  getById: jest.fn(),
  getByEmail: jest.fn(),
  insert: jest.fn(),
  isUnique: jest.fn(),
};

const command = new AuthenticateCommand({ email: 'test@test.com', password: 'testPassw!@#' });

describe('AuthenticateCommandHandler', () => {
  let handler: AuthenticateCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticateCommandHandler,
        { provide: IValueHasher, useValue: valueHasherMock },
        { provide: IUserRepository, useValue: userRepositoryMock },
        { provide: ITokenService, useValue: tokenServiceMock },
      ],
    }).compile();

    handler = module.get(AuthenticateCommandHandler);
  });

  describe('execute', () => {
    it('should handle without any errors', () => {
      userRepositoryMock.getByEmail.mockImplementation(() => userMock);
      valueHasherMock.verify.mockImplementation(() => true);

      expect(handler.execute(command)).resolves;
    });

    it('should throw error when email address is invalid', () => {
      userRepositoryMock.getByEmail.mockImplementation(() => undefined);

      expect(handler.execute(command)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error when password is invalid', () => {
      userRepositoryMock.getByEmail.mockImplementation(() => userMock);
      valueHasherMock.verify.mockImplementation(() => false);

      expect(handler.execute(command)).rejects.toThrow(UnauthorizedException);
    });
  });
});
