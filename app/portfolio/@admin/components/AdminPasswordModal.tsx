"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPasswordModal() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() !== "") {
      // 쿼리 파라미터로 패스워드 추가
      router.push(`/portfolio?admin=true&pw=${encodeURIComponent(password)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-2xl relative">
        <button
          onClick={() => router.push("/portfolio")}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            접근 권한 확인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            포트폴리오 관리를 위한 비밀번호를 입력해주세요.
          </p>
        </div>
        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              required
              className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-black focus:ring-black sm:text-sm"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            인증하기
          </button>
        </form>
      </div>
    </div>
  );
}
