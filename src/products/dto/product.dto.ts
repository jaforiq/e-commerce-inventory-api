import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, Min, MaxLength, MinLength, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 14 Pro' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Latest iPhone with advanced camera system' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductQueryDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ required: false, example: 'uuid-of-category' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @ApiProperty({ required: false, example: 1000 })
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @ApiProperty({ required: false, example: 'iPhone' })
  @IsOptional()
  @IsString()
  search?: string;
}