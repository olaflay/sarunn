// RUNNA — campus-scoped static data (Phase 1)

export const CAMPUSES = [
  { id: 'lasu-epe', name: 'LASU Epe Campus', institution: 'Lagos State University' },
  { id: 'lasued-epe', name: 'LASUED Epe Campus', institution: 'Lagos State University of Education' },
];

// Service grid on the home screen. Only food + send package are active for now.
export const SERVICES = [
  { id: 'food', label: 'Food', active: true },
  { id: 'send', label: 'Send Package', active: true },
  { id: 'laundry', label: 'Laundry', active: false },
  { id: 'print', label: 'Printing Press', active: false },
];

export const VENDORS = [
  { id: '1', store_name: 'Mama Tee Kitchen', campus: 'lasu-epe', category: 'food', rating: 4.8, rating_count: 312, delivery_time_min: 20, delivery_fee: 500, address: 'Behind Male Hostel, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=180&fit=crop', tags: ['Local', 'Rice'], is_open: true },
  { id: '2', store_name: 'Campus Bites', campus: 'lasu-epe', category: 'food', rating: 4.6, rating_count: 188, delivery_time_min: 25, delivery_fee: 600, address: 'Student Union Block, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=180&fit=crop', tags: ['Fast Food', 'Burgers'], is_open: true },
  { id: '3', store_name: 'Sweet Sensation Spot', campus: 'lasu-epe', category: 'food', rating: 4.5, rating_count: 142, delivery_time_min: 30, delivery_fee: 500, address: 'Main Gate Plaza, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=180&fit=crop', tags: ['Pastries', 'Snacks'], is_open: false },
  { id: '4', store_name: 'Iya Basira Buka', campus: 'lasued-epe', category: 'food', rating: 4.9, rating_count: 421, delivery_time_min: 18, delivery_fee: 400, address: 'Near Female Hostel, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1604908554007-90b9c3c1f9a8?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=180&fit=crop', tags: ['Local', 'Swallow'], is_open: true },
  { id: '5', store_name: 'Chops & More', campus: 'lasued-epe', category: 'food', rating: 4.7, rating_count: 203, delivery_time_min: 22, delivery_fee: 550, address: 'ECE Building Walkway, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=180&fit=crop', tags: ['Grills', 'Small Chops'], is_open: true },
  { id: '6', store_name: 'Naija Grills', campus: 'lasued-epe', category: 'food', rating: 4.4, rating_count: 97, delivery_time_min: 35, delivery_fee: 600, address: 'Mosque Road, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=180&fit=crop', tags: ['Suya', 'Grills'], is_open: true },
];

const MENUS = {
  '1': [
    { id: 'm1-1', name: 'Jollof Rice & Chicken', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-2', name: 'Fried Rice & Turkey', price: 3000, image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-3', name: 'White Rice & Stew', price: 2000, image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-4', name: 'Bottle Water', price: 300, image_url: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=200&h=200&fit=crop', category: 'Drinks' },
  ],
  '2': [
    { id: 'm2-1', name: 'Classic Beef Burger', price: 3200, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', category: 'Burgers' },
    { id: 'm2-2', name: 'Crispy Chicken Burger', price: 3500, image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop', category: 'Burgers' },
    { id: 'm2-3', name: 'Loaded Fries', price: 1800, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop', category: 'Sides' },
    { id: 'm2-4', name: 'Chapman', price: 1200, image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop', category: 'Drinks' },
  ],
  '4': [
    { id: 'm4-1', name: 'Pounded Yam & Egusi', price: 2800, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop', category: 'Swallow' },
    { id: 'm4-2', name: 'Eba & Ogbono', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908554007-90b9c3c1f9a8?w=200&h=200&fit=crop', category: 'Swallow' },
    { id: 'm4-3', name: 'Amala & Ewedu', price: 2400, image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop', category: 'Swallow' },
  ],
  '5': [
    { id: 'm5-1', name: 'Mixed Small Chops', price: 2000, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop', category: 'Chops' },
    { id: 'm5-2', name: 'Peppered Gizzard', price: 2500, image_url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=200&h=200&fit=crop', category: 'Grills' },
    { id: 'm5-3', name: 'Spring Rolls (6pcs)', price: 1500, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200&h=200&fit=crop', category: 'Chops' },
  ],
  '6': [
    { id: 'm6-1', name: 'Beef Suya', price: 2000, image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=200&h=200&fit=crop', category: 'Suya' },
    { id: 'm6-2', name: 'Grilled Chicken', price: 3500, image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop', category: 'Grills' },
    { id: 'm6-3', name: 'Grilled Fish', price: 4000, image_url: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=200&h=200&fit=crop', category: 'Grills' },
  ],
};

const DEFAULT_MENU = [
  { id: 'd1', name: 'House Special', price: 2500, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop', category: 'Popular' },
  { id: 'd2', name: 'Combo Plate', price: 3200, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop', category: 'Popular' },
  { id: 'd3', name: 'Soft Drink', price: 700, image_url: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop', category: 'Drinks' },
];

export function getVendor(id) {
  return VENDORS.find(v => v.id === id);
}

export function getMenu(id) {
  return MENUS[id] || DEFAULT_MENU;
}

export function vendorsByCampus(campusId) {
  return VENDORS.filter(v => v.campus === campusId);
}

export function campusVendorCount(campusId) {
  return VENDORS.filter(v => v.campus === campusId).length;
}