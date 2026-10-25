"use client";

import * as React from "react";
import { Playfair_Display } from "next/font/google";
import {
  Edit3,
  X,
  Save,
  Trash2,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Destination } from "@/types/destination";

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
  "Luxury",
  "Romantic",
];

interface EditDestinationProps {
  destination: Destination;
  onDestinationUpdated?: (updated: Destination) => void;
  triggerButton?: React.ReactNode;
}

export default function EditDestination({
  destination,
  onDestinationUpdated,
  triggerButton,
}: EditDestinationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    destinationName: destination.destinationName || "",
    country: destination.country || "",
    category: destination.category || "Beach",
    price: String(destination.price || ""),
    duration: destination.duration || "",
    departureDate: destination.departureDate || "",
    imageUrl: destination.imageUrl || "",
    description: destination.description || "",
  });

  // Sync form data whenever the destination prop updates or modal opens
  const syncFormData = () => {
    setFormData({
      destinationName: destination.destinationName || "",
      country: destination.country || "",
      category: destination.category || "Beach",
      price: String(destination.price || ""),
      duration: destination.duration || "",
      departureDate: destination.departureDate || "",
      imageUrl: destination.imageUrl || "",
      description: destination.description || "",
    });
    setErrorMessage(null);
  };

  const handleOpen = () => {
    syncFormData();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrorMessage(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setErrorMessage(null);

    const destId = destination._id || destination.id;

    let patchResultData: Partial<Destination> | null = null;
    try {
      const res = await fetch(`http://localhost:8000/destination/${destId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        patchResultData = await res.json();
        console.log("PATCH destination response:", patchResultData);
      } else {
        console.warn("PATCH destination returned non-OK status:", res.status);
      }
    } catch (err) {
      console.error("Backend PATCH error:", err);
    }

    const updatedDestination: Destination = {
      ...destination,
      ...(patchResultData || {}),
      destinationName: formData.destinationName,
      country: formData.country,
      category: formData.category,
      price: formData.price,
      duration: formData.duration,
      departureDate: formData.departureDate,
      imageUrl: formData.imageUrl,
      description: formData.description,
    };

    if (onDestinationUpdated) {
      onDestinationUpdated(updatedDestination);
    }

    setIsUpdating(false);
    setIsOpen(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 shadow-lg text-sm transition-all animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Package details updated successfully!</span>
        </div>
      )}

      {/* Trigger Button */}
      {triggerButton ? (
        <div onClick={handleOpen}>{triggerButton}</div>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <Edit3 className="h-3.5 w-3.5 text-gray-700" />
          <span>Edit</span>
        </button>
      )}

      {/* Edit Destination Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl bg-white p-7 sm:p-9 shadow-2xl relative my-8">
            {/* Close Icon */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h2
              className={`${playfair.className} text-2xl sm:text-[26px] font-normal tracking-tight text-[#0c0b0b]`}
            >
              Update Travel Package
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-6">
              Make changes to the travel package details below
            </p>

            {errorMessage && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Destination Name */}
              <div>
                <input
                  type="text"
                  name="destinationName"
                  value={formData.destinationName}
                  onChange={handleChange}
                  placeholder="Bali Paradise"
                  required
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Country & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="edit-dest-country"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="edit-dest-country"
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
                    htmlFor="edit-dest-category"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="edit-dest-category"
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

              {/* Price (USD) & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="edit-dest-price"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Price (USD)
                  </label>
                  <input
                    type="text"
                    id="edit-dest-price"
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
                    htmlFor="edit-dest-duration"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="edit-dest-duration"
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
                  htmlFor="edit-dest-departureDate"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Departure Date
                </label>
                <input
                  type="text"
                  id="edit-dest-departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="edit-dest-imageUrl"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="edit-dest-imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="edit-dest-description"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="edit-dest-description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the travel experience..."
                  className="w-full resize-none bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 border border-red-300 px-5 py-2.5 text-xs sm:text-sm font-medium text-red-500 hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span>Cancel</span>
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-1.5 bg-[#15a1bf] px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#0f8ea7] transition-colors cursor-pointer shadow-sm disabled:opacity-60"
                >
                  <Save className="h-4 w-4 text-white" />
                  <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
