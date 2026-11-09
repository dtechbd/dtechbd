import React, { useState } from 'react';
import {
  UserPlus,
  Camera,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  X,
  QrCode,
  MessageCircle,
  Printer,
  RefreshCw,
  Plus,
  Calendar,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { CustomerItem } from '../types/erp';
import { avatarDataUrl } from '../data/initialData';

/* ============================================================================
 * PAGE 10: CUSTOMERS (Add Customer + All Customer + Detail Card)
 * ========================================================================== */
export const CustomersView: React.FC = () => {
  const {
    customers,
    orders,
    addCustomer,
    deleteCustomer,
    exportDataAsCSV,
    notify,
  } = useErp();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [shippingBilling, setShippingBilling] = useState('');
  const [advancePaid, setAdvancePaid] = useState('');

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(customers[2]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCustomer({
      name,
      mobile: mobile || '01517850737',
      whatsapp: whatsapp || mobile || '01923862251',
      email: email || 'customer@diamondtechbd.com',
      address: address || 'Jhikargacha, Jashore',
      shippingBilling: shippingBilling || address || 'Jhikargacha, Jashore',
      photo: avatarDataUrl('#1e40af', name.slice(0, 2).toUpperCase()),
      due: 0,
      advancePaid: Number(advancePaid) || 0,
      customerType: 'General',
      addedBy: 'Shamim Kabir',
    });
    setName('');
    setWhatsapp('');
    setMobile('');
    setEmail('');
    setAddress('');
    setShippingBilling('');
    setAdvancePaid('');
  };

  const filtered = customers.filter(
    (c) =>
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <UserPlus className="w-5 h-5" />
          <span>Add Customer</span>
        </div>
        <span className="text-xs font-medium text-white/90">Customer Entry Portal</span>
      </div>

      {/* Add Customer Form matching Page 10 */}
      <form onSubmit={handleSave} className="max-w-5xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">WhatsApp No</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Mobile No</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
              Shipping & Billing
            </label>
            <input
              type="text"
              value={shippingBilling}
              onChange={(e) => setShippingBilling(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="flex items-end gap-4">
            <div className="w-14 h-12 rounded-lg bg-gray-400/70 flex items-center justify-center text-white shrink-0">
              <Camera className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Photo</label>
              <label className="flex items-center justify-between h-11 px-4 rounded-full bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>Under 200KB</span>
                <span className="font-semibold text-gray-500">Browse File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={() => notify('Customer photo attached!')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Advance Paid</label>
            <input
              type="number"
              value={advancePaid}
              onChange={(e) => setAdvancePaid(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-48 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
          >
            Save Customer
          </button>
        </div>
      </form>

      {/* All Customer Section matching Page 10 */}
      <div className="space-y-3 pt-2 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold">All Customer</h3>

          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-10 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center rounded-full bg-[#001f60] text-white text-xs font-semibold overflow-hidden shadow">
            <button
              onClick={() =>
                exportDataAsCSV(
                  'All_Customers.csv',
                  customers.map((c) => ({
                    Name: c.name,
                    Mobile: c.mobile,
                    Email: c.email,
                    Address: c.address,
                    Due: c.due,
                  }))
                )
              }
              className="px-4 py-2.5 flex items-center gap-1.5 hover:bg-white/10 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download as PDF/Excel</span>
            </button>
            <span className="px-3 py-2.5 border-l border-white/20">All ▾</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y-2 border-gray-500 text-gray-900 dark:text-white font-bold text-sm">
                <th className="py-2 px-3">SL</th>
                <th className="py-2 px-3">Photo</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Mobile</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Address</th>
                <th className="py-2 px-3 text-center">Due</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
              {filtered.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className={`cursor-pointer ${
                    idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/60'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <img
                      src={c.photo}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border bg-white"
                    />
                  </td>
                  <td className="py-2.5 px-3 font-semibold">{c.name}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div>📞 {c.mobile}</div>
                    {c.secondaryMobile && <div>💬 {c.secondaryMobile}</div>}
                  </td>
                  <td className="py-2.5 px-3 underline text-gray-700 dark:text-slate-300">{c.email}</td>
                  <td className="py-2.5 px-3 max-w-[160px]">{c.address}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold">{c.due}</td>
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                        title="View Customer Ledger"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setName(c.name);
                          setMobile(c.mobile);
                          setEmail(c.email);
                          setAddress(c.address);
                        }}
                        className="w-7 h-7 rounded-lg bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                        title="Edit Customer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCustomer(c.id)}
                        className="w-7 h-7 rounded-lg bg-[#dc2626] text-white flex items-center justify-center cursor-pointer"
                        title="Delete Customer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Ledger Detail Card matching bottom of Page 10 */}
        {selectedCustomer && (
          <div className="max-w-xl mx-auto mt-4 bg-[#d8dedc] text-gray-900 border-2 border-[#1e6b2b] rounded-md p-5 shadow-lg relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute right-3 top-3 text-gray-700 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCustomer.photo}
                  alt={selectedCustomer.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover border border-gray-400 bg-white"
                />
                <div>
                  <h4 className="text-lg font-extrabold">{selectedCustomer.name}</h4>
                  <div className="text-xs font-mono font-semibold">☎ {selectedCustomer.mobile}</div>
                  <div className="text-xs text-gray-700 max-w-[230px]">{selectedCustomer.address}</div>
                </div>
              </div>

              <div className="text-right pt-4">
                <div className="bg-white p-1.5 inline-block border border-gray-400">
                  <QrCode className="w-14 h-14 text-black" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-3 pb-2 border-b border-gray-500">
              <div>👤 Due {selectedCustomer.due.toFixed(2)}</div>
              <div>Added by: {selectedCustomer.addedBy}</div>
            </div>

            <table className="w-full text-left border-collapse text-[11px] mt-2">
              <thead>
                <tr className="border-b border-gray-500 font-bold">
                  <th className="py-1.5 px-2">Invoice No</th>
                  <th className="py-1.5 px-2 text-center">Date</th>
                  <th className="py-1.5 px-2 text-center">Amount</th>
                  <th className="py-1.5 px-2 text-center">Status</th>
                  <th className="py-1.5 px-2 text-center">Branch</th>
                  <th className="py-1.5 px-2 text-center">Payment Method</th>
                  <th className="py-1.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-400/50">
                {orders.map((o, idx) => (
                  <tr key={o.id} className={idx % 2 === 0 ? 'bg-[#bfd4c4]' : ''}>
                    <td className="py-1.5 px-2 font-mono font-bold">{o.invoiceNo}</td>
                    <td className="py-1.5 px-2 text-center font-mono text-[10px]">28-09-24 12:45 PM</td>
                    <td className="py-1.5 px-2 text-center font-mono">{o.grandTotal.toFixed(2)}</td>
                    <td className="py-1.5 px-2 text-center">{o.status}</td>
                    <td className="py-1.5 px-2 text-center">{o.branch}</td>
                    <td className="py-1.5 px-2 text-center">{o.paymentMethod}</td>
                    <td className="py-1.5 px-2 text-center font-semibold">
                      {o.dueAmount > 0 ? 'Unpaid' : 'Paid'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() =>
                  notify(`Statement sent to ${selectedCustomer.name} on WhatsApp (${selectedCustomer.whatsapp})`)
                }
                className="px-6 py-2 rounded-full bg-[#ccf2d4] hover:bg-[#b2e8be] text-[#15803d] font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-8 py-2 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs shadow cursor-pointer"
              >
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 11: SUPPLIERS (Add Suppliers + All Suppliers)
 * ========================================================================== */
export const SuppliersView: React.FC = () => {
  const { suppliers, addSupplier, deleteSupplier, exportDataAsCSV, notify } = useErp();

  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [address, setAddress] = useState('');
  const [advancePayment, setAdvancePayment] = useState('');
  const [search, setSearch] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    addSupplier({
      companyName,
      ownerName: ownerName || 'Proprietor',
      mobile: mobile || '01923862251',
      whatsapp: whatsapp || mobile || '01322832023',
      email: email || 'supplier@gmail.com',
      bankName: bankName || 'Islami Bank PLC',
      accountNo: accountNo || '2050192000',
      address: address || 'Multiplan, New Elephant Road, Dhaka',
      photo: avatarDataUrl('#0284c7', companyName.slice(0, 2).toUpperCase()),
      advancePayment: Number(advancePayment) || 0,
      note: '0',
    });
    setCompanyName('');
    setOwnerName('');
    setMobile('');
    setWhatsapp('');
    setEmail('');
    setBankName('');
    setAccountNo('');
    setAddress('');
    setAdvancePayment('');
  };

  const filtered = suppliers.filter(
    (s) =>
      !search.trim() ||
      s.companyName.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      s.mobile.includes(search)
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <RefreshCw className="w-5 h-5" />
          <span>Add Suppliers</span>
        </div>
        <span className="text-xs font-medium text-white/90">Suppliers Entry Portal</span>
      </div>

      {/* Form matching Page 11 */}
      <form onSubmit={handleSave} className="max-w-5xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Owner Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Mobile No</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">A/C No</label>
            <input
              type="text"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="flex items-end gap-4">
            <div className="w-14 h-12 rounded-lg bg-gray-400/70 flex items-center justify-center text-white shrink-0">
              <Camera className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
                Photo/Logo
              </label>
              <label className="flex items-center justify-between h-11 px-4 rounded-full bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>Under 200KB</span>
                <span className="font-semibold text-gray-500">Browse File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={() => notify('Supplier logo attached!')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
              Advance Payment
            </label>
            <input
              type="number"
              value={advancePayment}
              onChange={(e) => setAdvancePayment(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-48 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
          >
            Save Suppliers
          </button>
        </div>
      </form>

      {/* All Suppliers Table matching Page 11 */}
      <div className="space-y-3 pt-2 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold">All Suppliers</h3>

          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-10 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center rounded-full bg-[#001f60] text-white text-xs font-semibold overflow-hidden shadow">
            <button
              onClick={() =>
                exportDataAsCSV(
                  'All_Suppliers.csv',
                  suppliers.map((s) => ({
                    Company: s.companyName,
                    Owner: s.ownerName,
                    Mobile: s.mobile,
                    Email: s.email,
                    Address: s.address,
                  }))
                )
              }
              className="px-4 py-2.5 flex items-center gap-1.5 hover:bg-white/10 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download as PDF/Excel</span>
            </button>
            <span className="px-3 py-2.5 border-l border-white/20">All ▾</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y-2 border-gray-500 text-gray-900 dark:text-white font-bold text-sm">
                <th className="py-2 px-3">SL</th>
                <th className="py-2 px-3">Photo</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Mobile</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Address</th>
                <th className="py-2 px-3 text-center">Note</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
              {filtered.map((s, idx) => (
                <tr
                  key={s.id}
                  className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/60'}
                >
                  <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <img
                      src={s.photo}
                      alt={s.companyName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border bg-white"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold">{s.companyName}</div>
                    <div className="text-gray-600 dark:text-slate-400">{s.ownerName}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div>📞 {s.mobile}</div>
                    <div>💬 {s.whatsapp}</div>
                  </td>
                  <td className="py-2.5 px-3 underline">{s.email}</td>
                  <td className="py-2.5 px-3 max-w-[180px]">{s.address}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{s.note}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => notify(`${s.companyName} — A/C: ${s.accountNo} (${s.bankName})`)}
                        className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setCompanyName(s.companyName);
                          setOwnerName(s.ownerName);
                          setMobile(s.mobile);
                          setAddress(s.address);
                        }}
                        className="w-7 h-7 rounded-lg bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSupplier(s.id)}
                        className="w-7 h-7 rounded-lg bg-[#dc2626] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 13: BUSINESS REPORT / INCOME & EXPENSE (Accounts Entry Portal)
 * ========================================================================== */
export const BusinessReportView: React.FC = () => {
  const { financials, addFinancialRecord, exportDataAsCSV, notify } = useErp();

  const [entryMode, setEntryMode] = useState<'Income' | 'Expense'>('Income');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('Product Sales');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!num || num <= 0) return;
    addFinancialRecord({
      date,
      type: entryMode,
      category,
      description: description || `${entryMode} - ${category}`,
      expense: entryMode === 'Expense' ? num : 0,
      income: entryMode === 'Income' ? num : 0,
      accountType: 'Cash',
    });
    setDescription('');
    setAmount('');
    notify(`${entryMode} of ৳${num} recorded in Statement Records!`);
  };

  const filtered = financials.filter(
    (f) =>
      !search.trim() ||
      f.description.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalExpense = filtered.reduce((s, f) => s + f.expense, 0);
  const totalIncome = filtered.reduce((s, f) => s + f.income, 0);
  const netTotal = totalIncome - totalExpense;

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <span>💵 Business Report</span>
        </div>
        <span className="text-xs font-medium text-white/90">Accounts Entry Portal</span>
      </div>

      {/* Top Split: Add Income/Expense Form (Left) + Income vs Expense Trend Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setEntryMode('Income')}
              className={`flex items-center gap-2 font-bold text-base cursor-pointer ${
                entryMode === 'Income' ? 'text-gray-900 dark:text-white' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  entryMode === 'Income' ? 'bg-[#1d4ed8]' : 'bg-gray-300'
                }`}
              >
                <Plus className="w-5 h-5" />
              </span>
              <span>Add Income</span>
            </button>

            <button
              type="button"
              onClick={() => setEntryMode('Expense')}
              className={`flex items-center gap-2 font-bold text-base cursor-pointer ${
                entryMode === 'Expense' ? 'text-gray-900 dark:text-white' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  entryMode === 'Expense' ? 'bg-[#e61919]' : 'bg-gray-300'
                }`}
              >
                <Plus className="w-5 h-5" />
              </span>
              <span>Add Expense</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs"
              >
                <option value="Product Sales">Product Sales</option>
                <option value="Service Charge">Service Charge</option>
                <option value="Supplier Payment">Supplier Payment</option>
                <option value="Shop Rent & Bills">Shop Rent & Bills</option>
                <option value="Staff Salary">Staff Salary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter details..."
                className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-xs shadow cursor-pointer"
              >
                + Add {entryMode}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Income vs Expense Trend Card matching Page 13 */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-gray-800 dark:text-white">📈 Income vs Expense</div>
            <div className="text-[10px] text-gray-400">Last 6 months trend</div>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs my-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-[#e11d48]" /> Expenses
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-[#2563eb]" /> Income
            </span>
          </div>

          <div className="h-44 flex flex-col justify-between border-b border-gray-200 relative px-6 py-2">
            {[1.0, 0.8, 0.6, 0.4, 0.2, 0].map((v) => (
              <div key={v} className="border-b border-gray-100 text-[9px] text-gray-400 font-mono">
                {v.toFixed(1)}
              </div>
            ))}
            <div className="absolute bottom-2 left-12 right-6 h-0.5 bg-[#e11d48] flex justify-between items-center">
              {['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'].map((m) => (
                <span key={m} className="w-2 h-2 rounded-full bg-[#e11d48]" />
              ))}
            </div>
          </div>

          <div className="flex justify-between pl-10 pr-4 pt-1 text-[10px] text-gray-400 font-mono">
            <span>Apr 2026</span>
            <span>May 2026</span>
            <span>Jun 2026</span>
            <span>Jul 2026</span>
            <span>Aug 2026</span>
            <span>Sep 2026</span>
          </div>
        </div>
      </div>

      {/* 4 Colored Account Balance Cards matching Page 13 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#7dd3fc] rounded-xl p-4 shadow-sm text-gray-900">
          <div className="text-xs font-medium">Cash Balance</div>
          <div className="text-2xl font-extrabold font-mono mt-2">
            ৳ {(150700 + netTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-[#a7f3d0] rounded-xl p-4 shadow-sm text-gray-900">
          <div className="text-xs font-medium">Bank Account Balance</div>
          <div className="text-2xl font-extrabold font-mono mt-2">৳ 44,50,750.00</div>
        </div>

        <div className="bg-[#fb7185] rounded-xl p-4 shadow-sm text-gray-900">
          <div className="text-xs font-medium">Mobile Banking Balance</div>
          <div className="text-2xl font-extrabold font-mono mt-2">৳ 40,900.00</div>
        </div>

        <div className="bg-[#4ade80] rounded-xl p-4 shadow-sm text-gray-900">
          <div className="text-xs font-medium">Total Balance</div>
          <div className="text-2xl font-extrabold font-mono mt-2">
            ৳ {(4642350 + netTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Date Range Pill */}
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5e35b1] text-white text-xs font-semibold shadow">
          <Calendar className="w-3.5 h-3.5" />
          <span>Sep 1, 2026 - Sep 26, 2026 ▾</span>
        </div>
      </div>

      {/* Statement Records Table matching bottom of Page 13 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#1e3a8a] dark:text-sky-300">📄 Statement Records</h3>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['Copy', 'CSV', 'Excel', 'PDF', 'Print'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'Print') window.print();
                  else
                    exportDataAsCSV(
                      `Statement_Records_${btn}`,
                      filtered.map((f) => ({
                        Date: f.date,
                        Description: f.description,
                        Expense: f.expense,
                        Income: f.income,
                        NetBalance: f.netBalance,
                      }))
                    );
                }}
                className="px-4 py-1.5 rounded bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-bold cursor-pointer"
              >
                {btn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 px-3 rounded border border-gray-300 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-300 font-bold text-[11px] uppercase">
                <th className="py-2.5 px-4">DATE</th>
                <th className="py-2.5 px-4">DESCRIPTION</th>
                <th className="py-2.5 px-4 text-right">EXPENSE</th>
                <th className="py-2.5 px-4 text-right">INCOME</th>
                <th className="py-2.5 px-4 text-right">NET BALANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                filtered.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                    <td className="py-2.5 px-4 font-mono">{rec.date}</td>
                    <td className="py-2.5 px-4">{rec.description}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-red-600">
                      {rec.expense > 0 ? `৳ ${rec.expense}` : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-600">
                      {rec.income > 0 ? `৳ ${rec.income}` : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-blue-600">
                      ৳ {rec.netBalance}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-400 font-bold text-xs">
                <td colSpan={2} className="py-2.5 px-4 text-right">
                  Totals
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-red-600">৳ {totalExpense}</td>
                <td className="py-2.5 px-4 text-right font-mono text-emerald-600">৳ {totalIncome}</td>
                <td className="py-2.5 px-4 text-right font-mono text-blue-600">৳ {netTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 15: COUPONS
 * ========================================================================== */
export const CouponsView: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon } = useErp();

  const [code, setCode] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [minimumAmount, setMinimumAmount] = useState('');
  const [startDate, setStartDate] = useState('16 Oct 2026');
  const [endDate, setEndDate] = useState('31 Oct 2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    addCoupon({
      code: code.toUpperCase(),
      discountRate: Number(discountRate) || 5,
      minimumAmount: Number(minimumAmount) || 500,
      startDate,
      endDate,
    });
    setCode('');
    setDiscountRate('');
    setMinimumAmount('');
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-6">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold">Coupons</div>
        <span className="text-xs font-medium text-white/90">Sale Entry Portal</span>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. BIJOY26"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono uppercase"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Discount Rate (%)</label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="5"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Minimum Amount</label>
            <input
              type="number"
              value={minimumAmount}
              onChange={(e) => setMinimumAmount(e.target.value)}
              placeholder="500"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date</label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="w-48 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
            >
              Add New Coupon
            </button>
          </div>
        </div>
      </form>

      <div className="max-w-5xl overflow-x-auto pt-2">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-500 font-bold text-sm">
              <th className="py-2.5 px-3">Coupon Code</th>
              <th className="py-2.5 px-3">Discount</th>
              <th className="py-2.5 px-3">Minimum Amount</th>
              <th className="py-2.5 px-3">Start Date</th>
              <th className="py-2.5 px-3">End Date</th>
              <th className="py-2.5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {coupons.map((c, idx) => (
              <tr
                key={c.id}
                className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/60'}
              >
                <td className="py-3 px-3 font-mono font-bold">{c.code}</td>
                <td className="py-3 px-3 font-mono">{c.discountRate}%</td>
                <td className="py-3 px-3 font-mono">{c.minimumAmount}</td>
                <td className="py-3 px-3 font-mono">{c.startDate}</td>
                <td className="py-3 px-3 font-mono">{c.endDate}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setCode(c.code);
                        setDiscountRate(String(c.discountRate));
                        setMinimumAmount(String(c.minimumAmount));
                      }}
                      className="w-7 h-7 rounded bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="w-7 h-7 rounded bg-[#dc2626] text-white flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 16: PAYMENT (Payment by Branch and Customer)
 * ========================================================================== */
export const PaymentView: React.FC = () => {
  const { payments, addPaymentRequest, notify } = useErp();

  const [paymentDetails, setPaymentDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentBy, setPaymentBy] = useState('');
  const [mobileOperator, setMobileOperator] = useState('');
  const [slipNo, setSlipNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [targetAgentNo, setTargetAgentNo] = useState('');
  const [transactionNo, setTransactionNo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPaymentRequest({
      paymentDetails: paymentDetails || 'Branch/Customer Payment',
      amount: Number(amount) || 0,
      paymentBy: paymentBy || 'Humayoun Kabir',
      mobileOperator: mobileOperator || 'bKash',
      slipNo: slipNo || 'N/A',
      invoiceNo: invoiceNo || 'INV20321',
      targetAgentNo: targetAgentNo || '01923862251',
      transactionNo: transactionNo || `TXN${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
    });
    setPaymentDetails('');
    setAmount('');
    setPaymentBy('');
    setSlipNo('');
    setInvoiceNo('');
    setTransactionNo('');
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-6">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold">Payment</div>
        <span className="text-xs font-medium text-white/90">Payment by Branch and Customer</span>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Payment Details</label>
            <input
              type="text"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Payment by</label>
            <input
              type="text"
              value={paymentBy}
              onChange={(e) => setPaymentBy(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Mobile Banking Operator</label>
            <input
              type="text"
              value={mobileOperator}
              onChange={(e) => setMobileOperator(e.target.value)}
              placeholder="bKash / Nagad / Rocket / Bank"
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Slip/chique No</label>
            <input
              type="text"
              value={slipNo}
              onChange={(e) => setSlipNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Invoice No</label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Target Agent/Marchent No</label>
            <input
              type="text"
              value={targetAgentNo}
              onChange={(e) => setTargetAgentNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Transection No</label>
            <input
              type="text"
              value={transactionNo}
              onChange={(e) => setTransactionNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div className="flex items-end gap-4">
            <div className="w-14 h-12 rounded-lg bg-gray-400/70 flex items-center justify-center text-white shrink-0">
              <Camera className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">
                Upload Chique/Slip/Screenshort
              </label>
              <label className="flex items-center justify-end h-11 px-4 rounded-full bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>Browse File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={() => notify('Payment slip screenshot attached!')}
                />
              </label>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="w-48 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
            >
              Pay Request
            </button>
          </div>
        </div>
      </form>

      {payments.length > 0 && (
        <div className="max-w-5xl pt-4">
          <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Recent Payment Requests</h4>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-300 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 dark:bg-slate-700 font-bold">
                <tr>
                  <th className="py-2 px-3">Invoice</th>
                  <th className="py-2 px-3">Payment By</th>
                  <th className="py-2 px-3">Details</th>
                  <th className="py-2 px-3">Operator</th>
                  <th className="py-2 px-3">Txn No</th>
                  <th className="py-2 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 px-3 font-mono font-bold">{p.invoiceNo}</td>
                    <td className="py-2 px-3">{p.paymentBy}</td>
                    <td className="py-2 px-3">{p.paymentDetails}</td>
                    <td className="py-2 px-3">{p.mobileOperator}</td>
                    <td className="py-2 px-3 font-mono">{p.transactionNo}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">৳{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 17: WITHDRAWS (Withdraw from business)
 * ========================================================================== */
export const WithdrawsView: React.FC = () => {
  const { withdraws, updateWithdrawStatus, notify } = useErp();

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold">Withdraws</div>
        <span className="text-xs font-medium text-white/90">Withdraw from business</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="border-y-2 border-gray-500 text-gray-900 dark:text-white font-bold text-sm">
              <th className="py-2.5 px-3">SL</th>
              <th className="py-2.5 px-3">Trans ID</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">photo</th>
              <th className="py-2.5 px-3 text-left">User</th>
              <th className="py-2.5 px-3">Payment Type</th>
              <th className="py-2.5 px-3">Request Date</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
            {withdraws.map((w, idx) => (
              <tr
                key={w.id}
                className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/80 dark:bg-slate-800/60'}
              >
                <td className="py-3.5 px-3 font-mono">{idx + 1}</td>
                <td className="py-3.5 px-3 font-mono font-bold">{w.transId}</td>
                <td className="py-3.5 px-3 font-mono font-bold">{w.amount}</td>
                <td className="py-3.5 px-3">
                  <img
                    src={w.photo}
                    alt={w.userName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded object-cover mx-auto border bg-white"
                  />
                </td>
                <td className="py-3.5 px-3 text-left">
                  <div className="font-bold">{w.userName},</div>
                  <div className="text-gray-600 dark:text-slate-300">{w.userRoleBranch}</div>
                </td>
                <td className="py-3.5 px-3">{w.paymentType}</td>
                <td className="py-3.5 px-3 font-mono text-[11px]">{w.requestDate}</td>
                <td className="py-3.5 px-3">
                  <span
                    className={`inline-block px-5 py-1.5 rounded-full text-white font-bold text-xs shadow-xs ${
                      w.status === 'Pending'
                        ? 'bg-[#0284c7]'
                        : w.status === 'Approved'
                        ? 'bg-[#1d4ed8]'
                        : 'bg-[#b91c1c]'
                    }`}
                  >
                    {w.status}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        notify(`Withdrawal ${w.transId}: ৳${w.amount} by ${w.userName} (${w.status})`)
                      }
                      className="w-8 h-8 rounded-lg bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                      title="Inspect Request"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const nextStatus =
                          w.status === 'Pending'
                            ? 'Approved'
                            : w.status === 'Approved'
                            ? 'Denied'
                            : 'Approved';
                        updateWithdrawStatus(w.id, nextStatus);
                      }}
                      className="w-8 h-8 rounded-lg bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      title="Toggle Approve / Deny"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
