import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      findOne: (id: string) => {
        return Promise.resolve({
          id,
          email: 'test@example.com',
          password: 'password',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: '1', email, password: 'password' } as User,
        ]);
      },
      // update: () => {},
      // remove: () => {},
    };

    authService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: '1', email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@example.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@example.com');
  });

  it('findUser throws an error if user with given id is not found', async () => {
    usersService.findOne = () => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findUser returns a user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };

    const user = await controller.signin(
      { email: 'test@example.com', password: 'password' },
      session,
    );

    expect(user.id).toEqual('1');
    expect(session.userId).toEqual('1');
  });
});
