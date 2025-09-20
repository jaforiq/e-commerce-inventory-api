import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    // Check if category name already exists
    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });

    if (existingCategory) {
      throw new ConflictException('Category name already exists');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);

    return {
      message: 'Category created successfully',
      category: savedCategory,
    };
  }

  async findAll(query: CategoryQueryDto) {
    const { page = 1, limit = 10 } = query;
    
    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: ['products'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const categoriesWithCount = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      productCount: category.products ? category.products.length : 0,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    return {
      categories: categoriesWithCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      category: {
        ...category,
        productCount: category.products ? category.products.length : 0,
      },
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if new name conflicts with existing category
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException('Category name already exists');
      }
    }

    await this.categoryRepository.update(id, updateCategoryDto);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    return {
      message: 'Category updated successfully',
      category: updatedCategory,
    };
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if category has linked products
    if (category.products && category.products.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with linked products. Please remove or reassign products first.',
      );
    }

    await this.categoryRepository.delete(id);

    return {
      message: 'Category deleted successfully',
    };
  }
}