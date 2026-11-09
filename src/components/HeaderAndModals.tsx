import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Zap,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  X,
  Building2,
  UserCog,
  MessageSquare,
  Tag,
  Settings,
  Globe,
  Database,
  KeyRound,
  ShieldCheck,
  LogOut,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  CornerDownLeft,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export const HeaderAndModals: React.FC = () => {
  const {
    currentUser,
    sidebarOpen,
    setSidebarOpen,
    darkMode,
    setDarkMode,
    setRoute,
    logout,
    products,
    orders,
    payments,
    returns,
  } = useErp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifTab, setNotifTab] = useState<'orders' | 'payments' | 'expiry' | 'returns'>('orders');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global search results by Serial, Name, or Product ID
  const searchResults = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        const allSerials = [
          ...p.branchSerials.mainActive,
          ...p.branchSerials.sharchaActive,
          ...p.branchSerials.rnRoadActive,
          ...p.branchSerials.mainWarranty,
          ...p.branchSerials.sharchaWarranty,
          ...p.branchSerials.rnRoadWarranty,
        ];
        return (
          p.name.toLowerCase().includes(q) ||
          p.proId.toLowerCase().includes(q) ||
          allSerials.some((s) => s.toLowerCase().includes(q))
        );
      })
    : [];

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const totalNotifCount = pendingOrdersCount + payments.length + returns.length;

  return (
    <header
      ref={headerRef}
      className="h-[68px] w-full bg-gradient-to-r from-[#23202e] via-[#6b295b] to-[#8e2f68] px-4 flex items-center justify-between relative z-30 no-print shadow-md"
    >
      {/* Left: Hamburger + Search Pill */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-8 h-8 rounded border border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search by Serial, Name, Product ID */}
        <div className="relative flex-1 max-w-[430px]">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-10 shadow-inner">
            <Search className="w-5 h-5 text-[#4a7c9b] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Serial, Name, Product ID"
              className="w-full bg-transparent text-gray-800 placeholder-[#5b7d91] text-sm focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-600 hover:text-gray-900">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Instant Global Search Dropdown */}
          {searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-12 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 max-h-80 overflow-y-auto z-50 p-2">
              <div className="text-xs font-semibold text-gray-500 px-3 py-1 border-b border-gray-100">
                Matching Products & Serials ({searchResults.length})
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-xs text-gray-500 text-center">
                  No product or serial number matched "{searchQuery}"
                </div>
              ) : (
                searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setRoute('products');
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.photo}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-8 object-cover rounded border"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono">
                          ID: {p.proId} • Stock: {p.stock} Unit
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 font-mono">৳{p.sellPrice}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Quick Action, Theme Toggle, Notification Bell, Profile Card */}
      <div className="flex items-center gap-3">
        {/* circular icon buttons matching Page 2 & Page 3 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowQuickActions(!showQuickActions);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center text-[#84cc16] hover:bg-white/15 transition-colors cursor-pointer"
            title="Quick Actions"
          >
            <Zap className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center text-yellow-300 hover:bg-white/15 transition-colors cursor-pointer"
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowQuickActions(false);
              setShowProfileMenu(false);
            }}
            className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center text-white hover:bg-white/15 transition-colors relative cursor-pointer"
            title="Notification Center"
          >
            <Bell className="w-4 h-4 fill-current" />
            {totalNotifCount > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 border border-white" />
            )}
          </button>
        </div>

        {/* User Profile Pill matching Page 2 & Page 3 */}
        <button
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
            setShowQuickActions(false);
          }}
          className="flex items-center gap-3 bg-[#471c3d]/90 hover:bg-[#3a1532] border border-white/40 rounded-full pl-1.5 pr-3.5 py-1 text-left transition-colors cursor-pointer"
        >
          <img
            src={currentUser.photo}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-white/50"
          />
          <div className="leading-tight">
            <div className="text-sm font-bold text-white whitespace-nowrap">{currentUser.name}</div>
            <div className="text-[11px] text-gray-200">{currentUser.role}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-white ml-1" />
        </button>
      </div>

      {/* QUICK ACTIONS POPOVER (Page 3 bottom popup) */}
      {showQuickActions && (
        <div className="absolute right-64 top-16 w-[310px] bg-white rounded-xl shadow-2xl border-2 border-[#a83279] overflow-hidden z-50">
          <div className="bg-gradient-to-r from-[#8b2b66] to-[#c83e8b] px-4 py-2.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
              <Zap className="w-4 h-4 text-yellow-300 fill-current" />
              <span>QUICK ACTIONS</span>
            </div>
            <button onClick={() => setShowQuickActions(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3 bg-white">
            <button
              onClick={() => {
                setRoute('sales-invoice');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#2e9e49] hover:bg-[#25823b] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Add Sale
            </button>
            <button
              onClick={() => {
                setRoute('add-purchase');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#1d6373] hover:bg-[#164d59] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Purchase
            </button>
            <button
              onClick={() => {
                setRoute('add-product');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#e8702a] hover:bg-[#cc5f1f] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Product
            </button>
            <button
              onClick={() => {
                setRoute('warranty');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#702963] hover:bg-[#571f4d] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Warranty
            </button>
            <button
              onClick={() => {
                setRoute('repair-service');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#297339] hover:bg-[#1f592c] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Repair
            </button>
            <button
              onClick={() => {
                setRoute('returns');
                setShowQuickActions(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-[#ff3b00] hover:bg-[#d93200] text-white font-semibold text-sm shadow cursor-pointer"
            >
              + Returns
            </button>
          </div>
        </div>
      )}

      {/* NOTIFICATION CENTER MODAL (Page 3 center modal) */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-16 z-50">
          <div className="w-full max-w-[610px] bg-white rounded-2xl shadow-2xl border-2 border-[#a83279] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6b1d4f] via-[#9c2b6d] to-[#c43c85] px-5 py-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5 font-bold text-base tracking-wide">
                <Bell className="w-5 h-5 fill-current" />
                <span>NOTIFICATION CENTER</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-white text-[#9c2b6d] font-bold text-xs px-3.5 py-1 rounded-full shadow">
                  {totalNotifCount} Pending
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 4 Tabs */}
            <div className="bg-[#5a1840] px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-semibold text-white">
              <button
                onClick={() => setNotifTab('orders')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  notifTab === 'orders' ? 'bg-[#2e9e49] text-white shadow' : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Online Orders</span>
              </button>
              <button
                onClick={() => setNotifTab('payments')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  notifTab === 'payments' ? 'bg-[#2e9e49] text-white shadow' : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment Request</span>
              </button>
              <button
                onClick={() => setNotifTab('expiry')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  notifTab === 'expiry' ? 'bg-[#2e9e49] text-white shadow' : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Expiry Alert</span>
              </button>
              <button
                onClick={() => setNotifTab('returns')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  notifTab === 'returns' ? 'bg-[#2e9e49] text-white shadow' : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>Returns & Others</span>
              </button>
            </div>

            {/* Notification Rows */}
            <div className="p-5 space-y-3 max-h-[380px] overflow-y-auto bg-white">
              {notifTab === 'orders' &&
                orders.slice(0, 5).map((ord) => (
                  <div
                    key={ord.id}
                    className="flex items-center justify-between bg-[#e2ece9] rounded-lg px-4 py-3 border border-gray-300 text-xs text-gray-800"
                  >
                    <div className="font-bold font-mono">
                      <div>{ord.invoiceNo}</div>
                      <div>{ord.grandTotal.toFixed(2)}</div>
                    </div>
                    <div>
                      <div>28-09-2026</div>
                      <div className="text-gray-600">{ord.timeAgo}</div>
                    </div>
                    <div>
                      <div className="font-semibold">{ord.customerName}</div>
                      <div className="text-gray-600">{ord.customerType}</div>
                    </div>
                    <div className="max-w-[130px] truncate text-gray-700">{ord.address}</div>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setRoute('all-orders');
                      }}
                      className="px-5 py-1.5 rounded-full bg-[#388e3c] hover:bg-[#2e7d32] text-white font-semibold text-xs shadow cursor-pointer"
                    >
                      Action
                    </button>
                  </div>
                ))}

              {notifTab === 'payments' &&
                payments.map((pay) => (
                  <div
                    key={pay.id}
                    className="flex items-center justify-between bg-[#e2ece9] rounded-lg px-4 py-3 border border-gray-300 text-xs text-gray-800"
                  >
                    <div className="font-bold font-mono">
                      <div>{pay.invoiceNo}</div>
                      <div>৳{pay.amount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div>{pay.date}</div>
                      <div className="text-gray-600">{pay.mobileOperator}</div>
                    </div>
                    <div>
                      <div className="font-semibold">{pay.paymentBy}</div>
                      <div className="text-gray-600">Txn: {pay.transactionNo}</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setRoute('payment');
                      }}
                      className="px-5 py-1.5 rounded-full bg-[#388e3c] text-white font-semibold text-xs cursor-pointer"
                    >
                      Action
                    </button>
                  </div>
                ))}

              {notifTab === 'expiry' &&
                products
                  .filter((p) => p.stock <= p.productLimit)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-[#e2ece9] rounded-lg px-4 py-3 border border-gray-300 text-xs text-gray-800"
                    >
                      <div className="font-bold font-mono">{p.proId}</div>
                      <div className="font-semibold max-w-[200px] truncate">{p.name}</div>
                      <div className="text-red-600 font-bold">Stock: {p.stock} Unit</div>
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          setRoute('add-purchase');
                        }}
                        className="px-5 py-1.5 rounded-full bg-[#388e3c] text-white font-semibold text-xs cursor-pointer"
                      >
                        Action
                      </button>
                    </div>
                  ))}

              {notifTab === 'returns' &&
                returns.map((ret) => (
                  <div
                    key={ret.id}
                    className="flex items-center justify-between bg-[#e2ece9] rounded-lg px-4 py-3 border border-gray-300 text-xs text-gray-800"
                  >
                    <div className="font-bold font-mono">{ret.returnSerialNo}</div>
                    <div>{ret.customerName}</div>
                    <div className="max-w-[160px] truncate">{ret.productName}</div>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        setRoute('returns');
                      }}
                      className="px-5 py-1.5 rounded-full bg-[#388e3c] text-white font-semibold text-xs cursor-pointer"
                    >
                      Action
                    </button>
                  </div>
                ))}
            </div>

            <div className="px-6 py-3 bg-white border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setShowNotifications(false);
                  setRoute('all-orders');
                }}
                className="text-xs font-bold text-[#1e40af] hover:underline cursor-pointer"
              >
                See All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER PROFILE & SITE OWNER DROPDOWN MENU (Page 3 right panel) */}
      {showProfileMenu && (
        <div className="absolute right-4 top-[68px] w-[285px] bg-white rounded-2xl shadow-2xl border-2 border-[#b8337a] overflow-hidden z-50">
          <div className="bg-gradient-to-r from-[#5a1b45] via-[#8c2966] to-[#c83e8b] p-4 text-white">
            <div className="text-xs text-gray-200">Signed in as</div>
            <div className="text-base font-extrabold tracking-wide uppercase mt-0.5">
              {currentUser.name}
            </div>
            <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#4a5568]/80 text-white text-xs font-medium">
              Site Owner
            </span>
          </div>

          <div className="p-3 space-y-1 text-gray-800 text-sm font-medium bg-white">
            <button
              onClick={() => {
                setRoute('company-settings');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-gray-700" />
              <span>Company Settings</span>
            </button>

            <button
              onClick={() => {
                setRoute('user-settings');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <UserCog className="w-4 h-4 text-gray-700" />
              <span>Users & Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setRoute('whatsapp-remainder');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-gray-700" />
              <span>WhatsApp Remainder</span>
            </button>

            <button
              onClick={() => {
                setRoute('coupons');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Coupon Settings</span>
            </button>

            <button
              onClick={() => {
                setRoute('public-website-settings');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-gray-700" />
              <span>Public Website Settings</span>
            </button>

            <button
              onClick={() => {
                setRoute('public-website');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Public Website</span>
            </button>

            <button
              onClick={() => {
                setRoute('database-backup');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <Database className="w-4 h-4 text-sky-600" />
              <span>Database Backup</span>
            </button>

            <button
              onClick={() => {
                setRoute('license-renewal');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-gray-800" />
              <span>License Renewal</span>
            </button>

            <button
              onClick={() => {
                setRoute('active-site-hub');
                setShowProfileMenu(false);
              }}
              className="w-full flex flex-col items-start px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Active Site & Renewal Hub</span>
              </div>
              <span className="text-[11px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded ml-7 mt-0.5">
                Site Owner
              </span>
            </button>

            <div className="pt-2 mt-1 border-t border-pink-200">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#7c1d4f] font-bold hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
