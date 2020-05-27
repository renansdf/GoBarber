import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { hash } from 'bcryptjs';

interface Request {
  name: string,
  email: string,
  password: string
}

class CreateUsersService {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({ name, email, password }: Request): Promise<User> {

    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError('User email already used');
    }

    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
