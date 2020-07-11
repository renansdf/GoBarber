import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ user_id, name, email, old_password, password }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found with provided id');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== user_id) {
      throw new AppError('Email already used.');
    }

    if (password && !old_password) {
      throw new AppError('Must provide old passowrd.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Incorrect old password.')
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
