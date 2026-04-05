"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Editor from "@/src/components/Editor";
import type { LocalizedStringList, LocalizedText } from "@/src/helpers/i18n";

interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  nameI18n?: LocalizedText;
  content: string;
  contentI18n?: LocalizedText;
  features: string[];
  featuresI18n?: LocalizedStringList;
  description: string;
  descriptionI18n?: LocalizedText;
  price: number;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

const API_URL = "/api/products";

const PRODUCT_CARD_FEATURE_LIMIT = 3;
const PRODUCT_CONTENT_MAX_CHARS = 140;
const PRODUCT_FEATURES_MAX_ITEMS = 8;

const clampProductContent = (
  value: string,
  maxChars = PRODUCT_CONTENT_MAX_CHARS,
) => value.slice(0, maxChars);

const normalizeProductFeatures = (
  features: string[],
  maxItems = PRODUCT_FEATURES_MAX_ITEMS,
) =>
  features
    .map((feature) => feature.trim())
    .filter((feature) => feature.length > 0)
    .slice(0, maxItems);

type ProductForm = {
  name: LocalizedText;
  price: string;
  content: LocalizedText;
  features: LocalizedStringList;
  description: LocalizedText;
  images: File[];
};

const createEmptyForm = () =>
  ({
    name: { en: "", ne: "" },
    price: "",
    content: { en: "", ne: "" },
    features: { en: [""], ne: [""] },
    description: { en: "", ne: "" },
    images: [] as File[],
  }) satisfies ProductForm;

