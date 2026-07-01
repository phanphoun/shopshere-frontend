# Contributing to ShopSphere Frontend

Thank you for contributing! This document outlines the coding standards, workflows, and guidelines for the ShopSphere frontend project.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Code Style & Linting](#code-style--linting)
- [Architecture & Conventions](#architecture--conventions)
- [Component Guidelines](#component-guidelines)
- [Store Guidelines](#store-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Code Review Checklist](#code-review-checklist)

---

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

Ensure the Laravel backend is running on `http://localhost:8000` — the Vite dev server proxies `/api`, `/storage`, and `/sanctum` requests to it.

---

## Code Style & Linting

### ESLint

We use ESLint with the **Vue 3 recommended** ruleset. Run the linter before committing:

```bash
npx eslint src/ --ext .vue,.js
```

Key rules (see `.eslintrc.cjs`):

| Rule                                    | Setting                           |
| --------------------------------------- | --------------------------------- |
| `vue/multi-word-component-names`        | `off` — single-word names allowed |
| `vue/max-attributes-per-line`           | `warn` — 3 inline, 1 multiline   |
| `vue/singleline-html-element-content-newline` | `off`                      |
| `no-unused-vars`                        | `warn` (ignore `_`-prefixed)      |
| `no-console` / `no-debugger`            | `warn` in production only         |

### Prettier

Format all code with Prettier before staging (see `.prettierrc`):

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

Most editors can be configured to format on save using the Prettier extension.

---

## Architecture & Conventions

### Project Structure

```
src/
├── App.vue                  # Root — RouterView + ToastContainer
├── main.js                  # Entry — app mount with Pinia, Router, i18n
├── assets/
│   └── main.css             # Global styles (Tailwind + utilities)
├── components/              # Reusable UI components
├── layouts/                 # Page layout wrappers
├── pages/                   # Route-level page components
├── router/
│   └── index.js             # Route definitions + guards
├── services/
│   └── axios.js             # Axios instance + interceptors
├── stores/                  # Pinia state management
├── utils/                   # Pure utility functions
└── __tests__/               # Vitest test files
```

### Naming Conventions

| Artifact                 | Convention                     | Example                    |
| ------------------------ | ------------------------------ | -------------------------- |
| **Page components**      | `PascalCase` + `Page` suffix   | `HomePage.vue`             |
| **Reusable components**  | `PascalCase`                   | `ProductCard.vue`          |
| **Pinia stores**         | `camelCase`                    | `auth.js`, `cart.js`       |
| **Utils**                | `camelCase`                    | `statusBadge.js`           |
| **Routes**               | `kebab-case` names              | `product-detail`           |
| **Files**                | `PascalCase` (Vue), `camelCase` (JS) | `AppHeader.vue`, `axios.js` |

### Composition API Only

All Vue components **must** use the `<script setup>` syntax. Options API is not used in this project.

### Imports Order

Group and order imports as follows:

1. Vue / Vue ecosystem (`vue`, `vue-router`, `pinia`, `vue-i18n`)
2. Third-party libraries (`axios`)
3. Local stores (`@/stores/*`)
4. Local services (`@/services/*`)
5. Local components (`@/components/*`)
6. Local utilities (`@/utils/*`)

### Path Aliases

- `@` maps to `src/` (configured in `vite.config.js`)
- Always use `@/` aliases for local imports, never relative paths like `../../stores/auth`

---

## Component Guidelines

### Structure

Each `.vue` file should follow this order:

```vue
<template>
  <!-- HTML template -->
</template>

<script setup>
// 1. Vue/Router imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. Store imports
import { useAuthStore } from '@/stores/auth'

// 3. Component imports
import ProductCard from '@/components/ProductCard.vue'

// 4. Store instances
const authStore = useAuthStore()
const router = useRouter()

// 5. Props & Emits
const props = defineProps({ ... })
const emit = defineEmits([...])

// 6. Reactive state
const count = ref(0)

// 7. Computed
const double = computed(() => count.value * 2)

// 8. Methods
function increment() { count.value++ }

// 9. Lifecycle
onMounted(() => { ... })
</script>

<style scoped>
/* Scoped styles */
</style>
```

### Props

- Use `defineProps` with object syntax and **full type/validation definitions**
- Provide sensible `default` values wherever possible

```vue
<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      name: 'Product',
      price: '0.00',
    }),
  },
})
</script>
```

### Emits

- Use `defineEmits` with array string syntax for simple cases
- Never use `this.$emit()` inside `<script setup>` — it does not exist

```vue
<script setup>
const emit = defineEmits(['price-change', 'category-change'])

function handlePrice() {
  emit('price-change', { min: 10, max: 50 })
}
</script>
```

### Template

- Use `v-for` with explicit `:key` (prefer `product.id` over index)
- Prefer `v-if` / `v-else-if` / `v-else` chains over `v-show` for conditional rendering
- Keep inline event handlers simple; extract logic to `<script setup>` functions
- Use `$t()` from vue-i18n for all user-facing strings — **never hardcode text**

### i18n

- Every user-facing string must go through `$t()` or `t()` from `useI18n()`
- Define new keys in `src/i18n/messages.js` under both `en` and `km` locales
- Use parameter interpolation: `$t('products.inStockAvailable', { count: stock })`

---

## Store Guidelines

### Pinia Composition API

All stores use the **composition (setup) syntax**:

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)

  const itemsCount = computed(() => products.value.length)

  async function fetchProducts(filters = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/products', { params: filters })
      products.value = data.data
      return data
    } finally {
      loading.value = false
    }
  }

  return { products, loading, itemsCount, fetchProducts }
})
```

### Best Practices

- Keep stores focused on a single domain (auth, cart, products, etc.)
- Use `$reset()` for clean state teardown (especially on logout)
- Always wrap API calls in try/finally to reset loading state
- Handle errors at the component level via toast notifications, not in stores
- Export store usage via `useXxxStore` pattern consistently
- Use `computed` for derived state, not methods

---

## Testing

Tests use [Vitest](https://vitest.dev/) with the Vue plugin. Add test files in `src/__tests__/`:

```
src/__tests__/
├── setup.js                 # Global test setup
├── TestComponent.vue        # Test helper component
├── TestComponent.spec.js    # Example spec
```

### Writing Tests

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, { props: { title: 'Hello' } })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

### Running Tests

```bash
npm run test
```

### Coverage Goals

- Aim for **70%+** coverage on stores and utils (pure logic)
- Components should at minimum test: rendering with different props, user interactions, and edge cases (empty/loading/error states)

---

## CSS & Styling

### Tailwind First

Use Tailwind utility classes for all styling. Only add custom CSS in `src/assets/main.css` for:

- Reusable utility classes (`.btn`, `.input`, `.card`, `.badge`)
- CSS custom properties (theme tokens)
- Transition/animation classes
- Browser-specific styling (scrollbars, selection)

### Scoped Styles

Component-specific styles must use the `scoped` attribute:

```vue
<style scoped>
.custom-class { ... }
</style>
```

### Design Tokens

Use the project's custom design tokens rather than arbitrary values:

- ✅ `rounded-card`, `rounded-btn`, `rounded-input`
- ✅ `shadow-card`, `shadow-card-hover`, `shadow-soft-lg`
- ✅ `text-primary-600`, `bg-surface`, `border-border`
- ❌ `rounded-2xl`, `shadow-lg`, `bg-gray-50`

Refer to `tailwind.config.js` for all available tokens.

---

## Pull Request Process

### Branch Naming

```
feature/<short-description>     # New features
fix/<short-description>          # Bug fixes
refactor/<short-description>     # Code restructures
chore/<short-description>        # Tooling, config, CI
docs/<short-description>         # Documentation
```

Examples: `feature/product-filter-sort`, `fix/wishlist-delete-endpoint`, `chore/upgrade-vite`

### Commit Messages

Use [conventional commits](https://www.conventionalcommits.org/):

```
feat: add price range filter to product list
fix: resolve runtime error in FilterPanel emit
refactor: extract gallery logic into composable
chore: update eslint to v9
docs: add API endpoint reference to README
```

### PR Checklist

Before submitting a PR:

- [ ] Code follows ESLint + Prettier rules
- [ ] All user-facing strings use `$t()` with i18n keys
- [ ] New components include `scoped` styles
- [ ] No `console.log` or `debugger` statements (production)
- [ ] Tests pass (`npm run test`)
- [ ] Manual testing done on desktop and mobile viewports
- [ ] No dead code, unused imports, or commented-out blocks
- [ ] New API calls follow the existing Axios pattern
- [ ] Store changes include proper error handling and loading state
- [ ] PR description explains the *what* and *why*

### PR Title Format

```
<type>: <brief description>
```

Examples:
- `feat: add price range filter to product list`
- `fix: correct wishlist toggle endpoint usage`
- `refactor: consolidate filter state into composable`

### Review Process

1. Open a PR against the `main` branch
2. Ensure the CI check (lint + test) passes
3. At least one reviewer must approve
4. Squash-merge into `main` with a clean commit message

---

## Code Review Checklist

Reviewers should verify:

### Functionality
- Does the code do what it claims?
- Are edge cases handled (empty state, loading, error)?
- Are all user-facing strings internationalized?

### Architecture
- Does it follow the existing patterns (Composition API, `<script setup>`)?
- Is the logic in the right layer (component vs store vs util)?
- Are reusable components generic enough?

### Performance
- Are `v-for` keys correct and stable?
- Are expensive computations in `computed` (not methods or templates)?
- Are async operations properly cleaned up on unmount?

### Security
- Are user inputs sanitized / escaped? (Vue does this automatically in templates)
- Are API tokens handled via the Axios interceptor (not manually)?
- Are routes properly guarded with `requiresAuth`?

### Known Gotchas (from `docs/review.md`)
- ❌ **Don't use `this.$emit()`** inside `<script setup>` — use the `emit` function from `defineEmits()`
- ✅ Do preserve the `redirect` query param in auth guards
- ✅ Do use `_method=PUT` with `FormData` for file uploads to Laravel
- ✅ Do deduplicate categories by both `id` and `name`

---

## Environment

- **Node.js**: >= 18
- **Package manager**: npm (preferred)
- **Backend**: Laravel API on `http://localhost:8000`
- **No TypeScript** — this project uses plain JavaScript

For questions, open an issue or reach out to the project maintainers.
