import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { NoiseOverlay } from './components/ui/NoiseOverlay'
import { Layout } from './components/layout/Layout'
import { PageWrapper } from './components/layout/PageWrapper'
import { Skeleton } from './components/ui/Skeleton'

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })))
const Shop = lazy(() => import('./pages/Shop').then(module => ({ default: module.Shop })))
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })))
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })))
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })))

const ProductDetail = () => <PageWrapper><div className="text-text-primary p-8 pt-32 h-screen">Product Detail Placeholder</div></PageWrapper>

function App() {
  const location = useLocation();
  
  return (
    <>
      <NoiseOverlay />
      <Layout>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen w-full pt-24 px-12"><Skeleton className="w-full h-[60vh] rounded-lg" /></div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
              <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
              <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
