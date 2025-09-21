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
//   UseInterceptors,
//   UploadedFile,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBearerAuth,
//   ApiQuery,
//   ApiConsumes,
//   ApiBody,
// } from '@nestjs/swagger';
// import { ProductsService } from './products.service';
// import { multerConfig } from '../common/config/multer.config';
// import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';

// @ApiTags('Products')
// @Controller('api/products')
// @ApiBearerAuth()
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('image', multerConfig))
//   @ApiOperation({ summary: 'Create a new product' })
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         name: { type: 'string', example: 'iPhone 14 Pro' },
//         description: { type: 'string', example: 'Latest iPhone with advanced camera' },
//         price: { type: 'number', example: 999.99 },
//         stock: { type: 'number', example: 50 },
//         categoryId: { type: 'string', example: 'uuid-of-category' },
//         image: { type: 'string', format: 'binary' },
//       },
//     },
//   })
//   @ApiResponse({ status: 201, description: 'Product created successfully' })
//   @ApiResponse({ status: 400, description: 'Bad request - Invalid category or file' })
//   async create(
//     @Body() createProductDto: CreateProductDto,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     return this.productsService.create(createProductDto, file);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all products with filters and pagination' })
//   @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
//   @ApiQuery({ name: 'page', required: false, example: 1 })
//   @ApiQuery({ name: 'limit', required: false, example: 10 })
//   @ApiQuery({ name: 'categoryId', required: false, example: 'uuid-of-category' })
//   @ApiQuery({ name: 'minPrice', required: false, example: 10 })
//   @ApiQuery({ name: 'maxPrice', required: false, example: 1000 })
//   @ApiQuery({ name: 'search', required: false, example: 'iPhone' })
//   async findAll(@Query() query: ProductQueryDto) {
//     return this.productsService.findAll(query);
//   }

//   @Get('search')
//   @ApiOperation({ summary: 'Search products by name or description' })
//   @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
//   @ApiQuery({ name: 'q', required: true, example: 'iPhone' })
//   async search(@Query('q') searchQuery: string) {
//     return this.productsService.search(searchQuery);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a product by ID' })
//   @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
//   @ApiResponse({ status: 404, description: 'Product not found' })
//   async findOne(@Param('id', ParseUUIDPipe) id: string) {
//     return this.productsService.findOne(id);
//   }

//   @Put(':id')
//   @UseInterceptors(FileInterceptor('image', multerConfig))
//   @ApiOperation({ summary: 'Update a product' })
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         name: { type: 'string', example: 'iPhone 14 Pro Max' },
//         description: { type: 'string', example: 'Updated description' },
//         price: { type: 'number', example: 1099.99 },
//         stock: { type: 'number', example: 30 },
//         categoryId: { type: 'string', example: 'uuid-of-category' },
//         image: { type: 'string', format: 'binary' },
//       },
//     },
//   })
//   @ApiResponse({ status: 200, description: 'Product updated successfully' })
//   @ApiResponse({ status: 404, description: 'Product not found' })
//   @ApiResponse({ status: 400, description: 'Bad request - Invalid category' })
//   async update(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() updateProductDto: UpdateProductDto,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     return this.productsService.update(id, updateProductDto, file);
//   }

//   @Delete(':id')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'Delete a product' })
//   @ApiResponse({ status: 200, description: 'Product deleted successfully' })
//   @ApiResponse({ status: 404, description: 'Product not found' })
//   async remove(@Param('id', ParseUUIDPipe) id: string) {
//     return this.productsService.remove(id);
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
import { multerConfig } from '../common/config/multer.config';
import { ProductResponseDto, PaginationResponseDto, ErrorResponseDto } from '../common/dto/swagger-response.dto';

@ApiTags('Products')
@Controller('api/products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiOperation({ 
    summary: 'Create a new product',
    description: 'Create a new product with optional image upload. Image must be JPG, PNG, GIF, or WebP format (max 5MB)'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product data with optional image',
    schema: {
      type: 'object',
      required: ['name', 'description', 'price', 'stock', 'categoryId'],
      properties: {
        name: { type: 'string', example: 'iPhone 14 Pro', minLength: 2, maxLength: 100 },
        description: { type: 'string', example: 'Latest iPhone with advanced camera', minLength: 10, maxLength: 1000 },
        price: { type: 'number', example: 999.99, minimum: 0 },
        stock: { type: 'number', example: 50, minimum: 0 },
        categoryId: { type: 'string', example: 'uuid-of-category', format: 'uuid' },
        image: { type: 'string', format: 'binary', description: 'Product image file' },
      },
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Product created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Product created successfully' },
        product: { $ref: '#/components/schemas/ProductResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid category, validation error, or invalid image format',
    type: ErrorResponseDto
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all products with filters and pagination',
    description: 'Retrieve products with optional filtering by category, price range, and search. Supports pagination.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Products retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: { $ref: '#/components/schemas/ProductResponseDto' }
        },
        pagination: { $ref: '#/components/schemas/PaginationResponseDto' }
      }
    }
  })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page' })
  @ApiQuery({ name: 'categoryId', required: false, example: 'uuid-of-category', description: 'Filter by category ID' })
  @ApiQuery({ name: 'minPrice', required: false, example: 10, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, example: 1000, description: 'Maximum price filter' })
  @ApiQuery({ name: 'search', required: false, example: 'iPhone', description: 'Search in name and description' })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search products by name or description',
    description: 'Full-text search through product names and descriptions (case-insensitive)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Search results retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: { $ref: '#/components/schemas/ProductResponseDto' }
        },
        total: { type: 'number', example: 5 }
      }
    }
  })
  @ApiQuery({ name: 'q', required: true, example: 'iPhone', description: 'Search keyword' })
  async search(@Query('q') searchQuery: string) {
    return this.productsService.search(searchQuery);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a product by ID',
    description: 'Retrieve a specific product with category details and image URL'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        product: { $ref: '#/components/schemas/ProductResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found',
    type: ErrorResponseDto
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiOperation({ 
    summary: 'Update a product',
    description: 'Update product details with optional image replacement. Old image will be deleted if new one is uploaded.'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Updated product data with optional image',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'iPhone 14 Pro Max', minLength: 2, maxLength: 100 },
        description: { type: 'string', example: 'Updated description', minLength: 10, maxLength: 1000 },
        price: { type: 'number', example: 1099.99, minimum: 0 },
        stock: { type: 'number', example: 30, minimum: 0 },
        categoryId: { type: 'string', example: 'uuid-of-category', format: 'uuid' },
        image: { type: 'string', format: 'binary', description: 'New product image file' },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Product updated successfully' },
        product: { $ref: '#/components/schemas/ProductResponseDto' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid category or validation error',
    type: ErrorResponseDto
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Delete a product',
    description: 'Delete a product and its associated image file from the server'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Product deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found',
    type: ErrorResponseDto
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}