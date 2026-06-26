const isClient = typeof window !== 'undefined';

function loadFromStorage(key, fallback) {
  if (!isClient) return fallback;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch {}
  return fallback;
}

export let CAMPUSES = [
  { id: 'lasu-epe', name: 'LASU Epe Campus', institution: 'Lagos State University', est_delivery: '15-30 min' },
  { id: 'lasued-epe', name: 'LASUED Epe Campus', institution: 'Lagos State University of Education', est_delivery: '10-25 min' },
];

export let SERVICES = [
  { id: 'food', label: 'Food Delivery', active: true },
  { id: 'send', label: 'Send Package', active: true },
  { id: 'receive', label: 'Receive Package', active: true },
  { id: 'market', label: 'Shopping', active: false, badge: 'Best Prices' },
  { id: 'laundry', label: 'Laundry', active: false },
  { id: 'print', label: 'Printing', active: false },
];

export let LOCATIONS = loadFromStorage('runna_locations', {
  'lasu-epe': [
    { id: 'school-campus', label: 'School Campus', base_fee: 300 },
    { id: 'iraye', label: 'Iraye', base_fee: 400 },
    { id: 'itamarun', label: 'Itamarun', base_fee: 450 },
  ],
  'lasued-epe': [
    { id: 'lasued-main', label: 'Main Campus', base_fee: 300 },
    { id: 'lasued-annex', label: 'Annex Area', base_fee: 350 },
  ],
});

export let SUB_LOCATIONS = loadFromStorage('runna_sub_locations', {
  'school-campus': [
    { id: 'library', label: 'Library', surcharge: 0 },
    { id: 'mosque', label: 'Mosque', surcharge: 50 },
    { id: 'chapel', label: 'School Chapel', surcharge: 0 },
    { id: 'ece-hall', label: 'ECE Lecture Hall', surcharge: 0 },
    { id: 'part-time', label: 'Part-time Lecture Rooms', surcharge: 0 },
    { id: 'male-hostel', label: 'Male Hostel', surcharge: 0 },
    { id: 'female-hostel', label: 'Female Hostel', surcharge: 0 },
  ],
  'iraye': [
    { id: 'iraye-junction', label: 'Iraye Junction', surcharge: 0 },
    { id: 'iraye-market', label: 'Iraye Market', surcharge: 50 },
  ],
  'itamarun': [
    { id: 'itamarun-junction', label: 'Itamarun Junction', surcharge: 0 },
    { id: 'itamarun-gate', label: 'Itamarun Gate', surcharge: 0 },
  ],
  'lasued-main': [
    { id: 'lasued-library', label: 'Library', surcharge: 0 },
    { id: 'lasued-hostel-m', label: 'Male Hostel', surcharge: 0 },
    { id: 'lasued-hostel-f', label: 'Female Hostel', surcharge: 0 },
    { id: 'lasued-lecture', label: 'Lecture Halls', surcharge: 0 },
  ],
  'lasued-annex': [
    { id: 'lasued-annex-gate', label: 'Main Gate', surcharge: 0 },
    { id: 'lasued-annex-hall', label: 'Assembly Hall', surcharge: 0 },
  ],
});

