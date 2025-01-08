from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Setup CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN") or "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API key setup
openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Models for request validation
class ContractConfig(BaseModel):
    transactionType: str
    assetType: str
    value: float
    settlementDate: str
    counterpartyId: str
    jurisdiction: str

class ContractAudit(BaseModel):
    contractCode: str
    config: ContractConfig

# OpenAI system prompts
TEMPLATE_SYSTEM_PROMPT = """You are a smart contract generator. Generate a complete Solidity smart contract based on the provided configuration. 
The response should be ONLY the contract code with no additional explanations or markdown formatting.
Follow these guidelines:
- Use Solidity version 0.8.0 or higher
- Include SPDX license identifier
- Include proper commenting
- Implement basic security checks
- Add relevant events for monitoring
- Include configuration-specific validations."""

AUDIT_SYSTEM_PROMPT = """You are a smart contract auditor. Analyze the provided smart contract along with the associated configuration. Return a JSON response with the following exact structure:
{
    "contractHealth": {
        "overallScore": <0-100>,
        "metrics": {
            "gasEfficiency": <0-100>,
            "securityScore": <0-100>,
            "complexityIndex": <0-100>,
            "testCoverage": <0-100>
        },
        "vulnerabilities": [
            {
                "type": "<High|Medium|Low|Info>",
                "description": "<description>",
                "location": "<location in code>"
            }
        ]
    },
    "complianceIssues": [
        {
            "severity": "<high|medium|low>",
            "message": "<description>",
            "location": "<location in code>"
        ]
    ]
}
Ensure all scores are integers between 0-100. Analyze the smart contract in the context of the given configuration."""

@app.post("/api/generate-template")
async def generate_template(config: ContractConfig):
    """
    Generates a Solidity smart contract template based on the given configuration.
    """
    try:
        user_prompt = f"""Generate a Solidity smart contract for:
Transaction Type: {config.transactionType}
Asset Type: {config.assetType}
Value: {config.value}
Settlement Date: {config.settlementDate}
Counterparty ID: {config.counterpartyId}
Jurisdiction: {config.jurisdiction}

Include specific validations for this configuration."""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": TEMPLATE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,
        )

        contract_code = response.choices[0].message["content"]
        return {"contractCode": contract_code}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating template: {str(e)}")

@app.post("/api/audit-contract")
async def audit_contract(contract: ContractAudit):
    """
    Audits the given smart contract and its associated configuration, returning a detailed analysis.
    """
    try:
        user_prompt = f"""Analyze the following smart contract and associated configuration:
Smart Contract:
{contract.contractCode}

Configuration:
Transaction Type: {contract.config.transactionType}
Asset Type: {contract.config.assetType}
Value: {contract.config.value}
Settlement Date: {contract.config.settlementDate}
Counterparty ID: {contract.config.counterpartyId}
Jurisdiction: {contract.config.jurisdiction}"""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": AUDIT_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.1,
        )

        audit_result = response.choices[0].message["content"]
        return audit_result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error auditing contract: {str(e)}")

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
