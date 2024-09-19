import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_ACCES_TOKEN,
    });
  }

  async validate(payload: any) {
    console.log(process.env.SECRET_KEY_ACCES_TOKEN);

    return payload;
  }
}
