// import { ApiProperty } from '@nestjs/swagger';

// export class LoginResponseDto {
//   @ApiProperty({ example: 'Login successful' })
//   message: string;

//   @ApiProperty({
//     example: {
//       id: 'uuid-here',
//       email: 'john@example.com',
//       username: 'johndoe'
//     }
//   })
//   user: {
//     id: string;
//     email: string;
//     username: string;
//   };

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   accessToken: string;

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   refreshToken: string;
// }

// export class RegisterResponseDto {
//   @ApiProperty({ example: 'User registered successfully' })
//   message: string;

//   @ApiProperty({
//     example: {
//       id: 'uuid-here',
//       email: 'john@example.com',
//       username: 'johndoe'
//     }
//   })
//   user: {
//     id: string;
//     email: string;
//     username: string;
//   };

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   accessToken: string;

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   refreshToken: string;
// }

// export class RefreshTokenResponseDto {
//   @ApiProperty({ example: 'Tokens refreshed successfully' })
//   message: string;

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   accessToken: string;

//   @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
//   refreshToken: string;
// }

// export class CategoryResponseDto {
//   @ApiProperty({ example: 'uuid-here' })
//   id: string;

//   @ApiProperty({ example: 'Electronics' })
//   name: string;

//   @ApiProperty({ example: 'Electronic devices and accessories' })
//   description: string;

//   @ApiProperty({ example: 5 })
//   productCount?: number;

//   @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
//   createdAt: Date;

//   @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
//   updatedAt: Date;
// }

// export class ProductResponseDto {
//   @ApiProperty({ example: 'uuid-here' })
//   id: string;

//   @ApiProperty({ example: 'iPhone 14 Pro' })
//   name: string;

//   @ApiProperty({ example: 'Latest iPhone with advanced camera system' })
//   description: string;

//   @ApiProperty({ example: 999.99 })
//   price: number;

//   @ApiProperty({ example: 50 })
//   stock: number;

//   @ApiProperty({ example: '/uploads/products/image.jpg', nullable: true })
//   imageUrl?: string;

//   @ApiProperty({ example: 'uuid-of-category' })
//   categoryId: string;

//   @ApiProperty({ type: () => CategoryResponseDto })
//   category: CategoryResponseDto;

//   @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
//   createdAt: Date;

//   @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
//   updatedAt: Date;
// }

// export class PaginationResponseDto {
//   @ApiProperty({ example: 1 })
//   page: number;

//   @ApiProperty({ example: 10 })
//   limit: number;

//   @ApiProperty({ example: 100 })
//   total: number;

//   @ApiProperty({ example: 10 })
//   totalPages: number;
// }

// export class ErrorResponseDto {
//   @ApiProperty({ example: 400 })
//   statusCode: number;

//   @ApiProperty({ example: 'Bad Request' })
//   error: string;

//   @ApiProperty({ 
//     example: ['email must be a valid email', 'password is too short'],
//     type: [String]
//   })
//   message: string | string[];
// }

import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({
    example: {
      id: 'uuid-here',
      email: 'john@example.com',
      username: 'johndoe'
    }
  })
  user: {
    id: string;
    email: string;
    username: string;
  };

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: 'uuid-here',
      email: 'john@example.com',
      username: 'johndoe'
    }
  })
  user: {
    id: string;
    email: string;
    username: string;
  };

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'Tokens refreshed successfully' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
}

export class CategoryResponseDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ example: 'Electronics' })
  name: string;

  @ApiProperty({ example: 'Electronic devices and accessories' })
  description: string;

  @ApiProperty({ example: 5 })
  productCount?: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class ProductResponseDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ example: 'iPhone 14 Pro' })
  name: string;

  @ApiProperty({ example: 'Latest iPhone with advanced camera system' })
  description: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 50 })
  stock: number;

  @ApiProperty({ example: '/uploads/products/image.jpg', nullable: true })
  imageUrl?: string;

  @ApiProperty({ example: 'uuid-of-category' })
  categoryId: string;

  @ApiProperty({ type: () => CategoryResponseDto })
  category: CategoryResponseDto;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class PaginationResponseDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ 
    example: ['name should not be empty', 'description must be longer than or equal to 10 characters'],
    type: [String]
  })
  message: string[];
}

export class ConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 'Category name already exists' })
  message: string;
}

export class NotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Category not found' })
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ 
    example: ['email must be a valid email', 'password is too short'],
    type: [String]
  })
  message: string | string[];
}