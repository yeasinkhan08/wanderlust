"use client";

import * as React from "react";
import { Playfair_Display } from "next/font/google";
import { ChevronDown, Trash2, PackagePlus, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const categories = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "City Tour",
  "Wildlife & Safari",
  "Cruise",
];

export default function AddDestinationPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    destinationName: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      destinationName: "",
      country: "",
      category: "Beach",
      price: "",
      duration: "",
      departureDate: "",
      imageUrl: "",
      description: "",
    });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, persist or send to API
    setTimeout(() => {
      setSubmitted(false);
      handleReset();
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-12 md:py-16 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        {/* Page Title */}
        <h1
          className={`${playfair.className} text-3xl sm:text-4xl md:text-[38px] font-normal tracking-tight text-[#0c0b0b] mb-8`}
        >
          Add New Travel Package
        </h1>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Travel package successfully added!</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white border border-gray-100 shadow-[0_2px_18px_rgba(0,0,0,0.05)] p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Destination Name */}
            <div>
              <label
                htmlFor="destinationName"
                className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
              >
                Destination Name
              </label>
              <input
                type="text"
                id="destinationName"
                name="destinationName"
                value={formData.destinationName}
                onChange={handleChange}
                placeholder="Bali Paradise"
                required
                className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
              />
            </div>

            {/* Country & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="country"
                  className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Indonesia"
                  required
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors pr-10 cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="price"
                  className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Price (USD)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 1299"
                  required
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days/6 Nights"
                  required
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label
                htmlFor="departureDate"
                className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
              >
                Departure Date
              </label>
              <input
                type="text"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="mm/dd/yyyy"
                required
                className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the travel experience..."
                required
                className="w-full resize-none bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  router.push("/");
                }}
                className="inline-flex items-center gap-1.5 border border-red-300 px-4 py-2 text-xs sm:text-sm font-medium text-red-400 hover:border-red-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-400" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-[#15a1bf] px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#0f8ea7] transition-colors cursor-pointer shadow-sm"
              >
                <PackagePlus className="h-3.5 w-3.5" />
                <span>Add Travel Package</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}