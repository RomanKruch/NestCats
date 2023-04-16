import { IUser } from 'src/auth/auth.interface';

export interface IReq extends Request {
    user: IUser;
}
