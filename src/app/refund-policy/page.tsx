import Link from "next/link";

export const metadata = {
  title: "Cancellation & Refund Policy — NuradiHealth",
  description: "Our cancellation and refund policy for NuradiHealth services.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-4">
        Legal
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2">Cancellation &amp; Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated on 05-04-2026</p>

      <div className="prose prose-gray max-w-none space-y-4 text-[15px] leading-relaxed text-gray-700">
        <p>
          <strong>VEDPRAKASH SHYAMCHARAN VISHWAKARMA</strong> believes in helping its customers as far as possible,
          and has therefore a liberal cancellation policy. Under this policy:
        </p>

        <ul className="list-disc pl-6 space-y-3 marker:text-gray-400">
          <li>
            Cancellations will be considered only if the request is made immediately after placing the order.
            However, the cancellation request may not be entertained if the orders have been communicated to the
            vendors/merchants and they have initiated the process of shipping them.
          </li>
          <li>
            VEDPRAKASH SHYAMCHARAN VISHWAKARMA does not accept cancellation requests for perishable items like
            flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the
            quality of product delivered is not good.
          </li>
          <li>
            In case of receipt of damaged or defective items please report the same to our Customer Service team.
            The request will, however, be entertained once the merchant has checked and determined the same at his
            own end. This should be reported within <strong>the same day</strong> of receipt of the products. In case
            you feel that the product received is not as shown on the site or as per your expectations, you must
            bring it to the notice of our customer service within <strong>the same day</strong> of receiving the
            product. The Customer Service Team after looking into your complaint will take an appropriate decision.
          </li>
          <li>
            In case of complaints regarding products that come with a warranty from manufacturers, please refer the
            issue to them.
          </li>
          <li>
            In case of any Refunds approved by VEDPRAKASH SHYAMCHARAN VISHWAKARMA, it will take{" "}
            <strong>1-2 days</strong> for the refund to be processed to the end customer.
          </li>
        </ul>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Questions about a refund? Please visit our{" "}
            <Link href="/contact" className="text-[#1a1a1a] underline hover:no-underline">
              Contact page
            </Link>{" "}
            or email us directly.
          </p>
        </div>
      </div>
    </div>
  );
}
