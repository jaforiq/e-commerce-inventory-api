// import { AppModule } from './app.module';
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Global validation pipe
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   // Enable CORS
//   app.enableCors();

//   // Swagger documentation
//   const config = new DocumentBuilder()
//     .setTitle('E-commerce Inventory API')
//     .setDescription('API for managing e-commerce inventory system')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
  
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api/docs', app, document);

//   await app.listen(process.env.PORT ?? 3333);
//   console.log(`Application is running on: ${await app.getUrl()}`);
//   console.log(`Swagger docs available at: ${await app.getUrl()}/api/docs`);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3333'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Enhanced Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('E-commerce Inventory API')
    .setDescription(`
      ## E-commerce Inventory Management System
      
      A comprehensive RESTful API for managing e-commerce inventory with JWT authentication, 
      product management, category management, and image upload capabilities.
      
      ### Features:
      -  JWT Authentication with refresh tokens
      -  Complete Product CRUD operations
      -  Category management with product counts
      -  Image upload and management
      -  Advanced product search and filtering
      -  Pagination support
      -  Input validation and error handling
      
      ### Authentication:
      1. Register or login to get JWT tokens
      2. Use the "Authorize" button to add your Bearer token
      3. All endpoints (except auth) require authentication
      
      ### Image Upload:
      - Supported formats: JPG, PNG, GIF, WebP
      - Maximum size: 5MB
      - Images are served from: \`/uploads/products/\`
    `)
    .setVersion('1.0.0')
    .addTag('Authentication', 'User registration, login, token management')
    .addTag('Categories', 'Product category management')
    .addTag('Products', 'Product management with image upload')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3333', 'Development server')
    .addServer('https://your-production-url.com', 'Production server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Customize Swagger UI
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'E-commerce Inventory API Docs',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .scheme-container { background: #fafafa; padding: 15px; border-radius: 5px; margin: 15px 0; }
    `,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  
  console.log(`
   Application is running on: http://localhost:${port}
   Swagger docs available at: http://localhost:${port}/api/docs
  `);
}
bootstrap();