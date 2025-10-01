# Inventory Management System

This project is a RESTful Inventory Management System built with Node.js, Express, TypeScript, and PostgreSQL using Prisma ORM. It follows a minimal yet robust and scalable architecture that cleanly separates concerns between controllers, services, and database access.

The system is designed with Object-Oriented Programming (OOP) principles in mind:

- Classes & Interfaces are used for controllers and services, ensuring clear contracts and maintainable code.

- Service layer abstraction allows business logic to be easily extended without affecting routes or database logic.

- Minimalistic project structure makes it simple for new developers to understand, while keeping it scalable for future features.

This architecture ensures that the system is clean, modular, and production-ready, making it suitable for small-scale projects as well as enterprise-grade inventory solutions.

## System Architecture

```mermaid
flowchart TD
    Client[Client] -->|HTTP Request| Express[Express Server]
    Express -->|Route| PC[Product Controller]
    PC -->|Service Call| PS[Product Service]
    PS -->|Database Query| Prisma[Prisma Client]
    Prisma -->|SQL| DB[(PostgreSQL)]
    
    subgraph Backend
        Express
        PC
        PS
        Prisma
    end
```

## Features

- Create single/multiple products
- Update product details
- Delete products
- Track stock levels
- Increase/decrease stock
- Low stock monitoring

## Prerequisites

- Node.js >= 14
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```sh
git clone https://github.com/Harshwardhan-Kamble/Inventory-Management.git
```

2. Install dependencies:
```sh
npm install
```

3. Create `.env` file:
```sh
DATABASE_URL="postgresql://username:password@localhost:5432/inventory_db?schema=public"
PORT=3000
```

4. Run database migrations:
```sh
npm run prisma:migrate
```

5. Generate Prisma Client:
```sh
npm run prisma:generate
```

## Development

Start the development server:
```sh
npm run dev
```

## Testing

Run the test suite:
```sh
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products/add` | Create a single product |
| POST | `/api/products/add-products` | Create multiple products |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/products/:id/increase` | Increase stock |
| POST | `/api/products/:id/decrease` | Decrease stock |
| GET | `/api/products/low-stock/list` | Get low stock products |


## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run build` - Build the project
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 📚 Additional Resources

For more detailed API documentation, visit:
[Postman Documentation](https://documenter.getpostman.com/view/36745142/2sB3QFQrkx)
