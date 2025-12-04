// app/dashboard/page.tsx
import { Suspense } from "react";
import DashboardPageClient from "./DashboardPageClient";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardPageClient />
    </Suspense>
  );
}
