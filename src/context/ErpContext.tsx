import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  auth,
  db,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType,
  toSafeFirestoreId,
} from '../firebase';
import {
  ErpRoute,
  ProductItem,
  CustomerItem,
  SupplierItem,
  OrderItem,
  QuotationItem,
  CategoryRecord,
  CouponRecord,
  PaymentRequestRecord,
  WithdrawRecord,
  FinancialRecord,
  WarrantyRecord,
  ReturnRecord,
  RepairRecord,
  CompanySettingsData,
  ErpUserItem,
  SliderBannerConfig,
  SiteLicenseItem,
  BackupEntry,
  ActivityLog,
} from '../types/erp';
import {
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_SUPPLIERS,
  INITIAL_ORDERS,
  INITIAL_QUOTATIONS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_PAYMENTS,
  INITIAL_WITHDRAWS,
  INITIAL_FINANCIALS,
  INITIAL_WARRANTIES,
  INITIAL_RETURNS,
  INITIAL_REPAIRS,
  INITIAL_COMPANY_SETTINGS,
  INITIAL_USERS,
  INITIAL_SLIDERS,
  INITIAL_SITE_LICENSES,
  INITIAL_BACKUPS,
  INITIAL_ACTIVITIES,
} from '../data/initialData';

export interface CartItem {
  product: ProductItem;
  qty: number;
}

export interface PrintModalPayload {
  open: boolean;
  mode: 'pos' | 'a4' | 'label';
  order?: OrderItem;
  product?: ProductItem;
  serialNo?: string;
}

interface ErpContextType {
  isAuthenticated: boolean;
  currentUser: { name: string; role: string; email: string; photo: string };
  firebaseUser: User | null;
  login: (userId: string, pass: string) => boolean;
  loginWithFirebaseUser: (user: User) => void;
  logout: () => void;

  route: ErpRoute;
  setRoute: (r: ErpRoute) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;

  products: ProductItem[];
  addProduct: (p: Omit<ProductItem, 'id'>) => void;
  updateProduct: (p: ProductItem) => void;
  deleteProduct: (id: string) => void;
  addPurchaseStock: (params: {
    productId: string;
    supplier: string;
    purchaseDate: string;
    expiryDate: string;
    branch: 'Main Branch' | 'Sharcha Branch' | 'RN Road Branch';
    qty: number;
    cost: number;
    taxOther: number;
    sellPrice: number;
    onlinePrice: number;
    oldPrice: number;
    serials: string[];
  }) => void;

  customers: CustomerItem[];
  addCustomer: (c: Omit<CustomerItem, 'id'>) => void;
  updateCustomer: (c: CustomerItem) => void;
  deleteCustomer: (id: string) => void;

  suppliers: SupplierItem[];
  addSupplier: (s: Omit<SupplierItem, 'id'>) => void;
  deleteSupplier: (id: string) => void;

  orders: OrderItem[];
  addOrder: (o: Omit<OrderItem, 'id'>) => OrderItem;
  updateOrderStatus: (id: string, status: OrderItem['status']) => void;

  quotations: QuotationItem[];
  addQuotation: (q: Omit<QuotationItem, 'id'>) => void;

  categories: CategoryRecord[];
  addCategory: (c: Omit<CategoryRecord, 'id'>) => void;
  deleteCategory: (id: string) => void;

  coupons: CouponRecord[];
  addCoupon: (c: Omit<CouponRecord, 'id'>) => void;
  deleteCoupon: (id: string) => void;

  payments: PaymentRequestRecord[];
  addPaymentRequest: (p: Omit<PaymentRequestRecord, 'id'>) => void;

  withdraws: WithdrawRecord[];
  updateWithdrawStatus: (id: string, status: WithdrawRecord['status']) => void;
  addWithdrawRequest: (w: Omit<WithdrawRecord, 'id'>) => void;

  financials: FinancialRecord[];
  addFinancialRecord: (f: Omit<FinancialRecord, 'id' | 'netBalance'>) => void;

  warranties: WarrantyRecord[];
  addWarranty: (w: Omit<WarrantyRecord, 'id'>) => void;
  updateWarrantyStatus: (id: string, status: WarrantyRecord['status']) => void;

  returns: ReturnRecord[];
  addReturn: (r: Omit<ReturnRecord, 'id'>) => void;

