// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Put,
//   Param,
//   Delete,
//   Query,
//   ParseUUIDPipe,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBearerAuth,
//   ApiQuery,
// } from '@nestjs/swagger';
// import { CategoriesService } from './categories.service';
// import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './dto/category.dto';

// @ApiTags('Categories')
// @Controller('api/categories')
// @ApiBearerAuth()
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new category' })
//   @ApiResponse({ status: 201, description: 'Category created successfully' })
//   @ApiResponse({ status: 409, description: 'Category name already exists' })
//   async create(@Body() createCategoryDto: CreateCategoryDto) {
//     return this.categoriesService.create(createCategoryDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all categories with product counts' })
//   @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
//   @ApiQuery({ name: 'page', required: false, example: 1 })
//   @ApiQuery({ name: 'limit', required: false, example: 10 })
//   async findAll(@Query() query: CategoryQueryDto) {
//     return this.categoriesService.findAll(query);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a category by ID' })
//   @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
//   @ApiResponse({ status: 404, description: 'Category not found' })
//   async findOne(@Param('id', ParseUUIDPipe) id: string) {
//     return this.categoriesService.findOne(id);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Update a category' })
//   @ApiResponse({ status: 200, description: 'Category updated successfully' })
//   @ApiResponse({ status: 404, description: 'Category not found' })
//   @ApiResponse({ status: 409, description: 'Category name already exists' })
//   async update(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() updateCategoryDto: UpdateCategoryDto,
//   ) {
//     return this.categoriesService.update(id, updateCategoryDto);
//   }

//   @Delete(':id')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'Delete a category' })
//   @ApiResponse({ status: 200, description: 'Category deleted successfully' })
//   @ApiResponse({ status: 404, description: 'Category not found' })
//   @ApiResponse({ status: 400, description: 'Cannot delete category with linked products' })
//   async remove(@Param('id', ParseUUIDPipe) id: string) {
//     return this.categoriesService.remove(id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './dto/category.dto';
import { ErrorResponseDto } from '../common/dto/swagger-response.dto';

@ApiTags('Categories')
@Controller('api/categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new category',
    description: 'Create a new product category with unique name and description'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Category created successfully' },
        category: { $ref: '#/components/schemas/CategoryResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Category name already exists',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid or missing JWT token',
    type: ErrorResponseDto
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all categories with product counts',
    description: 'Retrieve paginated list of all categories with their product counts'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categories retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          items: { $ref: '#/components/schemas/CategoryResponseDto' }
        },
        pagination: { $ref: '#/components/schemas/PaginationResponseDto' }
      }
    }
  })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page' })
  async findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a category by ID',
    description: 'Retrieve a specific category with its details and product count'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        category: { $ref: '#/components/schemas/CategoryResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Category not found',
    type: ErrorResponseDto
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update a category',
    description: 'Update category name and/or description'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Category updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Category updated successfully' },
        category: { $ref: '#/components/schemas/CategoryResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Category not found',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Category name already exists',
    type: ErrorResponseDto
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Delete a category',
    description: 'Delete a category if it has no linked products'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Category deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Category deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Category not found',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Cannot delete category with linked products',
    type: ErrorResponseDto
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}