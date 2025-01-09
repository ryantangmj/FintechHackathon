from dotenv import load_dotenv
import anthropic
import os
import json

def test_claude_api():
    # Load environment variables
    load_dotenv()
    
    # Initialize Claude client
    client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    # Test prompt
    system_prompt = """Generate a basic Solidity function."""
    
    user_prompt = """Create a simple transfer function."""
    
    try:
        print("🚀 Testing Claude API directly...")
        print("\nSending request with minimal prompt...")
        
        message = client.messages.create(
            model="claude-3-haiku-20240307",  # or your specific model version
            max_tokens=1500,
            temperature=0.2,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        )
        
        # Print results
        print("\n✅ API call successful")
        print("\nResponse:")
        print(message.content[0].text)
        
        # Print token usage
        print("\nToken Usage:")
        print(f"Input tokens: {message.usage.input_tokens}")
        print(f"Output tokens: {message.usage.output_tokens}")
        
    except anthropic.APIError as e:
        print(f"\n❌ API Error: {str(e)}")
    except anthropic.APIConnectionError as e:
        print(f"\n❌ Connection Error: {str(e)}")
    except anthropic.RateLimitError as e:
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
            client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
            message = client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=150,
                temperature=0.2,
                system=prompt["system"],
                messages=[
                    {
                        "role": "user",
                        "content": prompt["user"]
                    }
                ]
            )
            
            print("\n✅ Success")
            print(f"Total tokens used: {message.usage.input_tokens + message.usage.output_tokens}")
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
        
        print("-" * 40)

if __name__ == "__main__":
    print("Choose test to run:")
    print("1. Basic API test")
    print("2. Multiple prompt length test")
    
    choice = input("\nEnter 1 or 2: ")
    
    if choice == "1":
        test_claude_api()
    elif choice == "2":
        test_with_different_prompts()
    else:
        print("Invalid choice. Please enter 1 or 2.")