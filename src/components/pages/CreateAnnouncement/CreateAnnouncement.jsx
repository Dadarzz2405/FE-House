import React, { useState } from "react";
import api from "../../../API/axios";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      await api.post("/api/captain/announcements/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Announcement created successfully!");
      setTitle("");
      setContent("");
      setImageFile(null);
    } catch (err) {
      console.error("Failed to create announcement:", err);
      setError("Failed to create announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 border-2 border-gray-200 rounded-md text-base focus:outline-none focus:border-[#003876] transition-colors";
  const labelClass = "block font-semibold text-[#003876] mb-2";

  return (
    <div className="max-w-[600px] mx-auto my-8 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-center text-[#003876] text-2xl font-bold mb-8 pb-4 border-b-[3px] border-[#D4AF37]">
        Create New Announcement
      </h2>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-300 rounded p-3 mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 border border-green-300 rounded p-3 mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className={`${inputClass} resize-y min-h-[150px] font-sans`}
          />
        </div>

        <div>
          <label htmlFor="image" className={labelClass}>
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-sm cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#003876] text-white rounded-md font-semibold text-lg hover:bg-[#005ca8] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Creating..." : "Create Announcement"}
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
