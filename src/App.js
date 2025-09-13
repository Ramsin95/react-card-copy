import React, { useState } from "react";

// Default export: CreditCardCopyApp
// Tailwind CSS classes are used for styling. Paste this file into a React app with Tailwind configured.

export default function App() {
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardName, setCardName] = useState("JANE DOE");
  const [expiry, setExpiry] = useState("12/34");
  const [copied, setCopied] = useState("");
  const [showDigits, setShowDigits] = useState(false);

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1800);
    } catch (err) {
      console.error("Copy failed", err);
      setCopied("error");
      setTimeout(() => setCopied(""), 1800);
    }
  };

  // Simple helper to format input as card number groups
  const formatCardNumber = (s) => {
    // remove non-digits
    const digits = s.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const getMaskedCardNumber = () => {
    const formatted = formatCardNumber(cardNumber);
    if (showDigits) return formatted;
    // mask all but last 4 digits
    const parts = formatted.split(" ");
    return parts
      .map((p, i) => (i < parts.length - 1 ? "••••" : p))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Credit Card Preview & Copy</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card UI */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Card image */}
              <div className="rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-all">
                <div className="p-6 bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400 text-white">
                  {/* top row - chip and network logo */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-sm bg-yellow-300/90 border border-yellow-400 shadow-inner"></div>
                      <div className="text-xs opacity-90">BANK</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-red-400 opacity-95"></div>
                      <div className="w-6 h-6 rounded-full bg-orange-300 -ml-2 opacity-95"></div>
                    </div>
                  </div>

                  {/* card number */}
                  <div className="text-lg md:text-2xl tracking-widest font-mono mb-4 select-all">
                    {getMaskedCardNumber()}
                  </div>

                  {/* name & expiry */}
                  <div className="flex items-center justify-between text-sm md:text-base">
                    <div>
                      <div className="text-[10px] uppercase opacity-80">Card holder</div>
                      <div className="font-semibold tracking-wide">{cardName || "-"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-80">Expires</div>
                      <div className="font-semibold">{expiry || "--/--"}</div>
                    </div>
                  </div>
                </div>

                {/* decorative back strip */}
                <svg viewBox="0 0 500 40" className="w-full block">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="#06b6d4" stopOpacity="0.12" />
                      <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.06" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="40" fill="url(#g1)" />
                </svg>
              </div>

              {copied && copied !== "error" && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-black px-3 py-1 rounded-full shadow-md text-sm">
                  {copied} copied ✅
                </div>
              )}
              {copied === "error" && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-3 py-1 rounded-full shadow-md text-sm">
                  Copy failed
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <label className="block text-xs font-medium text-gray-600">Card number</label>
            <div className="mt-2 flex gap-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                aria-label="Card number"
              />
              <button
                className="px-3 py-2 bg-slate-100 rounded-lg border hover:bg-slate-50"
                onClick={() => copyToClipboard(formatCardNumber(cardNumber), "Card number")}
                aria-label="Copy card number"
                title="Copy card number"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v8a2 2 0 002 2h2z" />
                </svg>
              </button>
              <button
                className="px-3 py-2 bg-slate-100 rounded-lg border hover:bg-slate-50"
                onClick={() => setShowDigits(!showDigits)}
                aria-label="Toggle mask"
                title="Toggle mask"
              >
                {showDigits ? "Hide" : "Show"}
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-600">Card holder</label>
              <input
                className="mt-2 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="Jane Doe"
                aria-label="Card holder name"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-600">Expiry</label>
                <input
                  className="mt-2 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  value={expiry}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                    if (v.length >= 3) setExpiry(v.slice(0, 2) + "/" + v.slice(2));
                    else setExpiry(v);
                  }}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  aria-label="Expiry date"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => copyToClipboard(expiry, "Expiry")}
                  className="px-3 py-2 bg-sky-600 text-white rounded-lg shadow hover:opacity-95 flex items-center gap-2"
                  aria-label="Copy expiry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2 2H6a2 2 0 00-2 2v8a2 2 0 002 2h2z" />
                  </svg>
                  Copy expiry
                </button>
              </div>
            </div>

            <div className="mt-5 text-sm text-gray-500">
              Tip: Tap the copy icon, the "Copy expiry" button, or toggle Show/Hide to view the digits.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
