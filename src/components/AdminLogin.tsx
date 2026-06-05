import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import EktaLogo from './EktaLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  // Default hardcoded admin credentials for the local simulation
  const DEFAULT_USERNAME = 'admin';
  const DEFAULT_PASSWORD = 'ekta@logistics2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Simulate network delay for realistic experience
    setTimeout(() => {
      if (username.trim() === '' || password.trim() === '') {
        setError('Please fill in both fields.');
        setShake(true);
        setIsSubmitting(false);
        setTimeout(() => setShake(false), 500);
        return;
      }

      if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Success
        if (rememberMe) {
          localStorage.setItem('ekta_admin_auth', 'true');
        } else {
          sessionStorage.setItem('ekta_admin_auth', 'true');
        }
        onLoginSuccess();
      } else {
        // Error
        setError('Invalid admin credentials. Please try again.');
        setShake(true);
        setIsSubmitting(false);
        setTimeout(() => setShake(false), 500);
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setUsername(DEFAULT_USERNAME);
    setPassword(DEFAULT_PASSWORD);
    setError(null);
  };

  return (
    <div className="max-w-md w-full mx-auto" id="admin-login-screen">
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-slate-250 shadow-2xl overflow-hidden font-sans"
      >
        {/* Banner header */}
        <div className="bg-slate-900 px-6 py-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 opacity-90" />
          
          {/* Ambient light ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            <EktaLogo className="h-14 w-14 mb-4 transform hover:scale-105 transition-transform duration-300 shadow-md" />
            
            <h2 className="text-xl font-bold uppercase tracking-wider font-poppins">
              EKTA LOGISTICS
            </h2>
            <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest font-bold mt-1">
              Admin Console Security Gate
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Admin login form">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="login-error"
                role="alert"
                className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-650 flex items-start space-x-2 text-xs"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="block text-xs font-bold text-slate-650 uppercase tracking-wider">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. admin"
                  aria-describedby={error ? 'login-error' : undefined}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-bold text-slate-650 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[10px] font-mono text-blue-600 font-bold hover:underline"
                >
                  {showHint ? 'Hide Login Credentials' : 'Reveal Credentials'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <span className="text-xs text-slate-600 font-medium font-sans">
                  Remember my session
                </span>
              </label>
            </div>

            {/* Hint Box */}
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-sans space-y-2 overflow-hidden"
              >
                <div className="flex items-center space-x-1.5 text-orange-600 font-bold">
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Administrative Credentials:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] text-slate-650 bg-white p-2.5 rounded-lg border border-slate-100 shadow-3xs">
                  <div>Username:</div>
                  <div className="font-extrabold text-blue-750 select-all">{DEFAULT_USERNAME}</div>
                  <div>Password:</div>
                  <div className="font-extrabold text-blue-750 select-all">{DEFAULT_PASSWORD}</div>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="mt-1 w-full flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] uppercase tracking-wide py-1.5 rounded-md transition-colors"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Autofill credentials</span>
                </button>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-150 hover:bg-slate-850 active:scale-98 focus:outline-none flex items-center justify-center space-x-2 cursor-pointer ${
                isSubmitting ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              <span>{isSubmitting ? 'Authenticating Security key...' : 'Access Admin Panel'}</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
