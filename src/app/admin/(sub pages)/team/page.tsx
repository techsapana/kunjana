"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import type { LocalizedText } from "@/src/helpers/i18n";

interface TeamMember {
  id: number;
  name: string;
  nameI18n?: LocalizedText;
  post: string;
  postI18n?: LocalizedText;
  description: string;
  descriptionI18n?: LocalizedText;
  image: string;
}

type TeamForm = {
  name: LocalizedText;
  post: LocalizedText;
  description: LocalizedText;
  image: File | null;
};

const emptyText = (): LocalizedText => ({ en: "", ne: "" });

const createEmptyForm = (): TeamForm => ({
  name: emptyText(),
  post: emptyText(),
  description: emptyText(),
  image: null,
});

const resolveLocalizedText = (
  value: LocalizedText | undefined,
  fallback: string,
): LocalizedText => {
  const normalized = fallback.trim();

  if (!value) {
    return { en: normalized, ne: normalized };
  }

  const en = (value.en ?? "").trim() || normalized;
  const ne = (value.ne ?? "").trim() || en;

  return { en, ne };
};

const createFormFromMember = (member: TeamMember): TeamForm => ({
  name: resolveLocalizedText(member.nameI18n, member.name),
  post: resolveLocalizedText(member.postI18n, member.post),
  description: resolveLocalizedText(member.descriptionI18n, member.description),
  image: null,
});

const API_URL = `/api/team`;

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState<TeamForm>(createEmptyForm);

  /* ---------------- FETCH ---------------- */
  const fetchMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      setMembers(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load team");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!form.name.en.trim() || !form.name.ne.trim()) {
      return alert("Enter member name in English and Nepali");
    }

    if (!form.post.en.trim() || !form.post.ne.trim()) {
      return alert("Enter member role in English and Nepali");
    }

    if (!form.description.en.trim() || !form.description.ne.trim()) {
      return alert("Enter member description in English and Nepali");
    }

    setSubmitting(true);

    const formData = new FormData();

    formData.append(
      "member",
      JSON.stringify({
        name: form.name,
        post: form.post,
        description: form.description,
      }),
    );

    if (form.image) {
      formData.append("image", form.image);
    }

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

      setForm(createEmptyForm());

      setSelected(null);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      fetchMembers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleEdit = (m: TeamMember) => {
    setSelected(m);
    setForm(createFormFromMember(m));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Team Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="border-2 border-gray-300 p-8 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {selected ? "Edit Member" : "Add Member"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name (English)"
              value={form.name.en}
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
              placeholder="नाम (नेपाली)"
              value={form.name.ne}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: { ...form.name, ne: e.target.value },
                })
              }
              className="border-2 border-gray-300 p-4 rounded"
            />

            <input
              type="text"
              placeholder="Post / Role (English)"
              value={form.post.en}
              onChange={(e) =>
                setForm({
                  ...form,
                  post: { ...form.post, en: e.target.value },
                })
              }
              className="border-2 border-gray-300 p-4 rounded"
            />

            <input
              type="text"
              placeholder="पद / भूमिका (नेपाली)"
              value={form.post.ne}
              onChange={(e) =>
                setForm({
                  ...form,
                  post: { ...form.post, ne: e.target.value },
                })
              }
              className="border-2 border-gray-300 p-4 rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="font-semibold block mb-2">
              Description (English + Nepali, max 150 each)
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <textarea
                  value={form.description.en}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: {
                        ...form.description,
                        en: e.target.value.slice(0, 150),
                      },
                    })
                  }
                  maxLength={150}
                  rows={4}
                  placeholder="Short description in English..."
                  className="border-2 border-gray-300 p-4 rounded w-full resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {form.description.en.length}/150 characters
                </p>
              </div>

              <div>
                <textarea
                  value={form.description.ne}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: {
                        ...form.description,
                        ne: e.target.value.slice(0, 150),
                      },
                    })
                  }
                  maxLength={150}
                  rows={4}
                  placeholder="सदस्यको छोटो विवरण (नेपाली)..."
                  className="border-2 border-gray-300 p-4 rounded w-full resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {form.description.ne.length}/150 characters
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="mt-6">
            <label className="font-semibold block mb-2">Profile Image</label>

            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="border p-3 rounded w-full"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed cursor-pointer text-white px-6 py-3 rounded font-semibold"
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
                onClick={() => {
                  setSelected(null);
                  setForm(createEmptyForm());
                }}
                className="bg-gray-400 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <h2 className="text-2xl font-bold mb-6">
          Team Members ({members.length})
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : members.length === 0 ? (
          <div className="bg-gray-100 p-10 rounded text-center">
            No members yet
          </div>
        ) : (
          <div className="space-y-5">
            {members.map((m) => (
              <div key={m.id} className="border-2 p-6 rounded-xl shadow">
                <h3 className="font-bold text-xl">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.nameI18n?.ne}</p>
                <p className="text-gray-600">{m.post}</p>
                <p className="text-sm text-gray-500">{m.postI18n?.ne}</p>

                {m.image && (
                  <Image
                    src={m.image}
                    alt=""
                    className="w-32 mt-3 rounded"
                    height={100}
                    width={100}
                  />
                )}

                <div
                  className="mt-3 text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: m.description,
                  }}
                />

                <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                  {m.descriptionI18n?.ne}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
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
