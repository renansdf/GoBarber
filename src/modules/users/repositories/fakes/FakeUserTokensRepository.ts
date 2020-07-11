import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokensRepository {

  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
