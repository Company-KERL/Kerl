import { useState } from "react";

export default function WhatsAppModal() {
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default

  const closeModal = () => setIsOpen(false);

  const whatsappNumber1 = "9567072475";
  const whatsappNumber2 = "9947615755";

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-4">Online Payments</h2>
          <p className="text-gray-700 mb-4">
            Online payments are on the way. Contact us for further details:
          </p>
          <div className="space-y-2">
            <a
              href={`https://wa.me/${whatsappNumber1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              {whatsappNumber1}
            </a>
            <br />
            <a
              href={`https://wa.me/${whatsappNumber2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              {whatsappNumber2}
            </a>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}
