export const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  RUNNER: 'runner',
  ADMIN: 'admin',
});

export const ROLE_HOME_PATHS = Object.freeze({
  customer: '/customer/home',
  vendor: '/vendor/orders',
  runner: '/runner/home',
  admin: '/admin/dashboard',
});
