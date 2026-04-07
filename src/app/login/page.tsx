'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      router.push('/');
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
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl mix-blend-screen pointer-events-none" />

        <div className="text-center relative z-10">
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            Welcome back
          </h2>
          <p className="mt-3 text-lg text-foreground/70">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium text-center backdrop-blur-sm relative z-10">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6 relative z-10">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email address</label>
              <input
                id="email"
                name="email"
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
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none text-white placeholder-white/30 backdrop-blur-sm"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 bg-white/5 border-white/10 rounded text-accent focus:ring-accent accent-accent" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-accent hover:text-pink-500 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={onLogin}
              disabled={loading || !user.email || !user.password}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:from-pink-600 hover:to-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-accent/20"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/60 relative z-10">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-accent hover:text-pink-500 transition-colors">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
