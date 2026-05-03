"use client";

import SectionWrapper from "@/src/components/SectionWrapper";
import PartnerCarousel from "@/src/components/PartnerCarousel";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/src/hooks/useTranslation";

const partnerBenefits = [
  {
    en: "Priority access to high-demand organic formulations",
    ne: "उच्च माग भएका जैविक फॉर्मुलेसनहरूमा प्राथमिकता पहुँच",
  },
  {
    en: "Co-marketing support with technical product training",
    ne: "प्राविधिक उत्पाद प्रशिक्षणसँग सह-विपणन सहयोग",
  },
  {
    en: "Territory-focused growth planning and onboarding support",
    ne: "क्षेत्र केन्द्रित वृद्धि योजना र अनबोर्डिङ सहयोग",
  },
  {
    en: "Responsive sales and farm advisory coordination",
    ne: "छिटो बिक्री र फार्म परामर्श समन्वय",
  },
];

type AvailablePartner = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
};

interface PartnerContentProps {
  initialPartners: AvailablePartner[];
}

export default function PartnerContent({ initialPartners }: PartnerContentProps) {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const availablePartners = initialPartners;
  const partnersLoading = false;

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

    const partnerMessage = [
      `Business Name: ${formData.businessName}`,
      `Location/Region: ${formData.location}`,
      "",
      formData.message,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "Partner Application",
          message: partnerMessage,
        }),
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
              "Failed to submit your application.",
              "तपाईंको आवेदन पठाउन असफल भयो।",
            ),
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: text(
          "Thanks! Your partner application has been submitted.",
          "धन्यवाद! तपाईंको साझेदार आवेदन पठाइयो।",
        ),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        location: "",
        message: "",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: text(
          "Something went wrong while sending your application.",
          "आवेदन पठाउने क्रममा केही समस्या भयो।",
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
          <span className="section-tag">
            {text("Become a Partner", "साझेदार बन्नुहोस्")}
          </span>
          <h1 className="section-title mt-4">
            {text(
              "Build regional growth with NaturePure supplements",
              "नेचरप्योर पूरकसँग क्षेत्रीय वृद्धि निर्माण गर्नुहोस्",
            )}
          </h1>
          <p className="section-subtitle mt-4">
            {text(
              "We partner with agri distributors, cooperatives, and dealers to deliver trusted nutrition solutions to poultry farms.",
              "हामी कृषि वितरक, सहकारी र डिलरसँग मिलेर कुखुरा फार्महरूमा विश्वसनीय पोषण समाधान पुर्‍याउँछौं।",
            )}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <article className="soft-panel p-8 md:p-10">
            <h2 className=" text-3xl text-[#1e3a0f]">
              {text("Partnership advantages", "साझेदारीका फाइदाहरू")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#4b5f3d] md:text-base">
              {partnerBenefits.map((item) => (
                <li key={item.en}>• {language === "en" ? item.en : item.ne}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full border border-[#7bbf42]/35 px-6 py-3 text-sm font-semibold text-[#2d5a1b] transition hover:bg-[#eaf4d8]"
              >
                {text("View Product Line", "उत्पादन सूची हेर्नुहोस्")}
              </Link>
            </div>
            <div className="mt-8 rounded-2xl bg-linear-to-br from-[#1e3a0f] via-[#2d5a1b] to-[#4a8c28] p-6 text-white">
              <h3 className=" text-2xl">
                {text("Who should apply?", "कसले आवेदन दिनुपर्छ?")}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/84">
                <li>
                  •{" "}
                  {text(
                    "Agricultural distributors and feed ecosystem partners",
                    "कृषि वितरक र फिड इकोसिस्टम साझेदारहरू",
                  )}
                </li>
                <li>
                  •{" "}
                  {text(
                    "Agro-vet retailers with poultry advisory experience",
                    "कुखुरा परामर्श अनुभव भएका एग्रो-भेट खुद्रा विक्रेताहरू",
                  )}
                </li>
                <li>
                  •{" "}
                  {text(
                    "Regional sales teams focused on sustainable nutrition",
                    "दिगो पोषणमा केन्द्रित क्षेत्रीय बिक्री टोलीहरू",
                  )}
                </li>
                <li>
                  •{" "}
                  {text(
                    "Farm consultants scaling support services",
                    "सहयोग सेवाहरू विस्तार गर्ने फार्म परामर्शदाताहरू",
                  )}
                </li>
              </ul>
            </div>
          </article>

          <article id="partner-form" className="soft-panel p-8 md:p-10">
            <h3 className=" text-3xl text-[#1e3a0f]">
              {text("Partner application form", "साझेदार आवेदन फारम")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#4b5f3d] md:text-base">
              {text(
                "Tell us about your business and location. Our team will contact you with onboarding details.",
                "तपाईंको व्यवसाय र स्थानबारे बताउनुहोस्। हाम्रो टोलीले अनबोर्डिङ विवरणसहित सम्पर्क गर्नेछ।",
              )}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={text("Contact Person", "सम्पर्क व्यक्ति")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={text("Email Address", "इमेल ठेगाना")}
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
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder={text("Business Name", "व्यवसाय नाम")}
                  required
                  className="rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
                />
              </div>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={text(
                  "City / District / Region",
                  "शहर / जिल्ला / क्षेत्र",
                )}
                required
                className="w-full rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder={text(
                  "Briefly describe your distribution network or interest",
                  "आफ्नो वितरण सञ्जाल वा रुचिबारे छोटकरीमा बताउनुहोस्",
                )}
                required
                className="w-full rounded-xl border border-[#7bbf42]/25 bg-white px-4 py-3 text-sm text-[#1e3a0f] outline-none transition focus:border-[#4a8c28]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full cursor-pointer bg-[#4a8c28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d5a1b] disabled:opacity-60"
              >
                {isSubmitting
                  ? text("Submitting...", "पेश गर्दै...")
                  : text("Submit Application", "आवेदन पठाउनुहोस्")}
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
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 md:pt-8">
        <div className="soft-panel p-8 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="section-tag">
                {text("Available Partners", "उपलब्ध साझेदारहरू")}
              </span>
              <h2 className="section-title mt-4">
                {text(
                  "Growing network already distributing NaturePure",
                  "नेचरप्योर वितरण गरिरहेको बढ्दो नेटवर्क",
                )}
              </h2>
              <p className="section-subtitle mt-3">
                {text(
                  "Explore some of the distributors and partner organizations already working with us.",
                  "हामीसँग काम गरिरहेका केही वितरक र साझेदार संस्थाहरू हेर्नुहोस्।",
                )}
              </p>
            </div>
          </div>

          <div className="mt-7">
            {partnersLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-34 animate-pulse rounded-3xl border border-[#7bbf42]/20 bg-[#edf5df]"
                  />
                ))}
              </div>
            ) : (
              <PartnerCarousel partners={availablePartners} />
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
