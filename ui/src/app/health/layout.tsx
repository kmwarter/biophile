import { HealthLayout } from "@/components/shared/health-layout";

export default function HealthAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HealthLayout>{children}</HealthLayout>;
}
