import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto, UpdateCatDto } from './cats.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

    async create(
        createCatDto: CreateCatDto,
        userId: Types.ObjectId,
    ): Promise<Cat> {
        return this.catModel.create({ ...createCatDto, owner: userId });
    }

    async findAll(userId: Types.ObjectId): Promise<Cat[]> {
        return this.catModel.find({ owner: userId });
        // .populate({ path: User.name, strictPopulate: false },{});
    }

    async findById(id: string, userId: Types.ObjectId) {
        return this.catModel.findOne({ _id: id, owner: userId });
    }

    async findByName(name: string, userId: Types.ObjectId) {
        return this.catModel.findOne({ name, owner: userId });
    }

    async update(id: string, userId: Types.ObjectId, updatedCat: UpdateCatDto) {
        return this.catModel.findOneAndUpdate(
            { _id: id, owner: userId },
            updatedCat,
            {
                new: true,
            },
        );
    }

    async delete(id: string, userId: Types.ObjectId) {
        await this.catModel.findOneAndDelete({ _id: id, owner: userId });
    }
}
