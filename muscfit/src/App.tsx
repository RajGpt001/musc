import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GlobalLoader } from './components/ui/GlobalLoader';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Layout } from './components/layout/Layout';
import { CartFlyAnimation } from './components/ui/CartFlyAnimation';

const IntroSequence = lazy(() => import('./components/three/IntroSequence').then(m => ({ default: m.IntroSequence })));

// Real Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import { ImageCarouselHeroDemo } from './components/ui/demo';
import SizeGuide from './pages/SizeGuide';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Lazy Loaded Pages
const About = lazy(() => import('./pages/About').catch(() => ({ default: () => <div className="p-24 min-h-screen">About Page</div> })));
const FAQ = lazy(() => import('./pages/FAQ').catch(() => ({ default: () => <div className="p-24 min-h-screen">FAQ Page</div> })));
const ShippingReturns = lazy(() => import('./pages/ShippingReturns').catch(() => ({ default: () => <div className="p-24 min-h-screen">Shipping & Returns</div> })));
const Contact = lazy(() => import('./pages/Contact').catch(() => ({ default: () => <div className="p-24 min-h-screen">Contact Page</div> })));

// Dummy Pages for missing routes
const NotFound = lazy(() => Promise.resolve({ default: () => <div className="p-24 text-center min-h-screen">404 - Not Found</div> }));

function App() {
  const location = useLocation();

  return (
    <>
      <CartFlyAnimation />
      <NoiseOverlay />
      <GlobalLoader />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            {/* Full-screen routes without standard Navbar/Footer */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Standard layout routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ai-demo" element={<ImageCarouselHeroDemo />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/sizing" element={<SizeGuide />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<ShippingReturns />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Dummy route catch-alls for links used in Footer */}
              <Route path="/careers" element={<div className="p-24 min-h-screen">Careers</div>} />
              <Route path="/sustainability" element={<div className="p-24 min-h-screen">Sustainability</div>} />
              <Route path="/affiliates" element={<div className="p-24 min-h-screen">Affiliate Program</div>} />
              <Route path="/account" element={<div className="p-24 min-h-screen">Account</div>} />
              <Route path="/privacy" element={<div className="p-24 min-h-screen">Privacy Policy</div>} />
              <Route path="/terms" element={<div className="p-24 min-h-screen">Terms of Service</div>} />
              <Route path="/accessibility" element={<div className="p-24 min-h-screen">Accessibility</div>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;
