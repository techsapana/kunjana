"use client";

import SectionWrapper from "@/src/components/SectionWrapper";
import { useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function ContactUsPage() {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setSubmitStatus({
          type: "error",
          message:
            result.message ??
            text(
              "Failed to send your message.",
              "तपाईंको सन्देश पठाउन असफल भयो।",
            ),
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: text(
          "Your message has been sent successfully.",
          "तपाईंको सन्देश सफलतापूर्वक पठाइयो।",
        ),
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setSubmitStatus({
        type: "error",
        message: text(
          "Something went wrong while sending your message.",
          "सन्देश पठाउने क्रममा केही समस्या भयो।",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionWrapper className="pb-8 pt-30 md:pt-34">
        <div className="soft-panel p-8 md:p-10">
          <span className="section-tag">{text("Contact", "सम्पर्क")}</span>
          <h1 className="section-title mt-4">
            {text(
              "Connect with our farm specialists",
              "हाम्रा फार्म विशेषज्ञसँग सम्पर्क गर्नुहोस्",
            )}
          </h1>
          <p className="section-subtitle mt-4">
            {text(
              "Reach us for product guidance, farm-scale dosage plans, technical support, and partnership opportunities.",
              "उत्पादन मार्गदर्शन, फार्म-स्तरीय डोज योजना, प्राविधिक सहयोग र साझेदारी अवसरका लागि हामीसँग सम्पर्क गर्नुहोस्।",
            )}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="soft-panel p-6 md:p-8">
            <h2 className=" text-3xl text-[#1e3a0f]">
              {text("Send us a message", "हामीलाई सन्देश पठाउनुहोस्")}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={text("Your Name", "तपाईंको नाम")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={text("Your Email", "तपाईंको इमेल")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={text("Phone Number", "फोन नम्बर")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={text("Subject", "विषय")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder={text(
                  "Tell us about your farm or inquiry",
                  "तपाईंको फार्म वा जिज्ञासाबारे बताउनुहोस्",
                )}
                required
                className="w-full rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#4a8c28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5a1b] disabled:opacity-60"
              >
                {isSubmitting
                  ? text("Sending...", "पठाउँदै...")
                  : text("Send Message", "सन्देश पठाउनुहोस्")}
              </button>

              {submitStatus && (
                <p
                  className={`text-sm ${
                    submitStatus.type === "success"
                      ? "text-[#2d5a1b]"
                      : "text-red-600"
                  }`}
                >
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>

          <aside className="space-y-5">
            <div className="soft-panel p-6">
              <h3 className=" text-2xl text-[#1e3a0f]">
                {text("Office", "कार्यालय")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                {text("Banasthali Chwok, Kathmandu", "बनस्थली चोक, काठमाडौं")}
              </p>
            </div>

            <div className="soft-panel p-6">
              <h3 className=" text-2xl text-[#1e3a0f]">
                {text("Phone", "फोन")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                9746305967 / 9824159746
              </p>
            </div>

            <div className="soft-panel p-6">
              <h3 className=" text-2xl text-[#1e3a0f]">
                {text("Email", "ईमेल")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#4b5f3d]">
                kunjanaagroandpoultry@gmail.com
              </p>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 pb-10 md:pt-6 md:pb-14">
        <div className="soft-panel overflow-hidden p-0">
          <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8">
            <span className="section-tag">
              {text("Find Us", "हामीलाई खोज्नुहोस्")}
            </span>
            <h2 className="section-title mt-3">
              {text("Our location", "हाम्रो स्थान")}
            </h2>
            <p className="section-subtitle mt-2">
              {text("Banasthali Chwok, Kathmandu", "बनस्थली चोक, काठमाडौं")}{" "}
              &mdash; {text("visit or reach us at", "भेट्न वा सम्पर्क गर्न")}{" "}
              <a
                href="tel:9746305967"
                className="text-[#2d5a1b] hover:underline"
              >
                9746305967
              </a>{" "}
              /{" "}
              <a
                href="tel:9824159746"
                className="text-[#2d5a1b] hover:underline"
              >
                9824159746
              </a>
            </p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.7154191616446!2d83.92631711159589!3d28.306943575743457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995edbea93f454d%3A0x6be9ac6d20a4e5db!2sKunjana%20agro%20and%20poultry%20suppliment%20pvt%20ltd!5e0!3m2!1sen!2snp!4v1773760673699!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={text(
              "NaturePure Organics location map",
              "नेचरप्योर अर्गानिक्सको स्थान नक्सा",
            )}
          />
        </div>
      </SectionWrapper>
    </>
  );
}
