import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDto, UpdateRoleDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Signup api
   * @param payload signup payload
   * @returns
   */
  async signUp(
    payload: RegistrationDto,
  ): Promise<{ token: string; _id: string }> {
    const { name, email, password, avatar, role } = payload;
    const hashedPass = await bcrypt.hash(password, 10);

    // if user exist with the given email
    const isUserExist = await this.userModel.findOne({ email });

    if (isUserExist !== null) {
      throw new ForbiddenException(
        'This email already used try with another email!',
      );
    }

    // create new user
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPass,
      avatar,
      role,
    });

    // make token with and return
    const token = this.jwtService.sign({
      id: user._id,
      email: user?.email,
    });

    return { token, _id: user._id };
  }

  /**
   * Signin api
   * @param payload - signin payload
   * @returns
   */
  async signIn(payload: LoginDto): Promise<{ token: string; _id: string }> {
    const { email, password } = payload;

    // check is user exist
    const user = await this.userModel.findOne({ email });

    // if user is not exist
    if (!user) {
      throw new UnauthorizedException('Email is not correct!');
    }

    // check is password matched
    const isMatchedPass = await bcrypt.compare(password, user.password);

    // if password is incorrect
    if (!isMatchedPass) {
      throw new UnauthorizedException('You entered wrong password!');
    }

    // make token and return
    const token = this.jwtService.sign({
      id: user._id,
      email: user?.email,
    });

    return { token, _id: user?._id };
  }

  /**
   * find a user
   * @param _id string
   * @returns
   */
  async findOne(_id: string) {
    // check is user exist
    const user = await this.userModel.findOne({ _id });

    // if user is not exist
    if (!user) {
      throw new UnauthorizedException('User is not exist!');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };
  }

  /**
   * update user role
   * @param _id - string
   * @param payload UpdateRoleDto
   * @returns
   */
  async updateRole(_id: string, payload: UpdateRoleDto) {
    const { role } = payload;
    // check is user exist
    const isUserExist = await this.userModel.findById({ _id });

    // if user is not exist
    if (!isUserExist) {
      throw new UnauthorizedException('User is not exist.');
    }

    return this.userModel.findByIdAndUpdate(_id, { role });
  }
}
