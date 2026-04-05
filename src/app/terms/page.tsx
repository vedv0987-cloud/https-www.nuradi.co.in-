import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — NuradiHealth",
  description: "Terms and conditions governing use of NuradiHealth services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-4">
        Legal
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated on 05-04-2026</p>

      <div className="prose prose-gray max-w-none space-y-4 text-[15px] leading-relaxed text-gray-700">
        <p>
          These Terms and Conditions, along with privacy policy or other terms (&ldquo;Terms&rdquo;) constitute a binding
          agreement by and between <strong>VEDPRAKASH SHYAMCHARAN VISHWAKARMA</strong> (&ldquo;Website Owner&rdquo; or
          &ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) and you (&ldquo;you&rdquo; or &ldquo;your&rdquo;)
          and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively,
          &ldquo;Services&rdquo;).
        </p>
        <p>
          By using our website and availing the Services, you agree that you have read and accepted these Terms
          (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
          assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
          updates.
        </p>

        <h2 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-3">Use of the Website</h2>
        <p>The use of this website or availing of our Services is subject to the following terms of use:</p>

        <ul className="list-disc pl-6 space-y-3 marker:text-gray-400">
          <li>
            To access and use the Services, you agree to provide true, accurate and complete information to us during
            and after registration, and you shall be responsible for all acts done through the use of your registered
            account.
          </li>
          <li>
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
            performance, completeness or suitability of the information and materials offered on this website or
            through the Services, for any specific purpose. You acknowledge that such information and materials may
            contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </li>
          <li>
            Your use of our Services and the website is solely at your own risk and discretion. You are required to
            independently assess and ensure that the Services meet your requirements.
          </li>
          <li>
            The contents of the Website and the Services are proprietary to us and you will not have any authority to
            claim any intellectual property rights, title, or interest in its contents.
          </li>
          <li>
            You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per
            these Terms or applicable laws.
          </li>
          <li>You agree to pay us the charges associated with availing the Services.</li>
          <li>
            You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by
            these Terms, or Indian or local laws that might apply to you.
          </li>
          <li>
            You agree and acknowledge that website and the Services may contain links to other third party websites.
            On accessing these links, you will be governed by the terms of use, privacy policy and such other policies
            of such third party websites.
          </li>
          <li>
            You understand that upon initiating a transaction for availing the Services you are entering into a
            legally binding and enforceable contract with us for the Services.
          </li>
          <li>
            You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the
            Service. The timelines for such return and refund will be according to the specific Service you have
            availed or within the time period provided in our policies (as applicable). In case you do not raise a
            refund claim within the stipulated time, then this would make you ineligible for a refund.
          </li>
          <li>
            Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to
            perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
          </li>
          <li>
            These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
            construed in accordance with the laws of India.
          </li>
          <li>
            All disputes arising out of or in connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts in Mumbai, Maharashtra.
          </li>
          <li>
            All concerns or communications relating to these Terms must be communicated to us using the contact
            information provided on this website.
          </li>
        </ul>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            See also:{" "}
            <Link href="/refund-policy" className="text-[#1a1a1a] underline hover:no-underline">
              Cancellation &amp; Refund Policy
            </Link>{" "}
            \u00B7{" "}
            <Link href="/contact" className="text-[#1a1a1a] underline hover:no-underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
