# Frontend Code Review — ECAM

Scope: router, stores, services/axios, main pages/components.
Triage: KEEP / FIX / INVESTIGATE.

## KEEP
- `src/router/index.js:41` — auth guard redirect preserving `redirect` query on login/register is correct and useful.
- `src/services/axios.js:14` — request interceptor attaches bearer from `localStorage` cleanly.
- `src/stores/auth.js:75` — `updateProfile` switches to `multipart/form-data` only when an `avatar` File is present; otherwise keeps JSON, avoiding unnecessary upload overhead.
- `src/stores/product.js:68` — category dedup logic by id+name is defensive and reusable.

## FIX
- `src/components/FilterPanel.vue:178` and `src/components/MobileFilterDrawer.vue:154` — `applyPriceFilter()` uses `this.$emit(...)` inside `<script setup>`, which does not provide `this`. This throws at runtime and breaks price filtering.
  - Fix: replace `this.$emit(...)` with the `emit` function from `defineEmits(...)`, e.g.:

  ```js
  const emit = defineEmits(['price-change'])
  function applyPriceFilter() {
    emit('price-change', { min: localMinPrice.value, max: localMaxPrice.value })
  }
  ```

- `src/stores/wishlist.js:28` — `toggleWishlist()` always POSTs and then re-fetches the whole wishlist. If the app later needs a dedicated DELETE endpoint (suspected wishlist DELETE endpoint bug), callers can’t distinguish add vs remove at the store level.
  - Fix: make toggle semantics explicit in the store (or remove `toggleWishlist` if backend only supports direct DELETE for removals), and avoid relying on a full refetch for simple state updates.

## INVESTIGATE
- `src/services/axios.js:4` — baseURL defaults to `/api`, but `VITE_API_URL` wasn’t verified here. If Laravel is served at project root without an `/api` prefix, all API calls 404. Confirm the actual backend prefix against `backend\routes\api.php`.
- `src/App.vue:18` — app-wide onMounted bootstraps profile/cart/wishlist when `authStore.token` exists. If a stale token survives a logout race (or interceptor isn’t reached), this can trigger one spurious unauthenticated request after logout. Verify whether axios interceptor clears fast enough to avoid the “post-logout redirect loop” symptom.
- Topbar avatar handling (`src/components/AppHeader.vue:65`) — avatar fallback concatenates `ui-avatars.com` with `name`. If the backend returns avatar URLs without a host (relative path), the image will 404. Verify backend avatar storage config and whether asset URLs are already absolute.
- `src/stores/wishlist.js:15` — `fetchWishlist` stores `items = data.data` directly. If the shape sometimes lacks `product` or uses different keys depending on endpoint/version, `isInWishlist` and `WishlistPage` rendering will break. Confirm backend response contract for `/wishlist`.
