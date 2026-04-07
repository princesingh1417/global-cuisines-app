'use client';
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      const response = await fetch('/api/auth/verifyemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (response.ok) {
        setVerified(true);
      } else {
        setError(true);
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center space-y-8 glass-panel p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white relative z-10">
          Email Verification
        </h1>

        <div className="relative z-10 space-y-6">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-foreground/80 font-medium">Verifying your token...</p>
            </div>
          ) : !token ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-4 rounded-xl text-sm font-medium">
              No verification token found in the URL.
            </div>
          ) : verified ? (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl">
                <svg className="w-12 h-12 mx-auto mb-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Account Verified!</h2>
                <p className="text-sm opacity-90">Thank you for confirming your email.</p>
              </div>
              <Link href="/login" className="block w-full py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-accent to-pink-600 hover:scale-105 transition-transform shadow-lg">
                Proceed to Login
              </Link>
            </div>
          ) : error ? (
            <div className="space-y-6">
               <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl">
                <svg className="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
                <p className="text-sm opacity-90">Your token may vary either expired or invalid.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
