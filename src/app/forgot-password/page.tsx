'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onRequestReset = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');
      
      const response = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "An error occurred");
        return;
      }
      
      setMessage("If an account with that email exists, we've sent instructions on how to reset your password.");
      setEmail('');
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
            Reset Password
          </h2>
          <p className="mt-3 text-md text-foreground/70">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium text-center relative z-10">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium text-center relative z-10">
            {message}
          </div>
        )}

        <div className="mt-8 space-y-6 relative z-10">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none text-white transition-all"
              placeholder="chef@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={onRequestReset}
            disabled={loading || !email}
            className="w-full flex justify-center py-3.5 px-4 font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/60 relative z-10">
          Remember your password?{' '}
          <Link href="/login" className="font-bold text-accent hover:text-pink-500 transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
