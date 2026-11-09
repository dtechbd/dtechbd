import React, { useState } from 'react';
import { useErp } from '../context/ErpContext';
import { signInWithGooglePopup } from '../firebase';

export const LoginView: React.FC = () => {
  const { login, loginWithFirebaseUser, notify } = useErp();
  const [userId, setUserId] = useState('eleas_admin');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login(userId, password)) {
      setError('Invalid User ID or Password. Try "eleas_admin" / "123456"');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGooglePopup();
      if (res.user) {
        loginWithFirebaseUser(res.user);
      }
    } catch (err) {
      setError('Google sign-in popup was closed or blocked.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#005e66] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[380px] p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-gray-400 text-gray-900 focus:outline-none focus:border-[#002060] text-sm"
              placeholder="Enter User ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-gray-400 text-gray-900 focus:outline-none focus:border-[#002060] text-sm"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-gray-600">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <span
                className={`w-8 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                  rememberMe ? 'bg-[#a855f7] justify-end' : 'bg-gray-300 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow" />
              </span>
              <span>Remember me</span>
            </button>

            <button
              type="button"
              onClick={() => notify('Password reset link sent to registered admin email (dtechjsr@gmail.com)')}
              className="hover:underline text-gray-600"
            >
              Forget password?
            </button>
          </div>

          {error && <p className="text-xs text-red-600 font-medium text-center">{error}</p>}

          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="w-36 h-10 rounded-full bg-[#001f60] hover:bg-[#001542] text-white font-bold text-sm tracking-wide shadow-md transition-colors cursor-pointer"
            >
              SIGN IN
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="text-xs text-[#005e66] hover:underline font-medium pt-1 cursor-pointer"
            >
              Or Sign In with Google (Firebase Cloud Sync)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
