from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
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

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

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
TEMPLATE_SYSTEM_PROMPT = """Generate a production-ready Solidity smart contract (^0.8.0) with:
1. KYC/AML checks
2. Transaction limits
3. Jurisdiction compliance
4. Asset transfer logic
5. Emergency pause
6. Event logging
7. Access control
8. Input validation

Include:
- SPDX-License-Identifier: MIT
- OpenZeppelin standards
- Error handling
- Role-based access
- Circuit breaker
- Compliance checks
- Event emissions

Return only contract code."""

AUDIT_SYSTEM_PROMPT = """Analyze the smart contract for:
1. Security (OWASP Top 10)
2. Gas optimization
3. Business logic
4. Regulatory compliance
5. Code quality
6. Access control
7. Event logging
8. Input validation

Return JSON with:
{
    "summary": {
        "overallHealth": 0-100,
        "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
        "mainFindings": "string"
    },
    "securityAnalysis": {
        "score": 0-100,
        "findings": [{
            "severity": "LOW|MEDIUM|HIGH|CRITICAL",
            "category": "string",
            "title": "string",
            "description": "string",
            "recommendation": "string"
        }]
    },
    "complianceAnalysis": {
        "score": 0-100,
        "jurisdictionCompliance": "YES|NO",
        "findings": [{
            "requirement": "string",
            "status": "COMPLIANT|NON-COMPLIANT|PARTIAL",
            "details": "string",
            "recommendation": "string"
        }]
    }
}"""

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

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": TEMPLATE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,
        )

        return {"contractCode": response.choices[0].message.content}

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

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": AUDIT_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.1,
        )

        return json.loads(response.choices[0].message.content)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid audit result format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error auditing contract: {str(e)}")