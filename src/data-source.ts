import 'reflect-metadata';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV;

const isTest = env === 'test';
const isProduction = env === 'production';

const baseConfig = {
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
};

const config = isProduction
  ? {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      migrationsRun: true,
    }
  : {
      type: 'sqlite' as const,
      database: isTest ? 'test.sqlite' : 'db.sqlite',
      synchronize: false,
      migrationsRun: !isTest,
    };

export const AppDataSource = new DataSource({
  ...baseConfig,
  ...config,
});
