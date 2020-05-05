import User from '../models/Users';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/appError';


interface Request {
  name: string,
  email: string,
  password: string
}

class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkIfUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkIfUserExists) {
      throw new AppError('User email already used');
    }

    const encryptedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
