import { Router } from 'express';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUsersService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', upload.single('avatar'), ensureAuthenticated, async (request, response) => {
  const usersRepository = new UsersRepository();
  const updateAvatar = new updateUserAvatarService(usersRepository);

  const user = await updateAvatar.create({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
