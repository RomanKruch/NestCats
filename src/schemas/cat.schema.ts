import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ versionKey: false })
export class Cat {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    owner: Types.ObjectId;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
