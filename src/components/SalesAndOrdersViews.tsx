import React, { useState } from 'react';
import {
  FileText,
  Plus,
  ShoppingCart,
  Trash2,
  Search,
  Eye,
  Pencil,
  MessageCircle,
  Printer,
  X,
  QrCode,
  Phone,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { OrderItem, OrderLineItem } from '../types/erp';
import { numberToWordsBDT } from '../data/initialData';

/* ============================================================================
 * PAGE 7: ADD SALE (Sale Entry Portal)
 * ========================================================================== */
export const AddSaleView: React.FC = () => {
  const {
    customers,
    products,
    orders,
    addOrder,
    setRoute,
    openPrintModal,
    currentUser,
  } = useErp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'cust_1');
  const [invoiceNo, setInvoiceNo] = useState(`INV${20323 + orders.length}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [lines, setLines] = useState<OrderLineItem[]>([
    {
      productId: products[0].id,
      proId: products[0].proId,
      name: products[0].name,
      photo: products[0].photo,
      serials: ['26061205', '26061206', '26061207'],
      warranty: '12 Month Warranty',
      qty: 3,
      price: 950,
      total: 2850,
    },
    {
      productId: products[1].id,
      proId: products[1].proId,
      name: products[1].name,
      photo: products[1].photo,
      serials: ['26061507', '26061508'],
      warranty: '12 Month Warranty',
      qty: 2,
      price: 350,
      total: 700,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [customerPaid, setCustomerPaid] = useState<number>(3550);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<OrderItem['status']>('Completed');
  const [paymentType, setPaymentType] = useState<OrderItem['paymentMethod']>('Cash');

  const handleAddProductToSale = (prodId: string) => {
    if (!prodId) return;
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === prod.id);
      if (existing) {
        return prev.map((l) =>
          l.productId === prod.id
            ? { ...l, qty: l.qty + 1, total: (l.qty + 1) * l.price }
            : l
        );
      }
      return [
        ...prev,
        {
          productId: prod.id,
          proId: prod.proId,
          name: prod.name,
          photo: prod.photo,
          serials: prod.branchSerials.mainActive.slice(0, 1),
          warranty: `${prod.warranty} Warranty`,
          qty: 1,
          price: prod.sellPrice,
          total: prod.sellPrice,
        },
      ];
    });
  };

  const updateLineQty = (prodId: string, delta: number) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.productId !== prodId) return l;
        const nextQty = Math.max(1, l.qty + delta);
        return { ...l, qty: nextQty, total: nextQty * l.price };
      })
    );
  };

  const removeLine = (prodId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== prodId));
  };

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const grandTotal = Math.max(0, subtotal - discount + tax);
  const dueAmount = Math.max(0, grandTotal - customerPaid);

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];
    const created = addOrder({
      invoiceNo,
      date: `${date} 12:45 PM`,
      timeAgo: 'Just now',
      customerId: cust.id,
      customerName: cust.name,
      customerType: cust.customerType,
      mobile: cust.mobile,
      address: cust.address,
      operator: `${currentUser.name}, Main Br`,
      branch: 'Main Branch',
      items: lines,
      subtotal,
      discount,
      tax,
      grandTotal,
      paidAmount: customerPaid,
      dueAmount,
      status,
      paymentMethod: paymentType,
      deliveryType: 'Shop Pickup',
      note,
    });
    setInvoiceNo(`INV${20324 + orders.length}`);
    openPrintModal({ mode: 'a4', order: created });
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <FileText className="w-5 h-5" />
          <span>Add Sale</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRoute('all-orders')}
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold cursor-pointer"
          >
            All Orders
          </button>
          <span className="text-xs font-medium text-white/90">Sale Entry Portal</span>
        </div>
      </div>

      <form onSubmit={handleGenerateInvoice} className="space-y-4 max-w-6xl">
        {/* Row 1: Customer Selection, Invoice No, Date */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-6 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
                Customer Selection
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.mobile}) - {c.customerType}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setRoute('customers')}
              className="w-10 h-10 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white flex items-center justify-center font-bold shadow cursor-pointer"
              title="Add Customer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Invoice No
            </label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono font-bold"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
        </div>

        {/* Row 2: Products Selection Dropdown */}
        <div className="max-w-md">
          <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
            Products Selection
          </label>
          <div className="relative">
            <select
              onChange={(e) => {
                handleAddProductToSale(e.target.value);
                e.target.value = '';
              }}
              defaultValue=""
              className="w-full h-11 pl-9 pr-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="" disabled>
                Search or Select Product to Add...
              </option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ৳{p.sellPrice} (Stock: {p.stock})
                </option>
              ))}
            </select>
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Selected Products Table matching Page 7 */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-base font-bold">
            <ShoppingCart className="w-5 h-5" />
            <span>Selected Products</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-t-2 border-b border-gray-500 text-gray-900 dark:text-white font-bold text-sm">
                  <th className="py-2 px-3">SL</th>
                  <th className="py-2 px-3">Photo</th>
                  <th className="py-2 px-3">Products Name</th>
                  <th className="py-2 px-3 text-center">Qty</th>
                  <th className="py-2 px-3 text-center">Price</th>
                  <th className="py-2 px-3 text-center">Total</th>
                  <th className="py-2 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
                {lines.map((item, idx) => (
                  <tr
                    key={item.productId}
                    className={idx % 2 === 0 ? 'bg-[#c5d6cb] dark:bg-slate-800' : 'bg-[#e8ece9] dark:bg-slate-800/60'}
                  >
                    <td className="py-3 px-3 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <img
                        src={item.photo}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-8 object-cover rounded bg-white border"
                      />
                    </td>
                    <td className="py-3 px-3 max-w-md">
                      <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-[11px] font-mono text-gray-700 dark:text-slate-300">
                        SN: {item.serials.join(', ') || 'N/A'}
                      </div>
                      <div className="text-[11px] text-gray-700 dark:text-slate-300">{item.warranty}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      <div className="inline-flex items-center gap-2 font-bold">
                        <button
                          type="button"
                          onClick={() => updateLineQty(item.productId, -1)}
                          className="px-1.5 py-0.5 hover:bg-black/10 rounded cursor-pointer"
                        >
                          ◀
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateLineQty(item.productId, 1)}
                          className="px-1.5 py-0.5 hover:bg-black/10 rounded cursor-pointer"
                        >
                          ▶
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold">{item.price}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold">{item.total}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeLine(item.productId)}
                        className="w-8 h-8 rounded-lg bg-[#f41c1c] hover:bg-[#c81414] text-white inline-flex items-center justify-center shadow cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-500 pt-2 flex justify-end pr-16 text-lg font-bold text-[#148f5a] font-mono">
            <span>Total &nbsp;&nbsp;&nbsp;&nbsp; BDT {subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Adjustment (Left) & Green Summary Box (Right) matching Page 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 items-start">
          {/* Left: Payment Adjustment */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-base font-bold text-gray-800 dark:text-white">Payment Adjustment</h3>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount</label>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-bold">
                  FLAT
                </span>
                <input
                  type="number"
                  value={discount || ''}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  placeholder="0.00"
                  className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Tax %</label>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-bold">
                  FLAT
                </span>
                <input
                  type="number"
                  value={tax || ''}
                  onChange={(e) => setTax(Number(e.target.value))}
                  placeholder="0.00"
                  className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Note</label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-[#1e6b2b] text-xs"
              />
            </div>

            <div className="pt-1 text-xs font-bold text-gray-900 dark:text-white">
              Taka in Word: <span className="font-normal">{numberToWordsBDT(grandTotal)}</span>
            </div>
          </div>

          {/* Right: Green Summary Card + Status & Payment Type */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#1ea362] rounded-xl p-5 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between text-lg font-bold font-mono">
                <span>Total</span>
                <span>BDT {grandTotal.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-xs text-white/90 mb-1">💳 Customer Paid</label>
                <input
                  type="number"
                  value={customerPaid}
                  onChange={(e) => setCustomerPaid(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl bg-white text-gray-900 text-right font-mono font-extrabold text-base focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-white/90 mb-1">🔔 Due</label>
                <input
                  type="text"
                  readOnly
                  value={dueAmount.toFixed(2)}
                  className="w-full h-10 px-3 rounded-xl bg-white text-red-600 text-right font-mono font-extrabold text-base focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderItem['status'])}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-sm font-medium"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Type</label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value as OrderItem['paymentMethod'])}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-sm font-medium"
                >
                  <option value="Cash">Cash</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="COD">COD</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-48 h-11 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-sm shadow-md cursor-pointer"
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Bottom Recent Invoices List matching Page 7 */}
      <div className="max-w-5xl border-t border-gray-400 pt-4 space-y-1 text-xs">
        {orders.slice(0, 3).map((ord, idx) => (
          <div
            key={ord.id}
            onClick={() => openPrintModal({ mode: 'a4', order: ord })}
            className={`grid grid-cols-4 items-center py-2.5 px-6 rounded cursor-pointer ${
              idx % 2 === 1 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'hover:bg-white/50'
            }`}
          >
            <div className="font-mono font-bold">
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
            <div className="text-gray-700 truncate">{ord.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 8: ALL ORDERS (with Live Invoice Preview & Approve/Denied/Waiting/Print)
 * ========================================================================== */
export const AllOrdersView: React.FC = () => {
  const { orders, updateOrderStatus, openPrintModal, notify } = useErp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(orders[0]);

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesQuery =
      !search.trim() ||
      o.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.mobile.includes(search);
    return matchesStatus && matchesQuery;
  });

  const activeOrder = orders.find((o) => o.id === selectedOrder?.id) || orders[0];

  const getStatusBadgeStyle = (st: OrderItem['status']) => {
    switch (st) {
      case 'Pending':
        return 'bg-[#f4c430] text-white';
      case 'Processing':
        return 'bg-[#0284c7] text-white';
      case 'Completed':
        return 'bg-[#1ea362] text-white';
      case 'Cancel':
        return 'bg-[#e61919] text-white';
    }
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-4">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <ShoppingCart className="w-5 h-5" />
          <span>All Orders</span>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center bg-white dark:bg-slate-800 rounded-full px-4 h-10 w-64 border border-gray-500">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-xs w-full focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-500 text-xs font-bold w-40"
        >
          <option value="All">Filter (All)</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancel">Cancel</option>
        </select>
      </div>

      {/* Orders Table matching Page 8 */}
      <div className="overflow-x-auto bg-white/50 dark:bg-slate-800 rounded-xl border border-gray-400">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-500 text-gray-900 dark:text-white font-bold">
              <th className="py-2.5 px-3">Order No</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Customer Name</th>
              <th className="py-2.5 px-3">Operator</th>
              <th className="py-2.5 px-3 text-center">Amount</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-center">Payment Method</th>
              <th className="py-2.5 px-3">Address</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
            {filtered.map((ord, idx) => (
              <tr
                key={ord.id}
                onClick={() => setSelectedOrder(ord)}
                className={`cursor-pointer transition-colors ${
                  activeOrder?.id === ord.id
                    ? 'bg-[#bfd4c4] dark:bg-emerald-950/50'
                    : idx % 2 === 0
                    ? 'bg-[#d5e3d8] dark:bg-slate-800'
                    : 'bg-white dark:bg-slate-800/60'
                }`}
              >
                <td className="py-2.5 px-3 font-mono font-bold">{ord.invoiceNo}</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">{ord.date}</td>
                <td className="py-2.5 px-3">
                  <div className="font-bold">{ord.customerName}</div>
                  <div className="text-gray-600 dark:text-slate-400">{ord.customerType}</div>
                </td>
                <td className="py-2.5 px-3 text-[11px]">{ord.operator}</td>
                <td className="py-2.5 px-3 text-center font-mono font-bold">
                  {ord.grandTotal.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${getStatusBadgeStyle(
                      ord.status
                    )}`}
                  >
                    {ord.status === 'Completed' ? 'Complited' : ord.status === 'Processing' ? 'Procesing' : ord.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center font-medium">{ord.paymentMethod}</td>
                <td className="py-2.5 px-3 max-w-[140px] truncate">{ord.address}</td>
                <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="w-7 h-7 rounded-lg bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                      title="Preview Invoice"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openPrintModal({ mode: 'a4', order: ord })}
                      className="w-7 h-7 rounded-lg bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      title="Edit / Print"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        notify(`Invoice ${ord.invoiceNo} link sent via WhatsApp to ${ord.mobile}`)
                      }
                      className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                      title="Send on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Right Invoice Preview Card & Action Buttons matching Page 8 */}
      {activeOrder && (
        <div className="flex justify-end pt-2">
          <div className="w-full max-w-[540px] space-y-3">
            <div className="bg-[#d8dedc] text-gray-900 border-2 border-[#0284c7] rounded-sm p-5 shadow-md text-xs space-y-3">
              {/* Top Header of Receipt */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="w-11 h-9 border-2 border-black flex items-center justify-center font-extrabold text-sm mt-1">
                    DT
                  </div>
                  <div>
                    <div className="text-base font-extrabold leading-tight">Diamond Tech</div>
                    <div className="text-[11px] text-gray-700">Your Trusted Partner</div>
                    <div className="text-[11px] text-gray-700">Jhikargacha, Jashore</div>
                    <div className="text-[11px] font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3 text-red-600 fill-current" /> 01923862251
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="flex items-center justify-end gap-[1px] h-4 mb-1">
                    {[2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 3, 1].map((w, i) => (
                      <span key={i} style={{ width: `${w}px` }} className="h-full bg-black inline-block" />
                    ))}
                  </div>
                  <div className="font-bold">{activeOrder.paymentMethod}</div>
                  <div className="font-bold">{activeOrder.invoiceNo}</div>
                  <div className="text-[11px]">{activeOrder.date}</div>
                  <div className="font-sans font-semibold">{activeOrder.customerType}</div>
                  <div className="font-sans text-[11px]">{activeOrder.deliveryType}</div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-0.5 text-xs pt-1">
                <div className="grid grid-cols-12">
                  <span className="col-span-4">Customer Name</span>
                  <span className="col-span-8 font-bold">: {activeOrder.customerName}</span>
                </div>
                <div className="grid grid-cols-12">
                  <span className="col-span-4">Mobile No</span>
                  <span className="col-span-8 font-mono">: {activeOrder.mobile}</span>
                </div>
                <div className="grid grid-cols-12">
                  <span className="col-span-4">Address</span>
                  <span className="col-span-8">: {activeOrder.address}</span>
                </div>
              </div>

              <div className="font-mono text-[10px] tracking-tighter overflow-hidden whitespace-nowrap text-gray-600">
                ======================================================================
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-y border-gray-600 font-bold">
                    <th className="py-1 px-1.5">SL</th>
                    <th className="py-1 px-1.5">Particuler</th>
                    <th className="py-1 px-1.5 text-center">Unit</th>
                    <th className="py-1 px-1.5 text-center">Price</th>
                    <th className="py-1 px-1.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400/50">
                  {activeOrder.items.map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#bfd4c4]' : 'bg-transparent'}
                    >
                      <td className="py-1.5 px-1.5 align-top font-mono">{idx + 1}</td>
                      <td className="py-1.5 px-1.5">
                        <div className="font-bold">{item.name}</div>
                        <div className="font-mono text-[10px]">
                          SN: {item.serials.join(', ')}
                        </div>
                        <div className="text-[10px]">{item.warranty}</div>
                      </td>
                      <td className="py-1.5 px-1.5 align-top text-center font-mono">{item.qty}</td>
                      <td className="py-1.5 px-1.5 align-top text-center font-mono">{item.price}</td>
                      <td className="py-1.5 px-1.5 align-top text-right font-mono font-bold">
                        {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="border-t border-gray-600 pt-2 space-y-0.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-mono font-bold">: {activeOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-mono font-bold">: {activeOrder.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cupon</span>
                  <span className="font-mono font-bold">: {activeOrder.couponCode || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delevary Charge</span>
                  <span className="font-mono font-bold">
                    : {activeOrder.deliveryCharge ? activeOrder.deliveryCharge : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Grand Total Payable</span>
                  <span className="font-mono">: {activeOrder.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="font-bold text-[11px] pt-1">
                In Word: {numberToWordsBDT(activeOrder.grandTotal)}
              </div>

              {/* QR & Signature Footer */}
              <div className="flex items-end justify-between pt-3">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-1 border border-gray-400">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
                  <span className="text-[9px] mt-0.5">Scan to verify Invoice</span>
                </div>

                <div className="text-right text-xs font-medium">{activeOrder.operator.split(',')[0]}</div>
              </div>
            </div>

            {/* Bottom 4 Action Buttons matching Page 8 */}
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={() => updateOrderStatus(activeOrder.id, 'Completed')}
                className="py-2 rounded-full bg-[#388e3c] hover:bg-[#2e7d32] text-white font-bold text-xs shadow cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => updateOrderStatus(activeOrder.id, 'Cancel')}
                className="py-2 rounded-full bg-[#e61919] hover:bg-[#c21313] text-white font-bold text-xs shadow cursor-pointer"
              >
                Denied
              </button>
              <button
                onClick={() => updateOrderStatus(activeOrder.id, 'Processing')}
                className="py-2 rounded-full bg-[#702963] hover:bg-[#571f4d] text-white font-bold text-xs shadow cursor-pointer"
              >
                Waiting
              </button>
              <button
                onClick={() => openPrintModal({ mode: 'a4', order: activeOrder })}
                className="py-2 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 9: CREATE QUOTATION (Quotation Entry Portal)
 * ========================================================================== */
export const CreateQuotationView: React.FC = () => {
  const { customers, products, quotations, addQuotation, setRoute, notify } = useErp();

  const [customerName, setCustomerName] = useState(customers[0]?.name || 'Humayoun Kabir');
  const [quotationNo, setQuotationNo] = useState(`QT20260${quotations.length + 1}`);
  const [date, setDate] = useState('2026-09-28');
  const [expiryDate, setExpiryDate] = useState('2026-10-15');
  const [note, setNote] = useState('');

  const [lines, setLines] = useState<OrderLineItem[]>([
    {
      productId: products[0].id,
      proId: products[0].proId,
      name: products[0].name,
      photo: products[0].photo,
      serials: ['26061205', '26061206', '26061207'],
      warranty: '12 Month Warranty',
      qty: 3,
      price: 950,
      total: 2850,
    },
    {
      productId: products[1].id,
      proId: products[1].proId,
      name: products[1].name,
      photo: products[1].photo,
      serials: ['26061507', '26061508'],
      warranty: '12 Month Warranty',
      qty: 2,
      price: 350,
      total: 700,
    },
  ]);

  const [discount, setDiscount] = useState(50);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(130);

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const total = Math.max(0, subtotal - discount + tax + shipping);

  const handleAddProduct = (prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;
    setLines((prev) => [
      ...prev,
      {
        productId: prod.id,
        proId: prod.proId,
        name: prod.name,
        photo: prod.photo,
        serials: prod.branchSerials.mainActive.slice(0, 1),
        warranty: `${prod.warranty} Warranty`,
        qty: 1,
        price: prod.sellPrice,
        total: prod.sellPrice,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuotation({
      quotationNo,
      date,
      expiryDate,
      customerName,
      items: lines,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      note,
    });
    window.print();
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <FileText className="w-5 h-5" />
          <span>Create Quotation</span>
        </div>
        <span className="text-xs font-medium text-white/90">Quotation Entry Portal</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-6xl">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-6 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Customer Selection</label>
              <select
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.mobile})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setRoute('customers')}
              className="w-10 h-10 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Quotation No</label>
            <input
              type="text"
              value={quotationNo}
              onChange={(e) => setQuotationNo(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-6 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Products Selection</label>
              <select
                onChange={(e) => {
                  handleAddProduct(e.target.value);
                  e.target.value = '';
                }}
                defaultValue=""
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                <option value="" disabled>
                  Select Product to Quote...
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ৳{p.sellPrice}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setRoute('add-product')}
              className="w-10 h-10 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Note</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
        </div>

        {/* Selected Products Table */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-base font-bold">
            <ShoppingCart className="w-5 h-5" />
            <span>Selected Products</span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-t-2 border-b border-gray-500 font-bold text-sm">
                <th className="py-2 px-3">SL</th>
                <th className="py-2 px-3">Photo</th>
                <th className="py-2 px-3">Products Name</th>
                <th className="py-2 px-3 text-center">Qty</th>
                <th className="py-2 px-3 text-center">Price</th>
                <th className="py-2 px-3 text-center">Total</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {lines.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-[#c5d6cb] dark:bg-slate-800' : 'bg-white/60 dark:bg-slate-800/50'}>
                  <td className="py-3 px-3 font-mono">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <img src={item.photo} alt={item.name} referrerPolicy="no-referrer" className="w-10 h-8 object-cover rounded border bg-white" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[11px] font-mono">SN: {item.serials.join(', ')}</div>
                    <div className="text-[11px]">{item.warranty}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <button
                      type="button"
                      onClick={() =>
                        setLines((prev) =>
                          prev.map((l, i) =>
                            i === idx ? { ...l, qty: Math.max(1, l.qty - 1), total: Math.max(1, l.qty - 1) * l.price } : l
                          )
                        )
                      }
                      className="px-1.5"
                    >
                      ◀
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setLines((prev) =>
                          prev.map((l, i) =>
                            i === idx ? { ...l, qty: l.qty + 1, total: (l.qty + 1) * l.price } : l
                          )
                        )
                      }
                      className="px-1.5"
                    >
                      ▶
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{item.price}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold">{item.total}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setLines((prev) => prev.filter((_, i) => i !== idx))}
                      className="w-8 h-8 rounded-lg bg-[#f41c1c] text-white inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-gray-500 pt-2 flex justify-end pr-16 text-lg font-bold text-[#148f5a] font-mono">
            <span>Subtotal &nbsp;&nbsp;&nbsp;&nbsp; BDT {subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Bottom Payment Adjustment matching Page 9 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          <div className="lg:col-span-7 text-xs font-bold pt-2">
            Taka in Word: <span className="font-normal">{numberToWordsBDT(total)}</span>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-base font-bold">Payment Adjustment</h3>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount</label>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-bold">
                  FLAT
                </span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-right font-mono font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Tax %</label>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-2 rounded-lg bg-[#16a34a] text-white text-xs font-bold">
                  FLAT
                </span>
                <input
                  type="number"
                  value={tax || ''}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-right font-mono font-bold text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">Shipping</span>
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value))}
                className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-[#1e6b2b] text-right font-mono font-bold text-sm"
              />
            </div>

            <div className="flex justify-end text-lg font-bold text-[#148f5a] font-mono pt-1">
              <span>Total &nbsp;&nbsp;&nbsp;&nbsp; BDT {total.toFixed(2)}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                onClick={() => notify(`Quotation ${quotationNo} generated and ready to print!`)}
                className="w-52 h-11 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-sm shadow-md cursor-pointer"
              >
                Generate Quotation
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ============================================================================
 * PAGE 31: DOCUMENTS PRINT TEMPLATE MODAL
 * Supports: 70 mm Thermal (POS) Paper, A4 Plain Paper, 50x25 mm Level
 * ========================================================================== */
export const PrintTemplateModal: React.FC = () => {
  const { printModal, closePrintModal, orders, products } = useErp();
  const [activeFormat, setActiveFormat] = useState<'all' | 'pos' | 'a4' | 'label'>('all');

  if (!printModal.open) return null;

  const order = printModal.order || orders[0];
  const product = printModal.product || products[0];
  const serial = printModal.serialNo || '26061205';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#e8e8e8] rounded-2xl shadow-2xl w-full max-w-6xl max-h-[94vh] overflow-y-auto border-2 border-[#d9531e]">
        {/* Top Banner matching Page 31 */}
        <div className="bg-[#d9531e] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-10 no-print">
          <h2 className="text-xl font-extrabold tracking-wide">Documents Print Template</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat('all')}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                activeFormat === 'all' ? 'bg-white text-[#d9531e]' : 'bg-black/20 text-white'
              }`}
            >
              All 3 Templates (Side-by-Side)
            </button>
            <button
              onClick={() => setActiveFormat('pos')}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                activeFormat === 'pos' ? 'bg-white text-[#d9531e]' : 'bg-black/20 text-white'
              }`}
            >
              70 mm Thermal (POS)
            </button>
            <button
              onClick={() => setActiveFormat('a4')}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                activeFormat === 'a4' ? 'bg-white text-[#d9531e]' : 'bg-black/20 text-white'
              }`}
            >
              A4 Plain Paper
            </button>
            <button
              onClick={() => setActiveFormat('label')}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                activeFormat === 'label' ? 'bg-white text-[#d9531e]' : 'bg-black/20 text-white'
              }`}
            >
              50x25 mm Label
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 rounded-full bg-[#002855] hover:bg-[#001835] text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer ml-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Now</span>
            </button>
            <button
              onClick={closePrintModal}
              className="p-1 rounded-full hover:bg-black/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-banner */}
        <div className="bg-[#cce4f0] text-center py-1.5 font-bold text-sm text-gray-900 border-b border-gray-300 no-print">
          Invoice & Barcode Label Preview
        </div>

        {/* 3-Column Print Layout matching Page 31 */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-gray-900">
          {/* 1. 70 mm Thermal (POS) Paper */}
          {(activeFormat === 'all' || activeFormat === 'pos') && (
            <div className={activeFormat === 'pos' ? 'lg:col-span-12 flex justify-center' : 'lg:col-span-3'}>
              <div className="w-full max-w-[270px]">
                <div className="bg-[#f7d6e6] text-center py-1.5 font-bold text-xs mb-2 rounded-t no-print">
                  70 mm Thermal (POS) Paper
                </div>
                <div className="bg-white border border-gray-700 p-3 text-[10px] space-y-2 shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-7 border-2 border-black flex items-center justify-center font-extrabold text-xs mb-0.5">
                      DT
                    </div>
                    <div className="text-sm font-extrabold">Diamond Tech</div>
                    <div className="text-[9px]">Your Trusted Partner</div>
                    <div className="text-[9px]">Jhikargacha, Jashore</div>
                    <div className="text-[9px] font-mono">📞 01923862251</div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-[1px] h-4">
                      {[2, 1, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 2].map((w, i) => (
                        <span key={i} style={{ width: `${w}px` }} className="h-full bg-black inline-block" />
                      ))}
                    </div>
                    <div className="text-right font-mono text-[9px]">
                      <div className="font-bold">{order.paymentMethod}</div>
                      <div className="font-bold">{order.invoiceNo}</div>
                      <div>{order.date}</div>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono border-y border-dashed border-gray-500 py-1 space-y-0.5">
                    <div>Customer Name : {order.customerName}</div>
                    <div>Mobile No : {order.mobile}</div>
                    <div>Address : {order.address}</div>
                  </div>

                  <table className="w-full text-left border-collapse text-[9px]">
                    <thead>
                      <tr className="border-b border-gray-600 font-bold">
                        <th className="py-0.5">SL</th>
                        <th className="py-0.5">Particuler</th>
                        <th className="py-0.5 text-center">Un</th>
                        <th className="py-0.5 text-right">Price</th>
                        <th className="py-0.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {order.items.map((it, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-[#d5e3d8]' : ''}>
                          <td className="py-1 align-top font-mono">{idx + 1}</td>
                          <td className="py-1 pr-1">
                            <div className="font-bold leading-tight">{it.name}</div>
                            <div className="font-mono text-[8px]">SN: {it.serials.join(', ')}</div>
                            <div className="text-[8px]">{it.warranty}</div>
                          </td>
                          <td className="py-1 align-top text-center font-mono">{it.qty}</td>
                          <td className="py-1 align-top text-right font-mono">{it.price}</td>
                          <td className="py-1 align-top text-right font-mono font-bold">{it.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="border-t border-gray-600 pt-1 text-[9px] space-y-0.5">
                    <div className="flex justify-between">
                      <span>Total Amount</span>
                      <span className="font-mono font-bold">: {order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="font-mono">: {order.discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cupon</span>
                      <span className="font-mono">: N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delevary Charge</span>
                      <span className="font-mono">: N/A</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Grand Total Payable</span>
                      <span className="font-mono">: {order.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="font-bold text-[8px]">
                    In Word: {numberToWordsBDT(order.grandTotal)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. A4 Plain Paper */}
          {(activeFormat === 'all' || activeFormat === 'a4') && (
            <div className={activeFormat === 'a4' ? 'lg:col-span-12 flex justify-center' : 'lg:col-span-7'}>
              <div className="w-full max-w-2xl">
                <div className="bg-[#f7d6e6] text-center py-1.5 font-bold text-xs mb-2 rounded-t no-print">
                  A4 Plain Paper
                </div>
                <div className="bg-[#eef2f0] border border-gray-600 p-6 text-xs space-y-4 shadow-md min-h-[640px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-11 border-2 border-black flex items-center justify-center font-extrabold text-base mt-1">
                          DT
                        </div>
                        <div>
                          <div className="text-xl font-extrabold">Diamond Tech</div>
                          <div className="text-xs text-gray-700">Your Trusted Partner</div>
                          <div className="text-xs text-gray-700">Jhikargacha, Jashore</div>
                          <div className="text-xs font-mono">📞 01923862251</div>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <div className="flex items-center justify-end gap-[1.5px] h-6 mb-1">
                          {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 2, 3, 1, 2].map((w, i) => (
                            <span key={i} style={{ width: `${w}px` }} className="h-full bg-black inline-block" />
                          ))}
                        </div>
                        <div className="font-bold text-sm">{order.paymentMethod}</div>
                        <div className="font-bold text-sm">{order.invoiceNo}</div>
                        <div className="text-xs">{order.date}</div>
                        <div className="font-sans font-bold">{order.customerType}</div>
                        <div className="font-sans text-xs">{order.deliveryType}</div>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs pt-2">
                      <div className="grid grid-cols-12">
                        <span className="col-span-3">Customer Name</span>
                        <span className="col-span-9 font-bold">: {order.customerName}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-3">Mobile No</span>
                        <span className="col-span-9 font-mono">: {order.mobile}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-3">Address</span>
                        <span className="col-span-9">: {order.address}</span>
                      </div>
                    </div>

                    <div className="font-mono text-[10px] text-gray-500 overflow-hidden whitespace-nowrap">
                      =====================================================================================
                    </div>

                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-y border-gray-600 font-bold">
                          <th className="py-1.5 px-2">SL</th>
                          <th className="py-1.5 px-2">Particuler</th>
                          <th className="py-1.5 px-2 text-center">Unit</th>
                          <th className="py-1.5 px-2 text-center">Price</th>
                          <th className="py-1.5 px-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        {order.items.map((it, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-[#bfd4c4]' : ''}>
                            <td className="py-2 px-2 align-top font-mono">{idx + 1}</td>
                            <td className="py-2 px-2">
                              <div className="font-bold">{it.name}</div>
                              <div className="font-mono text-[11px]">SN: {it.serials.join(', ')}</div>
                              <div className="text-[11px]">{it.warranty}</div>
                            </td>
                            <td className="py-2 px-2 align-top text-center font-mono">{it.qty}</td>
                            <td className="py-2 px-2 align-top text-center font-mono">{it.price}</td>
                            <td className="py-2 px-2 align-top text-right font-mono font-bold">
                              {it.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="border-t border-gray-600 pt-3 max-w-xs ml-auto space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span className="font-mono font-bold">: {order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="font-mono font-bold">: {order.discount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cupon</span>
                        <span className="font-mono font-bold">: N/A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delevary Charge</span>
                        <span className="font-mono font-bold">: N/A</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm">
                        <span>Grand Total Payable</span>
                        <span className="font-mono">: {order.grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="font-bold text-xs pt-2">
                      In Word: {numberToWordsBDT(order.grandTotal)}
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-1.5 border border-gray-400">
                          <QrCode className="w-14 h-14 text-black" />
                        </div>
                        <span className="text-[10px] mt-1">Scan to verify Invoice</span>
                      </div>
                      <div className="text-center text-[10px] text-gray-600">
                        ---Thanks to shop with us---
                      </div>
                      <div className="text-right font-semibold text-xs">
                        {order.operator.split(',')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. 50x25 mm Level Barcode Sticker */}
          {(activeFormat === 'all' || activeFormat === 'label') && (
            <div className={activeFormat === 'label' ? 'lg:col-span-12 flex justify-center' : 'lg:col-span-2'}>
              <div className="w-full max-w-[200px]">
                <div className="bg-[#f7d6e6] text-center py-1.5 font-bold text-[11px] mb-2 rounded-t no-print">
                  50x25 mm Level
                </div>
                <div className="bg-white border border-gray-800 p-2.5 text-center shadow space-y-1">
                  <div className="text-xs font-extrabold leading-none">Diamond Tech</div>
                  <div className="text-[9px] text-gray-700 leading-none">Jhikargacha, Jashore</div>
                  <div className="text-[9px] font-mono leading-none">📞 01923862251</div>
                  <div className="flex items-center justify-center gap-[1px] h-6 pt-1">
                    {[2, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 2, 1, 2, 1, 3, 1, 2].map((w, i) => (
                      <span key={i} style={{ width: `${w}px` }} className="h-full bg-black inline-block" />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono font-bold leading-none">{serial}</div>
                  <div className="text-[9px] font-mono truncate">{product.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
