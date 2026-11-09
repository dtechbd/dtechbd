import React, { useState, useMemo } from 'react';
import {
  Phone,
  Globe,
  Gift,
  Search,
  ShoppingCart,
  User,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Cpu,
  HardDrive,
  Printer,
  Wifi,
  Shield,
  Headphones,
  Disc,
  Briefcase,
  Keyboard,
  Trash2,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { ProductItem, OrderLineItem } from '../types/erp';

const STORE_CATEGORIES = [
  { name: 'Accessories', icon: Keyboard },
  { name: 'Component', icon: Cpu },
  { name: 'Monitor', icon: Monitor },
  { name: 'Networking', icon: Wifi },
  { name: 'Printing', icon: Printer },
  { name: 'Security', icon: Shield },
  { name: 'Sounds', icon: Headphones },
  { name: 'Software', icon: Disc },
  { name: 'Office Item', icon: Briefcase },
  { name: 'Storage', icon: HardDrive },
];

export const PublicWebsiteView: React.FC = () => {
  const {
    products,
    sliders,
    coupons,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    selectedPublicProduct,
    setSelectedPublicProduct,
    publicSubView,
    setPublicSubView,
    setRoute,
    addOrder,
    addCustomer,
    notify,
  } = useErp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // PDP State (Page 29)
  const [pdpQty, setPdpQty] = useState(1);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState<'Specifications' | 'Details' | 'Q&A' | 'Review'>('Specifications');

  // Checkout State (Page 30)
  const [custFirstName, setCustFirstName] = useState('Eleas');
  const [custLastName, setCustLastName] = useState('Kanchon');
  const [custAddress, setCustAddress] = useState('Nazirshankarpur, Jashore.');
  const [custMobile, setCustMobile] = useState('01723699603');
  const [custEmail, setCustEmail] = useState('ucec.gov.bd@gmail.com');
  const [shippingConfirmed, setShippingConfirmed] = useState(true);

  const [loginUserOrPhone, setLoginUserOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [couponInput, setCouponInput] = useState('BIJOY26');
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online Payment' | 'POS on Delivery'>('Cash on Delivery');
  const [deliveryMethod, setDeliveryMethod] = useState<'Home Delivery' | 'Store Pickup' | 'Request Express'>('Home Delivery');

  // PC Builder State
  const [pcBuild, setPcBuild] = useState<Record<string, ProductItem | null>>({
    Processor: null,
    Motherboard: null,
    RAM: null,
    Storage: null,
    Monitor: products[0] || null,
    Accessories: products[1] || null,
  });

  const currentMainSlide = sliders[activeSlideIdx % Math.max(1, sliders.length)] || sliders[0];

  const activeProduct: ProductItem = selectedPublicProduct || products[0];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.rootCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mainCategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategoryFilter === 'All' ||
        p.rootCategory.toLowerCase().includes(selectedCategoryFilter.toLowerCase()) ||
        p.mainCategory.toLowerCase().includes(selectedCategoryFilter.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
      return matchesQuery && matchesCat;
    });
  }, [products, searchQuery, selectedCategoryFilter]);

  const handleOpenProduct = (product: ProductItem) => {
    setSelectedPublicProduct(product);
    setPdpQty(1);
    setActiveThumbIdx(0);
    setPublicSubView('pdp');
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubTotal = cart.reduce((acc, item) => acc + item.product.onlinePrice * item.qty, 0);
  const deliveryFee = deliveryMethod === 'Store Pickup' ? 0 : deliveryMethod === 'Request Express' ? 120 : 60;
  const finalPayable = Math.max(0, cartSubTotal + deliveryFee - appliedCouponDiscount);

  const handleApplyCoupon = () => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );
    if (found) {
      const calcDisc =
        found.discountRate <= 100
          ? Math.round((cartSubTotal * found.discountRate) / 100)
          : found.discountRate;
      const finalDisc = Math.max(200, calcDisc);
      setAppliedCouponDiscount(finalDisc);
      notify(`Coupon ${found.code} applied! Saved ৳ ${finalDisc}`);
    } else if (couponInput.trim().toUpperCase() === 'BIJOY26') {
      setAppliedCouponDiscount(200);
      notify('Coupon BIJOY26 applied! Saved ৳ 200');
    } else {
      notify('Invalid or expired coupon code.');
    }
  };

  const handleConfirmOnlineOrder = () => {
    if (cart.length === 0) {
      notify('Your cart is empty! Please add products first.');
      return;
    }
    const fullName = `${custFirstName.trim()} ${custLastName.trim()}`.trim() || 'Online Customer';
    const invoiceNo = String(Math.floor(100000 + Math.random() * 900000));
    const itemsList: OrderLineItem[] = cart.map((c) => ({
      productId: c.product.id,
      proId: c.product.proId,
      name: c.product.name,
      photo: c.product.photo,
      serials: c.product.branchSerials?.mainActive?.slice(0, c.qty) || [`SN-${Date.now().toString().slice(-5)}`],
      warranty: c.product.warranty || '1 Year',
      qty: c.qty,
      price: c.product.onlinePrice,
      regularPrice: c.product.oldPrice || c.product.sellPrice,
      total: c.product.onlinePrice * c.qty,
    }));

    const mappedPaymentMethod =
      paymentMethod === 'Online Payment'
        ? 'bKash'
        : paymentMethod === 'POS on Delivery'
        ? 'Bank'
        : 'COD';

    addOrder({
      invoiceNo,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      timeAgo: 'Just now',
      customerId: 'CUST-ONLINE',
      customerName: fullName,
      customerType: 'Online',
      mobile: custMobile || '01723699603',
      address: custAddress || 'Nazirshankarpur, Jashore.',
      operator: 'Online Storefront',
      branch: 'Main Branch',
      items: itemsList,
      subtotal: cartSubTotal,
      discount: appliedCouponDiscount,
      tax: 0,
      couponCode: couponInput,
      deliveryCharge: deliveryFee,
      grandTotal: finalPayable,
      paidAmount: paymentMethod === 'Online Payment' ? finalPayable : 0,
      dueAmount: paymentMethod === 'Online Payment' ? 0 : finalPayable,
      status: 'Pending',
      paymentMethod: mappedPaymentMethod,
      deliveryType: deliveryMethod,
      note: 'Order placed via Public E-Commerce Website',
    });

    clearCart();
    notify(`Order #${invoiceNo} Confirmed! Sent to ERP All Orders for approval.`);
    setPublicSubView('home');
  };

  const handleCustomerAccountCreate = () => {
    if (!custFirstName.trim() || !custMobile.trim()) {
      notify('Please fill in First Name and Mobile Number first.');
      return;
    }
    addCustomer({
      name: `${custFirstName} ${custLastName}`.trim(),
      mobile: custMobile,
      whatsapp: custMobile,
      email: custEmail,
      address: custAddress,
      shippingBilling: custAddress,
      photo: products[0]?.photo || '',
      due: 0,
      advancePaid: 0,
      customerType: 'Online',
      addedBy: 'Public Website',
    });
    notify('Customer Account created & synced with ERP Customers!');
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-slate-900 flex flex-col font-sans">
      {/* Top Dark Header Bar matching Page 28, 29, 30 */}
      <header className="bg-[#111315] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo + Back to ERP button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRoute('dashboard')}
              title="Return to ERP Admin Panel"
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded border border-slate-700 text-amber-400 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              ERP Panel
            </button>

            <div
              onClick={() => {
                setSelectedCategoryFilter('All');
                setPublicSubView('home');
              }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-lg shadow-inner">
                D
              </div>
              <div>
                <div className="text-xl font-black tracking-tight leading-none text-white">
                  Diamond <span className="text-cyan-400">Tech</span>
                </div>
                <div className="text-[10px] text-amber-400 tracking-widest uppercase">
                  Your Trusted IT Partner
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Pills */}
          <div className="hidden lg:flex items-center gap-5 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>01517850737</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>diamondtech.com</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                setPublicSubView('home');
                notify('Showing Special 10.10 & Cashback Offers!');
              }}
              className="flex items-center gap-1.5 hover:text-amber-400 transition cursor-pointer"
            >
              <Gift className="w-4 h-4 text-rose-500" />
              <span className="font-semibold">Offers</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md min-w-[200px] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (publicSubView !== 'home') setPublicSubView('home');
              }}
              placeholder="Search products, monitors, accessories..."
              className="w-full bg-white text-slate-900 rounded-full pl-4 pr-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Right Action Buttons: PC BUILDER, Cart, Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPublicSubView('pc-builder')}
              className="bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-xs px-4 py-2 rounded shadow transition cursor-pointer tracking-wide uppercase"
            >
              PC BUILDER
            </button>

            <button
              onClick={() => setPublicSubView('checkout')}
              className="relative w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow transition cursor-pointer"
              title="Shopping Cart & Checkout"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setPublicSubView('checkout')}
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition cursor-pointer"
              title="Customer Account"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Purple Category Bar matching Pages 28, 29, 30 */}
        <nav className="bg-gradient-to-r from-[#5b247a] via-[#4b388c] to-[#2b5876] text-white border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
            {STORE_CATEGORIES.map((cat, index) => {
              const isSelected = selectedCategoryFilter === cat.name && publicSubView === 'home';
              return (
                <React.Fragment key={cat.name}>
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter(cat.name === selectedCategoryFilter ? 'All' : cat.name);
                      setPublicSubView('home');
                    }}
                    className={`py-2 px-3 text-xs md:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                      isSelected ? 'bg-white/20 text-amber-300 font-bold' : 'hover:bg-white/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                  {index < STORE_CATEGORIES.length - 1 && (
                    <span className="text-white/30 text-xs select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-4">
        {/* ==============================================================
            SUB-VIEW 1: HOME PAGE (Page 28 of Prototype.pdf)
           ============================================================== */}
        {publicSubView === 'home' && (
          <div className="space-y-6">
            {/* Hero Slider + 2 Right Side Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Main Hero Slider (8 cols) */}
              <div className="lg:col-span-8 relative rounded-lg overflow-hidden shadow bg-gradient-to-r from-[#2b1055] via-[#4f1d75] to-[#752768] min-h-[280px] md:min-h-[340px] flex items-center justify-between p-6 md:p-10 text-white">
                <div className="z-10 max-w-md space-y-3">
                  <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded uppercase tracking-wider">
                    {currentMainSlide?.badgeText || 'Cashback Offer'}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black leading-tight text-amber-300 drop-shadow">
                    {currentMainSlide?.mainAddText || '৫০০ টাকা পর্যন্ত নিশ্চিত ক্যাশব্যাক!'}
                  </h2>
                  <p className="text-xs md:text-sm text-purple-100">
                    {currentMainSlide?.subAddText || 'নির্দিষ্ট ব্র্যান্ডের রাউটার, মনিটর ও এক্সেসরিজ অর্ডারে বিশেষ ছাড়।'}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleOpenProduct(products[0])}
                      className="bg-[#ff2200] hover:bg-red-700 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded shadow-lg transition cursor-pointer"
                    >
                      {currentMainSlide?.buttonText || 'Shop Now'}
                    </button>
                    <span className="text-xs text-amber-200 font-mono">
                      Promo Code: <strong>BIJOY26</strong>
                    </span>
                  </div>
                </div>

                {/* Product Showcase Graphics on Right of Hero */}
                <div className="hidden sm:flex items-center gap-3 z-10">
                  {products.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleOpenProduct(prod)}
                      className="bg-white/95 p-2.5 rounded-lg shadow-xl w-36 text-slate-900 cursor-pointer hover:scale-105 transition"
                    >
                      <img
                        src={prod.photo}
                        alt={prod.name}
                        className="w-full h-24 object-contain mb-1.5"
                      />
                      <div className="text-[11px] font-bold line-clamp-1">{prod.name}</div>
                      <div className="text-xs font-black text-rose-600">৳ {prod.onlinePrice.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                {/* Slider Prev/Next Controls */}
                <button
                  onClick={() =>
                    setActiveSlideIdx((prev) => (prev - 1 + Math.max(1, sliders.length)) % Math.max(1, sliders.length))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveSlideIdx((prev) => (prev + 1) % Math.max(1, sliders.length))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((dot) => (
                    <button
                      key={dot}
                      onClick={() => setActiveSlideIdx(dot)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlideIdx % 3 === dot ? 'w-6 bg-amber-400' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Two Stacked Promo Banners (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Top Right Card: Book a Service */}
                <div
                  onClick={() => {
                    notify('Opening Repair & Service Center...');
                    setRoute('repair-service');
                  }}
                  className="flex-1 rounded-lg bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-5 flex items-center justify-between shadow cursor-pointer hover:opacity-95 transition relative overflow-hidden"
                >
                  <div className="space-y-1.5 z-10">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      Expert Support
                    </span>
                    <h3 className="text-xl font-black text-amber-300">Book a Service</h3>
                    <p className="text-xs text-slate-200 max-w-[200px]">
                      Desktop, Laptop, Monitor & Printer Hardware Repair
                    </p>
                    <span className="inline-block text-xs font-bold text-cyan-300 underline pt-1">
                      Schedule Repair →
                    </span>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Monitor className="w-10 h-10 text-amber-400" />
                  </div>
                </div>

                {/* Bottom Right Card: 10.10 Mega Campaign */}
                <div
                  onClick={() => handleOpenProduct(products[1] || products[0])}
                  className="flex-1 rounded-lg bg-gradient-to-r from-[#8e0e00] to-[#1f1c18] text-white p-5 flex items-center justify-between shadow cursor-pointer hover:opacity-95 transition relative overflow-hidden"
                >
                  <div className="space-y-1 z-10">
                    <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      Mega Deal
                    </span>
                    <div className="text-3xl font-black tracking-tighter text-yellow-300">10.10</div>
                    <p className="text-xs text-orange-100">Up to 25% Off Gaming Accessories & Monitors</p>
                  </div>
                  <div className="bg-white/95 p-2 rounded-lg w-24 h-24 flex items-center justify-center">
                    <img
                      src={(products[1] || products[0]).photo}
                      alt="10.10 Promo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 10 Category Icon Strip matching Page 28 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
              {STORE_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategoryFilter === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() =>
                      setSelectedCategoryFilter(isSelected ? 'All' : cat.name)
                    }
                    className={`bg-white rounded-lg p-3 flex flex-col items-center justify-center gap-2 border transition cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-[#5b247a] ring-2 ring-[#5b247a]/30 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-400'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-[#4b388c]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 text-center">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* COLLECTIONS SECTION (5-Column Grid with Purple Save Badges - Page 28) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  Collections
                  {selectedCategoryFilter !== 'All' && (
                    <span className="ml-2 text-xs font-normal text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded">
                      Filtered: {selectedCategoryFilter}
                    </span>
                  )}
                </h2>
                {selectedCategoryFilter !== 'All' && (
                  <button
                    onClick={() => setSelectedCategoryFilter('All')}
                    className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const prod = filteredProducts[idx % Math.max(1, filteredProducts.length)] || products[0];
                  const savedAmount = Math.max(220, (prod.oldPrice || prod.onlinePrice + 820) - prod.onlinePrice);
                  return (
                    <div
                      key={`collection-${idx}-${prod.id}`}
                      onClick={() => handleOpenProduct(prod)}
                      className="bg-white rounded-lg border border-slate-200 p-3 flex flex-col justify-between relative hover:shadow-md transition cursor-pointer group"
                    >
                      {/* Purple Save Badge */}
                      <span className="self-start bg-[#6f2da8] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-r-full -ml-3 mb-2 shadow-xs">
                        Save: {savedAmount}৳
                      </span>

                      <div className="h-36 flex items-center justify-center p-2">
                        <img
                          src={prod.photo}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                        />
                      </div>

                      <div className="mt-2 space-y-1.5 border-t border-slate-100 pt-2">
                        <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 min-h-[32px]">
                          {prod.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-black text-rose-600">
                            {prod.onlinePrice.toLocaleString()}৳
                          </span>
                          <span className="text-[11px] text-slate-400 line-through">
                            {(prod.oldPrice || prod.onlinePrice + 820).toLocaleString()}৳
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* NEW ARRIVAL SECTION (6-Column Grid with Add to Cart button - Page 28) */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl font-bold text-slate-800">New Arrival</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, idx) => {
                  const prod = products[(idx + 1) % products.length] || products[0];
                  const savedAmount = Math.max(220, (prod.oldPrice || prod.onlinePrice + 500) - prod.onlinePrice);
                  return (
                    <div
                      key={`new-arrival-${idx}-${prod.id}`}
                      className="bg-white rounded-lg border border-slate-200 p-2.5 flex flex-col justify-between relative hover:shadow-md transition"
                    >
                      <span className="self-start bg-[#6f2da8] text-white text-[10px] font-bold px-2 py-0.5 rounded-r-full -ml-2.5 mb-1">
                        Save: {savedAmount}৳
                      </span>

                      <div
                        onClick={() => handleOpenProduct(prod)}
                        className="h-28 flex items-center justify-center p-1 cursor-pointer"
                      >
                        <img
                          src={prod.photo}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="space-y-1.5 mt-2">
                        <h4
                          onClick={() => handleOpenProduct(prod)}
                          className="text-[11px] font-semibold text-slate-800 line-clamp-2 cursor-pointer hover:text-purple-700"
                        >
                          {prod.name}
                        </h4>
                        <div className="flex items-center justify-between gap-1 pt-1">
                          <div>
                            <div className="text-xs font-black text-rose-600">
                              {prod.onlinePrice.toLocaleString()}৳
                            </div>
                            <div className="text-[10px] text-slate-400 line-through">
                              {(prod.oldPrice || prod.onlinePrice + 500).toLocaleString()}৳
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(prod, 1)}
                            className="bg-purple-700 hover:bg-purple-800 text-white text-[10px] font-bold px-2.5 py-1 rounded transition cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
            SUB-VIEW 2: PRODUCT DETAILS PAGE - PDP (Page 29 of Prototype.pdf)
           ============================================================== */}
        {publicSubView === 'pdp' && activeProduct && (
          <div className="space-y-4">
            {/* Breadcrumb bar */}
            <div className="text-xs text-slate-600 flex items-center gap-1.5 bg-white px-3 py-2 rounded border border-slate-200">
              <button
                onClick={() => setPublicSubView('home')}
                className="hover:text-purple-700 font-medium cursor-pointer"
              >
                {activeProduct.mainCategory || 'Monitor'}
              </button>
              <span>/</span>
              <span className="font-semibold text-slate-800">{activeProduct.brand || 'MSI'}</span>
              <span>/</span>
              <span className="text-slate-500 truncate">{activeProduct.name}</span>
            </div>

            {/* Top Product Overview Card */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Vertical Thumbnails + Main Image (5 cols) */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                  {[0, 1, 2, 3].map((thumbIdx) => (
                    <button
                      key={thumbIdx}
                      onClick={() => setActiveThumbIdx(thumbIdx)}
                      className={`w-14 h-14 rounded border p-1 flex items-center justify-center bg-white cursor-pointer ${
                        activeThumbIdx === thumbIdx
                          ? 'border-purple-700 ring-2 ring-purple-700/20'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={activeProduct.photo}
                        alt="Thumbnail"
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex-1 order-1 sm:order-2 flex flex-col items-center justify-center border border-slate-100 rounded-lg p-4 min-h-[260px]">
                  <img
                    src={activeProduct.photo}
                    alt={activeProduct.name}
                    className="max-h-60 object-contain transition-transform duration-300"
                  />

                  {/* Quantity Stepper + Green Add to Cart below image matching Page 29 */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                      <button
                        onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 py-1 text-sm font-bold tabular-nums">{pdpQty}</span>
                      <button
                        onClick={() => setPdpQty((q) => q + 1)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(activeProduct, pdpQty);
                        setPublicSubView('checkout');
                      }}
                      className="bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-xs px-5 py-2 rounded shadow transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Product Summary, Colored Price Badges & Quick Overview (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-lg md:text-xl font-bold text-[#1e3a8a] leading-snug">
                  {activeProduct.name}
                </h1>

                {/* 3 Colored Status/Price Pills matching Page 29 */}
                <div className="flex flex-wrap gap-2.5">
                  <div className="bg-[#a21caf] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-xs">
                    Special Price : ৳ {activeProduct.onlinePrice.toLocaleString()}
                  </div>
                  <div className="bg-[#7e22ce] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-xs">
                    Regular Price : ৳ {(activeProduct.oldPrice || activeProduct.onlinePrice + 820).toLocaleString()}
                  </div>
                  <div className="bg-[#15803d] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-xs">
                    Status : {activeProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                {/* Quick Overview List */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-sm font-bold text-slate-800">Quick Overview</h3>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    {activeProduct.quickOverview && activeProduct.quickOverview.length > 0 ? (
                      activeProduct.quickOverview.map((line, i) => <li key={i}>{line}</li>)
                    ) : (
                      <>
                        <li>Display Size: 21.45 Inch (22 Inch Class) Full HD (1920 x 1080) IPS Panel</li>
                        <li>Refresh Rate: 100Hz Smooth Visuals with 1ms (MPRT) / 4ms (GTG) Response Time</li>
                        <li>Eye-Care Technology: Anti-Flicker, Less Blue Light & Anti-Glare Surface</li>
                        <li>Connectivity: 1x HDMI (1.4b), 1x D-Sub (VGA), VESA Mountable (100x100mm)</li>
                        <li>Official Warranty: {activeProduct.warranty || '3 Years'} Brand Warranty</li>
                        <li>Available Stock Across Branches: {activeProduct.stock} Units</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section: Left Specs Table (9 cols) + Right Similar Products (3 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Specifications Table (9 cols) */}
              <div className="lg:col-span-9 bg-white rounded-lg border border-slate-200 overflow-hidden">
                {/* Tab Bar */}
                <div className="flex border-b border-slate-200 bg-slate-100">
                  {(['Specifications', 'Details', 'Q&A', 'Review'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSpecTab(tab)}
                      className={`px-5 py-2.5 text-xs font-bold transition cursor-pointer ${
                        activeSpecTab === tab
                          ? 'bg-[#6b21a8] text-white'
                          : 'text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  {activeSpecTab === 'Specifications' && (
                    <div className="border border-slate-200 rounded overflow-hidden text-xs">
                      {[
                        ['Brand', activeProduct.brand || 'MSI'],
                        ['Model', activeProduct.name],
                        ['Category', `${activeProduct.rootCategory} / ${activeProduct.mainCategory} / ${activeProduct.subCategory}`],
                        ['Display Size', '21.5 Inch (Full HD 1920x1080)'],
                        ['Panel Type', 'IPS (In-Plane Switching), Anti-Glare'],
                        ['Refresh Rate', '100Hz'],
                        ['Response Time', '1ms (MPRT) / 4ms (GTG)'],
                        ['Brightness', '250 nits (Typical)'],
                        ['Contrast Ratio', '1300:1'],
                        ['Viewing Angle', '178° (H) / 178° (V)'],
                        ['Video Ports', '1x HDMI (1.4b), 1x D-Sub (VGA)'],
                        ['Power Consumption', 'External Power Adapter 12V 2.5A'],
                        ['Dimension & Weight', '494.7 x 385.5 x 182.1 mm / 2.40 Kg'],
                        ['Warranty', activeProduct.warranty || '3 Years Official Warranty'],
                      ].map(([label, val], idx) => (
                        <div
                          key={label}
                          className={`grid grid-cols-12 px-3 py-2 border-b border-slate-200 last:border-b-0 ${
                            idx % 2 === 0 ? 'bg-purple-50/50' : 'bg-white'
                          }`}
                        >
                          <div className="col-span-4 font-semibold text-slate-700">{label}</div>
                          <div className="col-span-8 text-slate-800">{val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSpecTab === 'Details' && (
                    <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                      <p className="font-bold text-sm text-slate-900">{activeProduct.name}</p>
                      <p>{activeProduct.details}</p>
                      <p>
                        Engineered for programming, coding, and professional office environments with TÜV certified
                        EyesErgo anti-flicker and reduced blue light technology.
                      </p>
                    </div>
                  )}

                  {activeSpecTab === 'Q&A' && (
                    <div className="text-xs text-slate-700 space-y-2">
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <p className="font-bold">Q: Does this include an HDMI cable in the box?</p>
                        <p className="text-emerald-700 mt-1">
                          A: Yes, an official HDMI cable and power adapter are included inside the box.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSpecTab === 'Review' && (
                    <div className="text-xs text-slate-700 space-y-2">
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <p className="font-bold text-amber-600">★★★★★ 5.0 / 5.0 — Verified Buyer</p>
                        <p className="mt-1">
                          Excellent 100Hz IPS monitor from Diamond Tech! Fast delivery and authentic serial warranty.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Similar Products Sidebar (3 cols) */}
              <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 p-3 space-y-3">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 text-center">
                  Similar Products
                </h3>
                <div className="space-y-3">
                  {products.map((simProd) => (
                    <div
                      key={simProd.id}
                      className="border border-slate-200 rounded p-2.5 flex flex-col items-center text-center gap-1.5 hover:border-purple-400 transition"
                    >
                      <img
                        src={simProd.photo}
                        alt={simProd.name}
                        onClick={() => handleOpenProduct(simProd)}
                        className="h-20 object-contain cursor-pointer"
                      />
                      <div
                        onClick={() => handleOpenProduct(simProd)}
                        className="text-[11px] font-semibold text-slate-800 line-clamp-2 cursor-pointer hover:text-purple-700"
                      >
                        {simProd.name}
                      </div>
                      <div className="text-xs font-black text-rose-600">
                        Price : ৳ {simProd.onlinePrice.toLocaleString()}
                      </div>
                      <button
                        onClick={() => addToCart(simProd, 1)}
                        className="bg-[#00a651] hover:bg-[#008f45] text-white text-[10px] font-bold px-3 py-1 rounded transition cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            SUB-VIEW 3: CHECKOUT & CART PAGE (Page 30 of Prototype.pdf)
           ============================================================== */}
        {publicSubView === 'checkout' && (
          <div className="space-y-4">
            {/* Top Row: Customer Information Form (Left) + Login / Create Account (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Customer Information Card (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
                <h2 className="text-base font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={custFirstName}
                      onChange={(e) => setCustFirstName(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={custLastName}
                      onChange={(e) => setCustLastName(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={custAddress}
                      onChange={(e) => setCustAddress(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
                    <input
                      type="text"
                      value={custMobile}
                      onChange={(e) => setCustMobile(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      setShippingConfirmed(true);
                      notify('Customer details copied to Shipping header!');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded shadow cursor-pointer"
                  >
                    Input to Shipping
                  </button>
                </div>
              </div>

              {/* Right Sign In / Create Account Card (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      User Name or Phone Number
                    </label>
                    <input
                      type="text"
                      value={loginUserOrPhone}
                      onChange={(e) => setLoginUserOrPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-semibold text-slate-700">Password</label>
                      <button
                        onClick={() => notify('Password reset link sent to your registered mobile/email.')}
                        className="text-blue-600 hover:underline text-[11px] cursor-pointer"
                      >
                        Forget Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-slate-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                  <button
                    onClick={() => notify('Signed in as returning customer: Eleas Kanchon')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 mt-3 text-center">
                  <span className="text-[11px] text-slate-500 block mb-1.5">New Customer?</span>
                  <button
                    onClick={handleCustomerAccountCreate}
                    className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs py-1.5 rounded transition cursor-pointer"
                  >
                    Create an Account
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Selected Products & Checkout Summary (9 cols) + Add More Product (3 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left 9 cols */}
              <div className="lg:col-span-9 space-y-4">
                <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-4">
                  {/* Customer Shipping Summary Banner */}
                  {shippingConfirmed && (
                    <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-0.5">
                      <div className="font-bold text-slate-800">
                        Customer Name: <span className="font-normal">{custFirstName} {custLastName}</span>
                      </div>
                      <div className="font-bold text-slate-800">
                        Address: <span className="font-normal">{custAddress}</span>
                      </div>
                      <div className="flex flex-wrap gap-6">
                        <span className="font-bold text-slate-800">
                          Mobile: <span className="font-normal">{custMobile}</span>
                        </span>
                        <span className="font-bold text-slate-800">
                          Email: <span className="font-normal">{custEmail}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Selected Products Table + Right Order Summary Box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-8">
                      <h3 className="text-sm font-bold text-slate-800 mb-2">Selected Products</h3>
                      <div className="overflow-x-auto border border-slate-200 rounded">
                        <table className="w-full text-xs">
                          <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                            <tr>
                              <th className="py-2 px-2 text-left">Image</th>
                              <th className="py-2 px-2 text-left">Product Name</th>
                              <th className="py-2 px-2 text-center">Quantity</th>
                              <th className="py-2 px-2 text-right">Price</th>
                              <th className="py-2 px-2 text-right">Total</th>
                              <th className="py-2 px-2 text-center">Del</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {cart.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="py-6 text-center text-slate-400">
                                  No products in cart. Click &ldquo;Add to Cart&rdquo; on any product.
                                </td>
                              </tr>
                            ) : (
                              cart.map((item) => (
                                <tr key={item.product.id}>
                                  <td className="py-2 px-2">
                                    <img
                                      src={item.product.photo}
                                      alt={item.product.name}
                                      className="w-10 h-10 object-contain border border-slate-200 rounded p-0.5"
                                    />
                                  </td>
                                  <td className="py-2 px-2 font-medium text-slate-800">
                                    {item.product.name}
                                  </td>
                                  <td className="py-2 px-2 text-center">
                                    <div className="inline-flex items-center border border-slate-300 rounded">
                                      <button
                                        onClick={() => updateCartQty(item.product.id, item.qty - 1)}
                                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span className="px-2.5 py-0.5 font-bold tabular-nums">
                                        {item.qty}
                                      </span>
                                      <button
                                        onClick={() => updateCartQty(item.product.id, item.qty + 1)}
                                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-2 px-2 text-right tabular-nums">
                                    ৳ {item.product.onlinePrice.toLocaleString()}
                                  </td>
                                  <td className="py-2 px-2 text-right font-bold tabular-nums">
                                    ৳ {(item.product.onlinePrice * item.qty).toLocaleString()}
                                  </td>
                                  <td className="py-2 px-2 text-center">
                                    <button
                                      onClick={() => removeFromCart(item.product.id)}
                                      className="text-rose-600 hover:text-rose-800 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4 mx-auto" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Coupon Code Row matching Page 30 */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <label className="text-xs font-bold text-slate-700">Coupon Code:</label>
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="BIJOY26"
                          className="border border-slate-300 rounded px-3 py-1.5 text-xs font-mono uppercase w-40"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded shadow cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Order Summary Box (4 cols) */}
                    <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
                      <h4 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-1.5">
                        Order Summary
                      </h4>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sub-Total:</span>
                        <span className="font-bold tabular-nums">৳ {cartSubTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery Fee:</span>
                        <span className="font-bold tabular-nums">৳ {deliveryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700">
                        <span>Less (Coupon):</span>
                        <span className="font-bold tabular-nums">- ৳ {appliedCouponDiscount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-300 pt-2">
                        <span>Payable Amount:</span>
                        <span className="text-rose-600 tabular-nums">৳ {finalPayable.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={handleConfirmOnlineOrder}
                        className="w-full mt-2 bg-[#00a651] hover:bg-[#008f45] text-white font-bold py-2.5 rounded shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Confirm Order
                      </button>
                    </div>
                  </div>

                  {/* Payment Method & Delivery Method Cards matching Page 30 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    {/* Payment Method */}
                    <div className="border border-slate-200 rounded p-3 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800">Payment Method</h4>
                      <div className="space-y-1.5 text-xs">
                        {(['Cash on Delivery', 'Online Payment', 'POS on Delivery'] as const).map((method) => (
                          <label key={method} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === method}
                              onChange={() => setPaymentMethod(method)}
                            />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
                      <div className="pt-2 flex flex-wrap items-center gap-1.5">
                        {['CASH', 'bKash', 'Nagad', 'ROCKET', 'upay', 'VISA', 'MasterCard'].map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 border border-slate-300 text-slate-700"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Method */}
                    <div className="border border-slate-200 rounded p-3 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800">Delivery Method</h4>
                      <div className="space-y-1.5 text-xs">
                        {[
                          { label: 'Home Delivery', fee: '60৳' },
                          { label: 'Store Pickup', fee: '0৳' },
                          { label: 'Request Express', fee: '120৳' },
                        ].map((d) => (
                          <label key={d.label} className="flex items-center justify-between cursor-pointer">
                            <span className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="deliveryMethod"
                                checked={deliveryMethod === d.label}
                                onChange={() => setDeliveryMethod(d.label as typeof deliveryMethod)}
                              />
                              <span>{d.label}</span>
                            </span>
                            <span className="text-slate-500 font-mono">{d.fee}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 3 cols: Add More Product */}
              <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 p-3 space-y-3">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 text-center">
                  Add More Product
                </h3>
                <div className="space-y-3">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="border border-slate-200 rounded p-2.5 flex flex-col items-center text-center gap-1.5"
                    >
                      <img
                        src={prod.photo}
                        alt={prod.name}
                        className="h-16 object-contain"
                      />
                      <div className="text-[11px] font-semibold text-slate-800 line-clamp-2">
                        {prod.name}
                      </div>
                      <div className="text-xs font-black text-rose-600">
                        Price : ৳ {prod.onlinePrice.toLocaleString()}
                      </div>
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="bg-[#00a651] hover:bg-[#008f45] text-white text-[10px] font-bold px-3 py-1 rounded transition cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            SUB-VIEW 4: PC BUILDER CONFIGURATOR
           ============================================================== */}
        {publicSubView === 'pc-builder' && (
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Diamond Tech — Custom PC Builder</h2>
                <p className="text-xs text-slate-500">
                  Select components below and add your complete build directly to cart
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 border border-purple-200 px-4 py-1.5 rounded text-right">
                  <span className="text-[10px] text-purple-700 uppercase font-bold block">Estimated Build Total</span>
                  <span className="text-base font-black text-purple-900 tabular-nums">
                    ৳{' '}
                    {Object.values(pcBuild)
                      .reduce((sum, item) => sum + (item ? item.onlinePrice : 0), 0)
                      .toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    Object.values(pcBuild).forEach((item) => {
                      if (item) addToCart(item, 1);
                    });
                    setPublicSubView('checkout');
                  }}
                  className="bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-xs px-4 py-2.5 rounded shadow cursor-pointer"
                >
                  Add Build to Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {Object.keys(pcBuild).map((slot) => {
                const selectedItem = pcBuild[slot];
                return (
                  <div key={slot} className="py-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center font-bold text-xs text-purple-700">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{slot}</div>
                        {selectedItem ? (
                          <div className="text-xs text-emerald-700 font-medium">
                            {selectedItem.name} — ৳ {selectedItem.onlinePrice.toLocaleString()}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400">No component selected</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedItem?.id || ''}
                        onChange={(e) => {
                          const found = products.find((p) => p.id === e.target.value) || null;
                          setPcBuild((prev) => ({ ...prev, [slot]: found }));
                        }}
                        className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white"
                      >
                        <option value="">-- Choose {slot} --</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (৳ {p.onlinePrice.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
