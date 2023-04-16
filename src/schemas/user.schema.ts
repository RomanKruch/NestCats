import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

export type CatDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ default: null })
    token: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const SALT = await genSalt(parseInt(process.env.SALT));
    this.password = await hash(this.password, SALT);
});
