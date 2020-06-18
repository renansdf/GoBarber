// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string,
}

@injectable()
class SendPasswordResetEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (!checkIfUserExists) {
      throw new AppError('User does not exist.', 401);
    }

    this.mailProvider.sendEmail(email, 'Deve conter um link para recuperação de senha.');
  }
}

export default SendPasswordResetEmailService;
