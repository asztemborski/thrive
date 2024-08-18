import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@packages/nest-redis';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

import { ITokenService } from '../contracts';
import { AuthTokensDto, UserClaimsDto } from '../dtos';
import { AuthConfig } from '../config/auth.config';
import { User } from '../../user/domain/user.entity';

@Injectable()
export class TokensService implements ITokenService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly config: AuthConfig,
  ) {}

  async generateAccess(user: User): Promise<AuthTokensDto> {
    const claims = {
      id: user.id,
      username: user.username,
      email: user.email.address,
    };

    const accessToken = await this.jwtService.signAsync(claims, {
      secret: this.config.accessTokenSecretKey,
      expiresIn: this.config.accessTokenExpirationTime,
    });

    const refreshToken = await this.jwtService.signAsync(claims, {
      secret: this.config.refreshTokenSecretKey,
      expiresIn: this.config.refreshTokenExpirationTime,
    });

    const accessTokenExpiresAt = new Date().getTime() + ms(this.config.accessTokenExpirationTime);
    const refreshTokenExpiration = ms(this.config.refreshTokenExpirationTime);
    await this.redis.set(`${user.id}-${refreshToken}`, user.id, 'PX', refreshTokenExpiration);

    return { accessToken, refreshToken, expiresAt: accessTokenExpiresAt };
  }

  async generateCustomToken(key: string, value: string, expiration: StringValue): Promise<string> {
    const token = uuid();
    await this.redis.set(`${key}-${token}`, value, 'PX', ms(expiration));
    return token;
  }

  async retrieveAndDeleteCustomToken(key: string, token: string): Promise<string | null> {
    return this.redis.getdel(`${key}-${token}`);
  }

  async revokeRefreshToken(token: string): Promise<string | null> {
    const key = await this.redis.keys(`*-*-*-*-*-${token}`);

    if (key.length <= 0) return null;

    return this.redis.getdel(key[0]);
  }

  async revokeAllRefreshTokens(accountId: string): Promise<void> {
    const refreshTokens = await this.redis.keys(`${accountId}-*`);

    if (refreshTokens.length <= 0) return;

    await this.redis.del(...refreshTokens);
  }

  async verify(token: string): Promise<UserClaimsDto> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.accessTokenSecretKey,
    });
  }
}
