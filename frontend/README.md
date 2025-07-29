# ScoreWarrior Administration System - Frontend

This is the frontend application for the ScoreWarrior Administration System, built using React, TypeScript, MobX, and Material UI.

## Project Structure

The project follows the **Atomic Design** methodology for organizing components:

```
src/
├── api/                  # API client and services
├── atomic/               # Components organized by atomic design
│   ├── atoms/            # Basic UI elements (buttons, inputs, etc.)
│   ├── molecules/        # Simple combinations of atoms
│   ├── organisms/        # Complex UI components
│   ├── templates/        # Page layouts
│   └── pages/            # Full pages
├── config/               # Application configuration
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── services/             # Business logic services
├── store/                # MobX state management
├── theme/                # UI theme configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Atomic Design Pattern

This project is structured according to the Atomic Design methodology, which organizes components into five distinct levels:

1. **Atoms**: Basic UI components like buttons, inputs, labels
2. **Molecules**: Simple groups of UI components that function together
3. **Organisms**: Complex UI components composed of molecules and atoms
4. **Templates**: Page layouts without specific content
5. **Pages**: Specific instances of templates with real content

This structure promotes reusability, consistency, and maintainability.

## Best Practices

This project adheres to the following best practices:

### 1. Code Organization

- Each component is in its own file
- Components are organized by atomic design principles
- Consistent file naming and folder structure
- Related functionality is grouped together

### 2. Type Safety

- TypeScript is used throughout the application
- Interfaces and types are defined for all data structures
- Props are properly typed for all components
- No use of `any` type unless absolutely necessary

### 3. State Management

- MobX for state management
- State is centralized and organized by domain
- Components use hooks to access state
- State updates are handled through actions

### 4. Coding Standards

- No magic numbers (all numbers are named constants)
- No nested loops or complex conditionals
- Component functions are kept small and focused
- Code is thoroughly documented with JSDoc comments

### 5. UI/UX Principles

- Consistent UI components from Material UI
- Responsive design principles
- Accessible components with proper ARIA attributes
- Theme variables for consistent styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/IgorMazhitov/SW_Test_Task.git
   cd SW_Test_Task/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```

The application will be available at http://localhost:3000.

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
REACT_APP_API_URL=http://localhost:3300
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from Create React App

## Features

- User authentication (login, register, logout)
- User management (view, create, edit, delete)
- Role management (view, create, assign)
- Item management (view, create, assign)
- Action management (request, approve, decline)
- Audit logging (view audit logs)
- Messaging system between users

## Contributing

1. Follow the existing code style and patterns
2. Write meaningful commit messages
3. Document all new components and functions
4. Ensure all code is typed correctly
5. Run tests before committing

## License

This project is proprietary software owned by ScoreWarrior.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [MobX](https://mobx.js.org/)
