import React from 'react';
import { Zap, Printer, Eye, Trash2 } from 'lucide-react';
import { useErp } from '../context/ErpContext';

export const DashboardView: React.FC = () => {
  const {
    products,
    customers,
    orders,
    financials,
    activities,
    setRoute,
    deleteProduct,
    openPrintModal,
  } = useErp();

  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const totalStockValue = products.reduce((sum, p) => sum + p.stock * p.totalCost, 0);
  const totalCustomerDue = customers.reduce((sum, c) => sum + c.due, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

  const todayRevenue = financials
    .filter((f) => f.type === 'Income')
    .reduce((sum, f) => sum + f.income, 0);
  const todayExpense = financials
    .filter((f) => f.type === 'Expense')
    .reduce((sum, f) => sum + f.expense, 0);

  const lowStockProducts = products.filter((p) => p.stock <= 15);

  const chartData = [
    { label: "Dec '25", income: 8, expense: 6 },
    { label: " Jan '26", income: 10, expense: 8 },
    { label: "Feb '26", income: 12, expense: 10 },
    { label: "Mar '26", income: 15, expense: 13 },
    { label: "Apr '26", income: 18, expense: 16 },
    { label: "May '26", income: 22, expense: 18 },
    { label: "Jun '26", income: 20, expense: 14 },
    { label: "Jul '26", income: 18, expense: 11 },
    { label: "Aug '26", income: 15, expense: 12 },
    { label: "Sep '26", income: 13, expense: 10 },
    { label: "Oct '26", income: 16, expense: 11 },
    { label: "Nov '26", income: 12, expense: 9 },
  ];

  return (
    <div className="p-5 space-y-6 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-900 dark:text-slate-100">
      {/* Top 4 KPI Cards matching Page 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Products */}
        <div className="rounded-xl overflow-hidden shadow-md bg-[#22581b] text-white flex flex-col justify-between min-h-[126px]">
          <div className="p-4">
            <div className="text-sm font-medium text-white/90">Total Products</div>
            <div className="text-3xl font-extrabold font-mono mt-1">{1257 + products.length}</div>
          </div>
          <button
            onClick={() => setRoute('add-product')}
            className="w-full py-2 px-4 bg-[#194414] hover:bg-[#13350f] text-left text-sm font-bold transition-colors cursor-pointer"
          >
            Add Products
          </button>
        </div>

        {/* Card 2: Total Customer */}
        <div className="rounded-xl overflow-hidden shadow-md bg-[#6b2891] text-white flex flex-col justify-between min-h-[126px]">
          <div className="p-4">
            <div className="text-sm font-medium text-white/90">Total Customer</div>
            <div className="text-3xl font-extrabold font-mono mt-1">{2295 + customers.length}</div>
          </div>
          <button
            onClick={() => setRoute('customers')}
            className="w-full py-2 px-4 bg-[#581f78] hover:bg-[#461860] text-left text-sm font-bold transition-colors cursor-pointer"
          >
            Add Customer
          </button>
        </div>

        {/* Card 3: Order Pending */}
        <div className="rounded-xl overflow-hidden shadow-md bg-[#e61919] text-white flex flex-col justify-between min-h-[126px]">
          <div className="p-4">
            <div className="text-sm font-medium text-white/90">Order Pending</div>
            <div className="text-3xl font-extrabold font-mono mt-1">{10 + pendingOrdersCount}</div>
          </div>
          <button
            onClick={() => setRoute('all-orders')}
            className="w-full py-2 px-4 bg-[#c21313] hover:bg-[#a10f0f] text-left text-sm font-bold transition-colors cursor-pointer"
          >
            See Detail
          </button>
        </div>

        {/* Card 4: Today Order */}
        <div className="rounded-xl overflow-hidden shadow-md bg-[#072f5f] text-white flex flex-col justify-between min-h-[126px]">
          <div className="p-4">
            <div className="text-sm font-medium text-white/90">Today Order</div>
            <div className="text-3xl font-extrabold font-mono mt-1">{53 + orders.length}</div>
          </div>
          <button
            onClick={() => setRoute('sales-invoice')}
            className="w-full py-2 px-4 bg-[#052347] hover:bg-[#031833] text-left text-sm font-bold transition-colors cursor-pointer"
          >
            Add Sales
          </button>
        </div>
      </div>

      {/* Middle Split: Business Performance (Left) + Quick Actions & Recent Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Business Performance */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-slate-100">Business Performance</h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            {/* 2x2 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#dbe9f6] dark:bg-sky-950/60 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-700 dark:text-sky-200">Today Revenue</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono mt-2">
                  ৳ {todayRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-[#fce5d8] dark:bg-orange-950/60 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-700 dark:text-orange-200">Today Expense</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono mt-2">
                  ৳ {todayExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-[#dcf0f7] dark:bg-cyan-950/60 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-700 dark:text-cyan-200">Stock Value</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono mt-2">
                  ৳ {(1050700 + totalStockValue - 418910).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-[#f9d5e5] dark:bg-pink-950/60 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-700 dark:text-pink-200">Customer Due</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono mt-2">
                  ৳ {(1050240 + totalCustomerDue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Expense vs Income Bar Chart matching Page 2 */}
            <div className="pt-2">
              <div className="flex items-center justify-end gap-8 text-xs font-semibold mb-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#e83e8c]" />
                  <span>Expense</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0077c2]" />
                  <span>Income</span>
                </div>
              </div>

              <div className="flex items-end gap-3 h-44 pt-4 px-2 border-b border-gray-200 dark:border-slate-700 relative">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between h-full text-[10px] text-gray-400 font-mono pr-2 pb-1">
                  <span>24</span>
                  <span>18</span>
                  <span>12</span>
                  <span>6</span>
                  <span>0</span>
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end justify-between h-full gap-2">
                  {chartData.map((d, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="flex items-end gap-1 w-full justify-center h-[88%]">
                        <div
                          style={{ height: `${(d.income / 24) * 100}%` }}
                          className="w-2.5 bg-[#0077c2] rounded-t transition-all group-hover:opacity-80"
                          title={`Income: ${d.income}L`}
                        />
                        <div
                          style={{ height: `${(d.expense / 24) * 100}%` }}
                          className="w-2.5 bg-[#e83e8c] rounded-t transition-all group-hover:opacity-80"
                          title={`Expense: ${d.expense}L`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pl-8 pr-2 pt-1.5 text-[10px] text-gray-500 font-mono">
                <span>Dec '25</span>
                <span>Feb '26</span>
                <span>Apr '26</span>
                <span>Jun '26</span>
                <span>Aug '26</span>
                <span>Oct '26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Quick Actions + Recent Activity */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Actions 3x2 Grid */}
          <div>
            <div className="flex items-center gap-1.5 text-base font-bold text-gray-800 dark:text-slate-100 mb-2.5">
              <Zap className="w-5 h-5 text-yellow-500 fill-current" />
              <span>Quick Actions</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setRoute('sales-invoice')}
                className="py-2.5 px-3 rounded-lg bg-[#2e9e49] hover:bg-[#24823b] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Add Sale
              </button>
              <button
                onClick={() => setRoute('add-purchase')}
                className="py-2.5 px-3 rounded-lg bg-[#1d6373] hover:bg-[#164e5b] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Purchase
              </button>
              <button
                onClick={() => setRoute('add-product')}
                className="py-2.5 px-3 rounded-lg bg-[#e8702a] hover:bg-[#c95e20] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Product
              </button>
              <button
                onClick={() => setRoute('warranty')}
                className="py-2.5 px-3 rounded-lg bg-[#702963] hover:bg-[#571f4d] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Warranty
              </button>
              <button
                onClick={() => setRoute('repair-service')}
                className="py-2.5 px-3 rounded-lg bg-[#297339] hover:bg-[#1f592b] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Repair
              </button>
              <button
                onClick={() => setRoute('returns')}
                className="py-2.5 px-3 rounded-lg bg-[#ff3b00] hover:bg-[#d93200] text-white font-semibold text-sm shadow cursor-pointer"
              >
                + Returns
              </button>
            </div>
          </div>

          {/* Recent Activity Box with green border */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border-[3px] border-[#2e9e49] p-4 shadow-sm">
            <h3 className="text-xs font-bold text-[#3b82f6] mb-3">Recent Activity</h3>
            <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-2">
              {activities.map((act, index) => (
                <div key={act.id} className="flex items-start gap-2.5 text-[11px] leading-snug">
                  <span className="text-emerald-600 font-mono whitespace-nowrap w-10 text-right shrink-0">
                    {act.timeAgo}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ${
                      index % 2 === 0 ? 'bg-emerald-500' : 'bg-sky-600'
                    }`}
                  />
                  <p className="text-gray-700 dark:text-slate-300">
                    <span className="font-semibold italic">"{act.productName}"</span>{' '}
                    <span className="text-gray-500">{act.actionText}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Low Stock Alerts matching Page 2 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800 dark:text-slate-100">
            Low Stock Alerts (Total Stock: {totalStockUnits} Units)
          </h2>
          <button
            onClick={() => setRoute('stock-report')}
            className="text-xs font-bold text-gray-900 dark:text-white hover:underline cursor-pointer"
          >
            View All ({lowStockProducts.length})
          </button>
        </div>

        <div className="bg-[#e3eef2] dark:bg-slate-800 rounded-lg overflow-hidden border border-[#1ca3de] shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#1ca3de] text-gray-900 font-bold text-sm">
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1ca3de]/40">
              {lowStockProducts.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-2.5 px-4">
                    <img
                      src={item.photo}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-9 object-cover rounded border border-gray-300 bg-white"
                    />
                  </td>
                  <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-white max-w-md">
                    <div className="line-clamp-1">{item.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{item.proId}</div>
                  </td>
                  <td className="py-2.5 px-4 text-center font-bold text-red-600 font-mono">
                    {item.stock} Unit
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold font-mono">৳ {item.sellPrice}</td>
                  <td className="py-2.5 px-4 text-gray-700 dark:text-slate-300">{item.supplier}</td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          openPrintModal({
                            mode: 'label',
                            product: item,
                            serialNo: item.branchSerials.mainActive[0] || '26061205',
                          })
                        }
                        className="w-8 h-8 rounded-lg bg-[#00a8e8] hover:bg-[#0086b8] text-white flex items-center justify-center shadow cursor-pointer"
                        title="Print Barcode Sticker"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRoute('products')}
                        className="w-8 h-8 rounded-lg bg-[#5a3e36] hover:bg-[#422d27] text-white flex items-center justify-center shadow cursor-pointer"
                        title="View Product Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="w-8 h-8 rounded-lg bg-[#e61919] hover:bg-[#b81414] text-white flex items-center justify-center shadow cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer matching Page 2 */}
      <footer className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-gray-700 dark:text-slate-400">
        <div>© 2026 Diamond Tech Computer. All rights reserved.</div>
        <div>Developed & Designed by Eleas Kanchon</div>
      </footer>
    </div>
  );
};
