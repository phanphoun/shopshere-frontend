# 🛍️ ShopSphere Frontend

A modern, multilingual e-commerce single-page application (SPA) built with **Vue 3**, backed by a **Laravel API**. Features a polished Tailwind CSS design, real-time cart/wishlist sync, full product filtering, user authentication, and internationalization (English & Khmer).

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Framework**| Vue 3 (Composition API + `<script setup>`)      |
| **Build**    | Vite 5                                          |
| **Styling**  | Tailwind CSS 3 with custom design tokens        |
| **State**    | Pinia (auth, cart, wishlist, orders, products)  |
| **Routing**  | Vue Router 4 (lazy-loaded routes)               |
| **i18n**     | vue-i18n 11 (English & Khmer)                   |
| **HTTP**     | Axios (interceptors for auth & error handling)  |
| **Backend**  | Laravel API (proxied via Vite dev server)       |

---

## Features

### 🏠 Homepage
- Hero section with CTA buttons
- Category grid (up to 7)
- Featured products carousel
- Best sellers / top-rated products
- Trust & advantage cards
- Testimonials (real reviews or default fallbacks)
- Live stats (products, customers, categories)

### 📦 Product Catalog
- Grid & list view modes
- Advanced filtering: category, price range, rating, brand, availability, featured
- Sort by: latest, oldest, price (asc/desc), name (asc/desc)
- Pagination with smart page number display
- Active filter chips (dismissible)
- Loading skeleton placeholders

### 🔍 Product Detail
- Image gallery with thumbnail switcher
- Discount badge & percentage calculation
- Quantity selector with stock limits
- Add to cart / wishlist
- Customer reviews (read & write)
- Related products section

### 🛒 Cart & Checkout
- Add, update, remove items
- Clear cart with confirmation
- Real-time summary (subtotal, tax, shipping, total)
- Checkout form (shipping info, payment method, notes)
- Cash on Delivery
- Order placement with success feedback

### ❤️ Wishlist
- Add / remove items
- Toggle heart icon on products
- Empty state with browse link

### 👤 Authentication
- Login & Register with JWT-based auth
- Auth guard that preserves redirect path
- Profile page (edit personal info, change password, avatar upload)
- Order history & detail view

### 🌐 Internationalization
- **English** (default) and **Khmer** (ភាសាខ្មែរ)
- Persistent locale selection via `localStorage`
- Language toggle in the header

### 📱 Responsive Design
- Mobile-first with adaptive layouts
- Mobile navigation drawer
- Mobile filter drawer
- Touch-friendly controls

---

## Project Structure

```
src/
├── App.vue                      # Root component (router-view + toast)
├── main.js                      # App entry point
├── assets/
│   └── main.css                 # Tailwind + custom utility classes
├── components/
│   ├── AppHeader.vue            # Fixed top nav with search, cart, wishlist, profile
│   ├── AppFooter.vue            # Footer with feature cards, links, contact
│   ├── CategoryNavigation.vue   # Horizontal category bar (legacy)
│   ├── EmptyState.vue           # Reusable empty state component
│   ├── FilterPanel.vue          # Desktop sidebar filters
│   ├── LanguageSwitcher.vue     # EN/KM toggle button
│   ├── LoadingSpinner.vue       # Centered spinner
│   ├── MobileFilterDrawer.vue   # Mobile slide-out sort drawer
│   ├── ProductCard.vue          # Product card with image, price, wishlist, add-to-cart
│   ├── StarRating.vue           # Interactive star rating input
│   └── ToastContainer.vue       # Toast notification overlay
├── i18n/
│   └── messages.js              # English & Khmer translations
├── layouts/
│   ├── DefaultLayout.vue        # Header + main + footer
│   └── AuthLayout.vue           # Centered auth card on gradient background
├── pages/
│   ├── auth/
│   │   ├── LoginPage.vue
│   │   └── RegisterPage.vue
│   ├── CartPage.vue
│   ├── CategoriesPage.vue
│   ├── CheckoutPage.vue
│   ├── ContactPage.vue
│   ├── HomePage.vue
│   ├── NotFoundPage.vue
│   ├── OrderDetailPage.vue
│   ├── OrdersPage.vue
│   ├── ProductDetailPage.vue
│   ├── ProductListPage.vue
│   ├── ProfilePage.vue
│   └── WishlistPage.vue
├── router/
│   └── index.js                 # Route definitions + auth guard
├── services/
│   └── axios.js                 # Axios instance with interceptors
├── stores/
│   ├── auth.js                  # Auth state (login, register, profile, logout)
│   ├── cart.js                  # Cart CRUD + summary
│   ├── orders.js                # Order listing & detail
│   ├── product.js               # Products, categories, featured, best sellers
│   ├── toast.js                 # Toast notification queue
│   └── wishlist.js              # Wishlist items & toggle
├── utils/
│   └── statusBadge.js           # Order status → Tailwind color mapping
└── __tests__/                   # Vitest test setup
```

