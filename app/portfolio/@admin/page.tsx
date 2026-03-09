import AdminPasswordModal from "./components/AdminPasswordModal";
import AdminPanel from "./components/AdminPanel";

export default async function AdminModalParams({
  searchParams,
}: {
  searchParams: Promise<{ admin?: string; pw?: string }>;
}) {
  const p = await searchParams;

  if (p.admin !== "true") return null;

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!p.pw || p.pw !== adminPassword) {
    return <AdminPasswordModal />;
  }

  return <AdminPanel />;
}
