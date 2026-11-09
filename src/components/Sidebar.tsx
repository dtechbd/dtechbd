import React from 'react';
import {
  Home,
  Users,
  ShoppingCart,
  FileText,
  Copy,
  ArrowLeftRight,
  RefreshCw,
  TrendingUp,
  ListChecks,
  Shield,
  CornerDownRight,
  Wrench,
  Globe,
  KeyRound,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { ErpRoute } from '../types/erp';

interface NavItemConfig {
  id: ErpRoute;
  label: string;
  icon: React.ReactNode;
  subRoutes?: { id: ErpRoute; label: string }[];
}

export const Sidebar: React.FC = () => {
  const { route, setRoute, sidebarOpen, companySettings } = useErp();

  if (!sidebarOpen) return null;

  const navItems: NavItemConfig[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    {
      id: 'products',
      label: 'Products',
      icon: <ShoppingCart className="w-4 h-4" />,
      subRoutes: [
        { id: 'products', label: 'All Products' },
        { id: 'add-product', label: 'Add Product' },
        { id: 'add-purchase', label: 'Add Purchase' },
        { id: 'add-category', label: 'Add Category' },
      ],
    },
    {
      id: 'sales-invoice',
      label: 'Sales/Invoice',
      icon: <FileText className="w-4 h-4" />,
      subRoutes: [
        { id: 'sales-invoice', label: 'Add Sale (POS)' },
        { id: 'all-orders', label: 'All Orders' },
      ],
    },
    { id: 'quotations', label: 'Quotations', icon: <Copy className="w-4 h-4" /> },
    {
      id: 'income-expense',
      label: 'Income & Expense',
      icon: <ArrowLeftRight className="w-4 h-4" />,
      subRoutes: [
        { id: 'business-report', label: 'Accounts Entry' },
        { id: 'payment', label: 'Payment Request' },
        { id: 'withdraws', label: 'Withdraws' },
        { id: 'coupons', label: 'Coupons' },
      ],
    },
    { id: 'suppliers', label: 'Suppliers', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'business-report', label: 'Business Report', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'stock-report', label: 'Stock Report', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'warranty', label: 'Warranty', icon: <Shield className="w-4 h-4" /> },
    { id: 'returns', label: 'Returns', icon: <CornerDownRight className="w-4 h-4" /> },
    { id: 'repair-service', label: 'Repair & Service', icon: <Wrench className="w-4 h-4" /> },
  ];

  const isGroupActive = (item: NavItemConfig) => {
    if (route === item.id) return true;
    if (item.subRoutes?.some((s) => s.id === route)) return true;
    return false;
  };

  return (
    <aside className="w-[235px] shrink-0 bg-[#141414] text-white min-h-screen flex flex-col select-none no-print border-r border-black/40">
      {/* Brand Header matching Page 2 */}
      <div
        onClick={() => setRoute('dashboard')}
        className="px-4 pt-4 pb-5 flex flex-col items-center text-center cursor-pointer border-b border-white/10"
      >
        <div className="w-16 h-12 border-2 border-white rounded-sm flex items-center justify-center relative mb-1.5">
          <span className="font-extrabold text-lg tracking-tighter text-white">DT</span>
          <div className="w-6 h-1 bg-white absolute -bottom-2 rounded" />
        </div>
        <h1 className="text-[22px] font-bold tracking-tight text-white leading-tight mt-1">
          {companySettings.storeName || 'Diamond Tech'}
        </h1>
        <p className="text-xs text-gray-300 tracking-wide">
          {companySettings.slogan || 'Your Trusted IT Partner'}
        </p>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isGroupActive(item);
          return (
            <div key={item.id}>
              <button
                onClick={() => setRoute(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#ff2200] text-white font-semibold shadow-sm'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>

              {/* Sub-navigation pills when section is active */}
              {active && item.subRoutes && (
                <div className="bg-[#1f1f1f] py-1 pl-9 pr-2 space-y-0.5 border-l-2 border-[#ff2200] ml-4 my-0.5">
                  {item.subRoutes.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setRoute(sub.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                        route === sub.id
                          ? 'bg-white/15 text-[#ff5533] font-semibold'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-3 mt-3 border-t border-white/10 px-2 space-y-1">
          <button
            onClick={() => setRoute('public-website')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Public E-Commerce Site</span>
          </button>
          <button
            onClick={() => setRoute('active-site-hub')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold bg-purple-800/80 hover:bg-purple-700 text-white transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Active Site & License Hub</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
