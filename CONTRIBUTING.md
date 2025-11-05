# Contributing to Tamil Nadu MGNREGA Visualizer

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/mgnrega-visualizer.git
   cd mgnrega-visualizer
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/originalowner/mgnrega-visualizer.git
   ```
4. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Workflow

### 1. Setup Development Environment

```bash
npm install
npm run dev
```

### 2. Make Your Changes

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

- Test in development mode
- Verify all features work
- Check responsive design
- Test data loading and filtering

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: Add new feature description"
```

### Commit Message Guidelines

- Use conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting
  - `refactor:` for code restructuring
  - `test:` for tests
  - `chore:` for maintenance

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🎯 Areas for Contribution

### High Priority

- [ ] Add unit tests
- [ ] Improve data validation
- [ ] Add error boundaries
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Features

- [ ] Export to PDF functionality
- [ ] More chart types
- [ ] Data comparison tools
- [ ] Historical trend predictions
- [ ] Mobile app version

### Data

- [ ] Real-time data integration
- [ ] Data validation scripts
- [ ] Data quality checks
- [ ] Missing data handling

### Documentation

- [ ] API documentation
- [ ] Component documentation
- [ ] Tutorial videos
- [ ] User guide

## 📝 Coding Standards

### TypeScript

- Use strict type checking
- Avoid `any` types
- Define interfaces for data structures
- Use type guards when needed

### React/Next.js

- Use functional components
- Implement proper error handling
- Optimize re-renders
- Follow Next.js best practices

### Styling

- Use Tailwind CSS utilities
- Maintain consistent spacing
- Follow responsive design principles
- Ensure accessibility

### Code Organization

```
/components      - Reusable components
/lib            - Utilities and helpers
/app            - Next.js pages
/scripts        - Build and data scripts
/public         - Static assets
```

## 🧪 Testing Guidelines

1. **Manual Testing**

   - Test all user interactions
   - Verify data loading
   - Check filters functionality
   - Test responsive design

2. **Data Validation**

   - Ensure data integrity
   - Check for missing values
   - Validate calculations
   - Test edge cases

3. **Performance**
   - Check bundle size
   - Test loading times
   - Verify chart rendering
   - Test with large datasets

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description** of the bug
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Environment** (browser, OS, Node version)

## 💡 Suggesting Features

When suggesting features:

1. **Clear description** of the feature
2. **Use case** - why is it needed?
3. **Proposed implementation** (optional)
4. **Mockups** (if applicable)

## 📚 Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update type definitions
- Document breaking changes

## ✅ Pull Request Checklist

Before submitting a PR:

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design works
- [ ] Accessibility maintained
- [ ] Performance acceptable

## 🤝 Code Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Make requested changes
4. PR will be merged when approved

## 📞 Questions?

Feel free to open an issue for questions or discussions.

Thank you for contributing! 🎉

