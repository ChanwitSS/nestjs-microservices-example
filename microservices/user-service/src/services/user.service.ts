import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async findAll({
    take,
    page,
    sortField,
    sortDirection,
    filter,
  }: any): Promise<User[]> {
    const limit = take || 10;
    const offset = ((page || 1) - 1) * limit;

    return await this.userRepository.findAll({
      // where: {},
      limit,
      offset,
      // order: [[sortField, sortDirection]],
    });
  }

  async findOne({ id, email }): Promise<User> {
    return await this.userRepository.findOne({
      where: { ...(id ? { id } : {}), ...(email ? { email } : {}) },
    });
  }

  async create(data: any): Promise<User> {
    return await this.userRepository.create({
      ...data,
    });
  }

  async update(id: string, data: any): Promise<any> {
    return await this.userRepository.update({ id }, data);
  }

  //   async delete(id: number): Promise<any> {
  //     return await this.userRepository.delete(id);
  //   }
}
