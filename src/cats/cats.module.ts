import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/schemas/cat.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
    controllers: [CatsController],
    providers: [JwtService, CatsService, AuthService],
    imports: [
        MongooseModule.forFeature([
            { name: Cat.name, schema: CatSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class CatsModule {}
