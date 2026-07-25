# FORGE | Premium Gym Apparel

FORGE is a highly-optimized, 3D-integrated e-commerce frontend built with React, Vite, Tailwind CSS (v4), and React Three Fiber.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (with custom design system variables in `src/styles/index.css`)
- **State Management**: Zustand (`src/store/useStore.ts`)
- **3D & Canvas**: `@react-three/fiber`, `@react-three/drei`, `three`
- **Animations**: `framer-motion`, `gsap` (with ScrollTrigger)
- **Routing**: `react-router-dom`

## 📁 Folder Structure

```
src/
├── assets/         # Static assets (images, fonts)
│   ├── models/     # GLTF/GLB 3D models go here
│   └── textures/   # PBR textures for models go here
├── components/     
│   ├── layout/     # Navbar, CartDrawer, PageWrapper, Layout
│   ├── product/    # ProductCard, ProductPanel (UI overlays)
│   ├── three/      # R3F Canvas components (HeroScene, ProductShowcase, GarmentModel)
│   └── ui/         # Buttons, Badges, Loaders, CustomCursor
├── config/         # Environment variables and deployment config
├── data/           # Mock data and type definitions (products.ts)
├── pages/          # Route components (Home, Shop, Cart, Checkout, NotFound)
├── store/          # Zustand global state (useStore.ts)
└── styles/         # Global CSS and Tailwind variables (index.css)
```

## 🛠 Adding New Products

The application uses a simulated product database located in `src/data/products.ts`. 

To add a new product, append a new object to the `products` array matching the `Product` interface:
```typescript
{
  id: 'new-product-id',
  name: 'Product Name',
  category: 'hoodie', // 'hoodie' | 'tee' | 'bottoms'
  price: 85,
  colorways: [
    { name: 'Color Name', hex: '#FFFFFF' }
  ],
  sizes: ['S', 'M', 'L'],
  tags: ['new'], // optional tags: 'new', 'sale', 'limited', 'sold-out'
  modelUrl: '/assets/models/new-product.glb' // (Future implementation) path to 3D model
}
```

## 🧊 Working with 3D Assets

Currently, the application uses primitive-based placeholder models (`MiniGarmentScene` and `GarmentModel`). 
When you are ready to use real sculpted GLTF/GLB models:
1. Drop the `.glb` files into `public/assets/models/`.
2. Use the `@react-three/drei` `useGLTF` hook inside `src/components/three/GarmentModel.tsx` to load the asset.
3. Apply materials dynamically by traversing the GLTF scene and swapping the material color based on the selected `colorway.hex` from the store/props.

## 🚀 Deployment

The project is configured for massive performance on low-end devices via a `deviceTier` heuristic.

To build for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```
