from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import anthropic
import os
import json

# Load environment variables and initialize FastAPI app
load_dotenv()
app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN") or "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Anthropic setup
client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# Models
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

# Optimized system prompts
TEMPLATE_SYSTEM_PROMPT = """You are an expert smart contract developer specializing in financial contracts. Generate a production-ready Solidity smart contract based on the provided configuration.

Required Contract Features:
1. Comprehensive KYC/AML checks
2. Transaction limits and thresholds
3. Jurisdiction-specific compliance rules
4. Asset-specific transfer logic
5. Emergency pause functionality
6. Full event logging
7. Access control mechanisms
8. Input validation

Contract Structure Requirements:
1. Use SPDX-License-Identifier: MIT
2. Use Solidity ^0.8.0
3. Implement OpenZeppelin security standards
4. Include NatSpec documentation
5. Follow gas optimization best practices

The contract MUST include:
- Comprehensive error messages
- Role-based access control
- Circuit breaker pattern
- Input validation modifiers
- Compliance check modifiers
- Event emissions for all state changes
- Clear function documentation

Return ONLY the contract code without any additional text or formatting."""

AUDIT_SYSTEM_PROMPT = """You are an expert smart contract auditor specializing in financial compliance and security. Perform a comprehensive analysis of the provided smart contract and configuration.

Analyze the following aspects:
1. Security vulnerabilities (OWASP Top 10 for smart contracts)
2. Gas optimization
3. Business logic correctness
4. Compliance with regulatory requirements
5. Code quality and best practices
6. Access control implementation
7. Event logging completeness
8. Input validation thoroughness

Provide a detailed analysis in the following JSON structure:

{
    "summary": {
        "overallHealth": 0-100,
        "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
        "mainFindings": "Brief summary of key findings"
    },
    "securityAnalysis": {
        "score": 0-100,
        "findings": [
            {
                "severity": "LOW|MEDIUM|HIGH|CRITICAL",
                "category": "Access Control|Logic|Gas|Security|Compliance",
                "title": "Brief title",
                "description": "Detailed description",
                "location": "Function/line reference",
                "recommendation": "How to fix"
            }
        ]
    },
    "complianceAnalysis": {
        "score": 0-100,
        "jurisdictionCompliance": "YES|NO",
        "findings": [
            {
                "requirement": "KYC|AML|Transaction Limits|etc",
                "status": "COMPLIANT|NON-COMPLIANT|PARTIAL",
                "details": "Explanation",
                "risk": "Description of regulatory risk",
                "recommendation": "How to achieve compliance"
            }
        ]
    }
}

Ensure all numerical scores are integers between 0-100.

Return ONLY the JSON text without any additional text or formatting."""

@app.post("/api/generate-template")
async def generate_template(config: ContractConfig):
    try:
        user_prompt = f"""Generate smart contract:
- Type: {config.transactionType}
- Asset: {config.assetType}
- Value: {config.value}
- Settlement: {config.settlementDate}
- Counterparty: {config.counterpartyId}
- Jurisdiction: {config.jurisdiction}

Include:
1. {config.jurisdiction} compliance
2. {config.assetType} transfer logic
3. KYC/AML checks
4. Value limits
5. Settlement validation"""

        response = client.messages.create(
            model="claude-3-haiku-20240307",  # Using the most cost-effective model
            max_tokens=4000,
            temperature=0.2,
            system=TEMPLATE_SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        )

        return {"contractCode": response.content[0].text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating template: {str(e)}")

@app.post("/api/audit-contract")
async def audit_contract(contract: ContractAudit):
    try:
        user_prompt = f"""Analyze contract for {contract.config.jurisdiction}:
{contract.contractCode}

Check:
1. {contract.config.assetType} handling
2. Value limits ({contract.config.value})
3. Settlement timing
4. Counterparty verification
5. Compliance requirements"""

        response = client.messages.create(
            model="claude-3-haiku-20240307",  # Using the most cost-effective model
            max_tokens=4000,
            temperature=0.1,
            system=AUDIT_SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        )

        return json.loads(response.content[0].text)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid audit result format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error auditing contract: {str(e)}")