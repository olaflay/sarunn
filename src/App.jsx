import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Splash
import Splash from '@/pages/Splash';

// Customer
import CustomerHome from '@/pages/customer/CustomerHome';
import CustomerSearch from '@/pages/customer/CustomerSearch';
import VendorDetail from '@/pages/customer/VendorDetail';
import Checkout from '@/pages/customer/Checkout';
import OrderTracking from '@/pages/customer/OrderTracking';
import CustomerOrders from '@/pages/customer/CustomerOrders';
import CustomerProfile from '@/pages/customer/CustomerProfile';
import ErrandRequestPage from '@/pages/customer/ErrandRequest';
import Support from '@/pages/customer/Support';

// Vendor
import VendorOrders from '@/pages/vendor/VendorOrders';
import VendorMenu from '@/pages/vendor/VendorMenu';
import VendorEarnings from '@/pages/vendor/VendorEarnings';
import VendorProfile from '@/pages/vendor/VendorProfile';

// Runner
import RunnerHome from '@/pages/runner/RunnerHome';
import RunnerJobs from '@/pages/runner/RunnerJobs';
import RunnerEarnings from '@/pages/runner/RunnerEarnings';
import RunnerProfile from '@/pages/runner/RunnerProfile';

// Admin
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Splash */}
            <Route path="/" element={<Splash />} />

            {/* Customer */}
            <Route path="/customer/home" element={<CustomerHome />} />
            <Route path="/customer/search" element={<CustomerSearch />} />
            <Route path="/customer/vendor/:id" element={<VendorDetail />} />
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/order-tracking" element={<OrderTracking />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/errand" element={<ErrandRequestPage />} />
            <Route path="/customer/support" element={<Support />} />

            {/* Vendor */}
            <Route path="/vendor/orders" element={<VendorOrders />} />
            <Route path="/vendor/menu" element={<VendorMenu />} />
            <Route path="/vendor/earnings" element={<VendorEarnings />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />

            {/* Runner */}
            <Route path="/runner/home" element={<RunnerHome />} />
            <Route path="/runner/jobs" element={<RunnerJobs />} />
            <Route path="/runner/earnings" element={<RunnerEarnings />} />
            <Route path="/runner/profile" element={<RunnerProfile />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;