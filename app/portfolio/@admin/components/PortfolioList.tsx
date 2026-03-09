"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPortfolios, deletePortfolio } from "@/app/actions/portfolio";

interface PortfolioItem {
  id: string;
  title: string;
  project_year: string | null;
  client: string | null;
  image_url: string;
  created_at: string;
}

export default function PortfolioList() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchList = async () => {
    setLoading(true);
    const data = await getPortfolios();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 포트폴리오를 삭제하시겠습니까?\n이미지도 함께 삭제됩니다.`)) {
      return;
    }

    setDeletingId(id);
    const result = await deletePortfolio(id);
    setDeletingId(null);

    if (result.success) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      alert(result.error || "삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8 text-sm">
        목록 불러오는 중...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8 text-sm">
        등록된 포트폴리오가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="relative w-16 h-11 flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.title}
            </p>
            <p className="text-xs text-gray-500">
              {item.project_year || ""} {item.client ? `· ${item.client}` : ""}
            </p>
          </div>
          <button
            onClick={() => handleDelete(item.id, item.title)}
            disabled={deletingId === item.id}
            className={`flex-shrink-0 px-3 py-1.5 text-xs rounded-md transition-colors ${
              deletingId === item.id
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
            }`}
          >
            {deletingId === item.id ? "삭제 중..." : "삭제"}
          </button>
        </div>
      ))}
    </div>
  );
}
