import React, { useState } from 'react';
import {
  ShoppingCart,
  ShoppingBag,
  Printer,
  Plus,
  Eye,
  Copy,
  Pencil,
  Trash2,
  Search,
  ListChecks,
  DollarSign,
  MessageCircle,
  LayoutGrid,
  Table as TableIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { ProductItem } from '../types/erp';

/* ============================================================================
 * PAGE 4: ADD PRODUCT (Product Entry Portal)
 * ========================================================================== */
export const AddProductView: React.FC = () => {
  const { addProduct, setRoute, openPrintModal, notify } = useErp();

  const [name, setName] = useState('A4TECH KRS-82 Wired Multimedia Keyboard With Bangla');
  const [productLimit, setProductLimit] = useState(5);
  const [quantityType, setQuantityType] = useState('Unit');
  const [warranty, setWarranty] = useState('12 Month');

  const [rootCategory, setRootCategory] = useState('Accessories');
  const [rootCode, setRootCode] = useState('10');
  const [mainCategory, setMainCategory] = useState('Keyboard');
  const [mainCode, setMainCode] = useState('101');
  const [subCategory, setSubCategory] = useState('Wired Keyboard');
  const [subCode, setSubCode] = useState('201');
  const [brand, setBrand] = useState('A4Tech');
  const [brandCode, setBrandCode] = useState('501');
  const [seqCode, setSeqCode] = useState('001');

  const [quickOverview, setQuickOverview] = useState(
    'Comfort Round Edge Keycaps\nLaser Inscribed Keys\nUSB Wired Connection'
  );
  const [specification, setSpecification] = useState(
    'Brand: A4Tech\nModel: KRS-82\nInterface: USB 2.0\nCable Length: 1.5m\nWarranty: 12 Month'
  );
  const [details, setDetails] = useState(
    'Comfort round edge keycaps provide hours of typing comfort. Spill-resistant design protects keyboard from accidental splashes.'
  );
  const [sellPrice, setSellPrice] = useState(990);
  const [costPrice, setCostPrice] = useState(820);
  const [photoRotation, setPhotoRotation] = useState(0);

  const generatedProId = `${rootCode}.${mainCode}.${subCode}.${brandCode}.${seqCode}`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const specMap: Record<string, string> = {};
    specification.split('\n').forEach((line) => {
      const [k, ...rest] = line.split(':');
      if (k && rest.length) specMap[k.trim()] = rest.join(':').trim();
    });

    addProduct({
      proId: generatedProId,
      name,
      rootCategory,
      rootCode,
      mainCategory,
      mainCode,
      subCategory,
      subCode,
      brand,
      brandCode,
      productLimit: Number(productLimit) || 5,
      quantityType,
      warranty,
      purchaseDate: new Date().toISOString().slice(0, 10),
      expiryDate: '2028-09-05',
      stock: 10,
      sold: 0,
      productCost: costPrice - 70,
      taxOtherCost: 70,
      totalCost: costPrice,
      sellPrice,
      onlinePrice: sellPrice - 40,
      oldPrice: sellPrice + 80,
      supplier: 'Global Brand PVT',
      photo: `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="320" height="240" fill="#1e293b"/><text x="160" y="125" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">${name.slice(
          0,
          20
        )}</text></svg>`
      )}`,
      quickOverview: quickOverview.split('\n').filter(Boolean),
      specifications: Object.keys(specMap).length ? specMap : { Brand: brand, Warranty: warranty },
      details,
      branchSerials: {
        mainActive: [`SN${Date.now().toString().slice(-8)}`],
        sharchaActive: [],
        rnRoadActive: [],
        mainWarranty: [],
        sharchaWarranty: [],
        rnRoadWarranty: [],
      },
      isNewArrival: true,
    });
    setSeqCode(String(Number(seqCode) + 1).padStart(3, '0'));
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm mb-5">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <ShoppingCart className="w-5 h-5" />
          <span>Add Product</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRoute('products')}
            className="text-xs bg-white/15 hover:bg-white/25 px-3 py-1 rounded font-medium cursor-pointer"
          >
            All Products
          </button>
          <span className="text-xs font-medium text-white/90">Product Entry Portal</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-6xl">
        {/* Row 1: Name, Product Limit, Quantity Type, Warranty */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-6">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-medium"
              required
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Product Limit
            </label>
            <input
              type="number"
              value={productLimit}
              onChange={(e) => setProductLimit(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Quantity Type
            </label>
            <select
              value={quantityType}
              onChange={(e) => setQuantityType(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Unit">Unit</option>
              <option value="Pcs">Pcs</option>
              <option value="Box">Box</option>
              <option value="Set">Set</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Warranty</label>
            <select
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="12 Month">12 Month</option>
              <option value="24 Month">24 Month</option>
              <option value="3 Year">3 Year</option>
              <option value="Life Time">Life Time</option>
              <option value="No Warranty">No Warranty</option>
            </select>
          </div>
        </div>

        {/* Row 2: Root Category + Code, Main Category + Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Root Category
            </label>
            <select
              value={rootCategory}
              onChange={(e) => setRootCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Accessories">Accessories</option>
              <option value="Component">Component</option>
              <option value="Monitor">Monitor</option>
              <option value="Networking">Networking</option>
              <option value="Printing">Printing</option>
              <option value="Security">Security</option>
              <option value="Sounds">Sounds</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Code</label>
            <input
              type="text"
              value={rootCode}
              onChange={(e) => setRootCode(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Main Category
            </label>
            <select
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Keyboard">Keyboard</option>
              <option value="Mouse">Mouse</option>
              <option value="Motherboard">Motherboard</option>
              <option value="Monitor">Monitor</option>
              <option value="Router">Router</option>
              <option value="Headphone">Headphone</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Code</label>
            <input
              type="text"
              value={mainCode}
              onChange={(e) => setMainCode(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-sm font-mono"
            />
          </div>
        </div>

        {/* Row 3: Sub Category + Code, Brand + Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Sub Category
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Wired Keyboard">Wired Keyboard</option>
              <option value="Wireless Keyboard">Wireless Keyboard</option>
              <option value="Wired Mouse">Wired Mouse</option>
              <option value="FHD Monitor">FHD Monitor</option>
              <option value="Gaming PC">Gaming PC</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Code</label>
            <input
              type="text"
              value={subCode}
              onChange={(e) => setSubCode(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="A4Tech">A4Tech</option>
              <option value="MSI">MSI</option>
              <option value="Asus">Asus</option>
              <option value="Gigabyte">Gigabyte</option>
              <option value="Corsair">Corsair</option>
              <option value="TP-Link">TP-Link</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Code</label>
            <input
              type="text"
              value={brandCode}
              onChange={(e) => setBrandCode(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-sm font-mono"
            />
          </div>
        </div>

        {/* Row 4: Product ID + Barcode + Print button, Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-6">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Product ID
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={generatedProId}
                className="w-56 h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono font-bold"
              />
              {/* Barcode representation matching Page 4 */}
              <div className="bg-white px-3 py-1 rounded border border-gray-300 flex flex-col items-center">
                <div className="flex items-center gap-[1.5px] h-5">
                  {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2].map((w, i) => (
                    <span key={i} style={{ width: `${w}px` }} className="h-full bg-black inline-block" />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-gray-600 leading-none mt-0.5">
                  {generatedProId}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  openPrintModal({
                    mode: 'label',
                    serialNo: generatedProId,
                  })
                }
                className="p-2 rounded-lg text-[#1e6b2b] hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Print Barcode Sticker"
              >
                <Printer className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Default Cost (৳)</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Selling Price (৳)</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Quick Overview
            </label>
            <textarea
              rows={3}
              value={quickOverview}
              onChange={(e) => setQuickOverview(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
        </div>

        {/* Specification Editor Box */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
            Specification
          </label>
          <div className="bg-white dark:bg-slate-800 border border-gray-400 rounded-lg overflow-hidden">
            <textarea
              rows={4}
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              className="w-full p-3 bg-transparent text-xs focus:outline-none"
            />
            <div className="bg-gray-50 dark:bg-slate-700 px-3 py-1.5 border-t border-gray-200 dark:border-slate-600 flex items-center justify-end gap-4 text-xs text-gray-600 dark:text-slate-300">
              <span>↺</span>
              <span>↻</span>
              <span className="font-medium">Sans Serif ▾</span>
              <span className="font-bold">tT ▾</span>
              <span className="font-bold">B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
              <span className="underline font-bold">A ▾</span>
              <span>≡ ▾</span>
            </div>
          </div>
        </div>

        {/* Details Editor Box */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Details</label>
          <div className="bg-white dark:bg-slate-800 border border-gray-400 rounded-lg overflow-hidden">
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 bg-transparent text-xs focus:outline-none"
            />
            <div className="bg-gray-50 dark:bg-slate-700 px-3 py-1.5 border-t border-gray-200 dark:border-slate-600 flex items-center justify-end gap-4 text-xs text-gray-600 dark:text-slate-300">
              <span>↺</span>
              <span>↻</span>
              <span className="font-medium">Sans Serif ▾</span>
              <span className="font-bold">tT ▾</span>
              <span className="font-bold">B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
              <span className="underline font-bold">A ▾</span>
              <span>≡ ▾</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Product Photos + Save Button */}
        <div className="flex flex-wrap items-end justify-between gap-6 pt-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-2">
              Product Photos
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded border border-gray-300 flex items-center justify-center p-1 overflow-hidden">
                <div
                  style={{ transform: `rotate(${photoRotation}deg)` }}
                  className="w-full h-5 bg-slate-800 rounded-sm transition-transform"
                />
              </div>

              <div className="space-y-1.5 w-36">
                <div className="bg-[#5cb892] text-white text-center text-[11px] font-semibold py-0.5 rounded">
                  Main
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => notify('Photo moved left')}
                    className="bg-[#7ccab0] text-white text-[10px] py-0.5 rounded cursor-pointer"
                  >
                    ‹ Left
                  </button>
                  <button
                    type="button"
                    onClick={() => notify('Photo moved right')}
                    className="bg-[#7ccab0] text-white text-[10px] py-0.5 rounded cursor-pointer"
                  >
                    Right ›
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPhotoRotation((r) => r - 90)}
                    className="bg-[#2eb872] text-white text-[10px] py-0.5 rounded flex items-center justify-center cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoRotation((r) => r + 90)}
                    className="bg-[#2eb872] text-white text-[10px] py-0.5 rounded flex items-center justify-center cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => notify('Photo removed')}
                  className="w-full bg-white border border-red-200 text-red-500 text-[10px] font-bold py-0.5 rounded cursor-pointer"
                >
                  ✕ Remove
                </button>
              </div>

              <label className="px-5 py-2 rounded-full border-2 border-[#1e6b2b] text-gray-600 bg-white hover:bg-emerald-50 text-xs font-medium cursor-pointer">
                + Add
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => notify('Additional product photo attached!')}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-48 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

/* ============================================================================
 * PAGE 5: ADD PURCHASE (Purchase Entry Portal)
 * ========================================================================== */
export const AddPurchaseView: React.FC = () => {
  const { products, suppliers, addPurchaseStock, deleteProduct, setRoute, openPrintModal } = useErp();

  const [supplier, setSupplier] = useState(suppliers[0]?.companyName || 'Global Brand PVT');
  const [purchaseDate, setPurchaseDate] = useState('2026-09-05');
  const [expiryDate, setExpiryDate] = useState('2028-09-05');
  const [branch, setBranch] = useState<'Main Branch' | 'Sharcha Branch' | 'RN Road Branch'>('Main Branch');

  const [selectedProdId, setSelectedProdId] = useState(products[0]?.id || 'prod_1');
  const [qty, setQty] = useState(5);
  const [cost, setCost] = useState(750);
  const [sellPrice, setSellPrice] = useState(990);
  const [taxOther, setTaxOther] = useState(70);
  const [onlinePrice, setOnlinePrice] = useState(950);
  const [oldPrice, setOldPrice] = useState(1050);

  const [serials, setSerials] = useState<string[]>([
    '23522582591',
    '23522582592',
    '23522582593',
    '23522582594',
    '23522582595',
  ]);
  const [tableSearch, setTableSearch] = useState('A4Tech');

  const handleSerialChange = (index: number, val: string) => {
    setSerials((prev) => prev.map((s, i) => (i === index ? val : s)));
  };

  const handleAddMoreSerial = () => {
    const nextNum = 23522582591 + serials.length;
    setSerials((prev) => [...prev, String(nextNum)]);
    setQty((q) => q + 1);
  };

  const handleSavePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    addPurchaseStock({
      productId: selectedProdId,
      supplier,
      purchaseDate,
      expiryDate,
      branch,
      qty: Number(qty) || 1,
      cost: Number(cost) || 0,
      taxOther: Number(taxOther) || 0,
      sellPrice: Number(sellPrice) || 0,
      onlinePrice: Number(onlinePrice) || 0,
      oldPrice: Number(oldPrice) || 0,
      serials,
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      !tableSearch.trim() ||
      p.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.proId.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <ShoppingBag className="w-5 h-5" />
          <span>Add Purchase</span>
        </div>
        <span className="text-xs font-medium text-white/90">Purchase Entry Portal</span>
      </div>

      <form onSubmit={handleSavePurchase} className="space-y-4 max-w-6xl">
        {/* Row 1: Suppliers, Purchase Date, Expiry Date, Branch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-5 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
                Suppliers
              </label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.companyName}>
                    {s.companyName} ({s.ownerName})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setRoute('suppliers')}
              className="w-10 h-10 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white flex items-center justify-center font-bold shadow cursor-pointer"
              title="Add New Supplier"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as typeof branch)}
              className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Main Branch">Main Branch</option>
              <option value="Sharcha Branch">Sharcha Branch</option>
              <option value="RN Road Branch">RN Road Branch</option>
            </select>
          </div>
        </div>

        {/* Row 2: Product, Quantity, Cost, Sale Price, Tax+Other, Online Store Price, Old Price */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-end">
          <div className="lg:col-span-5 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-slate-300 mb-1">
                Product
              </label>
              <select
                value={selectedProdId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedProdId(id);
                  const found = products.find((p) => p.id === id);
                  if (found) {
                    setCost(found.productCost);
                    setSellPrice(found.sellPrice);
                    setTaxOther(found.taxOtherCost);
                    setOnlinePrice(found.onlinePrice);
                    setOldPrice(found.oldPrice);
                  }
                }}
                className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.proId})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setRoute('add-product')}
              className="w-10 h-10 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white flex items-center justify-center font-bold shadow cursor-pointer"
              title="Add New Product"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Quantity</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Sale Price</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Tax+Other</label>
            <input
              type="number"
              value={taxOther}
              onChange={(e) => setTaxOther(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Online Store Price</label>
            <input
              type="number"
              value={onlinePrice}
              onChange={(e) => setOnlinePrice(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Old Price</label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(Number(e.target.value))}
              className="w-full h-11 px-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-center text-xs font-mono"
            />
          </div>
        </div>

        {/* Row 3: Serial No inputs + Add More Serial + Print Levels */}
        <div className="flex flex-wrap items-end gap-3 pt-1">
          {serials.map((sn, idx) => (
            <div key={idx} className="w-36">
              <label className="block text-xs font-medium text-gray-600 mb-1">Serial No</label>
              <input
                type="text"
                value={sn}
                onChange={(e) => handleSerialChange(idx, e.target.value)}
                className="w-full h-10 px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddMoreSerial}
            className="flex items-center gap-1.5 h-10 px-3 text-xs font-semibold text-gray-800 dark:text-white hover:bg-white/50 rounded-lg cursor-pointer"
          >
            <Plus className="w-5 h-5 text-[#1d4ed8]" />
            <span className="leading-tight text-left">
              Add More
              <br />
              Serial
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              openPrintModal({
                mode: 'label',
                product: products.find((p) => p.id === selectedProdId),
                serialNo: serials[0] || '26061205',
              })
            }
            className="flex items-center gap-2 h-10 px-3 text-xs font-semibold text-gray-800 dark:text-white hover:bg-white/50 rounded-lg cursor-pointer"
          >
            <Printer className="w-5 h-5 text-[#1e6b2b]" />
            <span className="leading-tight text-left">
              Print
              <br />
              Levels
            </span>
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="w-44 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
          >
            Save
          </button>

          <button
            type="submit"
            className="px-6 h-10 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-xs shadow cursor-pointer"
          >
            + Add More Purchase
          </button>
        </div>
      </form>

      {/* Bottom Table Box matching Page 5 */}
      <div className="border-2 border-gray-500 rounded-xl p-4 bg-[#e2e6e4] dark:bg-slate-800 space-y-3">
        <div className="flex justify-center">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-9 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search brand or product..."
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y border-gray-500 text-gray-900 dark:text-white font-bold">
                <th className="py-2 px-3">SL</th>
                <th className="py-2 px-3">Pro ID</th>
                <th className="py-2 px-3">Photo</th>
                <th className="py-2 px-3">Product Name</th>
                <th className="py-2 px-3">Purchase Date</th>
                <th className="py-2 px-3">Expiry Date</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3">Sell Price</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
              {filteredProducts.map((item, idx) => (
                <tr
                  key={item.id}
                  className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-700/60' : 'bg-white/60 dark:bg-slate-800'}
                >
                  <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono">{item.proId}</td>
                  <td className="py-2.5 px-3">
                    <img
                      src={item.photo}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-7 object-cover rounded bg-white border"
                    />
                  </td>
                  <td className="py-2.5 px-3 font-semibold max-w-xs">{item.name}</td>
                  <td className="py-2.5 px-3 font-mono">{item.purchaseDate}</td>
                  <td className="py-2.5 px-3 font-mono">{item.expiryDate}</td>
                  <td className="py-2.5 px-3 font-mono font-bold">{item.stock} Unit</td>
                  <td className="py-2.5 px-3 font-mono font-bold">{item.sellPrice}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setRoute('products')}
                        className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                        title="View Serial Breakdown"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedProdId(item.id)}
                        className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                        title="Select for Purchase"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="w-7 h-7 rounded-lg bg-[#dc2626] text-white flex items-center justify-center cursor-pointer"
                        title="Delete"
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
 * PAGE 6: ALL PRODUCTS (with Branch Serial Breakdown Drawer/Card)
 * ========================================================================== */
export const AllProductsView: React.FC = () => {
  const { products, addProduct, deleteProduct, setRoute, exportDataAsCSV } = useErp();
  const [search, setSearch] = useState('A4Tech');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(products[0]);
  const [sortByStock, setSortByStock] = useState(false);

  const filtered = products
    .filter(
      (p) =>
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.proId.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortByStock ? b.stock - a.stock : 0));

  const activeProd = products.find((p) => p.id === selectedProduct?.id) || products[0];

  const handleDuplicate = (item: ProductItem) => {
    addProduct({
      ...item,
      name: `${item.name} (Copy)`,
      proId: `${item.proId}-C`,
    });
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-4">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <ShoppingCart className="w-5 h-5" />
          <span>All Products</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRoute('add-product')}
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold cursor-pointer"
          >
            + Add Product
          </button>
          <button
            onClick={() => setRoute('add-purchase')}
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold cursor-pointer"
          >
            Purchase Entry Portal
          </button>
        </div>
      </div>

      {/* Export Buttons & Sort Bar matching Page 6 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(['CSV', 'Excel', 'PDF', 'Print'] as const).map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'Print') window.print();
                else
                  exportDataAsCSV(
                    `DiamondTech_Products_${btn}`,
                    products.map((p) => ({
                      ProductID: p.proId,
                      Name: p.name,
                      Brand: p.brand,
                      Stock: p.stock,
                      Cost: p.totalCost,
                      SellPrice: p.sellPrice,
                      Supplier: p.supplier,
                    }))
                  );
              }}
              className="px-4 py-1.5 rounded-md bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-bold shadow cursor-pointer"
            >
              {btn}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSortByStock(!sortByStock)}
          className="px-6 py-2 rounded-full bg-[#001f60] hover:bg-[#001540] text-white text-xs font-bold shadow cursor-pointer"
        >
          Sort & Filters {sortByStock ? '(By Stock ↓)' : ''}
        </button>
      </div>

      {/* Main Products Table Container */}
      <div className="border-2 border-gray-500 rounded-xl p-4 bg-[#e2e6e4] dark:bg-slate-800 space-y-3">
        <div className="flex justify-center">
          <div className="flex items-center bg-[#b8d8e8] rounded-full px-4 h-9 w-64 border border-gray-500">
            <Search className="w-4 h-4 text-gray-600 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter (e.g. A4Tech)..."
              className="bg-transparent text-xs text-gray-800 w-full focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-60">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-y border-gray-500 text-gray-900 dark:text-white font-bold">
                <th className="py-2 px-3">SL</th>
                <th className="py-2 px-3">Pro ID</th>
                <th className="py-2 px-3">Photo</th>
                <th className="py-2 px-3">Product Name</th>
                <th className="py-2 px-3">Purchase Date</th>
                <th className="py-2 px-3">Expiry Date</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3">Sell Price</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-slate-700">
              {filtered.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className={`cursor-pointer transition-colors ${
                    activeProd?.id === item.id
                      ? 'bg-[#b5cfb9] dark:bg-emerald-950/60'
                      : 'hover:bg-white/60 dark:hover:bg-slate-700'
                  }`}
                >
                  <td className="py-2 px-3 font-mono">{idx + 1}</td>
                  <td className="py-2 px-3 font-mono">{item.proId}</td>
                  <td className="py-2 px-3">
                    <img
                      src={item.photo}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-7 object-cover rounded bg-white border"
                    />
                  </td>
                  <td className="py-2 px-3 font-semibold max-w-xs">{item.name}</td>
                  <td className="py-2 px-3 font-mono">{item.purchaseDate}</td>
                  <td className="py-2 px-3 font-mono">{item.expiryDate}</td>
                  <td className="py-2 px-3 font-mono font-bold">{item.stock} Unit</td>
                  <td className="py-2 px-3 font-mono font-bold">{item.sellPrice}</td>
                  <td className="py-2 px-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                        title="Inspect Serials & Stock"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(item)}
                        className="w-6 h-6 rounded-md bg-[#0ea5e9] text-white flex items-center justify-center cursor-pointer"
                        title="Duplicate Product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setRoute('add-product')}
                        className="w-6 h-6 rounded-md bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                        title="Edit Product"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="w-6 h-6 rounded-md bg-[#dc2626] text-white flex items-center justify-center cursor-pointer"
                        title="Delete Product"
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

      {/* Product Detail & Branch Serial No Matrix Card matching bottom of Page 6 */}
      {activeProd && (
        <div className="bg-white dark:bg-slate-800 border-2 border-gray-500 rounded-xl p-5 shadow-md space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left Image + Product ID */}
            <div className="lg:col-span-3 flex flex-col items-center text-center">
              <img
                src={activeProd.photo}
                alt={activeProd.name}
                referrerPolicy="no-referrer"
                className="w-36 h-20 object-cover rounded border border-gray-300 mb-2"
              />
              <div className="text-xs text-gray-600 dark:text-slate-300 font-mono">
                Product ID:
                <div className="font-bold text-gray-900 dark:text-white">{activeProd.proId}</div>
              </div>
            </div>

            {/* Middle Info + Right Date Boxes */}
            <div className="lg:col-span-9 space-y-2.5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white max-w-md">
                  {activeProd.name}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="bg-[#00a8e8] text-white px-5 py-2 rounded-lg text-center text-xs font-semibold shadow-sm">
                    <div>Purchase Date:</div>
                    <div className="font-mono font-bold">{activeProd.purchaseDate}</div>
                  </div>
                  <div className="bg-[#e8702a] text-white px-5 py-2 rounded-lg text-center text-xs font-semibold shadow-sm">
                    <div>Expiry Date:</div>
                    <div className="font-mono font-bold">{activeProd.expiryDate}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-sm pt-1">
                <div>
                  <span className="font-bold">Supplier:</span> {activeProd.supplier}
                </div>
                <div className="text-lg font-extrabold font-mono">
                  Selling Price: ৳ {activeProd.sellPrice}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs font-bold pt-1">
                <div>Total Stock: {activeProd.stock} Unit</div>
                <div>
                  Stock Value: ৳ {(activeProd.stock * activeProd.sellPrice).toLocaleString('en-IN')}
                </div>
                <div>Total Sold: {activeProd.sold} Unit</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs font-bold">
                <div>Total Cost: ৳ {activeProd.totalCost}</div>
                <div>Product Cost: ৳ {activeProd.productCost}</div>
                <div>Tax + Others Cost: ৳ {activeProd.taxOtherCost}</div>
              </div>
            </div>
          </div>

          {/* Serial Number Table by Branch matching Page 6 */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full border-collapse border border-gray-700 text-xs">
              <thead>
                <tr>
                  <th
                    colSpan={4}
                    className="border border-gray-700 py-1.5 px-3 text-left font-semibold bg-gray-50 dark:bg-slate-700"
                  >
                    Product Serial No:
                  </th>
                </tr>
                <tr className="bg-[#a8d0db] dark:bg-sky-900 text-gray-900 dark:text-white font-bold text-center">
                  <th className="border border-gray-700 py-1.5 px-3 w-36">Product Type</th>
                  <th className="border border-gray-700 py-1.5 px-3">
                    Main Branch [{activeProd.branchSerials.mainActive.length + activeProd.branchSerials.mainWarranty.length} Unit]
                  </th>
                  <th className="border border-gray-700 py-1.5 px-3">
                    Sharcha Branch [{activeProd.branchSerials.sharchaActive.length + activeProd.branchSerials.sharchaWarranty.length} Unit]
                  </th>
                  <th className="border border-gray-700 py-1.5 px-3">
                    RN Road Branch [{activeProd.branchSerials.rnRoadActive.length + activeProd.branchSerials.rnRoadWarranty.length} Unit]
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                <tr>
                  <td className="border border-gray-700 py-3 px-3 text-center font-sans font-semibold">
                    Active
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.mainActive.join(', ') || 'None'}
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.sharchaActive.join(', ') || 'None'}
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.rnRoadActive.join(', ') || 'None'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 py-3 px-3 text-center font-sans font-semibold">
                    Warranty/Inactive
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.mainWarranty.join(', ') || 'None'}
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.sharchaWarranty.join(', ') || 'None'}
                  </td>
                  <td className="border border-gray-700 py-2.5 px-3 leading-relaxed">
                    {activeProd.branchSerials.rnRoadWarranty.join(', ') || 'None'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * PAGE 12: STOCK REPORT
 * ========================================================================== */
export const StockReportView: React.FC = () => {
  const { products, setRoute, exportDataAsCSV, notify, openPrintModal } = useErp();
  const [supplierFilter, setSupplierFilter] = useState('All');

  const suppliersList = Array.from(new Set(products.map((p) => p.supplier)));
  const filtered =
    supplierFilter === 'All'
      ? products
      : products.filter((p) => p.supplier === supplierFilter);

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <ListChecks className="w-5 h-5" />
          <span>Stock Report</span>
        </div>
        <span className="text-xs font-medium text-white/90">Sale Entry Portal</span>
      </div>

      {/* Top right Export buttons */}
      <div className="flex justify-end gap-2">
        {(['Copy', 'CSV', 'Excel', 'PDF', 'Print'] as const).map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'Print') window.print();
              else if (btn === 'Copy') {
                navigator.clipboard.writeText(JSON.stringify(filtered, null, 2));
                notify('Stock report copied to clipboard!');
              } else {
                exportDataAsCSV(
                  `Stock_Report_${btn}`,
                  filtered.map((p) => ({
                    Name: p.name,
                    ProID: p.proId,
                    Supplier: p.supplier,
                    Sold: p.sold,
                    Stock: p.stock,
                    Cost: p.totalCost,
                    Value: p.stock * p.totalCost,
                  }))
                );
              }
            }}
            className="px-4 py-1.5 rounded-md bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-bold shadow cursor-pointer"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* 4 KPI Summary Cards matching Page 12 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#fce8d8] rounded-xl p-4 shadow-sm flex items-center justify-between text-gray-900">
          <div>
            <div className="text-xs font-medium text-gray-700">Stock Cost</div>
            <div className="text-2xl font-extrabold font-mono mt-2">৳ 19,50,700.00</div>
          </div>
          <DollarSign className="w-8 h-8 text-gray-900" />
        </div>

        <div className="bg-[#cce4f0] rounded-xl p-4 shadow-sm flex items-center justify-between text-gray-900">
          <div>
            <div className="text-xs font-medium text-gray-700">Stock Sell Worth</div>
            <div className="text-2xl font-extrabold font-mono mt-2">৳ 24,50,900.00</div>
          </div>
          <DollarSign className="w-8 h-8 text-gray-900" />
        </div>

        <div className="bg-[#ccebd6] rounded-xl p-4 shadow-sm flex items-center justify-between text-gray-900">
          <div>
            <div className="text-xs font-medium text-gray-700">Sell Profit</div>
            <div className="text-2xl font-extrabold font-mono mt-2">৳ 5,00,200.00</div>
          </div>
          <DollarSign className="w-8 h-8 text-gray-900" />
        </div>

        <div className="bg-[#f7d6e6] rounded-xl p-4 shadow-sm flex items-center justify-between text-gray-900">
          <div>
            <div className="text-xs font-medium text-gray-700">Total Unit</div>
            <div className="text-2xl font-extrabold font-mono mt-2">1800</div>
          </div>
          <div className="w-8 h-8 border-2 border-gray-800 rounded bg-stripes" />
        </div>
      </div>

      {/* Filter & All Products Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span>All Products</span>
        </div>
        <div className="w-72">
          <label className="block text-xs text-gray-600 mb-1">Filter</label>
          <select
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
          >
            <option value="All">All Suppliers</option>
            {suppliersList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock Report Table matching Page 12 */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-400">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-500 text-gray-900 dark:text-white font-bold">
              <th className="py-3 px-4">SL</th>
              <th className="py-3 px-4">Products Name</th>
              <th className="py-3 px-4 text-center">Pro ID</th>
              <th className="py-3 px-4 text-center">Supplier</th>
              <th className="py-3 px-4 text-center">Sold</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-center">Cost</th>
              <th className="py-3 px-4 text-right">Value</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {filtered.map((p, idx) => (
              <tr
                key={p.id}
                className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-700/50' : 'bg-white dark:bg-slate-800'}
              >
                <td className="py-3 px-4 font-mono">{idx + 1}</td>
                <td className="py-3 px-4 font-medium max-w-xs">{p.name}</td>
                <td className="py-3 px-4 text-center font-mono">{p.proId}</td>
                <td className="py-3 px-4 text-center">{p.supplier}</td>
                <td className="py-3 px-4 text-center font-mono">{p.sold}</td>
                <td className="py-3 px-4 text-center font-mono font-bold">{p.stock} Unit</td>
                <td className="py-3 px-4 text-center font-mono">{p.totalCost}</td>
                <td className="py-3 px-4 text-right font-mono font-bold">
                  {(p.stock * p.totalCost).toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setRoute('products')}
                      className="w-7 h-7 rounded-lg bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                      title="View Product"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        openPrintModal({
                          mode: 'label',
                          product: p,
                          serialNo: p.proId,
                        })
                      }
                      className="w-7 h-7 rounded-lg bg-[#0ea5e9] text-white flex items-center justify-center cursor-pointer"
                      title="Print Barcode"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        notify(`WhatsApp stock reorder message prepared for ${p.supplier}`)
                      }
                      className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      title="WhatsApp Supplier"
                    >
                      <MessageCircle className="w-4 h-4" />
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
 * PAGE 14: ADD CATEGORY
 * ========================================================================== */
export const AddCategoryView: React.FC = () => {
  const { categories, addCategory, deleteCategory, notify } = useErp();

  const [rootCategory, setRootCategory] = useState('Accessories');
  const [rootCode, setRootCode] = useState('10');
  const [mainCategory, setMainCategory] = useState('Keyboard');
  const [mainCode, setMainCode] = useState('101');
  const [subCategory, setSubCategory] = useState('Wired Keyboard');
  const [subCode, setSubCode] = useState('201');
  const [brand, setBrand] = useState('A4Tech');
  const [brandCode, setBrandCode] = useState('501');

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchCat, setSearchCat] = useState('');

  const categoryId = `${rootCode}.${mainCode}.${subCode}.${brandCode}.001`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({
      name: rootCategory,
      rootCode,
      mainCategory,
      mainCode,
      subCategory,
      subCode,
      brand,
      brandCode,
      categoryId,
      productsCount: 15,
      salesAmount: 0,
      lastUpdated: new Date().toISOString().slice(0, 10),
    });
  };

  const filteredCats = categories.filter((c) =>
    c.name.toLowerCase().includes(searchCat.toLowerCase())
  );

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold">Add Category</div>
        <span className="text-xs font-medium text-white/90">Sale Entry Portal</span>
      </div>

      {/* Category Builder Form matching Page 14 */}
      <form onSubmit={handleSave} className="space-y-3 max-w-5xl">
        {[
          {
            label: 'Root Category',
            val: rootCategory,
            setVal: setRootCategory,
            code: rootCode,
            setCode: setRootCode,
            options: ['Accessories', 'Component', 'Monitor', 'Networking', 'PC', 'Printing', 'Security'],
          },
          {
            label: 'Main Category',
            val: mainCategory,
            setVal: setMainCategory,
            code: mainCode,
            setCode: setMainCode,
            options: ['Keyboard', 'Mouse', 'Motherboard', 'Monitor', 'Router', 'Printer'],
          },
          {
            label: 'Sub Category',
            val: subCategory,
            setVal: setSubCategory,
            code: subCode,
            setCode: setSubCode,
            options: ['Wired Keyboard', 'Gaming Keyboard', 'Wired Mouse', 'FHD Monitor', 'WiFi Router'],
          },
          {
            label: 'Brand',
            val: brand,
            setVal: setBrand,
            code: brandCode,
            setCode: setBrandCode,
            options: ['A4Tech', 'MSI', 'Asus', 'TP-Link', 'Corsair', 'ZKTeco'],
          },
        ].map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end bg-gray-200/70 dark:bg-slate-800 p-2.5 rounded-xl"
          >
            <div className="lg:col-span-5 flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
                  {row.label}
                </label>
                <select
                  value={row.val}
                  onChange={(e) => row.setVal(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-sm"
                >
                  {row.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  const custom = prompt(`Enter new ${row.label}:`);
                  if (custom) row.setVal(custom);
                }}
                className="w-10 h-10 rounded-lg bg-[#1e40af] text-white flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">Code</label>
              <input
                type="text"
                value={row.code}
                onChange={(e) => row.setCode(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-center font-mono text-sm"
              />
            </div>

            <div className="lg:col-span-5">
              <label className="block text-xs text-gray-600 dark:text-slate-300 mb-1">
                Photo/Logo
              </label>
              <label className="flex items-center justify-between h-10 px-4 rounded-full bg-white dark:bg-slate-900 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>.jpg, .png, Browse File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={() => notify(`Logo selected for ${row.label}`)}
                />
              </label>
            </div>
          </div>
        ))}

        <div className="max-w-md pt-1">
          <label className="block text-xs text-gray-600 mb-1">Category ID</label>
          <input
            type="text"
            readOnly
            value={categoryId}
            className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 font-mono text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-44 h-11 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
        >
          Save Category
        </button>
      </form>

      {/* Bottom Categories Directory matching Page 14 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-300 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-[#2e9e49] text-white text-xs font-bold cursor-pointer"
          >
            + Add Category
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                viewMode === 'cards' ? 'bg-[#0284c7] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                viewMode === 'table' ? 'bg-[#0284c7] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <div className="relative">
              <input
                type="text"
                value={searchCat}
                onChange={(e) => setSearchCat(e.target.value)}
                placeholder="Search categories..."
                className="h-8 pl-3 pr-8 rounded-full border border-gray-300 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2" />
            </div>
          </div>
        </div>

        {viewMode === 'table' ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-700 dark:text-slate-300 font-bold">
                <th className="py-2.5 px-3">::</th>
                <th className="py-2.5 px-3">Category Name</th>
                <th className="py-2.5 px-3">Products</th>
                <th className="py-2.5 px-3">Sales</th>
                <th className="py-2.5 px-3">Last Updated</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredCats.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40">
                  <td className="py-2.5 px-3 text-gray-400 font-mono">⋮⋮</td>
                  <td className="py-2.5 px-3 font-bold">{c.name}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-mono text-[11px]">
                      {c.productsCount}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono">BDT{c.salesAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">{c.lastUpdated}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setRootCategory(c.name);
                          setRootCode(c.rootCode);
                        }}
                        className="w-7 h-7 rounded bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCategory(c.id)}
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
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredCats.map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.productsCount} Products</div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700">৳{c.salesAmount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
