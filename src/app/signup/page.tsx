'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }

      setSuccess("Account created successfully! Please check your email to verify your account.");
      setUser({ email: '', password: '', confirmPassword: '' });
      
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-panel p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mr-8 -mb-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl mix-blend-screen pointer-events-none" />

        <div className="text-center relative z-10">
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            Create an Account
          </h2>
          <p className="mt-3 text-lg text-foreground/70">
            Join the global recipe community
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium text-center backdrop-blur-sm relative z-10">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium text-center backdrop-blur-sm relative z-10">
            {success}
          </div>
        )}

        <div className="mt-8 space-y-6 relative z-10">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-white placeholder-white/30 backdrop-blur-sm"
                placeholder="chef@example.com"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-white placeholder-white/30 backdrop-blur-sm"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-white placeholder-white/30 backdrop-blur-sm"
                placeholder="••••••••"
                value={user.confirmPassword}
                onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              onClick={onSignup}
              disabled={loading || !user.email || !user.password || !user.confirmPassword || !!success}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:from-pink-600 hover:to-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-accent/20"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/60 relative z-10">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-accent hover:text-pink-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
