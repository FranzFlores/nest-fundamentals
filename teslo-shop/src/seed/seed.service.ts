import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly productService: ProductsService
  ) { }

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertProducts(adminUser);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach(user => {
      user.password = bcrypt.hashSync(user.password, 10);
      users.push(this.userRepository.create(user));
    });

    const usersDb = await this.userRepository.save(seedUsers);
    return usersDb[0];
  }

  private async insertProducts(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises = [];
    for (const product of products) {
      insertPromises.push(this.productService.create(product, user));
    }

    await Promise.all(insertPromises);
  }
}
