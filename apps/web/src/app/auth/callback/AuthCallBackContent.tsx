"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const errorMsg = searchParams.get("message");
      const redirectTo = searchParams.get("redirect") || "/";

      if (errorMsg) {
        setError(decodeURIComponent(errorMsg));
        setLoading(false);
        return;
      }

      if (!token || token === "undefined" || token === "null") {
        setError("No token received");
        setLoading(false);
        return;
      }

      await login(token);
      router.push(redirectTo);
    };

    handleCallback();
  }, [searchParams, login]);

  // UI loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang đăng nhập...</p>
        </div>
      </div>
    );
  }

  // UI error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">✕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng nhập thất bại
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return null;
}
