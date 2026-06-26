export interface BaseEntity {
  id: string;
  created_date?: string;
  updated_date?: string;
  created_by_id?: string;
}

export type UserRole = 'customer' | 'vendor' | 'runner' | 'admin';

export interface UserAttributes {
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  campus_id?: string;
  verified?: boolean;
  password?: string;
}

export interface UserEntity extends BaseEntity, UserAttributes {}
export type UserCreateModel = Omit<UserAttributes, 'verified'> & Pick<Partial<UserAttributes>, 'verified'>;
export type UserUpdateModel = Partial<UserAttributes>;

export interface VendorAttributes {
  store_name: string;
  category: string;
  campus: string;
  rating?: number;
  rating_count?: number;
  delivery_time_min?: number;
  delivery_fee?: number;
  address?: string;
  logo_url?: string;
  cover_url?: string;
  tags?: string[];
  is_open?: boolean;
  is_approved?: boolean;
  menu_count?: number;
  campus_label?: string;
  location_label?: string;
}

export interface VendorEntity extends BaseEntity, VendorAttributes {}
export type VendorCreateModel = VendorAttributes;
export type VendorUpdateModel = Partial<VendorAttributes>;

export interface MenuItemAttributes {
  vendor_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  is_available?: boolean;
}

export interface MenuItemEntity extends BaseEntity, MenuItemAttributes {}
export type MenuItemCreateModel = MenuItemAttributes;
export type MenuItemUpdateModel = Partial<MenuItemAttributes>;

export interface OrderItem {
  item_id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderAttributes {
  customer_id: string;
  customer_name?: string;
  vendor_id: string;
  vendor_ref?: string;
  vendor_name: string;
  runner_id?: string | null;
  runner_name?: string | null;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  delivery_address: string;
  notes?: string;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  estimated_delivery_min?: number;
}

export interface OrderEntity extends BaseEntity, OrderAttributes {}
export type OrderCreateModel = OrderAttributes;
export type OrderUpdateModel = Partial<OrderAttributes>;

export type ErrandStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface ErrandRequestAttributes {
  customer_id: string;
  customer_name?: string;
  runner_id?: string | null;
  runner_name?: string | null;
  title: string;
  description: string;
  pickup_location: string;
  dropoff_location: string;
  budget: number;
  status: ErrandStatus;
  category?: string;
}

export interface ErrandRequestEntity extends BaseEntity, ErrandRequestAttributes {}
export type ErrandRequestCreateModel = ErrandRequestAttributes;
export type ErrandRequestUpdateModel = Partial<ErrandRequestAttributes>;

export type VehicleType = 'bike' | 'scooter' | 'car' | 'walk' | 'other';

export interface RunnerProfileAttributes {
  user_id: string;
  full_name: string;
  phone: string;
  vehicle_type: VehicleType;
  is_available: boolean;
  is_approved: boolean;
  rating: number;
  description?: string;
  campus_id?: string;
}

export interface RunnerProfileEntity extends BaseEntity, RunnerProfileAttributes {}
export type RunnerProfileCreateModel = RunnerProfileAttributes;
export type RunnerProfileUpdateModel = Partial<RunnerProfileAttributes>;

export interface ReviewAttributes {
  order_id: string;
  customer_id: string;
  vendor_id?: string;
  runner_id?: string;
  vendor_rating?: number;
  runner_rating?: number;
  description?: string;
}

export interface ReviewEntity extends BaseEntity, ReviewAttributes {}
export type ReviewCreateModel = ReviewAttributes;
export type ReviewUpdateModel = Partial<ReviewAttributes>;

export type EntityName =
  | 'User'
  | 'Vendor'
  | 'MenuItem'
  | 'Order'
  | 'ErrandRequest'
  | 'RunnerProfile'
  | 'Review';

export interface EntityRecords {
  User: UserEntity;
  Vendor: VendorEntity;
  MenuItem: MenuItemEntity;
  Order: OrderEntity;
  ErrandRequest: ErrandRequestEntity;
  RunnerProfile: RunnerProfileEntity;
  Review: ReviewEntity;
}

export interface EntityCreateModels {
  User: UserCreateModel;
  Vendor: VendorCreateModel;
  MenuItem: MenuItemCreateModel;
  Order: OrderCreateModel;
  ErrandRequest: ErrandRequestCreateModel;
  RunnerProfile: RunnerProfileCreateModel;
  Review: ReviewCreateModel;
}

export interface EntityUpdateModels {
  User: UserUpdateModel;
  Vendor: VendorUpdateModel;
  MenuItem: MenuItemUpdateModel;
  Order: OrderUpdateModel;
  ErrandRequest: ErrandRequestUpdateModel;
  RunnerProfile: RunnerProfileUpdateModel;
  Review: ReviewUpdateModel;
}

export const ENTITY_NAMES = {
  User: 'User',
  Vendor: 'Vendor',
  MenuItem: 'MenuItem',
  Order: 'Order',
  ErrandRequest: 'ErrandRequest',
  RunnerProfile: 'RunnerProfile',
  Review: 'Review',
} as const;
