# Backend Project Structure

This project follows a domain-driven design approach with a clean architecture pattern. The structure is organized to promote separation of concerns, maintainability, and scalability.

## Directory Structure

### /src
The root source directory of the application.

#### /domain
Contains all domain-related code representing business entities and rules.

- **/entities**: Database entity models (User, Role, Item, etc.)
- **/interfaces**: Core business interfaces and types

#### /application
Contains application-specific logic and features.

- **/modules**: Feature modules (Users, Roles, Messages, etc.)
  - Each module has its own folder with controller, service, DTOs, and interfaces
- **/helpers**: Helper services used across modules
- **/abstracts**: Abstract classes and base implementations
- **/dtos**: Common DTOs used across modules

#### /infrastructure
Contains implementation details related to external systems.

- **/database**: Database-specific code
  - **/migrations**: Database migrations

#### /shared
Contains shared utilities, middleware, and cross-cutting concerns.

- **/guards**: Authentication and authorization guards
- **/interceptors**: Request/response interceptors
- **/pipes**: Data transformation pipes
- **/decorators**: Custom decorators

## Best Practices

1. **Single Responsibility**: Each file should have a single responsibility
2. **Domain-Driven Design**: Business logic should be in the domain layer
3. **Feature Modularity**: Features are organized into modules
4. **Clean Architecture**: Dependencies should point inward (domain ← application ← infrastructure)
5. **Dependency Injection**: Use NestJS DI to manage dependencies

## Import Guidelines

- Import from most specific to least specific paths
- Use barrel files (index.ts) to simplify imports
- Avoid circular dependencies

## Naming Conventions

- **Files**: kebab-case.type.ts (e.g., user.entity.ts, auth.controller.ts)
- **Classes**: PascalCase (e.g., UserService, AuthGuard)
- **Interfaces**: Prefixed with "I" (e.g., IUserResponse)
- **Enums**: PascalCase (e.g., UserRole, ActionType)
