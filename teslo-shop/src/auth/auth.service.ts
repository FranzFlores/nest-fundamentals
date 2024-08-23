import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, SignInDto } from './dto';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDto } = createUserDto;
      const user = this.userRepository.create({
        ...userDto,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async signIn(signInDto: SignInDto) {
    const { password, email } = signInDto;

    const user = await this.userRepository.findOne({
      select: { id: true, password: true, email: true },
      where: { email }
    });

    if (!user || bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id, email: user.email })
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id, email: user.email })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Error de servidor')
  }
}
