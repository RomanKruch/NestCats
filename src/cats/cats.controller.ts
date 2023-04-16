import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    HttpCode,
    HttpStatus,
    Delete,
    UseGuards,
    Request,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './cats.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/guards/authGuard';
import { IReq } from 'src/interfaces/req.interface';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    async findAll(@Request() { user }: IReq) {
        return {
            cats: await this.catsService.findAll(user._id),
        };
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Request() { user }: IReq) {
        const cat = await this.catsService.findById(id, user._id);

        if (!cat) {
            throw new NotFoundException('Cat not founded(');
        }

        return {
            data: {
                cat,
            },
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createCatDto: CreateCatDto,
        @Request() { user }: IReq,
    ) {
        const cat = await this.catsService.findByName(
            createCatDto.name,
            user._id,
        );

        if (cat) {
            throw new ConflictException('Cat already here!');
        }

        return {
            cat: await this.catsService.create(createCatDto, user._id),
        };
    }

    @Put(':id')
    async update(
        @Body() updateCatDto: UpdateCatDto,
        @Param('id') id: string,
        @Request() { user }: IReq,
    ) {
        return {
            cat: await this.catsService.update(id, user._id, updateCatDto),
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() { user }: IReq) {
        await this.catsService.delete(id, user._id);
        return {
            data: {
                massage: 'Success',
            },
        };
    }
}
