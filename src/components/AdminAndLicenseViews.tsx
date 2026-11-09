import React, { useState } from 'react';
import {
  Building2,
  Camera,
  Pencil,
  Trash2,
  UserPlus,
  Eye,
  Database,
  Download,
  Upload,
  KeyRound,
  ShieldCheck,
  Globe,
  Clock,
  ArrowLeft,
  Search,
  Lock,
  Save,
} from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { avatarDataUrl } from '../data/initialData';

/* ============================================================================
 * PAGE 22: COMPANY SETTINGS & BRANCH MANAGEMENT
 * ========================================================================== */
export const CompanySettingsView: React.FC = () => {
  const { companySettings, updateCompanySettings, notify } = useErp();
  const [form, setForm] = useState(companySettings);

  const [branchName, setBranchName] = useState('Diamond Tech');
  const [branchType, setBranchType] = useState<'Main' | 'Sub'>('Main');
  const [branchAddress, setBranchAddress] = useState('Diamond Plaza, Ad-din Road, Jhikargacha, Jashore');
  const [branchEmail, setBranchEmail] = useState('dtechmainjsr@gmail.com');
  const [branchMobile, setBranchMobile] = useState('01517850737');
  const [branchWhatsapp, setBranchWhatsapp] = useState('01923862251');

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(form);
  };

  const handleAddBranch = () => {
    const nextBranches = [
      ...form.branches,
      {
        id: `br_${Date.now()}`,
        name: branchName,
        address: branchAddress,
        type: branchType,
        email: branchEmail,
        mobile: branchMobile,
        whatsapp: branchWhatsapp,
      },
    ];
    const updated = { ...form, branches: nextBranches };
    setForm(updated);
    updateCompanySettings(updated);
  };

  const toggleFeature = (id: string) => {
    const nextFeatures = form.features.map((f) =>
      f.id === id ? { ...f, allowed: !f.allowed } : f
    );
    const updated = { ...form, features: nextFeatures };
    setForm(updated);
    updateCompanySettings(updated);
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <Building2 className="w-5 h-5" />
            <span>Company Settings</span>
          </div>
          <div className="text-xs text-white/90 pl-7">Manage Your Business</div>
        </div>
      </div>

      {/* Main Company Form matching Page 22 */}
      <form onSubmit={handleSaveCompany} className="max-w-5xl space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Business /Store Type</label>
            <input
              type="text"
              value={form.storeType}
              onChange={(e) => setForm({ ...form, storeType: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Country</label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="Bangladesh">Bangladesh</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 mb-1">Currency symbol</label>
            <select
              value={form.currencySymbol}
              onChange={(e) => setForm({ ...form, currencySymbol: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            >
              <option value="৳ (BDT)">৳ (BDT)</option>
              <option value="$ (USD)">$ (USD)</option>
            </select>
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Business Name/Store Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-bold"
            />
          </div>
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Business Slogan</label>
            <input
              type="text"
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Business/Store Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">Mobile No</label>
            <input
              type="text"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
          <div className="lg:col-span-6">
            <label className="block text-xs text-gray-600 mb-1">WhatsApp No</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
            />
          </div>
        </div>

        {/* Update Button + Logo + Official QR Row */}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-36 h-10 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
          >
            Update
          </button>

          <div className="flex items-end gap-3">
            <div className="w-12 h-10 rounded bg-gray-400 flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Logo</label>
              <label className="flex items-center gap-4 h-10 px-4 rounded-full bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>Under 200KB</span>
                <span className="font-semibold text-gray-500">Browse File</span>
                <input type="file" className="hidden" onChange={() => notify('Company Logo uploaded!')} />
              </label>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="w-12 h-10 rounded bg-gray-400 flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Official QR</label>
              <label className="flex items-center gap-4 h-10 px-4 rounded-full bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-400 cursor-pointer">
                <span>Under 200KB</span>
                <span className="font-semibold text-gray-500">Browse File</span>
                <input type="file" className="hidden" onChange={() => notify('Official QR uploaded!')} />
              </label>
            </div>
          </div>
        </div>
      </form>

      {/* Branches Table matching Page 22 */}
      <div className="max-w-5xl space-y-2 pt-2">
        <div className="overflow-x-auto border border-gray-600 rounded">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#1e6b2b] text-white font-bold">
                <th className="py-2 px-3 border border-gray-600">SL</th>
                <th className="py-2 px-3 border border-gray-600">Photo</th>
                <th className="py-2 px-3 border border-gray-600">Product Name</th>
                <th className="py-2 px-3 border border-gray-600">Address</th>
                <th className="py-2 px-3 border border-gray-600 text-center">Type</th>
                <th className="py-2 px-3 border border-gray-600 text-center">Mobile</th>
                <th className="py-2 px-3 border border-gray-600 text-center">WahtsApp</th>
                <th className="py-2 px-3 border border-gray-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {form.branches.map((br, idx) => (
                <tr key={br.id} className="bg-[#bfd4c4] dark:bg-slate-800">
                  <td className="py-2 px-3 border border-gray-600 font-mono">{idx + 1}</td>
                  <td className="py-2 px-3 border border-gray-600">
                    <div className="w-8 h-6 border border-black flex items-center justify-center font-bold text-[10px] bg-white text-black">
                      DT
                    </div>
                  </td>
                  <td className="py-2 px-3 border border-gray-600 font-bold">{br.name}</td>
                  <td className="py-2 px-3 border border-gray-600">{br.address}</td>
                  <td className="py-2 px-3 border border-gray-600 text-center">{br.type}</td>
                  <td className="py-2 px-3 border border-gray-600 text-center font-mono">{br.mobile}</td>
                  <td className="py-2 px-3 border border-gray-600 text-center font-mono">{br.whatsapp}</td>
                  <td className="py-2 px-3 border border-gray-600">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          setBranchName(br.name);
                          setBranchAddress(br.address);
                          setBranchMobile(br.mobile);
                        }}
                        className="w-7 h-7 rounded bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const next = form.branches.filter((b) => b.id !== br.id);
                          setForm({ ...form, branches: next });
                          updateCompanySettings({ ...form, branches: next });
                        }}
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

        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={handleAddBranch}
            className="px-6 py-2 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm shadow cursor-pointer"
          >
            +Add Branch
          </button>
        </div>
      </div>

      {/* Bottom Split: Branch Management (Left) & Add or Remove Features (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl pt-2">
        {/* Left: Branch Management */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-[#1e6b2b] text-white px-4 py-2 rounded-t-xl font-bold text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Branch Management</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Branches Name</label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Branch Type</label>
              <select
                value={branchType}
                onChange={(e) => setBranchType(e.target.value as 'Main' | 'Sub')}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
              >
                <option value="Main">Main</option>
                <option value="Sub">Sub</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Business/Store Address</label>
            <input
              type="text"
              value={branchAddress}
              onChange={(e) => setBranchAddress(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={branchEmail}
              onChange={(e) => setBranchEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mobile No</label>
              <input
                type="text"
                value={branchMobile}
                onChange={(e) => setBranchMobile(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">WhatsApp No</label>
              <input
                type="text"
                value={branchWhatsapp}
                onChange={(e) => setBranchWhatsapp(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right: Add or Remove Features */}
        <div className="lg:col-span-6">
          <div className="bg-[#1e6b2b] text-white px-4 py-2 rounded-t-xl font-bold text-sm">
            Add or Remove Features
          </div>
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-500 font-bold">
                <th className="py-1.5 px-3">Permission Feature</th>
                <th className="py-1.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {form.features.map((feat, idx) => (
                <tr
                  key={feat.id}
                  className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/50'}
                >
                  <td className="py-1.5 px-3 font-medium">{feat.name}</td>
                  <td className="py-1.5 px-3">
                    <button
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className="inline-flex items-center w-20 h-6 rounded-full border border-gray-500 bg-white p-0.5 cursor-pointer"
                    >
                      {feat.allowed ? (
                        <span className="w-11 h-full rounded-full bg-[#1a4b6e] text-white text-[10px] font-bold flex items-center justify-center">
                          Allow
                        </span>
                      ) : (
                        <span className="w-11 h-full ml-auto rounded-full bg-[#1a4b6e] text-white text-[10px] font-bold flex items-center justify-center">
                          Deny
                        </span>
                      )}
                    </button>
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
 * PAGE 23: USER SETTINGS & ACCESS CONTROL (User Portal)
 * ========================================================================== */
export const UserSettingsView: React.FC = () => {
  const { users, addUser, deleteUser, notify } = useErp();

  const [showPassId, setShowPassId] = useState<string | null>(null);
  const [userName, setUserName] = useState('eleas_admin');
  const [fullName, setFullName] = useState('Eleas Kanchon');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1992-05-15');
  const [bankName, setBankName] = useState('Islami Bank Bangladesh PLC');
  const [accountNo, setAccountNo] = useState('20501920201548');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [mobile, setMobile] = useState('01517850737');
  const [branch, setBranch] = useState('Main Branch');
  const [currentPassword, setCurrentPassword] = useState('123456');
  const [whatsapp, setWhatsapp] = useState('01923862251');
  const [email, setEmail] = useState('admin@institute.gov.bd');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enableSignInReport, setEnableSignInReport] = useState(true);

  const [adminPerms, setAdminPerms] = useState([
    { name: 'Sate Settings', allowed: true },
    { name: 'User Control', allowed: true },
    { name: 'Online Oder Control', allowed: true },
    { name: 'Online Oder Manage', allowed: true },
    { name: 'Payment Management', allowed: true },
    { name: 'Income Expense', allowed: true },
    { name: 'Product Management', allowed: true },
    { name: 'Business Report', allowed: true },
    { name: 'Database Backup', allowed: true },
    { name: 'Landing Page Settings', allowed: true },
  ]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      userName,
      fullName,
      email,
      role: 'Admin',
      branch,
      password: newPassword || currentPassword || '123456',
      mobile,
      whatsapp,
      gender,
      dob,
      bloodGroup,
      bankName,
      accountNo,
      photo: avatarDataUrl('#4c1d95', fullName.slice(0, 2).toUpperCase()),
      enableSignInReport,
    });
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <UserPlus className="w-5 h-5" />
          <span>User Settings & Access Control</span>
        </div>
        <span className="text-xs font-medium text-white/90">User Portal</span>
      </div>

      <div className="flex justify-end max-w-6xl">
        <button
          onClick={handleAddUser}
          className="px-6 py-2 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-xs shadow cursor-pointer"
        >
          + Add New User
        </button>
      </div>

      {/* Users Table matching Page 23 */}
      <div className="max-w-6xl overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="border-y-2 border-gray-500 font-bold text-sm">
              <th className="py-2 px-3">SL</th>
              <th className="py-2 px-3">Photo</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Branch</th>
              <th className="py-2 px-3">Current Password</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {users.map((u, idx) => (
              <tr
                key={u.id}
                className={idx % 2 === 0 ? 'bg-[#bfd4c4] dark:bg-slate-800' : 'bg-white/70 dark:bg-slate-800/60'}
              >
                <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                <td className="py-2.5 px-3">
                  <img
                    src={u.photo}
                    alt={u.fullName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full mx-auto object-cover border bg-white"
                  />
                </td>
                <td className="py-2.5 px-3 font-bold">{u.fullName}</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">{u.email}</td>
                <td className="py-2.5 px-3">{u.role}</td>
                <td className="py-2.5 px-3">{u.branch}</td>
                <td className="py-2.5 px-3 font-mono">
                  <div className="inline-flex items-center gap-2">
                    <span>{showPassId === u.id ? u.password : '*****'}</span>
                    <button
                      onClick={() => setShowPassId(showPassId === u.id ? null : u.id)}
                      className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="w-8 h-8 rounded-lg bg-[#dc2626] text-white inline-flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MY ACCOUNT SETTINGS matching Page 23 */}
      <form onSubmit={handleAddUser} className="max-w-6xl space-y-3 pt-2">
        <div className="bg-[#1e6b2b] text-white px-4 py-2 rounded font-bold text-sm uppercase">
          EDIT MY ACCOUNT SETTINGS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-600 mb-1">User Name*</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Photo</label>
            <label className="flex items-center justify-center h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-500 cursor-pointer">
              Browse File
              <input type="file" className="hidden" onChange={() => notify('Profile photo updated!')} />
            </label>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Signature</label>
            <label className="flex items-center justify-center h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs text-gray-500 cursor-pointer">
              Browse File
              <input type="file" className="hidden" onChange={() => notify('Digital signature uploaded!')} />
            </label>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Gender *</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Account No</label>
            <input
              type="text"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            >
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Mobile No</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Select Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            >
              <option value="Main Branch">Main Branch</option>
              <option value="Sharcha Branch">Sharcha Branch</option>
              <option value="RN Road Branch">RN Road Branch</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Current Password *</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">WhatsApp No</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={enableSignInReport}
              onChange={(e) => setEnableSignInReport(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Enable Sign in Report</span>
          </label>

          <button
            type="submit"
            onClick={() => notify('Account profile settings updated!')}
            className="px-6 py-2 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-xs shadow cursor-pointer"
          >
            Update Profile Settings
          </button>
        </div>
      </form>

      {/* Bottom Split: ROLES (Left) & PERMISSION OF "ADMIN" (Right) matching Page 23 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl pt-4">
        <div className="lg:col-span-5">
          <div className="bg-[#002855] text-white py-2 px-4 text-center font-bold text-sm">ROLES</div>
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-400 font-bold">
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {['Admin', 'Accountant'].map((r, idx) => (
                <tr key={r} className={idx % 2 === 0 ? 'bg-[#bfd4c4]' : 'bg-white/70'}>
                  <td className="py-3 px-3 font-semibold text-gray-900">{r}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => notify(`Editing permissions for role: ${r}`)}
                        className="w-7 h-7 rounded bg-[#22c55e] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => notify(`Cannot delete system role: ${r}`)}
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

        <div className="lg:col-span-7">
          <div className="bg-[#002855] text-white py-2 px-4 text-center font-bold text-sm">
            PERMISSION OF "ADMIN"
          </div>
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-400 font-bold">
                <th className="py-1.5 px-3">Permission Module</th>
                <th className="py-1.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {adminPerms.map((p, idx) => (
                <tr key={p.name} className={idx % 2 === 0 ? 'bg-[#bfd4c4]' : 'bg-white/70'}>
                  <td className="py-1.5 px-3 font-medium text-gray-900">{p.name}</td>
                  <td className="py-1.5 px-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAdminPerms((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, allowed: !item.allowed } : item
                          )
                        )
                      }
                      className="inline-flex items-center w-20 h-6 rounded-full border border-gray-500 bg-white p-0.5 cursor-pointer"
                    >
                      {p.allowed ? (
                        <span className="w-11 h-full rounded-full bg-[#1a4b6e] text-white text-[10px] font-bold flex items-center justify-center">
                          Allow
                        </span>
                      ) : (
                        <span className="w-11 h-full ml-auto rounded-full bg-[#dc2626] text-white text-[10px] font-bold flex items-center justify-center">
                          Deny
                        </span>
                      )}
                    </button>
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
 * PAGE 24: DATABASE BACKUP (User Portal)
 * ========================================================================== */
export const DatabaseBackupView: React.FC = () => {
  const {
    products,
    customers,
    orders,
    backups,
    createBackupNow,
    restoreFromBackupFile,
  } = useErp();

  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedFileContent(String(ev.target?.result || ''));
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-6">
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-lg font-bold">
          <Database className="w-5 h-5" />
          <span>Database Backup</span>
        </div>
        <span className="text-xs font-medium text-white/90">User Portal</span>
      </div>

      {/* Top Summary Boxes + Backup Now Button matching Page 24 */}
      <div className="flex flex-wrap items-center gap-6 max-w-5xl">
        <div className="bg-white dark:bg-slate-800 border border-gray-500 rounded-xl p-5 w-72 space-y-3 text-xs shadow-xs">
          <div>Files: Mon, 12 Oct 2026 02:15 PM</div>
          <div className="font-bold">Time Now: Tue, 03 Nov 2026 10:52 AM</div>
          <div>Database: Mon, 12 Oct 2026 02:15 PM</div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-500 rounded-xl p-5 w-72 space-y-2.5 text-xs shadow-xs">
          <div className="font-bold">Relational Tables Summary:</div>
          <ul className="space-y-1.5 pl-4 list-disc font-bold">
            <li>Product: {35 + products.length} records</li>
            <li>Customer: {17 + customers.length} records</li>
            <li>Invoice: {106 + orders.length} records</li>
          </ul>
        </div>

        <button
          onClick={createBackupNow}
          className="px-7 py-3 rounded-xl bg-[#002855] hover:bg-[#001835] text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Backup Now</span>
        </button>
      </div>

      {/* Existing Backups / Restore System Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl max-w-5xl shadow-sm">
        <div className="text-base font-bold">Existing Backups / Restore System</div>
        <div className="text-xs text-white/90">Restore system</div>
      </div>

      {/* Upload Backup File & Restore Row */}
      <div className="max-w-5xl space-y-2">
        <label className="block text-xs text-gray-600">Upload Backup File</label>
        <div className="flex items-center gap-4">
          <label className="flex-1 h-11 px-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-400 flex items-center text-xs text-gray-500 cursor-pointer">
            <span>{selectedFileName || 'Browse File (.json)'}</span>
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (selectedFileContent) {
                restoreFromBackupFile(selectedFileContent, selectedFileName);
              } else {
                createBackupNow();
              }
            }}
            className="px-8 h-11 rounded-xl bg-[#002855] hover:bg-[#001835] text-white font-bold text-sm flex items-center gap-2 shadow cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Restore</span>
          </button>
        </div>
      </div>

      {/* Backups Table */}
      <div className="max-w-5xl overflow-x-auto pt-2">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-500 font-bold">
              <th className="py-2.5 px-3">Filename</th>
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3">Size</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {backups.map((b) => (
              <tr key={b.id} className="bg-[#bfd4c4] dark:bg-slate-800">
                <td className="py-3 px-3 font-mono font-medium">{b.filename}</td>
                <td className="py-3 px-3 font-mono">{b.timestamp}</td>
                <td className="py-3 px-3 font-mono">{b.size}</td>
                <td className="py-3 px-3 font-bold text-emerald-800 dark:text-emerald-400">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 25: SOFTWARE LICENSE ADMINISTRATION (License Portal)
 * ========================================================================== */
export const LicenseRenewalView: React.FC = () => {
  const { siteLicenses, updateSiteLicense, notify } = useErp();
  const activeLic = siteLicenses[0];

  const [newKey, setNewKey] = useState('XXXX-XXXX-XXXX-XXXX');
  const [edition, setEdition] = useState(activeLic?.edition || 'Pro ERP Edition (Commercial)');
  const [institution, setInstitution] = useState(activeLic?.siteName || 'Diamond Tech');
  const [domain, setDomain] = useState(activeLic?.domain || 'diamondtechbd.com');

  const handleReplaceKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeLic) {
      updateSiteLicense({
        ...activeLic,
        licenseKey: newKey.includes('X') ? 'erp-diamondtech-2027-pro' : newKey,
        edition,
        siteName: institution,
        domain,
        status: 'Active',
        remainingDays: 365,
      });
    }
    notify('Software License Key activated and verified!');
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Green Header Banner */}
      <div className="bg-[#1e6b2b] text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <KeyRound className="w-5 h-5" />
            <span>Software License Administration</span>
          </div>
          <div className="text-xs text-white/90 pl-7">
            Manage product activation, replace license key, and monitor validity
          </div>
        </div>
        <span className="text-xs font-medium text-white/90">License Portal</span>
      </div>

      {/* Maroon Card 1: License Active & Valid matching Page 25 */}
      <div className="bg-[#510c34] text-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-10 h-10 text-white" />
          <div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">License Active & Valid</span>
              <span className="px-4 py-0.5 rounded-full bg-[#4ade80] text-gray-900 font-bold text-xs">
                Active
              </span>
            </div>
            <p className="text-xs text-white/85 mt-1">
              License is authentic, authorized, and active.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-medium">Expiration Date</div>
          <div className="text-xs font-mono">2026-12-31</div>
          <div className="text-xs text-white/90">
            {activeLic?.remainingDays || 57} days remaining
          </div>
        </div>
      </div>

      {/* 4 Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
          <label className="block text-xs text-gray-500 mb-1">Active License Key</label>
          <input
            type="text"
            readOnly
            value={activeLic?.licenseKey || 'erp-diamondtech-0s27-0001'}
            className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
          <label className="block text-xs text-gray-500 mb-1">License Edition & Plan</label>
          <input
            type="text"
            readOnly
            value={activeLic?.edition || 'Pro ERP Edition (Commercial)'}
            className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs"
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
          <label className="block text-xs text-gray-500 mb-1">Node Signature ID</label>
          <input
            type="text"
            readOnly
            value={activeLic?.nodeId || 'NODE-A7X9-K492-PRO'}
            className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
          <label className="block text-xs text-gray-500 mb-1">Authorized Host Domain</label>
          <input
            type="text"
            readOnly
            value={activeLic?.domain || 'diamondtechbd.com'}
            className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
          />
        </div>
      </div>

      {/* Maroon Card 2: Update or Replace License Key */}
      <div className="bg-[#510c34] text-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-10 h-10 text-white" />
          <div>
            <div className="text-lg font-bold">Update or Replace License Key</div>
            <p className="text-xs text-white/85 mt-0.5">
              Enter your newly purchased or renewal license key to instantly update the installation.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-medium">Expiration Date</div>
          <div className="text-xs font-mono">2026-12-31</div>
          <div className="text-xs text-white/90">57 days remaining</div>
        </div>
      </div>

      <form onSubmit={handleReplaceKey} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>New Product License Key</span>
              <span className="font-mono text-[10px] font-bold text-gray-700">
                Format: DTERP-XXXX-XXXX-XXXX
              </span>
            </div>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
            <label className="block text-xs text-gray-500 mb-1">License Edition & Plan</label>
            <input
              type="text"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
            <label className="block text-xs text-gray-500 mb-1">
              Registered Institution Name (Optional)
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xs">
            <label className="block text-xs text-gray-500 mb-1">Authorized Host Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-400 text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex justify-center pt-1">
          <button
            type="submit"
            className="px-10 py-3 rounded-full bg-[#001f60] hover:bg-[#001540] text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Update & Replace License Key</span>
          </button>
        </div>
      </form>

      {/* Bottom Official Support Green Banner matching Page 25 */}
      <div className="bg-[#9ae6b4] rounded-xl p-4 text-center text-gray-900 space-y-1 shadow-xs">
        <div className="text-xs font-medium">Site Owner Test Keys & Simulation</div>
        <div className="text-base font-extrabold tracking-wide uppercase">
          OFFICIAL LICENSING & TECH SUPPORT
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold pt-1">
          <span>📞 01517850737</span>
          <span>💬 01923862251</span>
          <span>✉️ dtbd7420@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 26: PUBLIC WEBSITE SETTINGS (Cover Page Slider & Branding)
 * ========================================================================== */
export const PublicWebsiteSettingsView: React.FC = () => {
  const { sliders, updateSliders, setRoute, notify } = useErp();
  const [localSliders, setLocalSliders] = useState(sliders);
  const [activeTab, setActiveTab] = useState('Cover Page Slider');

  const handleFieldChange = (idx: number, field: keyof (typeof localSliders)[0], val: string) => {
    setLocalSliders((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="p-5 bg-[#e8e8e8] dark:bg-slate-900 min-h-[calc(100vh-68px)] text-gray-800 dark:text-slate-100 space-y-5">
      {/* Top Gray Tab Bar matching Page 26 */}
      <div className="bg-[#9e9e9e] rounded-xl p-1.5 flex flex-wrap items-center gap-2 text-xs font-bold">
        {[
          'Cover Page Slider',
          'Offer Card',
          'Popup Landing Skin',
          'Header & Branding',
          'Category Manage',
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab
                ? 'bg-[#424242] text-white shadow'
                : 'text-gray-900 hover:bg-black/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main White Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>{activeTab}</span>
            </h2>
            <p className="text-[11px] text-gray-500">
              Update the cover images, headlines, and buttons for the 3 main advertising sliders that feature a scroll effect.
            </p>
          </div>
          <span className="text-xs text-gray-500 font-mono">Aspect Ratio 4:1</span>
        </div>

        {/* 3 Slider Editor Cards matching Page 26 */}
        <div className="space-y-5">
          {localSliders.map((sld, idx) => (
            <div
              key={sld.id}
              className="border border-gray-400 rounded-xl p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              <div className="lg:col-span-5 flex flex-col items-center">
                <img
                  src={sld.image}
                  alt={sld.badgeText}
                  referrerPolicy="no-referrer"
                  className="w-full h-28 object-cover rounded-lg border border-gray-300"
                />
                <label className="mt-2 text-xs font-bold text-[#1d4ed8] hover:underline flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={() => notify(`Banner image #${idx + 1} updated!`)}
                  />
                </label>
              </div>

              <div className="lg:col-span-7 space-y-2 text-xs">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={sld.badgeText}
                      onChange={(e) => handleFieldChange(idx, 'badgeText', e.target.value)}
                      className="w-full h-8 px-2.5 rounded border border-gray-400"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={sld.buttonText}
                      onChange={(e) => handleFieldChange(idx, 'buttonText', e.target.value)}
                      className="w-full h-8 px-2.5 rounded border border-gray-400"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={sld.buttonLink}
                      onChange={(e) => handleFieldChange(idx, 'buttonLink', e.target.value)}
                      className="w-full h-8 px-2.5 rounded border border-gray-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Main Add Text
                    </label>
                    <input
                      type="text"
                      value={sld.mainAddText}
                      onChange={(e) => handleFieldChange(idx, 'mainAddText', e.target.value)}
                      className="w-full h-8 px-2.5 rounded border border-gray-400"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Sub Add Text
                    </label>
                    <input
                      type="text"
                      value={sld.subAddText}
                      onChange={(e) => handleFieldChange(idx, 'subAddText', e.target.value)}
                      className="w-full h-8 px-2.5 rounded border border-gray-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="font-semibold text-[11px] whitespace-nowrap">Photo Link</span>
                  <input
                    type="text"
                    value={sld.photoLink}
                    onChange={(e) => handleFieldChange(idx, 'photoLink', e.target.value)}
                    className="flex-1 h-8 px-2.5 rounded border border-gray-400 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setRoute('public-website')}
          className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow cursor-pointer"
        >
          Preview Public Website
        </button>
        <button
          onClick={() => updateSliders(localSliders)}
          className="px-8 py-2.5 rounded-full bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * PAGE 27: ACTIVE SITE & RENEWAL HUB (Full-screen Site Owner Console)
 * ========================================================================== */
export const ActiveSiteHubView: React.FC = () => {
  const {
    siteLicenses,
    addSiteLicense,
    updateSiteLicense,
    deleteSiteLicense,
    setRoute,
  } = useErp();

  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'All' | 'Active' | 'Expiring' | 'Expired' | 'Suspended'>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [newSiteName, setNewSiteName] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newEdition, setNewEdition] = useState('Pro ERP Edition (Commercial)');
  const [newContract, setNewContract] = useState('');

  const filtered = siteLicenses.filter((lic) => {
    const matchesTab = filterTab === 'All' || lic.status === filterTab;
    const matchesQuery =
      !search.trim() ||
      lic.siteName.toLowerCase().includes(search.toLowerCase()) ||
      lic.licenseKey.toLowerCase().includes(search.toLowerCase()) ||
      lic.domain.toLowerCase().includes(search.toLowerCase()) ||
      lic.email.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const handleRegisterBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName.trim()) return;
    addSiteLicense({
      siteName: newSiteName,
      licenseKey: `erp-${newSiteName.toLowerCase().replace(/\s+/g, '')}-0s27-000${siteLicenses.length + 1}`,
      domain: newDomain || 'client-erp.com.bd',
      nodeId: `NODE-A7X${siteLicenses.length + 1}-K492-PRO`,
      edition: newEdition,
      status: 'Active',
      remainingDays: 365,
      expiryDate: '09 Nov 2027',
      contractName: newContract || 'Managing Director',
      phone1: '01718562156',
      phone2: '01954859423',
      email: `admin@${newDomain || 'client.com'}`,
    });
    setNewSiteName('');
    setNewDomain('');
    setShowRegisterModal(false);
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      {/* Top Purple Gradient Banner matching Page 27 */}
      <div className="bg-gradient-to-r from-[#5a1b45] via-[#8c2966] to-[#d63e8b] px-6 py-4 flex items-center justify-between text-white shadow-md">
        <div
          onClick={() => setRoute('dashboard')}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-14 h-10 border-2 border-white flex items-center justify-center font-extrabold text-base">
            DT
          </div>
          <div className="text-lg font-extrabold leading-tight mt-1">Diamond Tech</div>
          <div className="text-[11px] text-white/90">Your Trusted IT Partner</div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-center flex-1">
          Active Site & Renewal Hub
        </h1>

        <div className="w-28" />
      </div>

      <div className="max-w-5xl mx-auto p-5 space-y-5">
        {/* Green Sub-Header with Back to Dashboard */}
        <div className="flex items-center rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setRoute('dashboard')}
            className="bg-[#1a5276] hover:bg-[#154360] text-white px-5 py-3.5 flex items-center gap-2 font-bold text-xs cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-left leading-tight">
              Back to
              <br />
              Dashboard
            </span>
          </button>

          <div className="flex-1 bg-[#1e6b2b] text-white px-5 py-3">
            <div className="flex items-center gap-2 text-base font-bold">
              <KeyRound className="w-5 h-5" />
              <span>Software License Administration</span>
            </div>
            <div className="text-xs text-white/90 pl-7">
              Manage product activation, replace license key, and monitor validity
            </div>
          </div>
        </div>

        {/* 3 KPI Cards matching Page 27 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow-md bg-[#6b2891] text-white flex flex-col justify-between min-h-[135px]">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-base font-bold">Total issued sites</div>
                <div className="text-3xl font-extrabold font-mono mt-2">
                  {11 + siteLicenses.length}
                </div>
              </div>
              <Globe className="w-10 h-10 text-white/90" />
            </div>
            <div className="py-2 px-4 bg-[#581f78] text-xs font-semibold">All Deployed Copies</div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md bg-[#1e6b2b] text-white flex flex-col justify-between min-h-[135px]">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-base font-bold">Active sites</div>
                <div className="text-3xl font-extrabold font-mono mt-2">
                  {7 + siteLicenses.filter((l) => l.status === 'Active').length}
                </div>
              </div>
              <ShieldCheck className="w-10 h-10 text-white/90" />
            </div>
            <div className="py-2 px-4 bg-[#165020] text-xs font-semibold">Valid & Authorized</div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md bg-[#f6ad85] text-white flex flex-col justify-between min-h-[135px]">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-base font-bold">The term nearing end</div>
                <div className="text-3xl font-extrabold font-mono mt-2">3</div>
              </div>
              <Clock className="w-10 h-10 text-white" />
            </div>
            <div className="py-2 px-4 bg-[#eb996e] text-xs font-bold text-gray-900 flex justify-between">
              <span>Expired or Suspended</span>
              <span className="font-mono">
                {1 + siteLicenses.filter((l) => l.status === 'Suspended').length}
              </span>
            </div>
          </div>
        </div>

        {/* + Register Buyer Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-6 py-2.5 rounded-xl bg-[#002855] hover:bg-[#001835] text-white font-bold text-sm shadow cursor-pointer"
          >
            + Register Buyer
          </button>
        </div>

        {/* Green Machine Bound Bar */}
        <div className="bg-[#1e6b2b] text-white px-5 py-2.5 rounded-md flex items-center justify-between text-sm font-bold">
          <span>All Active</span>
          <span className="text-xs font-mono">Machine Bound: NODE-FEP2QG0G-DT</span>
        </div>

        {/* Search & Filter Tabs Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-full px-4 h-10 flex-1 max-w-md border border-gray-500">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by site name/License Key/host email"
              className="bg-transparent text-xs w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center bg-[#5a5a5a] rounded-lg overflow-hidden text-white text-xs font-semibold">
            {(['All', 'Active', 'Expiring', 'Expired', 'Suspended'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-2.5 cursor-pointer ${
                  filterTab === tab ? 'bg-[#002855] font-bold' : 'hover:bg-white/10'
                }`}
              >
                {tab === 'All' ? 'All Sites' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Site License Cards matching Page 27 */}
        <div className="space-y-5">
          {filtered.map((lic) => (
            <div
              key={lic.id}
              className="bg-[#f5f5f5] dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-300 space-y-3"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
                <div className="lg:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Site Name</label>
                  <input
                    type="text"
                    value={lic.siteName}
                    onChange={(e) =>
                      updateSiteLicense({ ...lic, siteName: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-xs font-bold"
                  />
                </div>

                <div className="lg:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">License Edition & Plan</label>
                  <input
                    type="text"
                    value={lic.edition}
                    onChange={(e) =>
                      updateSiteLicense({ ...lic, edition: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-xs text-center font-medium"
                  />
                </div>

                <div className="lg:col-span-1 text-center">
                  <label className="block text-xs text-gray-500 mb-1">Status</label>
                  <span
                    className={`inline-block w-full py-2 rounded-xl font-bold text-[11px] ${
                      lic.status === 'Active'
                        ? 'bg-[#68d391] text-gray-900'
                        : 'bg-[#feb2b2] text-red-900'
                    }`}
                  >
                    {lic.status === 'Suspended' ? 'SUSPENDED' : lic.status}
                  </span>
                </div>

                <div className="lg:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">Remining</label>
                  <div className="h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 flex flex-col items-center justify-center text-[11px] font-mono leading-tight">
                    <span className="font-bold">{lic.remainingDays} Days remaining</span>
                    <span>({lic.expiryDate})</span>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">License Key:</label>
                  <input
                    type="text"
                    readOnly
                    value={lic.licenseKey}
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-xs font-mono"
                  />
                </div>

                <div className="lg:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Domain / Host:</label>
                  <input
                    type="text"
                    value={lic.domain}
                    onChange={(e) => updateSiteLicense({ ...lic, domain: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-xs font-mono"
                  />
                </div>

                <div className="lg:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Node Machine ID:</label>
                  <input
                    type="text"
                    readOnly
                    value={lic.nodeId}
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-400 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Contract Line */}
              <div className="text-xs font-semibold pt-1">
                <span className="font-bold">Contract:</span> {lic.contractName}, 📞{lic.phone1} 💬
                {lic.phone2} ✉️ {lic.email}
              </div>

              {/* Duration & Kill Switch Action Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  { label: 'Life Time', days: 3650 },
                  { label: '1 Year', days: 365 },
                  { label: '6 Month', days: 180 },
                  { label: '1 Month', days: 30 },
                  { label: 'Set Date', days: 90 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() =>
                      updateSiteLicense({
                        ...lic,
                        remainingDays: btn.days,
                        status: 'Active',
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-[#757575] hover:bg-[#616161] text-white font-semibold text-xs cursor-pointer"
                  >
                    {btn.label}
                  </button>
                ))}

                <button
                  onClick={() => updateSiteLicense({ ...lic, status: 'Active' })}
                  className="px-5 py-2 rounded-lg bg-[#002855] hover:bg-[#001835] text-white font-bold text-xs cursor-pointer"
                >
                  Apply
                </button>

                {lic.status === 'Active' ? (
                  <button
                    onClick={() =>
                      updateSiteLicense({ ...lic, status: 'Suspended', remainingDays: 0 })
                    }
                    className="px-4 py-2 rounded-lg bg-[#e61919] hover:bg-[#c21313] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Kill Switch</span>
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      updateSiteLicense({ ...lic, status: 'Active', remainingDays: 365 })
                    }
                    className="px-4 py-2 rounded-lg bg-[#1ea362] hover:bg-[#16804b] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Active</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => deleteSiteLicense(lic.id)}
                  className="w-9 h-9 rounded-lg bg-[#e61919] hover:bg-[#c21313] text-white flex items-center justify-center ml-auto cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Register Buyer Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Register New Site License</h3>
            <form onSubmit={handleRegisterBuyer} className="space-y-3 text-xs text-gray-800">
              <div>
                <label className="block font-semibold mb-1">Site / Business Name</label>
                <input
                  type="text"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  placeholder="e.g. Tech World Jashore"
                  className="w-full h-10 px-3 rounded-lg border border-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Authorized Domain</label>
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="e.g. techworldbd.com"
                  className="w-full h-10 px-3 rounded-lg border border-gray-400 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Edition & Plan</label>
                <input
                  type="text"
                  value={newEdition}
                  onChange={(e) => setNewEdition(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-400"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Owner / CEO Name</label>
                <input
                  type="text"
                  value={newContract}
                  onChange={(e) => setNewContract(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed, CEO"
                  className="w-full h-10 px-3 rounded-lg border border-gray-400"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#002855] text-white font-bold cursor-pointer"
                >
                  Issue License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
