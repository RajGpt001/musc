# MuscFit Deployment Guide

This repository is built using Vite, React, TypeScript, TailwindCSS v4, and React Three Fiber. It is fully optimized for production hosting on platforms like Vercel or Netlify.

## Recommended Hosting (Vercel)

1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository. Vercel will automatically detect the Vite framework.
4. Expand **Environment Variables** and add your production keys (see `.env.example`).
5. Click **Deploy**.

## Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (This runs `tsc -b && vite build`)
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

## Environment Variables

Before going live, ensure the following variables are set in your hosting provider's dashboard:
- `VITE_API_BASE_URL`: Your production backend URL.
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public publishable key.
- `VITE_GOOGLE_ANALYTICS_ID`: Your GA4 tracking ID.

## Managing Content

### Adding a New Product
To add a new product to the catalog, edit `src/data/products.ts`:
1. Add a new object following the `Product` interface.
2. Required fields: `id`, `name`, `price`, `category`, `description`, `colors`, `sizes`, `sizeChartId`.
3. The `images` array accepts URLs (e.g., from a CDN or `/public/images/...`).

### Updating 3D Models
The 3D Product Showcase currently uses procedural placeholder geometry in `ProductShowcase.tsx`.
When you receive the actual `.gltf` or `.glb` models from your 3D artist:
1. Place the models in `/public/models/`.
2. Update `ProductShowcase.tsx` to use `@react-three/drei`'s `useGLTF()` hook to load the models dynamically based on the product ID.

## Performance Notes
- The 3D canvases are wrapped in `LazyCanvasWrapper` utilizing `IntersectionObserver`. They will not impact Initial Page Load (LCP) for users.
- Extremely low-end devices (`navigator.deviceMemory < 4`) will bypass the WebGL context entirely and render a branded CSS fallback to preserve 60fps scrolling.
