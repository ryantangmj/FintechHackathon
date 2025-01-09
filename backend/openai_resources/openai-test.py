from dotenv import load_dotenv
import openai
import os
import json

def test_openai_api():
    # Load environment variables
    load_dotenv()
    
    # Initialize OpenAI client
    client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    # Test prompt
    system_prompt = """Generate a basic Solidity function."""
    
    user_prompt = """Create a simple transfer function."""
    
    try:
        print("🚀 Testing OpenAI API directly...")
        print("\nSending request with minimal prompt...")
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or your specific model
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
            max_tokens=1500  # Limiting response size
        )
        
        # Print results
        print("\n✅ API call successful")
        print("\nResponse:")
        print(response.choices[0].message.content)
        
        # Print token usage
        print("\nToken Usage:")
        print(f"Prompt tokens: {response.usage.prompt_tokens}")
        print(f"Completion tokens: {response.usage.completion_tokens}")
        print(f"Total tokens: {response.usage.total_tokens}")
        
    except openai.APIError as e:
        print(f"\n❌ API Error: {str(e)}")
    except openai.APIConnectionError as e:
        print(f"\n❌ Connection Error: {str(e)}")
    except openai.RateLimitError as e:
        print(f"\n❌ Rate Limit Error: {str(e)}")
    except Exception as e:
        print(f"\n❌ Unexpected Error: {str(e)}")

def test_with_different_prompts():
    """Test different prompt lengths to find optimal size"""
    prompts = [
        # Very minimal
        {
            "system": "Generate code.",
            "user": "Basic function."
        },
        # Short
        {
            "system": "Generate Solidity code with basic validation.",
            "user": "Create a transfer function with input checks."
        },
        # Medium
        {
            "system": """Generate Solidity code:
- Basic validation
- Error handling
- Events""",
            "user": """Create a transfer function:
- Check amount
- Validate address
- Emit event"""
        }
    ]
    
    for i, prompt in enumerate(prompts):
        print(f"\n\nTesting Prompt Set {i + 1}")
        print("=" * 40)
        print(f"System prompt length: {len(prompt['system'])}")
        print(f"User prompt length: {len(prompt['user'])}")
        
        try:
            client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": prompt["system"]},
                    {"role": "user", "content": prompt["user"]}
                ],
                temperature=0.2,
                max_tokens=150
            )
            
            print("\n✅ Success")
            print(f"Total tokens used: {response.usage.total_tokens}")
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
        
        print("-" * 40)

if __name__ == "__main__":
    print("Choose test to run:")
    print("1. Basic API test")
    print("2. Multiple prompt length test")
    
    choice = input("\nEnter 1 or 2: ")
    
    if choice == "1":
        test_openai_api()
    elif choice == "2":
        test_with_different_prompts()
    else:
        print("Invalid choice. Please enter 1 or 2.")