export let VENDORS = [
  { id: '1', store_name: 'Mama Tee Kitchen', campus: 'lasu-epe', category: 'food', rating: 4.8, rating_count: 312, delivery_time_min: 20, delivery_fee: 500, address: 'Behind Male Hostel, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=180&fit=crop', tags: ['Local', 'Rice'], is_open: true },
  { id: '2', store_name: 'Campus Bites', campus: 'lasu-epe', category: 'food', rating: 4.6, rating_count: 188, delivery_time_min: 25, delivery_fee: 600, address: 'Student Union Block, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=180&fit=crop', tags: ['Fast Food', 'Burgers'], is_open: true },
  { id: '3', store_name: 'Sweet Sensation Spot', campus: 'lasu-epe', category: 'food', rating: 4.5, rating_count: 142, delivery_time_min: 30, delivery_fee: 500, address: 'Main Gate Plaza, LASU Epe', logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=180&fit=crop', tags: ['Pastries', 'Snacks'], is_open: false },
  { id: '4', store_name: 'Iya Basira Buka', campus: 'lasued-epe', category: 'food', rating: 4.9, rating_count: 421, delivery_time_min: 18, delivery_fee: 400, address: 'Near Female Hostel, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1604908554007-90b9c3c1f9a8?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=180&fit=crop', tags: ['Local', 'Swallow'], is_open: true },
  { id: '5', store_name: 'Chops & More', campus: 'lasued-epe', category: 'food', rating: 4.7, rating_count: 203, delivery_time_min: 22, delivery_fee: 550, address: 'ECE Building Walkway, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=180&fit=crop', tags: ['Grills', 'Small Chops'], is_open: true },
  { id: '6', store_name: 'Naija Grills', campus: 'lasued-epe', category: 'food', rating: 4.4, rating_count: 97, delivery_time_min: 35, delivery_fee: 600, address: 'Mosque Road, LASUED Epe', logo_url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=180&fit=crop', tags: ['Suya', 'Grills'], is_open: true },
];

const DEFAULT_MENUS = {
  '1': [
    { id: 'm1-1', name: 'Jollof Rice & Chicken', description: 'Smoky Nigerian jollof rice served with grilled chicken and fresh salad.', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-2', name: 'Fried Rice & Turkey', description: 'Colourful fried rice with chunks of smoked turkey and fried plantain.', price: 3000, image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-3', name: 'White Rice & Stew', description: 'Fluffy white rice paired with rich pepper stew and assorted meat.', price: 2000, image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop', category: 'Rice' },
    { id: 'm1-4', name: 'Bottle Water', description: 'Chilled 75cl bottled water.', price: 300, image_url: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=200&h=200&fit=crop', category: 'Drinks' },
  ],
  '2': [
    { id: 'm2-1', name: 'Classic Beef Burger', description: 'Juicy beef patty, melted cheese, lettuce, and tomato in a soft bun.', price: 3200, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', category: 'Burgers' },
    { id: 'm2-2', name: 'Crispy Chicken Burger', description: 'Crispy fried chicken fillet with mayo, pickles, and crunchy coleslaw.', price: 3500, image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop', category: 'Burgers' },
    { id: 'm2-3', name: 'Loaded Fries', description: 'Golden fries topped with cheese sauce, bacon bits, and jalapenos.', price: 1800, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop', category: 'Sides' },
    { id: 'm2-4', name: 'Chapman', description: 'Refreshing fruit cocktail drink with a hint of citrus and bitters.', price: 1200, image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop', category: 'Drinks' },
  ],
  '4': [
    { id: 'm4-1', name: 'Pounded Yam & Egusi', description: 'Smooth pounded yam with rich egusi soup loaded with assorted meat.', price: 2800, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop', category: 'Swallow' },
    { id: 'm4-2', name: 'Eba & Ogbono', description: 'Eba served with draw-y Ogbono soup and assorted beef cuts.', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908554007-90b9c3c1f9a8?w=200&h=200&fit=crop', category: 'Swallow' },
    { id: 'm4-3', name: 'Amala & Ewedu', description: 'Soft Amala with silky Ewedu and rich Gbegiri stew.', price: 2400, image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop', category: 'Swallow' },
  ],
  '5': [
    { id: 'm5-1', name: 'Mixed Small Chops', description: 'Assorted puff-puff, spring rolls, samosas, and peppered gizzard.', price: 2000, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop', category: 'Chops' },
    { id: 'm5-2', name: 'Peppered Gizzard', description: 'Spicy grilled gizzard tossed in a peppered onion sauce.', price: 2500, image_url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=200&h=200&fit=crop', category: 'Grills' },
    { id: 'm5-3', name: 'Spring Rolls (6pcs)', description: 'Crispy vegetable spring rolls served with sweet chilli sauce.', price: 1500, image_url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200&h=200&fit=crop', category: 'Chops' },
  ],
  '6': [
    { id: 'm6-1', name: 'Beef Suya', description: 'Peppered beef skewers grilled with traditional Yaji spice.', price: 2000, image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=200&h=200&fit=crop', category: 'Suya' },
    { id: 'm6-2', name: 'Grilled Chicken', description: 'Half chicken marinated in spices and grilled to perfection.', price: 3500, image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop', category: 'Grills' },
    { id: 'm6-3', name: 'Grilled Fish', description: 'Whole catfish grilled with peppered sauce and onions.', price: 4000, image_url: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=200&h=200&fit=crop', category: 'Grills' },
  ],
};

const DEFAULT_MENU = [
  { id: 'd1', name: 'House Special', price: 2500, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop', category: 'Popular' },
  { id: 'd2', name: 'Combo Plate', price: 3200, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop', category: 'Popular' },
  { id: 'd3', name: 'Soft Drink', price: 700, image_url: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop', category: 'Drinks' },
];

export function getLocations(campusId) {
  return LOCATIONS[campusId] || [];
}

export function getSubLocations(locationId) {
  return SUB_LOCATIONS[locationId] || [];
}

export function getLocationLabel(campusId, mainId, subId) {
  const locs = getLocations(campusId);
  const main = locs.find((location) => location.id === mainId);
  if (!main) return null;
  if (subId) {
    const subs = getSubLocations(mainId);
    const sub = subs.find((item) => item.id === subId);
    if (sub) return `${main.label} > ${sub.label}`;
  }
  return main.label;
}

export function calculateErrandFee(fromLocationId, toLocationId, toSubLocationId) {
  let fromFee = 0;
  let toFee = 0;
  let surcharge = 0;

  for (const locs of Object.values(LOCATIONS)) {
    const from = locs.find((location) => location.id === fromLocationId);
    if (from) fromFee = from.base_fee;
    const to = locs.find((location) => location.id === toLocationId);
    if (to) toFee = to.base_fee;
  }

  const baseFee = Math.max(fromFee, toFee);

  if (toSubLocationId) {
    for (const subs of Object.values(SUB_LOCATIONS)) {
      const sub = subs.find((item) => item.id === toSubLocationId);
      if (sub) {
        surcharge = sub.surcharge;
        break;
      }
    }
  }

  return baseFee + surcharge;
}

export function setLocations(newLocations) {
  LOCATIONS = newLocations;
  if (isClient) localStorage.setItem('runna_locations', JSON.stringify(newLocations));
}

export function setSubLocations(newSubLocations) {
  SUB_LOCATIONS = newSubLocations;
  if (isClient) localStorage.setItem('runna_sub_locations', JSON.stringify(newSubLocations));
}

export function getVendor(id) {
  return VENDORS.find((vendor) => vendor.id === id);
}

export function getMenu(id) {
  return DEFAULT_MENUS[id] || DEFAULT_MENU;
}

export function vendorsByCampus(campusId) {
  return VENDORS.filter((vendor) => vendor.campus === campusId);
}

export function campusVendorCount(campusId) {
  return vendorsByCampus(campusId).length;
}

export function getFoodCategories() {
  return ['All', 'Local', 'Fast Food', 'Swallow', 'Grills', 'Suya', 'Pastries'];
}

export const FOOD_CATEGORIES = getFoodCategories();

export function getPopularMeals() {
  return [
    { id: 'p1', name: 'Jollof Rice & Chicken', description: 'Smoky Nigerian jollof rice served with grilled chicken and fresh salad.', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop', vendorId: '1' },
    { id: 'p2', name: 'Classic Beef Burger', description: 'Juicy beef patty with melted cheese, lettuce, and tomato.', price: 3200, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', vendorId: '2' },
    { id: 'p3', name: 'Pounded Yam & Egusi', description: 'Smooth pounded yam with rich egusi soup and assorted meat.', price: 2800, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop', vendorId: '4' },
    { id: 'p4', name: 'Mixed Small Chops', description: 'Assorted puff-puff, spring rolls, and peppered gizzard.', price: 2000, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop', vendorId: '5' },
    { id: 'p5', name: 'Beef Suya', description: 'Peppered beef skewers with traditional Yaji spice.', price: 2000, image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=200&h=200&fit=crop', vendorId: '6' },
  ];
}

export const POPULAR_MEALS = getPopularMeals();

export function getPromotions() {
  return [
    { id: 'promo1', title: 'Free Delivery Weekend', desc: 'Free delivery on all food orders over N2,000 this weekend only.', bg: 'linear-gradient(135deg, #1B2B45 0%, #2A4374 100%)' },
    { id: 'promo2', title: '20% Off First Order', desc: 'New users get 20% off their first food order. No code needed.', bg: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' },
  ];
}

export const PROMOTIONS = getPromotions();

export function getDefaultMenu() {
  return DEFAULT_MENU;
}
