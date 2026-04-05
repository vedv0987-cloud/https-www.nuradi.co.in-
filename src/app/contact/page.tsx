import { Mail, Phone, MapPin, Building2 } from "lucide-react";

export const metadata = {
  title: "Contact Us — NuradiHealth",
  description: "Get in touch with NuradiHealth support and customer service.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-4">
        Contact
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2">Contact Us</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated on 05-04-2026</p>

      <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
        You may contact us using the information below:
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Merchant Legal Name</p>
          <p className="text-sm font-semibold text-[#1a1a1a]">VEDPRAKASH SHYAMCHARAN VISHWAKARMA</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Phone</p>
          <a href="tel:+917710039946" className="text-sm font-semibold text-[#1a1a1a] hover:underline">
            +91 77100 39946
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <Mail className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email</p>
          <a href="mailto:vedv0987@gmail.com" className="text-sm font-semibold text-[#1a1a1a] hover:underline">
            vedv0987@gmail.com
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Address</p>
          <p className="text-sm font-semibold text-[#1a1a1a] leading-snug">
            Amar Seva Mandal, Rani Sati Marg<br />
            Near Shivsena Shakha<br />
            Mumbai Suburban, MH 400097<br />
            India
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">Registered &amp; Operational Address</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Amar Seva Mandal, Rani Sati Marg, Near Shivsena Shakha,<br />
          Mumbai, Mumbai Suburban, MH, IN - 400097
        </p>
      </div>
    </div>
  );
}
