import {
    Controller,
    Post,
    Get,
    Body,
    ConflictException,
    UnauthorizedException,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/authGuard';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() registrationDto: RegistrationDto) {
        const user = await this.authService.findByEmail(registrationDto.email);

        if (user) {
            throw new ConflictException('Email already here!');
        }

        const newUser = await this.authService.register(registrationDto);

        const secret = process.env.SECRET;
        const token = await this.jwtService.signAsync(
            { _id: newUser._id },
            { secret },
        );
        delete newUser.password;

        await this.authService.updateToken(newUser._id, token);
        return {
            data: {
                newUser,
                token,
            },
        };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.findByEmail(loginDto.email);

        if (!user || !(await compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Unauthorized');
        }

        const secret = process.env.SECRET;

        const token = await this.jwtService.signAsync(
            { _id: user._id },
            { secret },
        );

        this.authService.updateToken(user._id, token);

        return {
            data: {
                token,
            },
        };
    }

    @Post('logout')
    @UseGuards(new JwtGuard(JwtStrategy))
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Request() req) {
        console.log(req);
        // await this.authService.updateToken(req.user._id, null);
        return {};
    }
}
