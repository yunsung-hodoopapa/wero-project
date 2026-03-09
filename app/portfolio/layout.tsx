import React from "react";

export default function PortfolioLayout({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* 패러렐 라우트로 모달을 그리는 포인트입니다. */}
      {admin}
    </>
  );
}
