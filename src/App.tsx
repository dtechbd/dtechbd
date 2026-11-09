/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ErpProvider, useErp } from './context/ErpContext';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { HeaderAndModals } from './components/HeaderAndModals';
import { DashboardView } from './components/DashboardView';
import {
  AddProductView,
  AddPurchaseView,
  AllProductsView,
  StockReportView,
  AddCategoryView,
} from './components/InventoryViews';
import {
  AddSaleView,
  AllOrdersView,
  CreateQuotationView,
  PrintTemplateModal,
} from './components/SalesAndOrdersViews';
import {
  CustomersView,
  SuppliersView,
  BusinessReportView,
  CouponsView,
  PaymentView,
  WithdrawsView,
} from './components/PartnersAndAccountsViews';
import {
  WarrantyView,
  ReturnsView,
  RepairServiceView,
  WhatsAppRemainderView,
} from './components/ServiceViews';
import {
  CompanySettingsView,
  UserSettingsView,
  DatabaseBackupView,
  LicenseRenewalView,
  PublicWebsiteSettingsView,
  ActiveSiteHubView,
} from './components/AdminAndLicenseViews';
import { PublicWebsiteView } from './components/PublicWebsiteView';

const MainShell: React.FC = () => {
  const { isAuthenticated, route, darkMode, toastMessage } = useErp();

  const renderActiveRoute = () => {
    switch (route) {
      case 'dashboard':
        return <DashboardView />;
      case 'add-product':
        return <AddProductView />;
      case 'add-purchase':
        return <AddPurchaseView />;
      case 'products':
        return <AllProductsView />;
      case 'sales-invoice':
        return <AddSaleView />;
      case 'all-orders':
        return <AllOrdersView />;
      case 'quotations':
        return <CreateQuotationView />;
      case 'customers':
        return <CustomersView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'stock-report':
        return <StockReportView />;
      case 'business-report':
      case 'income-expense':
        return <BusinessReportView />;
      case 'add-category':
        return <AddCategoryView />;
      case 'coupons':
        return <CouponsView />;
      case 'payment':
        return <PaymentView />;
      case 'withdraws':
        return <WithdrawsView />;
      case 'warranty':
        return <WarrantyView />;
      case 'returns':
        return <ReturnsView />;
      case 'repair-service':
        return <RepairServiceView />;
      case 'whatsapp-remainder':
        return <WhatsAppRemainderView />;
      case 'company-settings':
        return <CompanySettingsView />;
      case 'user-settings':
        return <UserSettingsView />;
      case 'database-backup':
        return <DatabaseBackupView />;
      case 'license-renewal':
        return <LicenseRenewalView />;
      case 'public-website-settings':
        return <PublicWebsiteSettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[100] bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Print Preview & Thermal/A4/Barcode Modal */}
      <PrintTemplateModal />

      {/* Route-based Top-Level Shells */}
      {!isAuthenticated ? (
        <LoginView />
      ) : route === 'public-website' ? (
        <PublicWebsiteView />
      ) : route === 'active-site-hub' ? (
        <ActiveSiteHubView />
      ) : (
        <div className="min-h-screen flex bg-[#e9ecef] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <HeaderAndModals />
            <main className="flex-1 overflow-y-auto p-3 md:p-5">
              {renderActiveRoute()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErpProvider>
      <MainShell />
    </ErpProvider>
  );
}
