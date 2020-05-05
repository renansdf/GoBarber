import { Router } from 'express';
import CreateUsersService from '../services/CreateUsersService';
import updateUserAvatarService from '../services/updateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUsersService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', upload.single('avatar'), ensureAuthenticated, async (request, response) => {
  const updateAvatar = new updateUserAvatarService();

  const user = await updateAvatar.create({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