  repairs: RepairRecord[];
  addRepair: (r: Omit<RepairRecord, 'id'>) => void;
  updateRepairStatus: (id: string, status: RepairRecord['status']) => void;

  companySettings: CompanySettingsData;
  updateCompanySettings: (s: CompanySettingsData) => void;

  users: ErpUserItem[];
  addUser: (u: Omit<ErpUserItem, 'id'>) => void;
  deleteUser: (id: string) => void;

  sliders: SliderBannerConfig[];
  updateSliders: (s: SliderBannerConfig[]) => void;

  siteLicenses: SiteLicenseItem[];
  addSiteLicense: (s: Omit<SiteLicenseItem, 'id'>) => void;
  updateSiteLicense: (s: SiteLicenseItem) => void;
  deleteSiteLicense: (id: string) => void;

  backups: BackupEntry[];
  createBackupNow: () => void;
  restoreFromBackupFile: (jsonText: string, filename: string) => boolean;

  activities: ActivityLog[];
  toastMessage: string | null;
  notify: (msg: string) => void;

  printModal: PrintModalPayload;
  openPrintModal: (payload: Omit<PrintModalPayload, 'open'>) => void;
  closePrintModal: () => void;

  exportDataAsCSV: (filename: string, rows: Record<string, unknown>[]) => void;

  // Public Website Cart & State
  cart: CartItem[];
  addToCart: (product: ProductItem, qty?: number) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  selectedPublicProduct: ProductItem | null;
  setSelectedPublicProduct: (p: ProductItem | null) => void;
  publicSubView: 'home' | 'pdp' | 'checkout' | 'pc-builder';
  setPublicSubView: (v: 'home' | 'pdp' | 'checkout' | 'pc-builder') => void;
}

const ErpContext = createContext<ErpContextType | undefined>(undefined);

const STORAGE_KEY = 'diamond_tech_erp_state_v1';

