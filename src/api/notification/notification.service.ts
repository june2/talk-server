import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './notification.dto';
import { Notification } from './notification.interface';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('notification') private readonly notification: Model<Notification>,
  ) { }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const created = new this.notification(createNotificationDto);
    return await created.save();
  }

  async count(id: string): Promise<Number> {
    return this.notification.countDocuments({ user: id }).exec(); 
  }

  async update(id: string): Promise<void> {
    this.notification.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
  }

  async deleteByUserAndRoom(roomId: string, userId: string): Promise<void> {
    this.notification.deleteMany({ room: roomId, user: userId }).exec();
  }
}
