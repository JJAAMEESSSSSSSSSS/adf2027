import React, { useState } from 'react';
import { FoxMascot } from '../common/FoxMascot';
import { Lock, User, Key, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === 'admin' || username === 'coordinator') && (password === 'admin123' || password === 'admin')) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password. (Hint: username "admin", password "admin123")');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#160803] text-white rounded-3xl border-3 border-[#E65A15] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1107] text-amber-200 hover:text-white hover:bg-[#E65A15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <FoxMascot size={56} className="mx-auto mb-2" />
          <h2 className="font-tech text-2xl font-black text-white uppercase tracking-wider">
            ADF2027 CMS LOGIN
          </h2>
          <p className="font-mono text-xs text-amber-200/80 mt-1">
            School of Computing Event Management Portal
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-600/60 text-red-200 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-amber-200 font-semibold mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#E65A15] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-200 font-semibold mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#E65A15] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#230C03] border border-[#481E0C] text-[11px] text-stone-300">
            <span className="text-[#E65A15] font-bold">Default Credentials:</span> Username: <code className="text-amber-300">admin</code> | Password: <code className="text-amber-300">admin123</code>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-950/60 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Access CMS Back-Office</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
