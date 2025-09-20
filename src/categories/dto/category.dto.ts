import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Electronic devices and accessories' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CategoryQueryDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  limit?: number;
}