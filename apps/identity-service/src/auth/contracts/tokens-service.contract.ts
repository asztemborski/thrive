import { StringValue } from 'ms';

import { User } from '../../user/domain/user.entity';
import { AuthTokensDto, UserClaimsDto } from '../dtos';

export const ITokenService = Symbol('__IDENTITY_TOKEN_SERVICE__');

export interface ITokenService {
  generateAccess(user: User): Promise<AuthTokensDto>;
  generateCustomToken(key: string, value: string, expiration: StringValue): Promise<string>;
  retrieveAndDeleteCustomToken(key: string, token: string): Promise<string | null>;
  revokeRefreshToken(token: string): Promise<string | null>;
  revokeAllRefreshTokens(accountId: string): Promise<void>;
  verify(token: string): Promise<UserClaimsDto>;
}
