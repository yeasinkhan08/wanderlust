"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { Trash2, AlertCircle, X } from "lucide-react";
import { Destination } from "@/types/destination";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface DeleteDestinationProps {
  destination: Destination;
  onDeleteSuccess?: () => void;
  triggerButton?: React.ReactNode;
  buttonLabel?: string;
  className?: string;
}

export default function DeleteDestination({
  destination,
  onDeleteSuccess,
  triggerButton,
  buttonLabel = "Cancel",
  className,
}: DeleteDestinationProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    const id = destination._id || destination.id;

    if (!id) {
      setErrorMessage("Destination ID not found.");
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`http://localhost:8000/destination/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete destination.");
      }

      await res.json();
      setIsOpen(false);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        router.push("/destinations");
        router.refresh();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {triggerButton ? (
        <div onClick={() => setIsOpen(true)}>{triggerButton}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={
            className ||
            "inline-flex items-center gap-1.5 border border-red-300 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors cursor-pointer"
          }
        >
          <Trash2 className="h-3.5 w-3.5 text-red-500" />
          <span>{buttonLabel}</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white p-6 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h3
                className={`${playfair.className} text-xl font-medium text-gray-900`}
              >
                Delete Travel Package?
              </h3>
            </div>

            <p className="mb-6 text-xs leading-relaxed text-gray-600 sm:text-sm">
              Are you sure you want to cancel and remove{" "}
              <strong>
                {destination.destinationName || "this destination"}
              </strong>
              ? This action cannot be undone.
            </p>

            {errorMessage && (
              <div className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
              >
                Keep Package
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="cursor-pointer bg-red-500 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50 sm:text-sm"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
