# Migration Plan for Restructuring NestJS Backend

This document outlines the step-by-step plan to migrate the existing codebase to the new domain-driven architecture.

## Pre-Migration Checklist

1. ✅ Create new directory structure
2. ✅ Document new architecture
3. ✅ Create migration patterns for import paths
4. ⬜ Backup current codebase
5. ⬜ Run tests to ensure current functionality works

## Migration Steps

### Step 1: Move Domain Entities

Move all entity files to the domain layer:
- Move `/src/entities/*.entity.ts` to `/src/domain/entities/`
- Update import paths in all files referencing these entities

### Step 2: Create Domain Interfaces

- Create domain interfaces in `/src/domain/interfaces/`
- Move any existing interfaces from `/src/interfaces/` that represent domain concepts

### Step 3: Reorganize Application Layer

- Move modules to `/src/application/modules/`
- Move DTOs to their respective module folders in `/src/application/modules/*/dtos/`
- Move service files to their respective module folders
- Update import paths

### Step 4: Reorganize Infrastructure Layer

- Create database folder structure in `/src/infrastructure/database/`
- Move migrations to `/src/infrastructure/database/migrations/`
- Create repository implementations in `/src/infrastructure/database/repositories/`

### Step 5: Move Cross-Cutting Concerns

- Move interceptors to `/src/shared/interceptors/`
- Move guards to `/src/shared/guards/`
- Move pipes to `/src/shared/pipes/`
- Move decorators to `/src/shared/decorators/`
- Create utility classes in `/src/shared/utils/`
- Update import paths

### Step 6: Update Main Application Files

- Update `app.module.ts` with new import paths
- Update `main.ts` if necessary

### Step 7: Testing and Verification

- Run the application to verify it starts correctly
- Run existing tests to ensure functionality is preserved
- Fix any issues that arise

## Import Path Updates

The file `migration-patterns.js` contains search and replace patterns for updating import paths. Run this script after moving files to update all import statements.

## Rollback Plan

In case of issues:

1. Keep a backup of the original codebase
2. If major issues are encountered, restore from backup
3. Consider incremental migration by module if full migration proves problematic

## Post-Migration Tasks

1. Update documentation with new file locations
2. Refine architecture documentation based on implementation
3. Consider creating barrel files (`index.ts`) to simplify imports
4. Review and optimize the new structure
