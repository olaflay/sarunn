import Splash from '@/pages/Splash';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

import CustomerHome from '@/pages/customer/CustomerHome';
import FoodHome from '@/pages/customer/FoodHome';
import CustomerSearch from '@/pages/customer/CustomerSearch';
import VendorDetail from '@/pages/customer/VendorDetail';
import Checkout from '@/pages/customer/Checkout';
import OrderTracking from '@/pages/customer/OrderTracking';
import CustomerOrders from '@/pages/customer/CustomerOrders';
import CustomerProfile from '@/pages/customer/CustomerProfile';
import ErrandRequestPage from '@/pages/customer/ErrandRequest';
import Support from '@/pages/customer/Support';

import VendorOrders from '@/pages/vendor/VendorOrders';
import VendorMenu from '@/pages/vendor/VendorMenu';
import VendorEarnings from '@/pages/vendor/VendorEarnings';
import VendorProfile from '@/pages/vendor/VendorProfile';

import RunnerHome from '@/pages/runner/RunnerHome';
import RunnerJobs from '@/pages/runner/RunnerJobs';
import RunnerRunDetail from '@/pages/runner/RunnerRunDetail';
import RunnerEarnings from '@/pages/runner/RunnerEarnings';
import RunnerProfile from '@/pages/runner/RunnerProfile';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminUserDetails from '@/pages/admin/AdminUserDetails';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminPricing from '@/pages/admin/AdminPricing';
import AdminLedger from '@/pages/admin/AdminLedger';
import AdminDisputes from '@/pages/admin/AdminDisputes';
import AdminPayments from '@/pages/admin/AdminPayments';

export const PUBLIC_ROUTES = [
  { path: '/', Component: Splash },
  { path: '/about', Component: About },
  { path: '/contact', Component: Contact },
];

export const AUTH_ROUTES = [
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/forgot-password', Component: ForgotPassword },
  { path: '/reset-password', Component: ResetPassword },
];

export const ROLE_ROUTES = {
  customer: [
    { path: '/customer/home', Component: CustomerHome },
    { path: '/customer/food', Component: FoodHome },
    { path: '/customer/search', Component: CustomerSearch },
    { path: '/customer/vendor/:id', Component: VendorDetail },
    { path: '/customer/checkout', Component: Checkout },
    { path: '/customer/order-tracking', Component: OrderTracking },
    { path: '/customer/orders', Component: CustomerOrders },
    { path: '/customer/profile', Component: CustomerProfile },
    { path: '/customer/errand', Component: ErrandRequestPage },
    { path: '/customer/support', Component: Support },
  ],
  vendor: [
    { path: '/vendor/orders', Component: VendorOrders },
    { path: '/vendor/menu', Component: VendorMenu },
    { path: '/vendor/earnings', Component: VendorEarnings },
    { path: '/vendor/profile', Component: VendorProfile },
  ],
  runner: [
    { path: '/runner/home', Component: RunnerHome },
    { path: '/runner/jobs', Component: RunnerJobs },
    { path: '/runner/jobs/:runId', Component: RunnerRunDetail },
    { path: '/runner/earnings', Component: RunnerEarnings },
    { path: '/runner/profile', Component: RunnerProfile },
  ],
  admin: [
    { path: '/admin/dashboard', Component: AdminDashboard },
    { path: '/admin/orders', Component: AdminOrders },
    { path: '/admin/users', Component: AdminUsers },
    { path: '/admin/users/:role/:id', Component: AdminUserDetails },
    { path: '/admin/payments', Component: AdminPayments },
    { path: '/admin/settings', Component: AdminSettings },
    { path: '/admin/pricing', Component: AdminPricing },
    { path: '/admin/ledger', Component: AdminLedger },
    { path: '/admin/disputes', Component: AdminDisputes },
  ],
};
