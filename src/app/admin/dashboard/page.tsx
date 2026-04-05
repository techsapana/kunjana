"use client";

import Link from "next/link";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function AdminDashboard() {
  const { language } = useTranslation();
  const text = (en: string, ne: string) => (language === "en" ? en : ne);

  const dashboardItems = [
    {
      title: text("Manage Team", "टोली व्यवस्थापन"),
      description: text(
        "Add, edit, or delete team members",
        "टोली सदस्य थप्नुहोस्, सम्पादन गर्नुहोस् वा हटाउनुहोस्",
      ),
      icon: "👥",
      href: "/admin/team",
      color: "bg-purple-500",
    },
    {
      title: text("Manage Blogs", "ब्लग व्यवस्थापन"),
      description: text(
        "Create, edit, or remove blog posts",
        "ब्लग पोस्ट सिर्जना, सम्पादन वा हटाउनुहोस्",
      ),
      icon: "📝",
      href: "/admin/blogs",
      color: "bg-purple-500",
    },
    {
      title: text("Manage Partners", "साझेदार व्यवस्थापन"),
      description: text(
        "Create, edit, or remove partners",
        "साझेदार सिर्जना, सम्पादन वा हटाउनुहोस्",
      ),
      icon: "🤝",
      href: "/admin/partners",
      color: "bg-purple-500",
    },
    {
      title: text("Manage Gallery", "ग्यालेरी व्यवस्थापन"),
      description: text(
        "Add, edit, or delete gallery images",
        "ग्यालेरी तस्बिर थप्नुहोस्, सम्पादन गर्नुहोस् वा हटाउनुहोस्",
      ),
      icon: "🖼️",
      href: "/admin/gallery",
      color: "bg-purple-500",
    },
    {
      title: text("Manage Products", "उत्पादन व्यवस्थापन"),
      description: text(
        "Add, edit, or delete products",
        "उत्पादन थप्नुहोस्, सम्पादन गर्नुहोस् वा हटाउनुहोस्",
      ),
      icon: "🛍️",
      href: "/admin/product",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            {text("Admin Dashboard", "एडमिन ड्यासबोर्ड")}
          </h1>
          <p className="text-gray-600">
            {text(
              "Manage your website content and settings",
              "वेबसाइट सामग्री र सेटिङ व्यवस्थापन गर्नुहोस्",
            )}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black mb-6">
            {text("Management Panels", "व्यवस्थापन प्यानलहरू")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="h-full bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 transition cursor-pointer transform hover:scale-105">
                  <div
                    className={`${item.color} text-white text-4xl w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="mt-4 text-blue-600 font-semibold text-sm">
                    {text("Go to Panel", "प्यानलमा जानुहोस्")} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
