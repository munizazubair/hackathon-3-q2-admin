"use client";

interface AlertProps {
  message: string | null;
  onClose: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white shadow-lg rounded-md flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 w-[80%] md:w-[400px] border border-neutral-700 backdrop-blur-md"
      role="alert"
    >
      <button
        className="text-white hover:text-gray-300 transition duration-200"
        onClick={onClose}
        aria-label="Close alert"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="text-sm md:text-base font-medium">{message}</p>
    </div>
  );
}
