export type ErpRoute =
  | 'dashboard'
  | 'customers'
  | 'products'
  | 'add-product'
  | 'add-purchase'
  | 'add-category'
  | 'sales-invoice'
  | 'all-orders'
  | 'quotations'
  | 'income-expense'
  | 'payment'
  | 'withdraws'
  | 'suppliers'
  | 'business-report'
  | 'stock-report'
  | 'warranty'
  | 'returns'
  | 'repair-service'
  | 'coupons'
  | 'whatsapp-remainder'
  | 'company-settings'
  | 'user-settings'
  | 'database-backup'
  | 'license-renewal'
  | 'public-website-settings'
  | 'active-site-hub'
  | 'public-website';

export interface BranchSerials {
  mainActive: string[];
  sharchaActive: string[];
  rnRoadActive: string[];
  mainWarranty: string[];
  sharchaWarranty: string[];
  rnRoadWarranty: string[];
}

export interface ProductItem {
  id: string;
  proId: string;
  name: string;
  rootCategory: string;
  rootCode: string;
  mainCategory: string;
  mainCode: string;
  subCategory: string;
  subCode: string;
  brand: string;
  brandCode: string;
  productLimit: number;
  quantityType: string;
  warranty: string;
  purchaseDate: string;
  expiryDate: string;
  stock: number;
  sold: number;
  productCost: number;
  taxOtherCost: number;
  totalCost: number;
  sellPrice: number;
  onlinePrice: number;
  oldPrice: number;
  supplier: string;
  photo: string;
  quickOverview: string[];
  specifications: Record<string, string>;
  details: string;
  branchSerials: BranchSerials;
  isCollection?: boolean;
  isNewArrival?: boolean;
}

export interface CustomerItem {
  id: string;
  name: string;
  mobile: string;
  secondaryMobile?: string;
  whatsapp: string;
  email: string;
  address: string;
  shippingBilling: string;
  district?: string;
  upazila?: string;
  photo: string;
  due: number;
  advancePaid: number;
  customerType: 'General' | 'Retailer' | 'Online' | 'Walk-in';
  addedBy: string;
}

export interface SupplierItem {
  id: string;
  companyName: string;
  ownerName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  bankName: string;
  accountNo: string;
  address: string;
  photo: string;
  advancePayment: number;
  note: string;
}

export interface OrderLineItem {
  productId: string;
  proId: string;
  name: string;
  photo: string;
  serials: string[];
  warranty: string;
  qty: number;
  price: number;
  regularPrice?: number;
  total: number;
}

export interface OrderItem {
  id: string;
  invoiceNo: string;
  date: string;
  timeAgo: string;
  customerId: string;
  customerName: string;
  customerType: string;
  mobile: string;
  address: string;
  operator: string;
  branch: string;
  items: OrderLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  couponCode?: string;
  deliveryCharge?: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancel';
  paymentMethod: 'Cash' | 'COD' | 'bKash' | 'Nagad' | 'Bank' | 'Refund' | 'Due';
  deliveryType: string;
  note?: string;
}

export interface QuotationItem {
  id: string;
  quotationNo: string;
  date: string;
  expiryDate: string;
  customerName: string;
  items: OrderLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  note: string;
}

export interface CategoryRecord {
  id: string;
  name: string;
  rootCode: string;
  mainCategory: string;
  mainCode: string;
  subCategory: string;
  subCode: string;
  brand: string;
  brandCode: string;
  categoryId: string;
  productsCount: number;
  salesAmount: number;
  lastUpdated: string;
}

export interface CouponRecord {
  id: string;
  code: string;
  discountRate: number;
  minimumAmount: number;
  startDate: string;
  endDate: string;
}

export interface PaymentRequestRecord {
  id: string;
  paymentDetails: string;
  amount: number;
  paymentBy: string;
  mobileOperator: string;
  slipNo: string;
  invoiceNo: string;
  targetAgentNo: string;
  transactionNo: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface WithdrawRecord {
  id: string;
  transId: string;
  amount: number;
  photo: string;
  userName: string;
  userRoleBranch: string;
  paymentType: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Denied';
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  expense: number;
  income: number;
  netBalance: number;
  accountType: 'Cash' | 'Bank' | 'Mobile';
}

export interface WarrantyRecord {
  id: string;
  warrantySerialNo: string;
  customerName: string;
  contractNo: string;
  address: string;
  productName: string;
  productSerialNo: string;
  sellingDate: string;
  warrantyPeriod: string;
  remainingMonth: string;
  reason: string;
  entryDate: string;
  expectedDeliveryDate: string;
  deliveryDate: string;
  status: 'Pending' | 'In Shop' | 'Completed';
  condition: string;
  note: string;
  addedBy: string;
  photo: string;
}

export interface ReturnRecord {
  id: string;
  returnSerialNo: string;
  customerName: string;
  contractNo: string;
  address: string;
  productName: string;
  productSerialNo: string;
  sellingDate: string;
  sellingPrice: number;
  handoverTo: string;
  reason: string;
  entryDate: string;
  isCashBack: boolean;
  isExchange: boolean;
  paymentMethod: string;
  methodDetail: string;
  recentProductSerialNo: string;
  note: string;
  addedBy: string;
  checkedBy: string;
}

export interface RepairRecord {
  id: string;
  repairSerialNo: string;
  customerName: string;
  contractNo: string;
  address: string;
  productName: string;
  productSerialNo: string;
  entryDate: string;
  expectedDeliveryDate: string;
  deliveryDate: string;
  reason: string;
  expectedServiceFees: number;
  advancePaid: number;
  dethPermission: boolean;
  status: 'Pending' | 'Ready' | 'Completed';
  condition: string;
  note: string;
  addedBy: string;
  repairBy: string;
}

export interface BranchItem {
  id: string;
  name: string;
  address: string;
  type: 'Main' | 'Sub';
  email: string;
  mobile: string;
  whatsapp: string;
}

export interface FeaturePermissionItem {
  id: string;
  name: string;
  allowed: boolean;
}

export interface CompanySettingsData {
  storeType: string;
  country: string;
  currencySymbol: string;
  storeName: string;
  slogan: string;
  address: string;
  email: string;
  mobile: string;
  whatsapp: string;
  branches: BranchItem[];
  features: FeaturePermissionItem[];
}

export interface ErpUserItem {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  role: string;
  branch: string;
  password: string;
  mobile: string;
  whatsapp: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  bankName: string;
  accountNo: string;
  photo: string;
  enableSignInReport: boolean;
}

export interface SliderBannerConfig {
  id: string;
  image: string;
  badgeText: string;
  mainAddText: string;
  subAddText: string;
  buttonText: string;
  buttonLink: string;
  photoLink: string;
}

export interface SiteLicenseItem {
  id: string;
  siteName: string;
  licenseKey: string;
  domain: string;
  nodeId: string;
  edition: string;
  status: 'Active' | 'Expiring' | 'Expired' | 'Suspended';
  remainingDays: number;
  expiryDate: string;
  contractName: string;
  phone1: string;
  phone2: string;
  email: string;
}

export interface BackupEntry {
  id: string;
  filename: string;
  timestamp: string;
  size: string;
  status: 'Verified' | 'Restored';
}

export interface ActivityLog {
  id: string;
  timeAgo: string;
  productName: string;
  actionText: string;
  type: 'added' | 'edited' | 'sale';
}
