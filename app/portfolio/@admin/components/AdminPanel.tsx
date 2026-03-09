"use client";

import { useState } from "react";
import UploadForm from "./UploadForm";
import PortfolioList from "./PortfolioList";

export default function AdminPanel() {
  const [tab, setTab] = useState<"upload" | "manage">("upload");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl relative my-8">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        {/* 탭 헤더 */}
        <div className="flex gap-1 mb-6 border-b">
          <button
            onClick={() => setTab("upload")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "upload"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            새 업로드
          </button>
          <button
            onClick={() => setTab("manage")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "manage"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            관리 (삭제)
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        {tab === "upload" ? <UploadForm embedded /> : <PortfolioList />}
      </div>
    </div>
  );
}
