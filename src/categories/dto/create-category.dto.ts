import { IsOptional, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    public name!: string

    @IsOptional()
    public description?: string

}