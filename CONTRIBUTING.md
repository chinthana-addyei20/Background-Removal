# Contributing to Background-Removal

Thank you for your interest in contributing to Background-Removal! We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/Background-Removal.git
cd Background-Removal
```

3. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

4. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

## Development Setup

### Client (React + Vite)
```bash
cd client
npm run dev
```
The client will be available at http://localhost:5173

### Server (Node.js)
```bash
cd server
npm run dev
```
The server will start on the configured port (check server/.env)

## Making Changes

1. Make your changes in your feature branch
2. Write or update tests if necessary
3. Ensure all tests pass
4. Commit your changes following our commit message conventions

### Commit Message Format
We follow conventional commits. Each commit message should have a structured format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, missing semi colons, etc)
- refactor: Code refactoring
- test: Adding missing tests
- chore: Maintenance tasks

Example:
```
feat(client): add image preview component

Added an image preview component to show the uploaded image
before background removal processing.

Closes #123
```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update documentation if you're changing functionality
3. The PR title should follow the same convention as commit messages
4. Link any related issues in the PR description
5. Ensure all checks pass on your PR

## Code Style

- Client-side code follows the ESLint configuration in the project
- Server-side code uses ES modules
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add comments for complex logic

## Testing

- Write tests for new features
- Update tests when modifying existing features
- Ensure all tests pass before submitting a PR

## Questions or Issues?

- Check existing issues
- Open a new issue with a clear title and description
- Tag issues appropriately (bug, enhancement, etc.)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.