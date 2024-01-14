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
  }: any): Promise<User[]> {
    const limit = take || 10;
    const offset = ((page || 1) - 1) * take;
    return await this.userRepository.findAll({
      where: {},
      limit,
      offset,
      // sort obj must coming into array of object such as [sort1, sort2] by sort1 and sort2 is object contain sortField and sortDirection
      order: [[sortField, sortDirection]],
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // async create(input: any): Promise<User> {
  //   return await this.userRepository.save({
  //     ...input,
  //     password: await hashPassword(input.password),
  //   });
  // }

  async update(id: string, input: any): Promise<any> {
    return await this.userRepository.update({ id }, input);
  }

  //   async delete(id: number): Promise<any> {
  //     return await this.userRepository.delete(id);
  //   }
}
