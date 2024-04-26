import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { RegistrationDto } from './auth.dto';
import { IUserDate } from './auth.interface';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async register(userData: RegistrationDto) {
        const auth = new this.userModel(userData);
        return auth.save();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async findById(_id: Types.ObjectId): Promise<User> {
        return this.userModel.findOne({ _id });
    }

    async updateToken(_id: Types.ObjectId, token: string | null) {
        await this.userModel.findOneAndUpdate({ _id }, { token });
    }
}
