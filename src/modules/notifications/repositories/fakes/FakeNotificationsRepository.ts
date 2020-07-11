import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationsRepository {

  private notificationsRepository: Notification[] = [];

  public async create({ recipient_id, content }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notificationsRepository.push(notification);

    return notification;
  }

}

export default FakeNotificationsRepository;
