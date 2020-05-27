import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import path from 'path';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class updateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) { }

  public async create({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticated to update avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default updateUserAvatarService;
