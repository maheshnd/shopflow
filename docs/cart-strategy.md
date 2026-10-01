# Cart strategy (future — not implemented)

This note records the intended cart architecture so later work stays
consistent. **Nothing here is implemented yet.**

## Products are public

Guests can browse products and view product details without logging in.
The landing page and (future) product pages must never redirect guests to `/login`.

## Guest cart → `localStorage`

- Stored in `localStorage` (**not** `sessionStorage`) so the cart survives
  refreshes and browser restarts.
- Key: `shopflow_guest_cart`
- Store **only** product references and quantities:

  ```json
  { "items": [{ "productId": "…", "quantity": 2 }] }
  ```

- Never store or trust price, stock, or availability on the client.
  The backend decides those.

## Authenticated cart → server

- Lives in PostgreSQL (`cart`, `cart_items` tables).
- The server is the source of truth.
- The web app reads it via the usual flow:
  `Feature Component → useCart() → React Query → cart API → apiFetch → backend`.

## Merging on login

```
guest localStorage cart
        ↓
login succeeds
        ↓
send guest items to the server (merge endpoint)
        ↓
server merges into the user's cart, summing duplicate product quantities
        ↓
server validates stock / current price / availability
        ↓
merge succeeds
        ↓
clear shopflow_guest_cart from localStorage
        ↓
React Query invalidates / refetches the cart query
```

Notes:

- If the merge request fails, keep the guest cart so nothing is lost; retry later.
- Quantities may be capped by the server (e.g. limited stock); the UI should
  show the server's result, not the requested values.
- Logout does not copy the server cart back into `localStorage`.

## UI placeholders today

- `AppHeader` shows a static `Cart (0)` placeholder
  (`apps/web/features/navigation/components/app-header.tsx`).
- The landing page shows static product placeholders
  (`apps/web/features/home/components/product-preview-section.tsx`) that will be
  replaced by `useProducts()`.
