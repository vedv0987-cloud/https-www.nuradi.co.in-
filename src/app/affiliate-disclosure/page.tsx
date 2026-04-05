import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

export const metadata = {
  title: "Affiliate Disclosure — NuradiHealth",
  description: "Our affiliate partnerships and editorial policy.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-background">
      <AffiliateDisclosure variant="page" />
    </div>
  );
}
