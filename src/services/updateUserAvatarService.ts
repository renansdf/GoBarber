import { getRepository } from 'typeorm';
import path from 'path';
import User from '../models/Users';
import fs from 'fs';
import uploadConfig from '../config/upload';
import AppError from '../errors/appError';


interface Request {
  user_id: string;
  avatarFilename: string;
}

class updateUserAvatarService {
  public async create({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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
    await usersRepository.save(user);

    return user;
  }
}

export default updateUserAvatarService;
