'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onReset = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }
      
      setMessage("Your password was reset successfully!");
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-panel p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="text-center relative z-10">
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            Create New Password
          </h2>
          <p className="mt-3 text-md text-foreground/70">
            Please enter your new password below.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium text-center relative z-10">
            {error}
          </div>
        )}
        
        {message ? (
          <div className="text-center relative z-10 space-y-6 border border-green-500/20 bg-green-500/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-green-400">Success!</h3>
            <p className="text-white">{message}</p>
            <Link href="/login" className="block w-full py-3.5 px-4 font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:scale-[1.02] transition-transform">
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6 relative z-10">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-white transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={onReset}
              disabled={loading || !password || !confirmPassword || !token}
              className="w-full flex justify-center py-3.5 px-4 font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
