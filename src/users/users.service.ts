import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        return await this.usersRepository.save(user);
    }
}
