"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  MapPin,
  Star,
  Calendar,
  Check,
  ArrowRight,
  X,
  CheckCircle2,
  Users,
  AlertCircle,
  Save,
  ChevronDown,
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

interface DestinationDetailsClientProps {
  initialDestination: Destination;
}

export default function DestinationDetailsClient({
  initialDestination,
}: DestinationDetailsClientProps) {
  const router = useRouter();
  const [destination, setDestination] =
    React.useState<Destination>(initialDestination);

  // Fallback image handling
  const defaultHeroImage = "/cta-airplane-bg.jpg";
  const [imgSrc, setImgSrc] = React.useState<string>(() => {
    if (destination.imageUrl && destination.imageUrl.trim() !== "") {
      return destination.imageUrl;
    }
    return defaultHeroImage;
  });
  const [imgError, setImgError] = React.useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(defaultHeroImage);
    }
  };

  // Booking states
  const [departureDate, setDepartureDate] = React.useState<string>(() => {
    if (destination.departureDate) {
      const parts = destination.departureDate.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
      }
      return destination.departureDate;
    }
    return "05/15/2026";
  });

  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);
  const [travelersCount, setTravelersCount] = React.useState(1);
  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState({
    destinationName: destination.destinationName || "",
    country: destination.country || "",
    category: destination.category || "Beach",
    price: String(destination.price || ""),
    duration: destination.duration || "",
    departureDate: destination.departureDate || "",
    imageUrl: destination.imageUrl || "",
    description: destination.description || "",
  });
  const [editSavedToast, setEditSavedToast] = React.useState(false);

  // Delete / Cancel states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Price formatting
  const rawPrice = String(destination.price || "1299").replace(/[^0-9.]/g, "");
  const priceNumber = Number(rawPrice) || 1299;
  const priceDisplay = rawPrice || "1299";

  // Duration formatting
  const durationDisplay = destination.duration || "7 Days / 6 Nights";

  // Rating and reviews formatting
  const ratingDisplay = destination.rating ? String(destination.rating) : "4.9";
  const reviewsDisplay = destination.reviewsCount
    ? String(destination.reviewsCount)
    : "234 reviews";

  // Highlights list
  const highlightsList =
    destination.highlights && destination.highlights.length > 0
      ? destination.highlights
      : [
        "Luxury beachfront accommodation",
        "Traditional Balinese spa treatment",
        "Sunrise trek to Mount Batur",
        "Visit Uluwatu Temple at sunset",
        "Private beach dinner experience",
      ];

  // Divide highlights into two columns
  const firstColHighlights = highlightsList.slice(0, 3);
  const secondColHighlights = highlightsList.slice(3);

  // Handle Edit Field Change
  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const destId = destination._id || destination.id;

    try {
      const res = await fetch(`http://localhost:8000/destination/${destId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      console.log("PATCH response:", data);
    } catch (err) {
      console.error("Backend update error:", err);
    }

    const updated: Destination = {
      ...destination,
      destinationName: editFormData.destinationName,
      country: editFormData.country,
      category: editFormData.category,
      price: editFormData.price,
      duration: editFormData.duration,
      departureDate: editFormData.departureDate,
      imageUrl: editFormData.imageUrl,
      description: editFormData.description,
    };

    setDestination(updated);
    if (editFormData.imageUrl) {
      setImgSrc(editFormData.imageUrl);
      setImgError(false);
    }
    if (editFormData.departureDate) {
      setDepartureDate(editFormData.departureDate);
    }

    setIsUpdating(false);
    setIsEditModalOpen(false);
    setEditSavedToast(true);
    setTimeout(() => setEditSavedToast(false), 3000);
  };

  // Handle Delete / Cancel Action
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const destId = destination._id || destination.id;
      if (destId && /^[0-9a-fA-F]{24}$/.test(destId)) {
        await fetch(`http://localhost:8000/destination/${destId}`, {
          method: "DELETE",
        }).catch(() => null);
      }
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      router.push("/destinations");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      {editSavedToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 shadow-lg text-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Package details updated successfully!</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-6">
          {/* Back link */}
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Destinations</span>
          </Link>

          {/* Edit & Cancel Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setEditFormData({
                  destinationName: destination.destinationName || "",
                  country: destination.country || "",
                  category: destination.category || "Beach",
                  price: String(destination.price || ""),
                  duration: destination.duration || "",
                  departureDate: destination.departureDate || "",
                  imageUrl: destination.imageUrl || "",
                  description: destination.description || "",
                });
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 border border-gray-300 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5 text-gray-700" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center gap-1.5 border border-red-300 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={destination.destinationName || "Destination Banner"}
            onError={handleImageError}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Main Details Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (8 cols): Content */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Country Badge */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-normal text-gray-500">
              <MapPin className="h-4 w-4 text-[#15a1bf] shrink-0" />
              <span className="capitalize">
                {destination.country || "Indonesia"}
              </span>
            </div>

            {/* Destination Name */}
            <h1
              className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mt-2 mb-3`}
            >
              {destination.destinationName || "Bali Paradise"}
            </h1>

            {/* Rating and Duration */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-700 pb-2">
              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-emerald-600 text-emerald-600 shrink-0" />
                <span className="font-bold text-gray-900">{ratingDisplay}</span>
                <span className="text-gray-500 font-normal">
                  ({reviewsDisplay})
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-600 shrink-0" />
                <span className="font-bold text-gray-900">
                  {durationDisplay}
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mt-8">
              <h2
                className={`${playfair.className} text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-2.5`}
              >
                Overview
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                {destination.description ||
                  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
              </p>
            </div>

            {/* Highlights Section */}
            <div className="mt-8">
              <h2
                className={`${playfair.className} text-xl sm:text-2xl font-normal text-gray-900 tracking-tight mb-2.5`}
              >
                Highlights
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal mb-5">
                {destination.description ||
                  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
              </p>

              {/* 2-Column Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {/* Column 1 */}
                <div className="space-y-3.5">
                  {firstColHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-normal">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-3.5">
                  {secondColHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-normal">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Booking Card */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-7 sticky top-24">
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                Starting from
              </p>
              <div className="mt-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#15a1bf] tracking-tight">
                  ${priceDisplay}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-normal mt-0.5 mb-6">
                per person
              </p>

              {/* Date Input Box */}
              <div className="mb-4">
                <label htmlFor="booking-date" className="sr-only">
                  Departure Date
                </label>
                <input
                  id="booking-date"
                  type="text"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Book Now Button */}
              <button
                type="button"
                onClick={() => setIsBookModalOpen(true)}
                className="w-full bg-[#15a1bf] hover:bg-[#0f8ea7] text-white py-3.5 px-4 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Value Proposition List */}
              <div className="mt-6 pt-2 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600 font-normal">
                    Free cancellation up to 7 days
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600 font-normal">
                    Travel insurance included
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600 font-normal">
                    24/7 customer support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsBookModalOpen(false);
                setBookingSuccess(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 mb-3" />
                <h3
                  className={`${playfair.className} text-2xl font-normal text-gray-900 mb-2`}
                >
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Thank you for booking your trip to{" "}
                  <strong>{destination.destinationName}</strong> on{" "}
                  <strong>{departureDate}</strong>. A confirmation email has
                  been sent.
                </p>
                <button
                  onClick={() => {
                    setIsBookModalOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="bg-[#15a1bf] hover:bg-[#0f8ea7] text-white px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3
                  className={`${playfair.className} text-2xl font-normal text-gray-900 mb-1`}
                >
                  Book Your Experience
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-6">
                  {destination.destinationName} &bull; {destination.country}
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Departure Date</span>
                    <span className="font-semibold text-gray-900">
                      {departureDate}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {durationDisplay}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> Travelers
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setTravelersCount((prev) => Math.max(1, prev - 1))
                        }
                        className="h-7 w-7 border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-900">
                        {travelersCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount((prev) => prev + 1)}
                        className="h-7 w-7 border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-base font-bold text-gray-900">
                      Total Price
                    </span>
                    <span className="text-xl font-bold text-[#15a1bf]">
                      ${priceNumber * travelersCount}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="border border-gray-300 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(true)}
                    className="bg-[#15a1bf] hover:bg-[#0f8ea7] text-white px-5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Destination Modal - Matches Provided Design Exactly */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl bg-white p-7 sm:p-9 shadow-2xl relative my-8">
            {/* Close Icon */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
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

            <form
              onSubmit={handleEditSubmit}
              className="space-y-4 sm:space-y-5"
            >
              {/* Destination Name (Direct input without label, matching design) */}
              <div>
                <input
                  type="text"
                  name="destinationName"
                  value={editFormData.destinationName}
                  onChange={handleEditChange}
                  placeholder="Bali Paradise"
                  required
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Country & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="edit-country"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="edit-country"
                    name="country"
                    value={editFormData.country}
                    onChange={handleEditChange}
                    placeholder="Indonesia"
                    required
                    className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-category"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="edit-category"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
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
                    htmlFor="edit-price"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Price (USD)
                  </label>
                  <input
                    type="text"
                    id="edit-price"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    placeholder="e.g., 1299"
                    required
                    className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-duration"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="edit-duration"
                    name="duration"
                    value={editFormData.duration}
                    onChange={handleEditChange}
                    placeholder="e.g., 7 Days/6 Nights"
                    required
                    className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div>
                <label
                  htmlFor="edit-departureDate"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Departure Date
                </label>
                <input
                  type="text"
                  id="edit-departureDate"
                  name="departureDate"
                  value={editFormData.departureDate}
                  onChange={handleEditChange}
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="edit-imageUrl"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={editFormData.imageUrl}
                  onChange={handleEditChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows={4}
                  value={editFormData.description}
                  onChange={handleEditChange}
                  placeholder="Describe the travel experience..."
                  className="w-full resize-none bg-[#f4f7f9] border border-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#15a1bf] focus:outline-none transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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

      {/* Delete / Cancel Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white p-6 sm:p-7 shadow-2xl relative">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="h-6 w-6" />
              <h3
                className={`${playfair.className} text-xl font-medium text-gray-900`}
              >
                Delete Travel Package?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to cancel and remove{" "}
              <strong>{destination.destinationName}</strong>? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="border border-gray-300 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Keep Package
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
