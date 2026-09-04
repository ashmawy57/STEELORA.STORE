"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface ContactViewProps {
  locale: Locale;
}

export const ContactView: React.FC<ContactViewProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
            {dict.about.eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-charcoal-black">
            {dict.contact.title}
          </h1>
        </div>

        {/* Contact Form + Support Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-6">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-charcoal-black">
              {dict.contact.formTitle}
            </h2>

            {isSuccess ? (
              <div className="p-6 rounded-xl bg-gold/15 border border-gold/40 text-charcoal space-y-3">
                <div className="flex items-center gap-2 text-gold-dark font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  <span>{isArabic ? "تم استلام رسالتك بنجاح" : "Inquiry Received"}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-steel-700">
                  {dict.contact.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="btn-outline-gold text-xs px-4 py-2 mt-2"
                >
                  {isArabic ? "إرسال استفسار آخر" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-800">
                      {dict.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-800">
                      {dict.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-800">
                      {dict.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 100 000 0000"
                      className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-800">
                      {dict.contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isArabic ? "استفسار عن الشواية / طلب مخصص" : "Product or Corporate Inquiry"}
                      className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.contact.messageLabel} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg p-3.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-goldGlow"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? dict.contact.sending : dict.contact.sendButton}</span>
                </button>
              </form>
            )}
          </div>

          {/* Support Channels Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-charcoal-950 text-white border border-steel-gray/30 shadow-luxury space-y-6">
              <h3 className="font-heading font-extrabold text-xl text-white">
                {dict.contact.officeTitle}
              </h3>

              <div className="space-y-4 text-xs text-steel-200">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isArabic ? "خدمة العملاء والواتساب" : "Concierge Hotline"}
                    </span>
                    <p className="text-steel-gray mt-0.5">{dict.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isArabic ? "البريد الإلكتروني" : "Email Inquiries"}
                    </span>
                    <p className="text-steel-gray mt-0.5">{dict.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isArabic ? "مواعيد العمل" : "Operating Hours"}
                    </span>
                    <p className="text-steel-gray mt-0.5">{dict.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
