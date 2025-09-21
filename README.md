# 🛒 E-Commerce Inventory API

A **RESTful API** for managing products, categories, and user authentication in an e-commerce inventory system.  
Built with **NestJS + TypeScript + PostgreSQL (Supabase/Neon)**, secured with **JWT Authentication**, and documented with **Swagger**.

🚀 **Live Swagger Docs**: [https://e-commerce-inventory-api-cdzn.onrender.com/api/docs](https://e-commerce-inventory-api-cdzn.onrender.com/api/docs)

---

## 📖 Overview

This project provides a secure and scalable backend for an e-commerce application.  
It supports:

- User authentication with JWT (access + refresh tokens).
- Product management (CRUD, filters, pagination, search).
- Category management with product counts.
- Optional product image uploads.
- Swagger API documentation.
- Deployment on free-tier platforms (**Render + Supabase/Neon**).

---

## 🛠️ Tech Stack

- **Backend:** [NestJS](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- **Database:** PostgreSQL (Supabase / Neon)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Auth:** JWT (access & refresh tokens, bcrypt password hashing)
- **File Uploads (optional):** Multer / Supabase Storage
- **API Docs:** @nestjs/swagger + Swagger UI
- **Hosting:** Render (backend) + Supabase/Neon (database)

---

## ✨ Features

### 🔐 Authentication

- **Register:** `POST /api/auth/register` → Create user with email, username, password (hashed).
- **Login:** `POST /api/auth/login` → Get access & refresh tokens.
- **Refresh Token:** `POST /api/auth/refresh` → Get new tokens using refresh token.
- **Logout:** `POST /api/auth/logout` → Invalidate refresh token.
- **Protected Routes:** All product & category endpoints require JWT.

### 📦 Product Management

- **Create Product:** `POST /api/products` (name, description, price, stock, categoryId, optional image).
- **List Products:** `GET /api/products`
  - Filters: `?categoryId=...&minPrice=...&maxPrice=...`
  - Pagination: `?page=1&limit=10`
- **Get Product by ID:** `GET /api/products/{id}` (with category).
- **Update Product:** `PUT /api/products/{id}`
- **Delete Product:** `DELETE /api/products/{id}`
- **Search Products:** `GET /api/products/search?q=keyword` (case-insensitive).

### 🗂️ Category Management

- **Create Category:** `POST /api/categories` (unique name, description).
- **List Categories:** `GET /api/categories` (includes product counts).
- **Get Category by ID:** `GET /api/categories/{id}`
- **Update Category:** `PUT /api/categories/{id}`
- **Delete Category:** `DELETE /api/categories/{id}` (only if no products linked).

---

## 📚 API Documentation

Interactive API documentation is available via Swagger:

👉 [Live Swagger Docs](https://e-commerce-inventory-api-cdzn.onrender.com/api/docs)

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/e-commerce-inventory-api.git
cd e-commerce-inventory-api
```