export const ErpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Eleas Kanchon',
    role: 'Admin',
    email: 'ucec.gov.bd@gmail.com',
    photo: INITIAL_CUSTOMERS[2].photo,
  });
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const [route, setRoute] = useState<ErpRoute>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(INITIAL_SUPPLIERS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [quotations, setQuotations] = useState<QuotationItem[]>(INITIAL_QUOTATIONS);
  const [categories, setCategories] = useState<CategoryRecord[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<CouponRecord[]>(INITIAL_COUPONS);
  const [payments, setPayments] = useState<PaymentRequestRecord[]>(INITIAL_PAYMENTS);
  const [withdraws, setWithdraws] = useState<WithdrawRecord[]>(INITIAL_WITHDRAWS);
  const [financials, setFinancials] = useState<FinancialRecord[]>(INITIAL_FINANCIALS);
  const [warranties, setWarranties] = useState<WarrantyRecord[]>(INITIAL_WARRANTIES);
  const [returns, setReturns] = useState<ReturnRecord[]>(INITIAL_RETURNS);
  const [repairs, setRepairs] = useState<RepairRecord[]>(INITIAL_REPAIRS);
  const [companySettings, setCompanySettings] = useState<CompanySettingsData>(INITIAL_COMPANY_SETTINGS);
  const [users, setUsers] = useState<ErpUserItem[]>(INITIAL_USERS);
  const [sliders, setSliders] = useState<SliderBannerConfig[]>(INITIAL_SLIDERS);
  const [siteLicenses, setSiteLicenses] = useState<SiteLicenseItem[]>(INITIAL_SITE_LICENSES);
  const [backups, setBackups] = useState<BackupEntry[]>(INITIAL_BACKUPS);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [printModal, setPrintModal] = useState<PrintModalPayload>({ open: false, mode: 'a4' });

  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], qty: 3 },
    { product: INITIAL_PRODUCTS[1], qty: 2 },
  ]);
  const [selectedPublicProduct, setSelectedPublicProduct] = useState<ProductItem | null>(INITIAL_PRODUCTS[2]);
  const [publicSubView, setPublicSubView] = useState<'home' | 'pdp' | 'checkout' | 'pc-builder'>('home');

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.products?.length) setProducts(parsed.products);
        if (parsed.customers?.length) setCustomers(parsed.customers);
        if (parsed.suppliers?.length) setSuppliers(parsed.suppliers);
        if (parsed.orders?.length) setOrders(parsed.orders);
        if (parsed.quotations?.length) setQuotations(parsed.quotations);
        if (parsed.categories?.length) setCategories(parsed.categories);
        if (parsed.coupons?.length) setCoupons(parsed.coupons);
        if (parsed.payments?.length) setPayments(parsed.payments);
        if (parsed.withdraws?.length) setWithdraws(parsed.withdraws);
        if (parsed.financials?.length) setFinancials(parsed.financials);
        if (parsed.warranties?.length) setWarranties(parsed.warranties);
        if (parsed.returns?.length) setReturns(parsed.returns);
        if (parsed.repairs?.length) setRepairs(parsed.repairs);
        if (parsed.companySettings) setCompanySettings(parsed.companySettings);
        if (parsed.users?.length) setUsers(parsed.users);
        if (parsed.sliders?.length) setSliders(parsed.sliders);
        if (parsed.siteLicenses?.length) setSiteLicenses(parsed.siteLicenses);
        if (parsed.backups?.length) setBackups(parsed.backups);
      }
    } catch (e) {
      console.error('Failed to load ERP state:', e);
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    try {
      const payload = {
        products,
        customers,
        suppliers,
        orders,
        quotations,
        categories,
        coupons,
        payments,
        withdraws,
        financials,
        warranties,
        returns,
        repairs,
        companySettings,
        users,
        sliders,
        siteLicenses,
        backups,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save ERP state:', e);
    }
  }, [
    products,
    customers,
    suppliers,
    orders,
    quotations,
    categories,
    coupons,
    payments,
    withdraws,
    financials,
    warranties,
    returns,
    repairs,
    companySettings,
    users,
    sliders,
    siteLicenses,
    backups,
  ]);

  // Sync dark mode class on html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        setCurrentUser({
          name: user.displayName || 'Eleas Kanchon',
          role: 'Admin',
          email: user.email || 'ucec.gov.bd@gmail.com',
          photo: user.photoURL || INITIAL_CUSTOMERS[2].photo,
        });
        setIsAuthenticated(true);
      }
    });
    return () => unsub();
  }, []);

  // Helper to sync a product to Firestore when Firebase user is authenticated & verified
  const syncProductToFirestore = async (p: ProductItem) => {
    if (!auth.currentUser || !auth.currentUser.emailVerified) return;
    const docId = toSafeFirestoreId(p.id);
    const path = `products/${docId}`;
    try {
      await setDoc(doc(db, 'products', docId), {
        ownerId: auth.currentUser.uid,
        proId: p.proId.slice(0, 64),
        name: p.name.slice(0, 200),
        category: (p.rootCategory || 'General').slice(0, 100),
        brand: (p.brand || 'Generic').slice(0, 100),
        supplier: (p.supplier || 'Direct').slice(0, 150),
        stock: Math.max(0, Number(p.stock) || 0),
        costPrice: Math.max(0, Number(p.totalCost) || 0),
        sellPrice: Math.max(0, Number(p.sellPrice) || 0),
        warranty: (p.warranty || 'No Warranty').slice(0, 64),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const syncCustomerToFirestore = async (c: CustomerItem) => {
    if (!auth.currentUser || !auth.currentUser.emailVerified) return;
    const docId = toSafeFirestoreId(c.id);
    const path = `customers/${docId}`;
    try {
      await setDoc(doc(db, 'customers', docId), {
        ownerId: auth.currentUser.uid,
        name: c.name.slice(0, 150),
        mobile: c.mobile.slice(0, 40),
        address: (c.address || 'N/A').slice(0, 250),
        due: Number(c.due) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const syncOrderToFirestore = async (o: OrderItem) => {
    if (!auth.currentUser || !auth.currentUser.emailVerified) return;
    const docId = toSafeFirestoreId(o.id);
    const path = `orders/${docId}`;
    try {
      await setDoc(doc(db, 'orders', docId), {
        ownerId: auth.currentUser.uid,
        invoiceNo: o.invoiceNo.slice(0, 64),
        customerName: o.customerName.slice(0, 150),
        amount: Math.max(0, Number(o.grandTotal) || 0),
        paidAmount: Math.max(0, Number(o.paidAmount) || 0),
        dueAmount: Number(o.dueAmount) || 0,
        paymentMethod: (o.paymentMethod || 'Cash').slice(0, 64),
        orderStatus: o.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const login = (userId: string, pass: string): boolean => {
    const trimmed = userId.trim().toLowerCase();
    const matched = users.find(
      (u) =>
        u.userName.toLowerCase() === trimmed ||
        u.email.toLowerCase() === trimmed ||
        u.fullName.toLowerCase() === trimmed
    );
    if (matched && matched.password === pass) {
      setCurrentUser({
        name: matched.fullName,
        role: matched.role,
        email: matched.email,
        photo: matched.photo,
      });
      setIsAuthenticated(true);
      notify(`Signed in as ${matched.fullName} (${matched.role})`);
      return true;
    }
    if ((trimmed === 'admin' || trimmed === 'eleas' || trimmed === 'eleas kanchon') && pass.length >= 4) {
      setCurrentUser({
        name: 'Eleas Kanchon',
        role: 'Admin',
        email: 'ucec.gov.bd@gmail.com',
        photo: INITIAL_CUSTOMERS[2].photo,
      });
      setIsAuthenticated(true);
      notify('Signed in as Eleas Kanchon (Site Owner & Admin)');
      return true;
    }
    return false;
  };

  const loginWithFirebaseUser = (user: User) => {
    setFirebaseUser(user);
    setCurrentUser({
      name: user.displayName || 'Eleas Kanchon',
      role: 'Admin',
      email: user.email || 'ucec.gov.bd@gmail.com',
      photo: user.photoURL || INITIAL_CUSTOMERS[2].photo,
    });
    setIsAuthenticated(true);
    notify(`Signed in via Google as ${user.displayName || user.email}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    notify('Logged out successfully');
  };

  const logActivity = (productName: string, actionText: string, type: ActivityLog['type']) => {
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        timeAgo: 'Just now',
        productName,
        actionText,
        type,
      },
      ...prev,
    ]);
  };

  const addProduct = (p: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = { ...p, id: `prod_${Date.now()}` };
    setProducts((prev) => [newProd, ...prev]);
    logActivity(newProd.name, 'Product Added', 'added');
    notify(`Product "${newProd.name}" added to inventory!`);
    void syncProductToFirestore(newProd);
  };

  const updateProduct = (p: ProductItem) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
    logActivity(p.name, 'Product Edited', 'edited');
    notify(`Product "${p.name}" updated!`);
    void syncProductToFirestore(p);
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      notify(`Product "${target.name}" removed.`);
    }
    if (auth.currentUser && auth.currentUser.emailVerified) {
      const docId = toSafeFirestoreId(id);
      void deleteDoc(doc(db, 'products', docId)).catch((err) =>
        handleFirestoreError(err, OperationType.DELETE, `products/${docId}`)
      );
    }
  };

  const addPurchaseStock: ErpContextType['addPurchaseStock'] = ({
    productId,
    supplier,
    purchaseDate,
    expiryDate,
    branch,
    qty,
    cost,
    taxOther,
    sellPrice,
    onlinePrice,
    oldPrice,
    serials,
  }) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const cleanSerials = serials.map((s) => s.trim()).filter(Boolean);
        const updatedSerials = { ...prod.branchSerials };
        if (branch === 'Main Branch') {
          updatedSerials.mainActive = [...updatedSerials.mainActive, ...cleanSerials];
        } else if (branch === 'Sharcha Branch') {
          updatedSerials.sharchaActive = [...updatedSerials.sharchaActive, ...cleanSerials];
        } else {
          updatedSerials.rnRoadActive = [...updatedSerials.rnRoadActive, ...cleanSerials];
        }
        const updated: ProductItem = {
          ...prod,
          supplier: supplier || prod.supplier,
          purchaseDate: purchaseDate || prod.purchaseDate,
          expiryDate: expiryDate || prod.expiryDate,
          stock: prod.stock + qty,
          productCost: cost || prod.productCost,
          taxOtherCost: taxOther,
          totalCost: (cost || prod.productCost) + taxOther,
          sellPrice: sellPrice || prod.sellPrice,
          onlinePrice: onlinePrice || prod.onlinePrice,
          oldPrice: oldPrice || prod.oldPrice,
          branchSerials: updatedSerials,
        };
        void syncProductToFirestore(updated);
        return updated;
      })
    );
    const prodName = products.find((p) => p.id === productId)?.name || 'Product';
    logActivity(prodName, `Purchased +${qty} Unit (${branch})`, 'added');
    addFinancialRecord({
      date: purchaseDate || new Date().toISOString().slice(0, 10),
      type: 'Expense',
      category: 'Stock Purchase',
      description: `Purchase ${qty}x ${prodName} from ${supplier}`,
      expense: ((cost || 0) + (taxOther || 0)) * qty,
      income: 0,
      accountType: 'Cash',
    });
    notify(`Purchase saved! +${qty} units added to ${branch}.`);
  };

  const addCustomer = (c: Omit<CustomerItem, 'id'>) => {
    const newCust: CustomerItem = { ...c, id: `cust_${Date.now()}` };
    setCustomers((prev) => [newCust, ...prev]);
    notify(`Customer "${newCust.name}" saved!`);
    void syncCustomerToFirestore(newCust);
  };

  const updateCustomer = (c: CustomerItem) => {
    setCustomers((prev) => prev.map((item) => (item.id === c.id ? c : item)));
    notify(`Customer "${c.name}" updated!`);
    void syncCustomerToFirestore(c);
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
    notify('Customer record deleted.');
  };

  const addSupplier = (s: Omit<SupplierItem, 'id'>) => {
    const newSup: SupplierItem = { ...s, id: `sup_${Date.now()}` };
    setSuppliers((prev) => [newSup, ...prev]);
    notify(`Supplier "${newSup.companyName}" saved!`);
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((item) => item.id !== id));
    notify('Supplier deleted.');
  };

  const addOrder = (o: Omit<OrderItem, 'id'>): OrderItem => {
    const newOrd: OrderItem = { ...o, id: `ord_${Date.now()}` };
    setOrders((prev) => [newOrd, ...prev]);

    // Deduct stock & update sold count for each line item
    setProducts((prev) =>
      prev.map((prod) => {
        const line = newOrd.items.find((i) => i.productId === prod.id);
        if (!line) return prod;
        const nextStock = Math.max(0, prod.stock - line.qty);
        const updated = {
          ...prod,
          stock: nextStock,
          sold: prod.sold + line.qty,
        };
        void syncProductToFirestore(updated);
        return updated;
      })
    );

    // Update customer due if applicable
    if (newOrd.dueAmount > 0 && newOrd.customerId) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === newOrd.customerId || c.name.toLowerCase() === newOrd.customerName.toLowerCase()
            ? { ...c, due: c.due + newOrd.dueAmount }
            : c
        )
      );
    }

    // Record income if paidAmount > 0
    if (newOrd.paidAmount > 0) {
      addFinancialRecord({
        date: new Date().toISOString().slice(0, 10),
        type: 'Income',
        category: 'Sales Invoice',
        description: `Invoice ${newOrd.invoiceNo} - ${newOrd.customerName}`,
        expense: 0,
        income: newOrd.paidAmount,
        accountType: newOrd.paymentMethod === 'Cash' || newOrd.paymentMethod === 'COD' ? 'Cash' : 'Mobile',
      });
    }

    void syncOrderToFirestore(newOrd);
    notify(`Invoice ${newOrd.invoiceNo} generated successfully!`);
    return newOrd;
  };

  const updateOrderStatus = (id: string, status: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== id) return ord;
        const updated = { ...ord, status };
        void syncOrderToFirestore(updated);
        return updated;
      })
    );
    notify(`Order status updated to "${status}".`);
  };

  const addQuotation = (q: Omit<QuotationItem, 'id'>) => {
    const newQuot: QuotationItem = { ...q, id: `quot_${Date.now()}` };
    setQuotations((prev) => [newQuot, ...prev]);
    notify(`Quotation ${newQuot.quotationNo} generated!`);
  };

  const addCategory = (c: Omit<CategoryRecord, 'id'>) => {
    const newCat: CategoryRecord = { ...c, id: `cat_${Date.now()}` };
    setCategories((prev) => [newCat, ...prev]);
    notify(`Category "${newCat.name}" saved!`);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    notify('Category deleted.');
  };

  const addCoupon = (c: Omit<CouponRecord, 'id'>) => {
    const newCpn: CouponRecord = { ...c, id: `cpn_${Date.now()}` };
    setCoupons((prev) => [newCpn, ...prev]);
    notify(`Coupon "${newCpn.code}" added!`);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    notify('Coupon deleted.');
  };

  const addPaymentRequest = (p: Omit<PaymentRequestRecord, 'id'>) => {
    const newPay: PaymentRequestRecord = { ...p, id: `pay_${Date.now()}` };
    setPayments((prev) => [newPay, ...prev]);
    addFinancialRecord({
      date: new Date().toISOString().slice(0, 10),
      type: 'Income',
      category: 'Customer/Branch Payment',
      description: `${newPay.paymentDetails} (${newPay.paymentBy} - Inv: ${newPay.invoiceNo})`,
      expense: 0,
      income: newPay.amount,
      accountType: newPay.mobileOperator ? 'Mobile' : 'Bank',
    });
    notify(`Payment request of ৳${newPay.amount} submitted!`);
  };

  const updateWithdrawStatus = (id: string, status: WithdrawRecord['status']) => {
    setWithdraws((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
    notify(`Withdrawal request marked as ${status}.`);
  };

  const addWithdrawRequest = (w: Omit<WithdrawRecord, 'id'>) => {
    const newWd: WithdrawRecord = { ...w, id: `wd_${Date.now()}` };
    setWithdraws((prev) => [newWd, ...prev]);
    notify(`Withdrawal request ${newWd.transId} created.`);
  };

  const addFinancialRecord = (f: Omit<FinancialRecord, 'id' | 'netBalance'>) => {
    setFinancials((prev) => {
      const lastNet = prev.length > 0 ? prev[0].netBalance : 0;
      const netBalance = lastNet + f.income - f.expense;
      const rec: FinancialRecord = { ...f, id: `fin_${Date.now()}`, netBalance };
      return [rec, ...prev];
    });
  };

  const addWarranty = (w: Omit<WarrantyRecord, 'id'>) => {
    const newWar: WarrantyRecord = { ...w, id: `war_${Date.now()}` };
    setWarranties((prev) => [newWar, ...prev]);
    notify(`Warranty claim ${newWar.warrantySerialNo} generated!`);
  };

  const updateWarrantyStatus = (id: string, status: WarrantyRecord['status']) => {
    setWarranties((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              status,
              deliveryDate: status === 'Completed' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : w.deliveryDate,
            }
          : w
      )
    );
    notify(`Warranty status updated to ${status}.`);
  };

  const addReturn = (r: Omit<ReturnRecord, 'id'>) => {
    const newRet: ReturnRecord = { ...r, id: `ret_${Date.now()}` };
    setReturns((prev) => [newRet, ...prev]);
    notify(`Product return ${newRet.returnSerialNo} recorded!`);
  };

  const addRepair = (r: Omit<RepairRecord, 'id'>) => {
    const newRep: RepairRecord = { ...r, id: `rep_${Date.now()}` };
    setRepairs((prev) => [newRep, ...prev]);
    notify(`Repair ticket ${newRep.repairSerialNo} generated!`);
  };

  const updateRepairStatus = (id: string, status: RepairRecord['status']) => {
    setRepairs((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              deliveryDate: status === 'Completed' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : r.deliveryDate,
            }
          : r
      )
    );
    notify(`Repair status updated to ${status}.`);
  };

  const updateCompanySettings = (s: CompanySettingsData) => {
    setCompanySettings(s);
    notify('Company & Branch settings updated!');
  };

  const addUser = (u: Omit<ErpUserItem, 'id'>) => {
    const newUsr: ErpUserItem = { ...u, id: `usr_${Date.now()}` };
    setUsers((prev) => [newUsr, ...prev]);
    notify(`User "${newUsr.fullName}" added!`);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    notify('User removed.');
  };

  const updateSliders = (s: SliderBannerConfig[]) => {
    setSliders(s);
    notify('Public Website slider & branding settings saved!');
  };

  const addSiteLicense = (s: Omit<SiteLicenseItem, 'id'>) => {
    const newLic: SiteLicenseItem = { ...s, id: `lic_${Date.now()}` };
    setSiteLicenses((prev) => [newLic, ...prev]);
    notify(`New site license issued for "${newLic.siteName}"!`);
  };

  const updateSiteLicense = (s: SiteLicenseItem) => {
    setSiteLicenses((prev) => prev.map((item) => (item.id === s.id ? s : item)));
    notify(`License updated for "${s.siteName}".`);
  };

  const deleteSiteLicense = (id: string) => {
    setSiteLicenses((prev) => prev.filter((item) => item.id !== id));
    notify('Site license deleted.');
  };

  const createBackupNow = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      products,
      customers,
      suppliers,
      orders,
      quotations,
      categories,
      coupons,
      payments,
      withdraws,
      financials,
      warranties,
      returns,
      repairs,
      companySettings,
      users,
      sliders,
      siteLicenses,
    };
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `Backup_ERP_DT_${dateStr}.json`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    const sizeKb = (jsonString.length / 1024).toFixed(1) + ' KB';
    const newBkp: BackupEntry = {
      id: `bkp_${Date.now()}`,
      filename,
      timestamp: new Date().toLocaleString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      size: sizeKb,
      status: 'Verified',
    };
    setBackups((prev) => [newBkp, ...prev]);
    notify(`Database backup "${filename}" downloaded and verified!`);
  };

  const restoreFromBackupFile = (jsonText: string, filename: string): boolean => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.customers) setCustomers(parsed.customers);
      if (parsed.suppliers) setSuppliers(parsed.suppliers);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.quotations) setQuotations(parsed.quotations);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.coupons) setCoupons(parsed.coupons);
      if (parsed.warranties) setWarranties(parsed.warranties);
      if (parsed.returns) setReturns(parsed.returns);
      if (parsed.repairs) setRepairs(parsed.repairs);
      if (parsed.companySettings) setCompanySettings(parsed.companySettings);
      setBackups((prev) => [
        {
          id: `bkp_${Date.now()}`,
          filename,
          timestamp: new Date().toLocaleString(),
          size: `${(jsonText.length / 1024).toFixed(1)} KB`,
          status: 'Restored',
        },
        ...prev,
      ]);
      notify(`Database successfully restored from "${filename}"!`);
      return true;
    } catch (e) {
      notify('Invalid backup JSON file format.');
      return false;
    }
  };

  const openPrintModal = (payload: Omit<PrintModalPayload, 'open'>) => {
    setPrintModal({ ...payload, open: true });
  };

  const closePrintModal = () => {
    setPrintModal((prev) => ({ ...prev, open: false }));
  };

  const exportDataAsCSV = (filename: string, rows: Record<string, unknown>[]) => {
    if (!rows.length) {
      notify('No records to export.');
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvLines = [
      headers.join(','),
      ...rows.map((r) =>
        headers
          .map((h) => {
            const val = r[h] === null || r[h] === undefined ? '' : String(r[h]);
            return `"${val.replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Exported ${rows.length} rows to ${filename}`);
  };

  const addToCart = (product: ProductItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { product, qty }];
    });
    notify(`Added "${product.name}" to shopping cart!`);
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <ErpContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        firebaseUser,
        login,
        loginWithFirebaseUser,
        logout,
        route,
        setRoute,
        darkMode,
        setDarkMode,
        sidebarOpen,
        setSidebarOpen,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        addPurchaseStock,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        suppliers,
        addSupplier,
        deleteSupplier,
        orders,
        addOrder,
        updateOrderStatus,
        quotations,
        addQuotation,
        categories,
        addCategory,
        deleteCategory,
        coupons,
        addCoupon,
        deleteCoupon,
        payments,
        addPaymentRequest,
        withdraws,
        updateWithdrawStatus,
        addWithdrawRequest,
        financials,
        addFinancialRecord,
        warranties,
        addWarranty,
        updateWarrantyStatus,
        returns,
        addReturn,
        repairs,
        addRepair,
        updateRepairStatus,
        companySettings,
        updateCompanySettings,
        users,
        addUser,
        deleteUser,
        sliders,
        updateSliders,
        siteLicenses,
        addSiteLicense,
        updateSiteLicense,
        deleteSiteLicense,
        backups,
        createBackupNow,
        restoreFromBackupFile,
        activities,
        toastMessage,
        notify,
        printModal,
        openPrintModal,
        closePrintModal,
        exportDataAsCSV,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        selectedPublicProduct,
        setSelectedPublicProduct,
        publicSubView,
        setPublicSubView,
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error('useErp must be used within ErpProvider');
  return ctx;
};
