import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordsRouter = Router();

const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordsRouter.post('/reset', resetPasswordController.create);
passwordsRouter.post('/forgot', forgotPasswordController.create);

export default passwordsRouter;