---

## Getting Started

### Prerequisites
- **Node.js** >= 18
- **npm** or **pnpm** or **yarn**
- The **Laravel backend** running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start the dev server (proxies API to Laravel)
npm run dev
```

The app will be available at **`http://localhost:3000`** with API requests proxied to `http://localhost:8000`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build
```

---

## Environment Variables

| Variable         | Default     | Description                                |
| ---------------- | ----------- | ------------------------------------------ |
| `VITE_API_URL`   | `/api`      | Base URL for the Laravel API               |

If not set, all `/api`, `/storage`, and `/sanctum` requests are proxied to `http://localhost:8000` during development (see `vite.config.js`).

---

## API Endpoints (Laravel Backend)

The frontend expects the following endpoints from the Laravel API:

### Authentication
| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/api/login`        | Login                     |
| POST   | `/api/register`     | Register                  |
| POST   | `/api/logout`       | Logout                    |
| GET    | `/api/profile`      | Get user profile          |
| POST   | `/api/profile`      | Update profile (multipart)|
| PUT    | `/api/change-password` | Change password        |

### Products
| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/products`                | List products (paginated) |
| GET    | `/api/products/:id`            | Product detail            |
| GET    | `/api/products/featured`       | Featured products         |
| GET    | `/api/products/latest`         | Latest products           |
| GET    | `/api/products/best-sellers`   | Best-selling products     |
| GET    | `/api/products/search`         | Search products           |
| GET    | `/api/products/category/:slug` | Products by category      |
| GET    | `/api/products/:id/reviews`    | Product reviews           |

### Cart
| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| GET    | `/api/cart`            | Get cart         |
| POST   | `/api/cart/add`        | Add item         |
| PUT    | `/api/cart/update`     | Update quantity  |
| DELETE | `/api/cart/remove/:id` | Remove item      |
| DELETE | `/api/cart/clear`      | Clear cart       |

### Categories
| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/categories`  | List all categories |

### Orders
| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/orders`    | List user orders |
| GET    | `/api/orders/:id`| Order detail     |
| POST   | `/api/checkout`  | Place order      |

### Wishlist
| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/wishlist`        | Get wishlist       |
| POST   | `/api/wishlist/:id`    | Toggle wishlist    |
| DELETE | `/api/wishlist/:id`    | Remove from wishlist |

### Reviews
| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| POST   | `/api/reviews`  | Submit review  |

### Stats
| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| GET    | `/api/stats`  | Store-wide stats (customers, products) |

---

## Design System

### Colors
- **Primary**: Purple-based scale (`#5B3DF5` - `#2D1BB5`)
- **Accents**: Green (success), Red (error/discount), Orange (best sellers)
- **Surface**: Off-white (`#FAFAFC`) with warm-gray borders

### Custom Shadows
- `card` / `card-hover` — subtle depth for cards
- `soft-lg` — purple-tinted glow for important elements
- `purple-glow` — heavy purple glow
- `nav` — light drop shadow for the floating header

### Custom Border Radii
- `btn` (12px), `card` (18px), `nav` (20px), `input` (14px), `img` (16px), `pill` (9999px)

### CSS Utilities (`main.css`)
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost` — button variants
- `.input` — styled text inputs with focus ring
- `.card`, `.card-hover` — card containers with hover lift
- `.badge`, `.badge-green`, `.badge-red`, `.badge-orange` — status badges
- `.toast`, `.toast-success`, `.toast-error`, `.toast-info` — notification styling
- Transition classes: `.fade-*`, `.slide-up-*`
- Custom scrollbar styling

---

## Auth Flow

1. **Login/Register** → Backend returns `{ data: { user, token } }`
2. Token stored in `localStorage` as `auth_token`
3. User object stored in `localStorage` as `user`
4. Axios interceptor attaches `Authorization: Bearer <token>` to every request
5. On 401 response, interceptor clears storage & redirects to `/login`
6. Auth guard in router protects `/checkout`, `/wishlist`, `/orders`, `/profile`
7. On app mount, if token exists, profile/cart/wishlist are bootstrapped

---

## Testing

```bash
npm run test
```

Tests use [Vitest](https://vitest.dev/) with the Vue plugin. Add spec files in `src/__tests__/`.

---

## Code Review Notes

Refer to [`docs/review.md`](./docs/review.md) for a triage of known code quality items, including:

- **KEEP**: Auth redirect preservation, Axios interceptor design, multipart upload strategy, category dedup
- **FIX**: Emit helper used incorrectly inside `<script setup>` in filter components
- **INVESTIGATE**: API prefix consistency, stale-token race conditions, avatar URL handling, wishlist response shape

---

## License

Proprietary — developed as part of the ShopSphere platform.
