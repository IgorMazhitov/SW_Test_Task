# ScoreWarrior Administration System

A comprehensive full-stack application for managing users, items, and communication using a clean domain-driven architecture.

## Architecture

This project follows a **Domain-Driven Design** (DDD) architecture with clean separation of concerns:

### Backend Architecture
- **Application Layer**: Controllers and facades that handle HTTP requests
- **Domain Layer**: Core business logic, entities, and domain services
- **Infrastructure Layer**: Database access, external services integration
- **Common Layer**: Shared utilities, helpers, and cross-cutting concerns

### Design Patterns
- **Repository Pattern**: Abstracts data access logic
- **Facade Pattern**: Simplifies complex subsystems (ActionsService, AuthService)
- **Dependency Injection**: For loose coupling and testability
- **Single Responsibility Principle**: Each service has a clear purpose
- **Base Service Pattern**: Common error handling abstraction
- **DTO Pattern**: Data transfer objects for clean API boundaries

## Tech Stack

### Client
- **React**: UI library for building component-based interfaces
- **MobX**: State management with observable patterns
- **MaterialUI**: Component library for consistent design

### Server
- **NestJS**: Progressive Node.js framework with modular architecture
- **TypeORM**: ORM for database interactions with repository pattern
- **PostgreSQL**: Relational database for structured data storage
- **TypeScript**: Strongly-typed language for better developer experience
- **JWT Authentication**: Access and refresh token implementation
- **Class-Validator**: Request validation through decorators

### Development Tools
- **Docker**: Containerization for consistent deployment
- **ESLint**: Code quality enforcement
- **Swagger**: API documentation
- **Git Hooks**: Pre-commit code quality checks

## Environment Variables

This project runs on the following ports:

`POSTGRES_PORT` - 5432 

`BACKEND_PORT` - 3300

`FRONTEND_PORT` - 3000

## Features

- **Authentication**: SignUp/LogIn with JWT tokens and role-based access
- **Audit System**: Comprehensive logging of all system activities
- **Action Management**: Request/Approve/Decline workflow for operations
- **User Management**: Role-based user administration
- **Item System**: Item creation and transfer between users
- **Messaging**: Internal communication system with approvals
- **Advanced Filtering**: Type, role, and email filtering capabilities
- **Pagination**: For efficient data display

### Admin Capabilities
- Create and manage users
- Send messages to any system user
- Edit user profiles and roles
- Create and distribute items
- View audit logs and system activity
- Approve/Decline action requests

### User Capabilities
- Transfer owned items to other users
- Send messages (requires approval)
- Request various actions
- View personal action history
- View other system users

## Deployment

To run this project run

-> 1
```bash
  docker compose build
```
-> 2
```bash
  docker compose up
```




## Open API

#### Swagger

```http
  GET /api/docs
```


## Features

- SignUp/LogIn
- JWT Authorization / Access Check by Roles
- Audit Logs / Audits Table
- Actions Requests / Pending and History Actions Table
- Approve / Decline Actions
- Pagination for Active/History Actions Tables, User Table
- Action Types filtering
- Users role filtering
- Audit Logs Email filtering
- Messages service with chat for each 2 persons, there will be a history of all messages between 2 of You
- Admin can: 
    - Create Users
    - Send any message to anyone (admin/user)
    - Edit Users
    - See All Users
    - Create Items
    - Give Items Unlimitedly
    - See Audit Logs
    - See all Actions Pendign and History
    - Approve / Decline Actions
- User can: 
    - Send items they have to another user (Action type_1)
    - Send messages to admin/user (Action type_2)
    - Request type_3
    - See their pending Actions
    - See their Approved / Declined Actions
    - See All Users


