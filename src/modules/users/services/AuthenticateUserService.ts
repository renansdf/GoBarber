import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/Auth';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

interface Request {
  email: string,
  password: string,
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private userRepository: IUsersRepository) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const checkPasswordMatched = await compare(password, user.password);

    if (!checkPasswordMatched) {
      throw new AppError('Invalid email or password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
