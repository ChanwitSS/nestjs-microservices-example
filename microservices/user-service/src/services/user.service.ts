import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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
    search,
  }: any): Promise<User[]> {
    const limit = take || 10;
    const offset = ((page || 1) - 1) * limit;

    return await this.userRepository.findAll({
      where: {
        ...(search ? { name: { [Op.iLike]: `%${search}%` } } : {}),
      },
      limit,
      offset,
      // order: [[sortField, sortDirection]],
    });
  }

  async findOne({ id, email }): Promise<User> {
    return await this.userRepository.findOne({
      where: { ...(id ? { id } : {}), ...(email ? { email } : {}) },
      raw: true,
    });
  }

  async create(data: any): Promise<User> {
    return await this.userRepository.create(
      {
        ...data,
      },
      { returning: true },
    );
  }

  async update(id: string, data: any) {
    return (
      await this.userRepository.update(data, {
        where: { id },
        returning: true,
      })
    )[1][0].dataValues;
  }

  //   async delete(id: number) {
  //     return await this.userRepository.delete(id);
  //   }
}
