// Full Frontend Code: React (Next.js) + Tailwind CSS
// Implements Dashboard UI with Smart Contract Compliance Features

import { useState, useEffect } from "react";
import {
	FaCheckCircle,
	FaExclamationTriangle,
	FaTimesCircle,
	FaLock,
	FaGavel,
	FaProjectDiagram,
	FaMicrochip,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ForceGraph2D } from "react-force-graph";


export default function Dashboard() {
	const [transactionType, setTransactionType] = useState(
		"Select Transaction Type"
	);
	const [assetType, setAssetType] = useState("Select Asset Type");
	const [transactionValue, setTransactionValue] = useState(0);
	const [settlementDate, setSettlementDate] = useState(new Date());
	const [counterparty, setCounterparty] = useState("");
	const [jurisdiction, setJurisdiction] = useState("Select Jurisdiction");
	const [contractStatus, setContractStatus] = useState("Pending");
	const [loading, setLoading] = useState(false);
	const [riskScore, setRiskScore] = useState(0);
	const [amlData, setAmlData] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [alerts, setAlerts] = useState([]);
	const [zkpVerifiedUsers, setZkpVerifiedUsers] = useState([]);
	const [regulatoryUpdates, setRegulatoryUpdates] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [smartContractHealth, setSmartContractHealth] = useState({
    gasUsage: 0,
    securityScore: 0,
    complexity: 0,
  });

	const analyzeContract = async () => {
		setLoading(true);
		setTimeout(() => {
			const randomScore = Math.floor(Math.random() * 100);
			setRiskScore(randomScore);
			setContractStatus(randomScore > 70 ? "High Risk" : "Compliant");
			setLoading(false);
		}, 2000);
	};

	// Simulated AML Data (Replace with API Call Later)
	useEffect(() => {
		const sampleData = [
			{ wallet: "0x123", amount: 50000, risk: 90 },
			{ wallet: "0x456", amount: 20000, risk: 40 },
			{ wallet: "0x789", amount: 75000, risk: 95 },
			{ wallet: "0xABC", amount: 12000, risk: 20 },
			{ wallet: "0xDEF", amount: 45000, risk: 85 },
		];
		setAmlData(sampleData);
	}, []);

	// Dummy Real-Time Transactions with Alerts
	useEffect(() => {
		const sampleTransactions = [
			{ wallet: "0xAAA", amount: 15000, risk: 35 },
			{ wallet: "0xBBB", amount: 30000, risk: 80 },
			{ wallet: "0xCCC", amount: 5000, risk: 20 },
			{ wallet: "0xDDD", amount: 60000, risk: 90 },
		];
		setTransactions(sampleTransactions);

		// Generate alerts for high-risk transactions
		const highRiskAlerts = sampleTransactions
			.filter((tx) => tx.risk > 70)
			.map(
				(tx) =>
					`High-Risk Transaction Detected: Wallet ${tx.wallet} - Amount: $${tx.amount}`
			);
		setAlerts(highRiskAlerts);
	}, []);

	// Dummy ZKP-Verified Users
	useEffect(() => {
		const sampleZkpUsers = [
			{ wallet: "0xAAA", verified: true },
			{ wallet: "0xBBB", verified: false },
			{ wallet: "0xCCC", verified: true },
			{ wallet: "0xDDD", verified: false },
		];
		setZkpVerifiedUsers(sampleZkpUsers);
	}, []);

	// Dummy Regulatory Updates
	useEffect(() => {
		const sampleRegulations = [
			{
				regulation: "FATF Travel Rule Update",
				effectiveDate: "2024-06-15",
				status: "Pending Compliance",
			},
			{
				regulation: "GDPR Data Privacy Enhancement",
				effectiveDate: "2024-05-10",
				status: "Compliant",
			},
			{
				regulation: "SEC Crypto Custody Rule",
				effectiveDate: "2024-07-01",
				status: "Action Required",
			},
		];
		setRegulatoryUpdates(sampleRegulations);
	}, []);

	// Dummy Graph Data for Money Laundering Visualization
	useEffect(() => {
		const sampleGraph = {
			nodes: [
				{ id: "0x123", risk: 90 },
				{ id: "0x456", risk: 40 },
				{ id: "0x789", risk: 95 },
				{ id: "0xABC", risk: 20 },
				{ id: "0xDEF", risk: 85 },
			],
			links: [
				{ source: "0x123", target: "0x456" },
				{ source: "0x123", target: "0x789" },
				{ source: "0x456", target: "0xABC" },
				{ source: "0xDEF", target: "0x789" },
			],
		};
		setGraphData(sampleGraph);
	}, []);

	// Dummy Smart Contract Health Data
	useEffect(() => {
		setSmartContractHealth({
			gasUsage: 50000,
			securityScore: 85,
			complexity: 3,
		});
	}, []);

	const chartData = {
		labels: amlData.map((tx) => tx.wallet),
		datasets: [
			{
				label: "AML Risk Levels",
				data: amlData.map((tx) => tx.risk),
				backgroundColor: amlData.map((tx) => (tx.risk > 70 ? "red" : "green")),
				borderColor: "black",
				borderWidth: 1,
			},
		],
	};

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

return (
	<div className="min-h-screen bg-gray-100 p-6">
		<div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
			<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
				🚀 Smart Contract Compliance Dashboard
			</h1>

			{/* Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Smart Contract Configuration */}
				<div className="p-6 bg-gray-50 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">
						📑 Smart Contract Configuration
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

			{/* Compliance Analysis */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">📜 Compliance Analysis</h2>
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
							<td className="p-3">{riskScore > 50 ? "Medium" : "Low"}</td>
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
							<td className="p-3">{riskScore > 70 ? "High" : "Compliant"}</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* AML Risk Visualization */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">
					📊 AML Risk Visualization
				</h2>
				<p className="text-sm text-gray-600 mb-3">
					🔴 High-Risk Wallets | 🟢 Low-Risk Wallets
				</p>
				<Line data={chartData} />
			</div>

			{/* Real-Time Transactions */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">
					⏳ Real-Time Transactions
				</h2>
				<table className="w-full border border-gray-200 rounded-lg">
					<thead className="bg-gray-100">
						<tr>
							<th className="border p-3">Wallet Address</th>
							<th className="border p-3">Amount ($USD)</th>
							<th className="border p-3">Risk Level</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((tx, index) => (
							<tr
								key={index}
								className={`border text-center ${
									tx.risk > 70 ? "bg-red-100" : "bg-green-100"
								}`}
							>
								<td className="p-3 font-mono">{tx.wallet}</td>
								<td className="p-3">${tx.amount.toLocaleString()}</td>
								<td
									className={`p-3 ${
										tx.risk > 70 ? "text-red-600" : "text-green-600"
									}`}
								>
									{tx.risk > 70 ? "High Risk 🔴" : "Low Risk 🟢"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Zero-Knowledge Proof (ZKP) Compliance Section */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold flex items-center mb-4">
					<FaLock className="text-blue-500 mr-3 text-2xl" /> Zero-Knowledge
					Proof (ZKP) Compliance
				</h2>
				<div className="bg-gray-100 p-4 rounded-lg shadow-inner">
					<table className="w-full border border-gray-300 rounded-lg">
						<thead className="bg-gray-200">
							<tr>
								<th className="border p-3 text-left">Wallet Address</th>
								<th className="border p-3 text-left">Verification Status</th>
							</tr>
						</thead>
						<tbody>
							{zkpVerifiedUsers.map((user, index) => (
								<tr
									key={index}
									className={`border text-left ${
										user.verified ? "bg-green-100" : "bg-red-100"
									}`}
								>
									<td className="p-3 font-mono">{user.wallet}</td>
									<td className="p-3">
										<span
											className={`px-3 py-1 text-white text-sm font-semibold rounded-lg ${
												user.verified ? "bg-green-500" : "bg-red-500"
											}`}
										>
											{user.verified ? "✅ Verified" : "❌ Not Verified"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Regulatory Updates Section */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold flex items-center mb-4">
					<FaGavel className="text-purple-500 mr-3 text-2xl" /> Regulatory
					Updates
				</h2>
				<div className="bg-gray-100 p-4 rounded-lg shadow-inner">
					<table className="w-full border border-gray-300 rounded-lg">
						<thead className="bg-gray-200">
							<tr>
								<th className="border p-3 text-left">Regulation</th>
								<th className="border p-3 text-left">Effective Date</th>
								<th className="border p-3 text-left">Status</th>
							</tr>
						</thead>
						<tbody>
							{regulatoryUpdates.map((update, index) => (
								<tr key={index} className="border text-left">
									<td className="p-3 font-medium">{update.regulation}</td>
									<td className="p-3">{update.effectiveDate}</td>
									<td className="p-3">
										<span
											className={`px-3 py-1 text-white text-sm font-semibold rounded-lg ${
												update.status === "Compliant"
													? "bg-green-500"
													: update.status === "Pending Compliance"
													? "bg-yellow-500"
													: "bg-red-500"
											}`}
										>
											{update.status === "Compliant"
												? "✅ Compliant"
												: update.status === "Pending Compliance"
												? "⏳ Pending"
												: "⚠️ Action Required"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Graph-Based Risk Analysis */}
			<div className="mt-6 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold flex items-center mb-4">
					<FaProjectDiagram className="text-blue-500 mr-3 text-2xl" /> Money
					Laundering Risk Network
				</h2>
				<div className="relative bg-gray-100 rounded-lg p-4 shadow-inner">
					<p className="text-sm text-gray-600 mb-3">
						🔴 High-Risk Nodes | 🟢 Low-Risk Nodes
					</p>
					<ForceGraph2D
						graphData={graphData}
						nodeAutoColorBy="risk"
						nodeCanvasObject={(node, ctx) => {
							ctx.fillStyle = node.risk > 70 ? "red" : "green";
							ctx.beginPath();
							ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
							ctx.fill();
							ctx.font = "12px Arial";
							ctx.fillStyle = "black";
							ctx.fillText(node.id, node.x + 10, node.y + 5);
						}}
						linkDirectionalParticles={2}
						linkDirectionalParticleSpeed={0.01}
						height={350}
					/>
				</div>
			</div>

			{/* Smart Contract Health Section */}
			<div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
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
							{smartContractHealth.complexity}/5
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);
}
