import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NuradiHealth",
  description: "How NuradiHealth collects, uses, and protects your data. DPDP Act 2023 compliant.",
};

export default function PrivacyPage() {
  const lastUpdated = "5 April 2026";
  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-sm dark:prose-invert">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: {lastUpdated}</p>

        <p>
          NuradiHealth (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
          <strong>www.nuradi.co.in</strong>. This Privacy Policy explains how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">1. Information We Collect</h2>
        <p><strong>You provide:</strong> name, email, age, gender, height, weight, health goals, conditions, diet type, calculator inputs.</p>
        <p><strong>Automatically:</strong> device type, browser, pages visited, tools used, IP address (city-level), cookies.</p>
        <p><strong>We do NOT collect:</strong> camera, microphone, contacts, SMS, call logs, Aadhaar, PAN, or credit card numbers (Cashfree handles payments).</p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Personalize your dashboard and tool recommendations</li>
          <li>Save your calculator results locally on your device</li>
          <li>Send health tips and reminders (only if you opt in)</li>
          <li>Improve our tools and content based on anonymous usage</li>
          <li>Process subscription payments via Cashfree</li>
          <li>Respond to support requests</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">3. How We Share Data</h2>
        <p>We do NOT sell your personal data. Ever. We share only with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Supabase</strong> (database hosting, encrypted)</li>
          <li><strong>Vercel</strong> (website hosting, encrypted CDN)</li>
          <li><strong>Cashfree</strong> (payment processing, PCI-DSS compliant)</li>
          <li><strong>Vercel Analytics</strong> (anonymized usage)</li>
          <li><strong>Anthropic Claude API</strong> (AI chatbot — not stored by Anthropic beyond 30 days)</li>
          <li><strong>Resend</strong> (transactional email)</li>
        </ul>
        <p>We may disclose data if required by Indian law.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. Data Storage & Security</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>All data transmitted over HTTPS (TLS encryption)</li>
          <li>Database encrypted at rest (Supabase AES-256)</li>
          <li>Most calculator data stays on YOUR device (localStorage)</li>
          <li>Health profile is never sent to our servers unless you explicitly save it</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">5. Your Rights (DPDP Act 2023)</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Access:</strong> view all data we hold about you</li>
          <li><strong>Correct:</strong> update inaccurate information</li>
          <li><strong>Delete:</strong> request complete account deletion</li>
          <li><strong>Export:</strong> download your data as JSON</li>
          <li><strong>Withdraw consent:</strong> opt out any time</li>
        </ul>
        <p>Email <a href="mailto:privacy@nuradi.co.in" className="text-emerald-600 dark:text-emerald-400">privacy@nuradi.co.in</a> — we respond within 72 hours.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">6. Data Retention</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Active subscriber data: retained during active subscription</li>
          <li>Deleted accounts: fully purged within 30 days</li>
          <li>AI chat conversations: deleted after 90 days</li>
          <li>Payment records: retained 7 years (Indian tax law)</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">7. Children&apos;s Privacy</h2>
        <p>Our platform is for users 13+. We do not knowingly collect data from children under 13. Child growth tracker and pediatric dosage tools are for parents to use on behalf of their children.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">8. Cookies</h2>
        <p><strong>Essential:</strong> login, preferences (required). <strong>Analytics:</strong> Vercel Analytics (anonymized, can be disabled). Manage cookies via our banner or browser settings.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">9. Medical Disclaimer</h2>
        <p>NuradiHealth provides health EDUCATION and INFORMATION only. We are NOT a medical provider. Our tools, AI chatbot, and content do NOT constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional. In emergencies, call 108.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">10. Third-Party Links</h2>
        <p>Our site contains links to news sources, hospitals, and pharmacies. We are not responsible for their privacy practices.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">11. Changes to This Policy</h2>
        <p>We may update this policy. Material changes will be notified via email or in-app notification.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">12. Contact</h2>
        <p>
          <strong>Data Protection Officer:</strong><br />
          Email: <a href="mailto:privacy@nuradi.co.in" className="text-emerald-600 dark:text-emerald-400">privacy@nuradi.co.in</a><br />
          Grievance Officer: <a href="mailto:grievance@nuradi.co.in" className="text-emerald-600 dark:text-emerald-400">grievance@nuradi.co.in</a>
        </p>
      </article>
    </div>
  );
}
