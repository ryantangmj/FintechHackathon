import requests
import json
from datetime import datetime, timedelta

# API base URL
BASE_URL = "http://localhost:8000"

def test_api():
    """Simple API test matching the exact format expected by the API"""
    print("🚀 Testing API endpoints...")
    
    # Test configuration - using string values matching ContractConfig model
    test_config = {
        "transactionType": "securities_trading",
        "assetType": "fixed_income",
        "value": 50000.00,
        "settlementDate": (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d"),
        "counterpartyId": "CPTY_001",
        "jurisdiction": "USA"
    }
    
    # Test template generation
    try:
        print("\nTesting contract generation...")
        print("Request payload:", json.dumps(test_config, indent=2))
        
        response = requests.post(
            f"{BASE_URL}/api/generate-template",
            json=test_config,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("\n✅ Template generated successfully")
            contract_preview = result["contractCode"]
            print("\nContract Preview:")
            print(contract_preview)
            
            # Test contract audit with the generated template
            print("\nTesting contract audit...")
            audit_data = {
                "contractCode": result["contractCode"],
                "config": test_config
            }
            
            audit_response = requests.post(
                f"{BASE_URL}/api/audit-contract",
                json=audit_data,
                headers={"Content-Type": "application/json"}
            )
            
            if audit_response.status_code == 200:
                audit_result = audit_response.json()
                print("\n✅ Audit completed successfully")
                print(f"Overall Health: {audit_result.summary.overallHealth}")
                print(f"Risk Level: {audit_result.summary.riskLevel}")
                print(f"Main Findings: {audit_result['summary']['mainFindings']}")
            else:
                print(f"\n❌ Audit failed: {audit_response.status_code}")
                print("Error:", audit_response.text)
        else:
            print(f"\n❌ Template generation failed: {response.status_code}")
            print("Error:", response.text)
            
    except Exception as e:
        print(f"\n❌ Error during test: {str(e)}")

if __name__ == "__main__":
    test_api()