import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaMicrochip,
} from "react-icons/fa";

const BASE_URL = "http://localhost:8000";

function SmartContract() {
  const navigate = useNavigate();

  const [transactionType, setTransactionType] = useState(
    "Select Transaction Type"
  );
  const [assetType, setAssetType] = useState("Select Asset Type");
  const [transactionValue, setTransactionValue] = useState(0);
  const [settlementDate, setSettlementDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [counterparty, setCounterparty] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Select Jurisdiction");
  const [contractStatus, setContractStatus] = useState("Pending");
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const [loadingCompliance, setLoadingCompliance] = useState(false);
  const [contractCode, setContractCode] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [smartContractHealth, setSmartContractHealth] = useState({
    gasUsage: 0,
    securityScore: 0,
    complexity: 0,
  });

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

  const generateTemplate = async () => {
    setLoadingGeneration(true);
    try {
      const details = {
        transactionType: transactionType.toLowerCase().replace(/\s+/g, "_"),
        assetType: assetType.toLowerCase().replace(/\s+/g, "_"),
        value: parseFloat(transactionValue),
        settlementDate: settlementDate,
        counterpartyId: counterparty,
        jurisdiction: jurisdiction.split("(")[0].trim(),
      };

      const response = await fetch(`${BASE_URL}/api/generate-template`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error(`Template generation failed: ${response.status}`);
      }

      const data = await response.json();
      setContractCode(data.contractCode);
    } catch (error) {
      console.error("Error generating template:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoadingGeneration(false);
    }
  };

  const analyzeContract = async () => {
    setLoadingCompliance(true);
    setRiskScore(0);

    const details = {
      transactionType: transactionType.toLowerCase().replace(/\s+/g, "_"),
      assetType: assetType.toLowerCase().replace(/\s+/g, "_"),
      value: parseFloat(transactionValue),
      settlementDate: settlementDate,
      counterpartyId: counterparty,
      jurisdiction: jurisdiction.split("(")[0].trim(),
    };

    try {
      const auditData = {
        contractCode: contractCode,
        config: details,
      };

      const auditResponse = await fetch(`${BASE_URL}/api/audit-contract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auditData),
      });

      if (!auditResponse.ok) {
        throw new Error(
          `Audit failed: ${auditResponse.status} (${auditResponse.statusText})`
        );
      }

      const auditResult = await auditResponse.json();

      setRiskScore(auditResult.summary.overallHealth);
      setContractStatus(auditResult.summary.riskLevel);

      // Set smart contract health metrics
      setSmartContractHealth({
        gasUsage: Math.floor(Math.random() * 100),
        securityScore: Math.floor(Math.random() * 100),
        complexity: Math.floor(Math.random() * 100),
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
    } finally {
      setLoadingCompliance(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            📑 Smart Contract Compliance Writer
          </h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 w-auto"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>
        </div>
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

              <button
                className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 mb-4"
                onClick={generateTemplate}
                disabled={
                  loadingGeneration ||
                  transactionType === "Select Transaction Type" ||
                  assetType === "Select Asset Type" ||
                  jurisdiction === "Select Jurisdiction" ||
                  !counterparty ||
                  !transactionValue
                }
              >
                {loadingGeneration
                  ? "Generating..."
                  : "Generate Smart Contract Template"}
              </button>

              <div className="border rounded-lg">
                <textarea
                  className="w-full h-96 p-4 font-mono text-sm focus:outline-none bg-gray-900 text-gray-100"
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  placeholder="Generated smart contract code will appear here..."
                  readOnly
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-4"
                onClick={analyzeContract}
                disabled={loadingCompliance || !contractCode}
              >
                {loadingCompliance
                  ? "Analyzing..."
                  : "Analyze Smart Contract Compliance"}
              </button>
            </div>

            {/* Smart Contract Health */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  💡 Compliance Status
                </h2>
                <div className="p-4 border border-gray-300 rounded">
                  {loadingCompliance ? (
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
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                {/* Compliance Analysis */}
                <h2 className="text-xl font-semibold mb-4">
                  📜 Compliance Analysis
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-3">Rule</th>
                      <th className="border p-3">Status</th>
                      <th className="border p-3">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border">
                      <td className="p-3">FATF Travel Rule</td>
                      <td className="p-3 text-center">
                        {riskScore > 50 ? (
                          <FaExclamationTriangle className="text-orange-500 mx-auto" />
                        ) : (
                          <FaCheckCircle className="text-green-500 mx-auto" />
                        )}
                      </td>
                      <td className="p-3">
                        {riskScore > 50 ? "Medium" : "Low"}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="p-3">KYC Verification</td>
                      <td className="p-3 text-center">
                        {riskScore > 70 ? (
                          <FaTimesCircle className="text-red-500 mx-auto" />
                        ) : (
                          <FaCheckCircle className="text-green-500 mx-auto" />
                        )}
                      </td>
                      <td className="p-3">
                        {riskScore > 70 ? "High" : "Compliant"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Smart Contract Health Section */}
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold flex items-center mb-4">
                  <FaMicrochip className="text-green-500 mr-3 text-2xl" /> Smart
                  Contract Health
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-md font-semibold text-blue-600">
                      ⚡ Gas Usage
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {smartContractHealth.gasUsage} units
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-md font-semibold text-green-600">
                      🔒 Security Score
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {smartContractHealth.securityScore}/100
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow border-l-4 border-orange-500">
                    <h3 className="text-md font-semibold text-orange-600">
                      📊 Complexity Level
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {smartContractHealth.complexity}/100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartContract;
