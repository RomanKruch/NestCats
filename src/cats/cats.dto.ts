import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class CreateCatDto {
    @IsString()
    @Length(3, 15)
    name: string;

    @IsInt()
    @Min(1)
    @Max(15)
    age: number;

    @IsString()
    @Length(3, 30)
    breed: string;
}

export class UpdateCatDto {
    @IsString()
    @Length(3, 15)
    name: string;

    @IsInt()
    @Min(1)
    @Max(15)
    age: number;

    @IsString()
    @Length(3, 30)
    breed: string;
}
