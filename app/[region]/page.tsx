import { notFound } from "next/navigation";
import MplotSimulator from "@/components/MplotSimulator";
import { getRegion, regionCodesForRoutes } from "@/data/regions";

export function generateStaticParams() {
  return regionCodesForRoutes;
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: regionCode } = await params;
  const region = getRegion(regionCode);

  if (!region) notFound();

  return <MplotSimulator key={region.code} region={region} />;
}
