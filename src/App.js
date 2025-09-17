import React, { useState, useRef } from "react";
import { FaApple, FaGooglePay } from "react-icons/fa"; // icon pack
import { SiSamsungpay } from "react-icons/si"; // ✅ Correct Samsung Pay icon

export default function CreditCardApp() {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const cardNumberRef = useRef(null);

  const cardNumber = "4111111111111111"; // test VISA number
  const expiry = "12/27";
  const cvv = "123";
  const status = "Active";
  const balance = 2350.75;

  const transactions = [
    { id: 1, merchant: "Amazon", amount: -120.5, date: "2025-09-15" },
    { id: 2, merchant: "Starbucks", amount: -5.75, date: "2025-09-14" },
    { id: 3, merchant: "Payroll Deposit", amount: 1500, date: "2025-09-12" },
    { id: 4, merchant: "Uber", amount: -22.3, date: "2025-09-11" },
  ];

  const maskedCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "•");

  const handleCloseModal = () => {
    setShowModal(false);
    if (cardNumberRef.current) {
      cardNumberRef.current.select();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      {/* Info Text */}
      <div className="max-w-sm w-full bg-white rounded-xl shadow-sm p-4 mb-4 text-center">
        <h2 className="text-lg font-bold mb-2">
          Your Kiosk Prepaid Virtual Card
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          You can use this card to pay online or you may load this card to your{" "}
          <span className="font-medium">Samsung</span>,{" "}
          <span className="font-medium">Google</span>, or{" "}
          <span className="font-medium">Apple</span> wallet by manually entering
          the card data.
        </p>

        {/* Wallet icons */}
        <div className="flex justify-center space-x-6 text-3xl">
          {/* Apple Wallet */}
          <a
            href="https://support.apple.com/en-us/HT204003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700"
            title="Add to Apple Wallet"
          >
            <FaApple />
          </a>

          {/* Google Pay */}
          <a
            href="https://pay.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
            title="Add to Google Wallet"
          >
            <FaGooglePay />
          </a>

          {/* Samsung Pay */}
          <a
            href="https://www.samsung.com/samsung-pay/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title="Add to Samsung Pay"
          >
            <SiSamsungpay />
          </a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">How to Copy Card Details</h2>
            <p className="text-gray-600 mb-6 text-sm">
              After closing this message, the card number will be pre-selected
              for you. Simply tap <b>Copy</b> on mobile or press{" "}
              <b>Ctrl+C</b>/<b>Cmd+C</b> on desktop.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
              onClick={handleCloseModal}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Card UI */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative mb-4">
        <h3 className="text-lg font-semibold mb-6">My Secure Card</h3>

        {/* Card Number */}
        <label className="block text-xs mb-1 text-gray-200">Card Number</label>
        <input
          ref={cardNumberRef}
          value={showDetails ? cardNumber : maskedCardNumber}
          readOnly
          onFocus={(e) => e.target.select()}
          className="w-full text-lg tracking-widest font-mono bg-white/20 rounded-lg px-3 py-2 mb-4 text-white focus:outline-none select-all cursor-text"
        />

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1 text-gray-200">Expiry</label>
            <input
              value={showDetails ? expiry : "••/••"}
              readOnly
              onFocus={(e) => e.target.select()}
              className="w-full text-lg font-mono bg-white/20 rounded-lg px-3 py-2 text-white focus:outline-none select-all cursor-text"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 text-gray-200">CVV</label>
            <input
              value={showDetails ? cvv : "•••"}
              readOnly
              onFocus={(e) => e.target.select()}
              className="w-full text-lg font-mono bg-white/20 rounded-lg px-3 py-2 text-white focus:outline-none select-all cursor-text"
            />
          </div>
        </div>

        {/* Show/Hide toggle */}
        <button
          className="absolute top-4 right-4 text-sm bg-white text-blue-600 rounded-full px-3 py-1 shadow hover:bg-gray-100"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide" : "Show"}
        </button>
      </div>

      {/* Status + Balance */}
      <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500 text-sm">Card Status</span>
          <span
            className={`font-semibold ${
              status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Balance</span>
          <span className="font-bold text-lg text-gray-800">
            ${balance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
        <h4 className="text-lg font-semibold mb-3">Transaction History</h4>
        <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
          {transactions.map((txn) => (
            <li key={txn.id} className="flex justify-between py-2 text-sm">
              <div>
                <p className="font-medium text-gray-800">{txn.merchant}</p>
                <p className="text-gray-400 text-xs">{txn.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  txn.amount < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
