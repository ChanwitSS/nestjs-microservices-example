import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const loadDbConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'user',
  autoLoadModels: true,
  synchronize: true,
};
