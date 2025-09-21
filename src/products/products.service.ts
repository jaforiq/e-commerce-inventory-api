
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.ts';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
    const { categoryId } = createProductDto;

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const productData: Partial<Product> = {
      ...createProductDto,
      imageUrl: file ? `/uploads/products/${file.filename}` : undefined,
    };

    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);

    return {
      message: 'Product created successfully',
      product: savedProduct,
    };
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 10,
      categoryId,
      minPrice,
      maxPrice,
      search,
    } = query;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');


    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }


    queryBuilder
      .orderBy('product.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { product };
  }

  async update(id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const updateData: Partial<Product> = { ...updateProductDto };

    if (file) {
      if (product.imageUrl) {
        const oldImagePath = path.join(process.cwd(), product.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.imageUrl = `/uploads/products/${file.filename}`;
    }

    await this.productRepository.update(id, updateData);
    const updatedProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return {
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.imageUrl) {
      const imagePath = path.join(process.cwd(), product.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.productRepository.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }

  async search(searchQuery: string) {
    const products = await this.productRepository.find({
      where: [
        { name: ILike(`%${searchQuery}%`) },
        { description: ILike(`%${searchQuery}%`) },
      ],
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });

    return {
      products,
      total: products.length,
    };
  }
}