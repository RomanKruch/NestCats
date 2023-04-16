import { Types } from 'mongoose';

export interface IUserDate {
    name: string;
    email: string;
    password: string;
    token: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    token: string;
    _id: Types.ObjectId;
}
