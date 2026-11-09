import React, { useState } from 'react';
import {
  Shield,
  CornerDownRight,
  Wrench,
  MessageCircle,
  Search,
  Eye,
  X,
  Download,
  Phone,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { WarrantyRecord, ReturnRecord, RepairRecord } from '../types/erp';

/* ============================================================================
 * PAGE 18: WARRANTY SERVICE (Warranty Portal)
 * ========================================================================== */
export const WarrantyView: React.FC = () => {
  const { warranties, products, addWarranty, updateWarrantyStatus, notify } = useErp();

  const [customerName, setCustomerName] = useState('Md Habibur Rahman');
  const [warrantySerialNo, setWarrantySerialNo] = useState(`WT5444${warranties.length + 3}`);
  const [date, setDate] = useState('07 November 2026');
  const [productName, setProductName] = useState(
    'MSI PRO MP225 22 Inch (21.5 Inch Viewable) FHD Display HDMI, VGA Professional Monitor'
  );
  const [productSerialNo, setProductSerialNo] = useState('10.101.315.507.075');
  const [sellingDate, setSellingDate] = useState('12 July 2026');
  const [reason, setReason] = useState('No display issue');
  const [warrantyPeriod, setWarrantyPeriod] = useState('12 Month');
  const [remainingMonth, setRemainingMonth] = useState('7 Month');
  const [note, setNote] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('20 December 2026');
  const [contractNo, setContractNo] = useState('01541959600');

  const [search, setSearch] = useState('');
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyRecord | null>(warranties[1]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    addWarranty({
      warrantySerialNo,
      customerName,
      contractNo,
      address: 'Jhikargacha, Jashore',
      productName,
      productSerialNo,
      sellingDate,
      warrantyPeriod,
      remainingMonth,
      reason,
      entryDate: date,
      expectedDeliveryDate,
      deliveryDate: '-',
      status: 'Pending',
      condition: 'OK',
      note: note || 'N/A',
      addedBy: 'Shamim Kabir',
      photo: products[0].photo,
    });
    setWarrantySerialNo(`WT5444${warranties.length + 4}`);
  };

  const filtered = warranties.filter(
    (w) =>
      !search.trim() ||
      w.warrantySerialNo.toLowerCase().includes(search.toLowerCase()) ||
      w.productName.toLowerCase().includes(search.toLowerCase()) ||
      w.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <Shield className="w-5 h-5" />
            <span>Warranty Service</span>
          </div>
          <div className="text-xs text-white/90 pl-7">Manage warranty service.</div>
        </div>
        <span className="text-xs font-medium text-white/90">Warranty Portal</span>
      </div>

      {/* Form matching Page 18 */}
      <form onSubmit={handleGenerate} className="max-w-6xl space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-medium"
              required
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Warranty Serial No</label>
            <input
              type="text"
              value={warrantySerialNo}
              onChange={(e) => setWarrantySerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono font-bold"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-medium"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Product Serial No</label>
            <input
              type="text"
              value={productSerialNo}
              onChange={(e) => setProductSerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Selling Date</label>
            <input
              type="text"
              value={sellingDate}
              onChange={(e) => setSellingDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Reason for warranty</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Warranty Period</label>
            <input
              type="text"
              value={warrantyPeriod}
              onChange={(e) => setWarrantyPeriod(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Remaining Month</label>
            <input
              type="text"
              value={remainingMonth}
              onChange={(e) => setRemainingMonth(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Note</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Expected delivery date</label>
                <input
                  type="text"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contract No</label>
                <input
                  type="text"
                  value={contractNo}
                  onChange={(e) => setContractNo(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-52 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
              >
                Generate Warranty
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Warranties Table Box matching Page 18 */}
      <div className="max-w-6xl border-2 border-gray-500 rounded-xl p-4 bg-[#e2e6e4] dark:bg-slate-800 space-y-3">
        <div className="flex justify-center">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-9 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search warranty ID or product..."
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-500 font-bold">
              <th className="py-2 px-3">SL</th>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Photo</th>
              <th className="py-2 px-3">Product Name</th>
              <th className="py-2 px-3">Entry Date</th>
              <th className="py-2 px-3">Delivery date</th>
              <th className="py-2 px-3 text-center">Status</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filtered.map((w, idx) => (
              <tr
                key={w.id}
                onClick={() => setSelectedWarranty(w)}
                className={`cursor-pointer ${
                  idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-700/60' : 'bg-white/70 dark:bg-slate-800'
                }`}
              >
                <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                <td className="py-2.5 px-3 font-mono font-bold">{w.warrantySerialNo}</td>
                <td className="py-2.5 px-3">
                  <img src={w.photo} alt={w.productName} referrerPolicy="no-referrer" className="w-9 h-7 object-cover rounded border bg-white" />
                </td>
                <td className="py-2.5 px-3 font-medium max-w-xs">{w.productName}</td>
                <td className="py-2.5 px-3 font-mono">{w.entryDate}</td>
                <td className="py-2.5 px-3 font-mono">{w.deliveryDate}</td>
                <td className="py-2.5 px-3 text-center font-bold">
                  <span
                    className={
                      w.status === 'Pending'
                        ? 'text-red-600'
                        : w.status === 'In Shop'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }
                  >
                    {w.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWarranty(w);
                    }}
                    className="w-8 h-8 rounded-full bg-[#16a34a] text-white inline-flex items-center justify-center cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Detail Popup Card matching Page 18 */}
      {selectedWarranty && (
        <div className="max-w-xl mx-auto bg-[#d8dedc] text-gray-900 border-2 border-[#1e6b2b] rounded-md p-5 shadow-lg relative text-xs space-y-3">
          <button
            onClick={() => setSelectedWarranty(null)}
            className="absolute right-3 top-3 text-gray-700 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                👤
              </div>
              <div>
                <h4 className="text-base font-extrabold">{selectedWarranty.customerName}</h4>
                <div className="font-mono font-semibold">☎ {selectedWarranty.contractNo}</div>
                <div>{selectedWarranty.address}</div>
              </div>
            </div>
            <div className="text-right pt-4 text-[11px]">
              <div className="font-bold">Added by: {selectedWarranty.addedBy}</div>
              <div>Date: 08 December 2026, 12:45 PM</div>
            </div>
          </div>

          <div className="space-y-1 pt-2 font-medium">
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Name</span>
              <span className="col-span-8">: {selectedWarranty.productName}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Warranty Serial No</span>
              <span className="col-span-8 font-mono">: {selectedWarranty.warrantySerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Serial No</span>
              <span className="col-span-8 font-mono">: {selectedWarranty.productSerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Entry Date</span>
              <span className="col-span-8 font-mono">: {selectedWarranty.entryDate}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Reason for warranty</span>
              <span className="col-span-8">: {selectedWarranty.reason}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Condition</span>
              <span className="col-span-8">: {selectedWarranty.condition}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Note</span>
              <span className="col-span-8">: {selectedWarranty.note}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() =>
                notify(`Warranty update sent via WhatsApp to ${selectedWarranty.contractNo}`)
              }
              className="px-6 py-2 rounded-full bg-[#ccf2d4] text-[#15803d] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => {
                updateWarrantyStatus(selectedWarranty.id, 'Completed');
                window.print();
              }}
              className="px-8 py-2 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs shadow cursor-pointer"
            >
              Print & Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 19: RETURNS (Product returns Portal)
 * ========================================================================== */
export const ReturnsView: React.FC = () => {
  const { returns, addReturn, notify } = useErp();

  const [customerName, setCustomerName] = useState('Md Habibur Rahman');
  const [returnSerialNo, setReturnSerialNo] = useState(`RT12411${returns.length}`);
  const [date, setDate] = useState('07 November 2026');
  const [address, setAddress] = useState('Krritipur, Jhikargacha, Jashore');
  const [productSerialNo, setProductSerialNo] = useState('5844DERJ8254T45');
  const [sellingDate, setSellingDate] = useState('12 July 2026');
  const [productName, setProductName] = useState('TP link AC1200 C6 Router');
  const [sellingPrice, setSellingPrice] = useState(3100);
  const [handoverTo, setHandoverTo] = useState('Al Amin');
  const [reason, setReason] = useState('Network Connection issue');
  const [isCashBack, setIsCashBack] = useState(false);
  const [isExchange, setIsExchange] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [recentSerialNo, setRecentSerialNo] = useState('5844DERJ8254T55');
  const [note, setNote] = useState('');

  const [search, setSearch] = useState('');
  const [selectedReturn, setSelectedReturn] = useState<ReturnRecord | null>(returns[1]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    addReturn({
      returnSerialNo,
      customerName,
      contractNo: '01541959600',
      address,
      productName,
      productSerialNo,
      sellingDate,
      sellingPrice: Number(sellingPrice) || 0,
      handoverTo: handoverTo || 'Al Amin',
      reason,
      entryDate: date,
      isCashBack,
      isExchange,
      paymentMethod: isExchange ? 'Exchange' : paymentMethod,
      methodDetail: isExchange ? 'Handover' : paymentMethod,
      recentProductSerialNo: recentSerialNo,
      note: note || 'N/A',
      addedBy: 'Shamim Kabir',
      checkedBy: 'Al Amin',
    });
    setReturnSerialNo(`RT12411${returns.length + 1}`);
  };

  const filtered = returns.filter(
    (r) =>
      !search.trim() ||
      r.returnSerialNo.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <CornerDownRight className="w-5 h-5" />
            <span>Returns</span>
          </div>
          <div className="text-xs text-white/90 pl-7">Manage product returns</div>
        </div>
        <span className="text-xs font-medium text-white/90">Product returns Portal</span>
      </div>

      <form onSubmit={handleGenerate} className="max-w-6xl space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Returns Serial No</label>
            <input
              type="text"
              value={returnSerialNo}
              onChange={(e) => setReturnSerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono font-bold"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Product Serial No</label>
            <input
              type="text"
              value={productSerialNo}
              onChange={(e) => setProductSerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Selling date</label>
            <input
              type="text"
              value={sellingDate}
              onChange={(e) => setSellingDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Selling Price</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center font-mono font-bold text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Handover to</label>
            <input
              type="text"
              value={handoverTo}
              onChange={(e) => setHandoverTo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Reason for warranty</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Note</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCashBack}
                  onChange={(e) => setIsCashBack(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Cash Back</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExchange}
                  onChange={(e) => setIsExchange(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Exchange Product</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Matehood</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Recent Product Serial No</label>
                <input
                  type="text"
                  value={recentSerialNo}
                  onChange={(e) => setRecentSerialNo(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-52 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
              >
                Generate Returns
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Returns Table matching Page 19 */}
      <div className="max-w-6xl border-2 border-gray-500 rounded-xl p-4 bg-[#e2e6e4] dark:bg-slate-800 space-y-3">
        <div className="flex justify-center">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-9 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search returns..."
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-500 font-bold">
              <th className="py-2 px-3">SL</th>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Customer Name</th>
              <th className="py-2 px-3">Product Name</th>
              <th className="py-2 px-3">Entry Date</th>
              <th className="py-2 px-3">Payment</th>
              <th className="py-2 px-3">Matehood</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filtered.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => setSelectedReturn(r)}
                className={`cursor-pointer ${
                  idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-700/60' : 'bg-white/70 dark:bg-slate-800'
                }`}
              >
                <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                <td className="py-2.5 px-3 font-mono font-bold">{r.returnSerialNo}</td>
                <td className="py-2.5 px-3">{r.customerName}</td>
                <td className="py-2.5 px-3 font-medium">{r.productName}</td>
                <td className="py-2.5 px-3 font-mono">{r.entryDate}</td>
                <td className="py-2.5 px-3">{r.paymentMethod}</td>
                <td className="py-2.5 px-3 font-mono">{r.methodDetail}</td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => setSelectedReturn(r)}
                    className="w-8 h-8 rounded-full bg-[#16a34a] text-white inline-flex items-center justify-center cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Return Detail Card matching Page 19 */}
      {selectedReturn && (
        <div className="max-w-xl mx-auto bg-[#d8dedc] text-gray-900 border-2 border-[#1e6b2b] rounded-md p-5 shadow-lg relative text-xs space-y-3">
          <button
            onClick={() => setSelectedReturn(null)}
            className="absolute right-3 top-3 text-gray-700 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                👤
              </div>
              <div>
                <h4 className="text-base font-extrabold">{selectedReturn.customerName}</h4>
                <div className="font-mono font-semibold">☎ {selectedReturn.contractNo}</div>
                <div>{selectedReturn.address}</div>
              </div>
            </div>
            <div className="text-right pt-3 text-[11px]">
              <div className="font-bold">Added by: {selectedReturn.addedBy}</div>
              <div className="font-bold">Checked by: {selectedReturn.checkedBy}</div>
              <div>Date: 07 December 2026, 12:45 PM</div>
            </div>
          </div>

          <div className="space-y-1 pt-2 font-medium">
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Name</span>
              <span className="col-span-8">: {selectedReturn.productName}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Warranty Serial No</span>
              <span className="col-span-8 font-mono">: {selectedReturn.returnSerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Serial No</span>
              <span className="col-span-8 font-mono">: {selectedReturn.productSerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Entry Date</span>
              <span className="col-span-8 font-mono">: {selectedReturn.entryDate}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Reason for warranty</span>
              <span className="col-span-8">: {selectedReturn.reason}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Transection</span>
              <span className="col-span-8">
                : Exchange ({selectedReturn.recentProductSerialNo})
              </span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Note</span>
              <span className="col-span-8">: {selectedReturn.note}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => notify(`Return receipt sent on WhatsApp to ${selectedReturn.contractNo}`)}
              className="px-6 py-2 rounded-full bg-[#ccf2d4] text-[#15803d] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-8 py-2 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs shadow cursor-pointer"
            >
              Print & Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 20: REPAIR & SERVICE (Repair & Service Portal)
 * ========================================================================== */
export const RepairServiceView: React.FC = () => {
  const { repairs, addRepair, updateRepairStatus, notify } = useErp();

  const [customerName, setCustomerName] = useState('Md Habibur Rahman');
  const [repairSerialNo, setRepairSerialNo] = useState(`SR25454${repairs.length + 3}`);
  const [date, setDate] = useState('07 November 2026');
  const [address, setAddress] = useState('Krritipur, Jhikargacha, Jashore');
  const [productSerialNo, setProductSerialNo] = useState('5844DERJ8254T45');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('20 December 2026');
  const [productName, setProductName] = useState('Dell 840 G3 Laptop');
  const [contractNo, setContractNo] = useState('01541959600');
  const [reason, setReason] = useState('No power issue');
  const [expectedServiceFees, setExpectedServiceFees] = useState(2000);
  const [advancePaid, setAdvancePaid] = useState(1000);
  const [dethPermission, setDethPermission] = useState(true);
  const [note, setNote] = useState('');

  const [search, setSearch] = useState('');
  const [selectedRepair, setSelectedRepair] = useState<RepairRecord | null>(repairs[1]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    addRepair({
      repairSerialNo,
      customerName,
      contractNo,
      address,
      productName,
      productSerialNo,
      entryDate: date,
      expectedDeliveryDate,
      deliveryDate: '-',
      reason,
      expectedServiceFees: Number(expectedServiceFees) || 0,
      advancePaid: Number(advancePaid) || 0,
      dethPermission,
      status: 'Pending',
      condition: 'OK',
      note: note || 'N/A',
      addedBy: 'Shamim Kabir',
      repairBy: 'Al Amin',
    });
    setRepairSerialNo(`SR25454${repairs.length + 4}`);
  };

  const filtered = repairs.filter(
    (r) =>
      !search.trim() ||
      r.repairSerialNo.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <Wrench className="w-5 h-5" />
            <span>Repair & Service</span>
          </div>
          <div className="text-xs text-white/90 pl-7">Manage repair & service.</div>
        </div>
        <span className="text-xs font-medium text-white/90">Repair & Service Portal</span>
      </div>

      <form onSubmit={handleGenerate} className="max-w-6xl space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Warranty Serial No</label>
            <input
              type="text"
              value={repairSerialNo}
              onChange={(e) => setRepairSerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono font-bold"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Product Serial No</label>
            <input
              type="text"
              value={productSerialNo}
              onChange={(e) => setProductSerialNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Expected delivery date</label>
            <input
              type="text"
              value={expectedDeliveryDate}
              onChange={(e) => setExpectedDeliveryDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Expected delivery date</label>
            <input
              type="text"
              value={expectedDeliveryDate}
              onChange={(e) => setExpectedDeliveryDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Contract No</label>
            <input
              type="text"
              value={contractNo}
              onChange={(e) => setContractNo(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Reason for warranty</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Note</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Expected Service Fees</label>
                <input
                  type="number"
                  value={expectedServiceFees}
                  onChange={(e) => setExpectedServiceFees(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center font-mono font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Advance Paid</label>
                <input
                  type="number"
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center font-mono font-bold text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={dethPermission}
                  onChange={(e) => setDethPermission(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Deth permission</span>
              </label>

              <button
                type="submit"
                className="w-52 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
              >
                Generate Repair
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Repairs Table matching Page 20 */}
      <div className="max-w-6xl border-2 border-gray-500 rounded-xl p-4 bg-[#e2e6e4] dark:bg-slate-800 space-y-3">
        <div className="flex justify-center">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-9 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repair ticket..."
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-500 font-bold">
              <th className="py-2 px-3">SL</th>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Customer Name</th>
              <th className="py-2 px-3">Product Name</th>
              <th className="py-2 px-3">Entry Date</th>
              <th className="py-2 px-3">Delivery date</th>
              <th className="py-2 px-3 text-center">Status</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filtered.map((r, idx) => (
              <tr
                key={r.id}
                onClick={() => setSelectedRepair(r)}
                className={`cursor-pointer ${
                  idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-700/60' : 'bg-white/70 dark:bg-slate-800'
                }`}
              >
                <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                <td className="py-2.5 px-3 font-mono font-bold">{r.repairSerialNo}</td>
                <td className="py-2.5 px-3">{r.customerName}</td>
                <td className="py-2.5 px-3 font-medium">{r.productName}</td>
                <td className="py-2.5 px-3 font-mono">{r.entryDate}</td>
                <td className="py-2.5 px-3 font-mono">{r.deliveryDate}</td>
                <td className="py-2.5 px-3 text-center font-bold">
                  <span
                    className={
                      r.status === 'Pending'
                        ? 'text-red-600'
                        : r.status === 'Ready'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => setSelectedRepair(r)}
                    className="w-8 h-8 rounded-full bg-[#16a34a] text-white inline-flex items-center justify-center cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Repair Detail Card matching Page 20 */}
      {selectedRepair && (
        <div className="max-w-xl mx-auto bg-[#d8dedc] text-gray-900 border-2 border-[#1e6b2b] rounded-md p-5 shadow-lg relative text-xs space-y-3">
          <button
            onClick={() => setSelectedRepair(null)}
            className="absolute right-3 top-3 text-gray-700 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                👤
              </div>
              <div>
                <h4 className="text-base font-extrabold">{selectedRepair.customerName}</h4>
                <div className="font-mono font-semibold">☎ {selectedRepair.contractNo}</div>
                <div>{selectedRepair.address}</div>
              </div>
            </div>
            <div className="text-right pt-3 text-[11px]">
              <div className="font-bold">Added by: {selectedRepair.addedBy}</div>
              <div className="font-bold">Repair by: {selectedRepair.repairBy}</div>
              <div>Date: 07 December 2026, 12:45 PM</div>
            </div>
          </div>

          <div className="space-y-1 pt-2 font-medium">
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Name</span>
              <span className="col-span-8">: {selectedRepair.productName}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Warranty Serial No</span>
              <span className="col-span-8 font-mono">: {selectedRepair.repairSerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Product Serial No</span>
              <span className="col-span-8 font-mono">: {selectedRepair.productSerialNo}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Entry Date</span>
              <span className="col-span-8 font-mono">: {selectedRepair.entryDate}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Reason for warranty</span>
              <span className="col-span-8">: {selectedRepair.reason}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Condition</span>
              <span className="col-span-8">: {selectedRepair.condition}</span>
            </div>
            <div className="grid grid-cols-12">
              <span className="col-span-4">Note</span>
              <span className="col-span-8">: {selectedRepair.note}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() =>
                notify(`Repair status update sent on WhatsApp to ${selectedRepair.contractNo}`)
              }
              className="px-6 py-2 rounded-full bg-[#ccf2d4] text-[#15803d] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => {
                updateRepairStatus(selectedRepair.id, 'Completed');
                window.print();
              }}
              className="px-8 py-2 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs shadow cursor-pointer"
            >
              Print & Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 21: WHATSAPP REMAINDER AUTOMATION (WhatsApp Portal)
 * ========================================================================== */
export const WhatsAppRemainderView: React.FC = () => {
  const { customers, exportDataAsCSV, notify } = useErp();
  const [activeTab, setActiveTab] = useState<'due' | 'runner' | 'logs' | 'rules'>('due');
  const [selectedIds, setSelectedIds] = useState<string[]>([customers[0]?.id]);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  const toggleAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((c) => c.id));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner matching Page 21 */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <MessageCircle className="w-6 h-6" />
            <span>WhatsApp Remainder Automation</span>
          </div>
          <div className="text-xs text-white/90 pl-8">
            Manage customer, Accounts, Replace license key, and monitor WhatsApp notices.
          </div>
        </div>
        <span className="text-xs font-medium text-white/90">WhatsApp Portal</span>
      </div>

      {/* Sub-navigation bar matching Page 21 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center bg-[#5a5a5a] rounded-lg overflow-hidden text-white text-xs font-semibold">
          <button
            onClick={() => setActiveTab('due')}
            className={`px-5 py-2.5 cursor-pointer ${
              activeTab === 'due' ? 'bg-[#001f60] font-bold' : 'hover:bg-white/10'
            }`}
          >
            Due Register
          </button>
          <button
            onClick={() => setActiveTab('runner')}
            className={`px-5 py-2.5 cursor-pointer ${
              activeTab === 'runner' ? 'bg-[#001f60] font-bold' : 'hover:bg-white/10'
            }`}
          >
            Auto-Dispatch Runner
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-2.5 cursor-pointer ${
              activeTab === 'logs' ? 'bg-[#001f60] font-bold' : 'hover:bg-white/10'
            }`}
          >
            Delivery Logs
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-5 py-2.5 cursor-pointer ${
              activeTab === 'rules' ? 'bg-[#001f60] font-bold' : 'hover:bg-white/10'
            }`}
          >
            Automations Rules
          </button>
        </div>

        <button
          onClick={() =>
            notify(`Auto-Sent WhatsApp payment reminders to ${selectedIds.length || filtered.length} customers!`)
          }
          className="px-5 py-2.5 rounded-full bg-[#2e9e49] hover:bg-[#238039] text-white font-bold text-xs shadow flex items-center gap-2 cursor-pointer"
        >
          <span>💬 Auto-Send Remainders</span>
        </button>
      </div>

      {/* Filter & Select All Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={selectedIds.length === filtered.length && filtered.length > 0}
            onChange={toggleAll}
            className="w-4 h-4"
          />
          <span>Select all</span>
        </label>

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
                'WhatsApp_Due_Register.csv',
                filtered.map((c) => ({
                  Name: c.name,
                  Mobile: c.mobile,
                  WhatsApp: c.whatsapp,
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

      {/* Due Register Table matching Page 21 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-y-2 border-gray-500 font-bold text-sm">
              <th className="py-2.5 px-3 w-10"></th>
              <th className="py-2.5 px-3">SL</th>
              <th className="py-2.5 px-3">Photo</th>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3">Mobile</th>
              <th className="py-2.5 px-3">Email</th>
              <th className="py-2.5 px-3">Address</th>
              <th className="py-2.5 px-3 text-center">Due</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filtered.map((c, idx) => (
              <tr
                key={c.id}
                className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/60'}
              >
                <td className="py-3 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleOne(c.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="py-3 px-3 font-mono">{idx + 1}</td>
                <td className="py-3 px-3">
                  <img
                    src={c.photo}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border bg-white"
                  />
                </td>
                <td className="py-3 px-3 font-semibold">{c.name}</td>
                <td className="py-3 px-3 font-mono text-[11px]">
                  <div>📞 {c.mobile}</div>
                  <div>💬 {c.whatsapp}</div>
                </td>
                <td className="py-3 px-3 underline">{c.email}</td>
                <td className="py-3 px-3 max-w-[160px]">{c.address}</td>
                <td className="py-3 px-3 text-center font-mono font-bold">{c.due}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        notify(`WhatsApp Due Reminder (৳${c.due}) dispatched to ${c.name} (${c.whatsapp})!`)
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-[#2e9e49] hover:bg-[#238039] text-white font-bold text-xs flex items-center gap-1 shadow cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                    <button
                      onClick={() => notify(`Initiating voice call to ${c.mobile}...`)}
                      className="w-8 h-8 rounded-lg bg-[#14532d] hover:bg-[#0f3f22] text-white flex items-center justify-center shadow cursor-pointer"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
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
