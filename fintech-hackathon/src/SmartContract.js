import React, { useState } from "react";

function SmartContract() {
  const [transactionType, setTransactionType] = useState(
    "Select Transaction Type"
  );
  const [riskScore, setRiskScore] = useState(0);
  const [assetType, setAssetType] = useState("Select Asset Type");
  const [transactionValue, setTransactionValue] = useState(0);
  const [settlementDate, setSettlementDate] = useState(new Date());
  const [counterparty, setCounterparty] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Select Jurisdiction");
  const [contractStatus, setContractStatus] = useState("Pending");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const transactionOptions = [
    "Select Transaction Type",
    "Global Custody Services",
    "Securities Lending",
    "Asset Servicing",
    "Fund Administration",
    "Trade Settlement",
    "Treasury Management",
    "Real Estate Investments",
    "Wealth Management",
  ];

  const assetOptions = [
    "Select Asset Type",
    "Equity",
    "Fixed Income",
    "Derivatives",
    "Mutual Funds",
    "ETFs",
    "Real Estate",
    "Private Equity",
    "Hedge Funds",
    "Structured Products",
  ];

  const jurisdictionOptions = [
    "Select Jurisdiction",
    "USA(SEC/FINRA)",
    "EU(MiFID II)",
    "United Kingdom(FCA)",
    "Singapore(MAS)",
    "Hong Kong(SFC)",
    "Australia(ASIC)",
    "Canada(IIROC)",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const analyzeContract = async () => {
    setLoading(true);
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 100);
      setRiskScore(randomScore);
      setContractStatus(randomScore > 70 ? "High Risk" : "Compliant");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          📑 Smart Contract Compliance Writer
        </h1>
        <div className="flex justify-between items-center mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Smart Contract Configuration */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                🛠️ Smart Contract Configuration
              </h2>
              <select
                className="w-full p-3 border border-gray-300 rounded mb-3"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                {transactionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                className="w-full p-3 border border-gray-300 rounded mb-3"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              >
                {assetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded mb-3"
                placeholder="Transaction Value"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
              />

              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded mb-3"
                value={settlementDate}
                onChange={(e) => setSettlementDate(e.target.value)}
              />

              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded mb-3"
                placeholder="Counterparty Institution ID"
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
              />

              <select
                className="w-full p-3 border border-gray-300 rounded mb-3"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              >
                {jurisdictionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                className="w-full p-3 border border-gray-300 rounded mb-3"
                placeholder="Enter smart contract here"
                value={inputValue}
                onChange={handleInputChange}
              />

              <button
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                onClick={analyzeContract}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Compliance"}
              </button>
            </div>

            {/* Smart Contract Health */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                💡 Smart Contract Health
              </h2>
              <div className="p-4 border border-gray-300 rounded">
                {loading ? (
                  <div className="animate-spin h-6 w-6 border-t-2 border-blue-600 rounded-full mx-auto"></div>
                ) : (
                  <span
                    className={`text-xl font-bold ${
                      riskScore > 70 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {contractStatus}
                  </span>
                )}
                <p className="text-sm mt-2 text-gray-600">
                  Risk Score: {riskScore}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartContract;
