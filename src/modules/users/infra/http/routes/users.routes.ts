import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);
const usersController = new UsersController;
const userAvatarController = new UserAvatarController;

const usersRouter = Router();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', upload.single('avatar'), ensureAuthenticated, userAvatarController.update);

export default usersRouter;