const createFormFromProduct = (product: Product) =>
  ({
    name: product.nameI18n ?? { en: product.name, ne: product.name },
    price: String(product.price),
    content: product.contentI18n ?? {
      en: product.content,
      ne: product.content,
    },
    features: product.featuresI18n ?? {
      en: product.features.length > 0 ? product.features : [""],
      ne: product.features.length > 0 ? product.features : [""],
    },
    description: product.descriptionI18n ?? {
      en: product.description,
      ne: product.description,
    },
    images: [] as File[],
  }) satisfies ProductForm;

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<ProductForm>(createEmptyForm);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_URL}?_t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      setProducts(res.data.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!selected) {
      return;
    }

    formCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });
  }, [selected]);

  const resetForm = () => {
    setSelected(null);
    setRemovedImageIds([]);
    setForm(createEmptyForm());
  };

  const toggleExistingImageRemoval = (imageId: number) => {
    setRemovedImageIds((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleFeatureChange = (
    locale: "en" | "ne",
    value: string,
    index: number,
  ) => {
    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [locale]: prev.features[locale].map((feature, featureIndex) =>
          featureIndex === index ? value : feature,
        ),
      },
    }));
  };

  const addFeature = (locale: "en" | "ne") => {
    if (form.features[locale].length >= PRODUCT_FEATURES_MAX_ITEMS) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [locale]: [...prev.features[locale], ""],
      },
    }));
  };

  const removeFeature = (locale: "en" | "ne", index: number) => {
    if (form.features[locale].length <= 1) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [locale]: prev.features[locale].filter(
          (_, featureIndex) => featureIndex !== index,
        ),
      },
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.en.trim() || !form.name.ne.trim()) {
      alert("Please enter product name in both English and Nepali");
      return;
    }

    if (!form.description.en.trim() || !form.description.ne.trim()) {
      alert("Please enter product description in both English and Nepali");
      return;
    }

    const normalizedContentEn = clampProductContent(form.content.en).trim();
    const normalizedContentNe = clampProductContent(form.content.ne).trim();
    if (!normalizedContentEn || !normalizedContentNe) {
      alert("Please enter short content in both English and Nepali");
      return;
    }

    const parsedFeaturesEn = normalizeProductFeatures(form.features.en);
    const parsedFeaturesNe = normalizeProductFeatures(form.features.ne);
    if (parsedFeaturesEn.length === 0 || parsedFeaturesNe.length === 0) {
      alert(
        "Please add at least one product feature in both English and Nepali",
      );
      return;
    }

    const parsedPrice = Number(form.price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Please enter a valid price");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append(
      "product",
      JSON.stringify({
        name: form.name,
        content: {
          en: normalizedContentEn,
          ne: normalizedContentNe,
        },
        features: {
          en: parsedFeaturesEn,
          ne: parsedFeaturesNe,
        },
        description: form.description,
        price: parsedPrice,
        removeImageIds: removedImageIds,
      }),
    );

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      if (selected) {
        await axios.put(`${API_URL}/${selected.id}`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      }

      alert("Success!");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setRemovedImageIds([]);
    setForm(createFormFromProduct(product));
  };

  const visibleSelectedImages = selected
    ? selected.images.filter((image) => !removedImageIds.includes(image.id))
    : [];

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Product Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div
          ref={formCardRef}
          className="border-2 border-gray-300 p-8 rounded-xl shadow mb-10"
        >
          <h2 className="text-2xl font-bold mb-6">
            {selected ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              ref={nameInputRef}
              type="text"
              value={form.name.en}
              placeholder="Product Name (English)"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: { ...form.name, en: e.target.value },
                })
              }
              className="border-2 border-gray-300 p-4 rounded"
            />

            <input
              type="text"
              value={form.name.ne}
              placeholder="उत्पादन नाम (नेपाली)"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: { ...form.name, ne: e.target.value },
                })
              }
              className="border-2 border-gray-300 p-4 rounded font-devanagari"
            />

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              placeholder="Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border-2 border-gray-300 p-4 rounded md:col-span-2"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-2 text-lg">
              Short Content (for product card):
            </label>

            <textarea
              value={form.content.en}
              maxLength={PRODUCT_CONTENT_MAX_CHARS}
              placeholder="Write a short summary in English for product cards"
              onChange={(e) =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    en: clampProductContent(e.target.value),
                  },
                })
              }
              className="border-2 border-gray-300 p-4 rounded w-full min-h-26"
            />

            <textarea
              value={form.content.ne}
              maxLength={PRODUCT_CONTENT_MAX_CHARS}
              placeholder="प्रोडक्ट कार्डको लागि नेपाली छोटो सार लेख्नुहोस्"
              onChange={(e) =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    ne: clampProductContent(e.target.value),
                  },
                })
              }
              className="mt-3 border-2 border-gray-300 p-4 rounded w-full min-h-26 font-devanagari"
            />

            <p className="mt-2 text-sm text-gray-600">
              Max {PRODUCT_CONTENT_MAX_CHARS} characters to fit the card layout
              (EN {form.content.en.length}/{PRODUCT_CONTENT_MAX_CHARS}, NE{" "}
              {form.content.ne.length}/{PRODUCT_CONTENT_MAX_CHARS})
            </p>
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-2 text-lg">
              Features (English):
            </label>

            <div className="space-y-3">
              {form.features.en.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange("en", e.target.value, index)
                    }
                    placeholder={`Feature ${index + 1} (English)`}
                    className="border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:outline-none focus:border-blue-500"
                  />

                  {form.features.en.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature("en", index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 rounded font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addFeature("en")}
              disabled={form.features.en.length >= PRODUCT_FEATURES_MAX_ITEMS}
              className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold"
            >
              Add English Feature
            </button>

            <label className="font-semibold block mt-5 mb-2 text-lg">
              Features (Nepali):
            </label>

            <div className="space-y-3">
              {form.features.ne.map((feature, index) => (
                <div key={`ne-${index}`} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange("ne", e.target.value, index)
                    }
                    placeholder={`विशेषता ${index + 1} (नेपाली)`}
                    className="border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:outline-none focus:border-blue-500 font-devanagari"
                  />

                  {form.features.ne.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature("ne", index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 rounded font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addFeature("ne")}
              disabled={form.features.ne.length >= PRODUCT_FEATURES_MAX_ITEMS}
              className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold"
            >
              Add Nepali Feature
            </button>

            <p className="mt-2 text-sm text-gray-600">
              Add 2-3 points for best card layout. Product cards display up to{" "}
              {PRODUCT_CARD_FEATURE_LIMIT} points (max{" "}
              {PRODUCT_FEATURES_MAX_ITEMS} saved).
            </p>
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-3 text-lg">
              Description:
            </label>
            <Editor
              key={`${selected?.id ?? "new-product"}-en`}
              value={form.description.en}
              onChange={(value) =>
                setForm({
                  ...form,
                  description: { ...form.description, en: value },
                })
              }
            />

            <label className="font-semibold block mt-5 mb-3 text-lg">
              Description (Nepali):
            </label>
            <Editor
              key={`${selected?.id ?? "new-product"}-ne`}
              value={form.description.ne}
              onChange={(value) =>
                setForm({
                  ...form,
                  description: { ...form.description, ne: value },
                })
              }
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-2 text-lg">
              Images (multiple allowed):
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              required
              onChange={handleFileChange}
              className="border-2 border-gray-300 p-3 w-full rounded"
            />

            {form.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {form.images.length} file(s) selected
              </p>
            )}

            {selected && selected.images.length > 0 && (
              <div className="mt-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Existing images
                </p>

                <div className="flex flex-wrap gap-3">
                  {selected.images.map((img) => {
                    const isMarkedForRemoval = removedImageIds.includes(img.id);

                    return (
                      <div key={img.id} className="w-22">
                        <div
                          className={`relative overflow-hidden rounded border border-gray-200 ${
                            isMarkedForRemoval ? "opacity-40" : "opacity-100"
                          }`}
                        >
                          <Image
                            src={img.url}
                            alt={selected.name}
                            width={88}
                            height={88}
                            className="h-22 w-22 object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExistingImageRemoval(img.id)}
                          className={`mt-2 w-full rounded px-2 py-1 text-xs font-semibold text-white ${
                            isMarkedForRemoval
                              ? "bg-gray-600 hover:bg-gray-700"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {isMarkedForRemoval ? "Undo" : "Remove"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  {removedImageIds.length > 0
                    ? `${removedImageIds.length} image(s) marked for removal`
                    : `${visibleSelectedImages.length} existing image(s) will be kept`}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded font-semibold"
            >
              {selected
                ? submitting
                  ? "Updating..."
                  : "Update"
                : submitting
                  ? "Creating..."
                  : "Create"}
            </button>

            {selected && (
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Products ({products.length})
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <div className="bg-gray-100 p-10 rounded text-center">
            No products yet
          </div>
        ) : (
          <div className="space-y-5">
            {products.map((product) => (
              <div key={product.id} className="border-2 p-6 rounded-xl shadow">
                <h3 className="font-bold text-xl">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 font-devanagari">
                  {product.nameI18n?.ne ?? product.name}
                </p>
                <p className="text-gray-600 mt-1">Price: {product.price}</p>

                <p className="text-gray-700 mt-2">{product.content}</p>
                <p className="text-gray-600 mt-2 text-sm font-devanagari">
                  {product.contentI18n?.ne ?? product.content}
                </p>

                {(product.featuresI18n?.en ?? product.features).length > 0 && (
                  <ul className="mt-3 list-disc pl-6 text-gray-700">
                    {(product.featuresI18n?.en ?? product.features)
                      .slice(0, PRODUCT_CARD_FEATURE_LIMIT)
                      .map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                  </ul>
                )}

                {(product.featuresI18n?.ne ?? product.features).length > 0 && (
                  <ul className="mt-2 list-disc pl-6 text-gray-600 text-sm font-devanagari">
                    {(product.featuresI18n?.ne ?? product.features)
                      .slice(0, PRODUCT_CARD_FEATURE_LIMIT)
                      .map((feature) => (
                        <li key={`ne-${feature}`}>{feature}</li>
                      ))}
                  </ul>
                )}

                <div className="mt-3 text-gray-700 line-clamp-3 wrap-break-word">
                  Rich description available
                </div>

                {product.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.images.map((img) => (
                      <Image
                        key={img.id}
                        src={img.url}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
