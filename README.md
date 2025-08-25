# Product Nest — Next.js 15 + NextAuth + MongoDB

A simple product app built with Next.js 15 (App Router). It features public pages (Home, Products, Product Details), authentication (NextAuth with Google + credentials), and a protected dashboard where authenticated users can add products.

## Features
- Landing page with:
  - Navbar (shows user avatar + logout when signed in)
  - Hero slider
  - Product Highlights (latest 6 products)
  - Footer
- Auth:
  - Credentials login (email/password)
  - Google login (NextAuth)
  - Protected routes via middleware
- Products:
  - Public products list (/products)
  - Public product details (/products/[id])
  - Protected Add Product form (/dashboard/AddProduct) with SweetAlert2 success modal
- Backend:
  - Official MongoDB Node.js driver (no Mongoose)
  - Route Handlers under /api

## Tech Stack
- Next.js 15 (App Router)
- NextAuth.js (JWT strategy)
- MongoDB Node.js driver
- Tailwind CSS
- SweetAlert2 (success modal)
- Heroicons, Framer Motion




## Project Structure (key files)
```
app/
  api/
    auth/
      [...nextauth]/
        route.js         # NextAuth route
      register/
        route.js         # Credentials register
    products/
      route.js           # GET list, POST create (auth required)
      [id]/
        route.js         # GET product details
  Components/
    Navbar.jsx           # Shows login links or avatar + logout
    HeroSlider.jsx       # Landing hero slider
    ProductHighlights.jsx# Latest 6 products
    Footer.jsx
  dashboard/
    layout.jsx           # Sidebar layout
    page.js              # Dashboard home (protected)
    AddProduct/
      page.jsx           # Add product form (protected)
  products/
    page.jsx             # Public list
    [id]/
      page.jsx           # Public details
  page.js                # Home (Hero + Highlights)
  layout.js              # Root layout + SessionProvider
  Providers.jsx          # NextAuth SessionProvider
lib/
  mongodb.js             # Mongo client helper
  auth.js                # NextAuth config
middleware.js            # Protect /dashboard/*
```

---

## Routes Overview

### Public Pages
- GET / — Home (Navbar, Hero, Product Highlights, Footer)
- GET /login — Login (NextAuth: credentials + Google)
- GET /register — Register (credentials; optional photo URL)
- GET /products — Products list
- GET /products/[id] — Product details

### Protected Pages
- GET /dashboard — Dashboard home (requires auth)
- GET /dashboard/AddProduct — Add Product form (requires auth)
  - Protected by middleware and server-side session check on POST

### API Routes
- Auth
  - POST /api/auth/register
    - FormData fields: name (string), email (string), password (string), image (optional string URL)
  - GET|POST /api/auth/[...nextauth] (NextAuth)
- Products
  - GET /api/products — List all products (public)
  - POST /api/products — Create product (requires auth)
    - JSON body: { name: string, description?: string, price: number|string, image?: string (URL) }
  - GET /api/products/[id] — Get a single product by id (public)

Auth protection:
- middleware.js enforces auth for /dashboard/:path*
- POST /api/products checks session with getServerSession
