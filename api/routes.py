async def generate_files_with_gpt4(prompt: str) -> dict:
    client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    system_prompt = (
        "You are an expert full-stack developer. Given a user prompt, automatically generate all necessary files for a minimal but realistic e-commerce website. "
        "The output should be a set of code files that can be immediately displayed and edited in a frontend code editor. "
        "Include all essential files: index.html (with links to style.css and main.js), style.css (excellent styling), main.js (product listing, cart logic, fetches from /api/products), api.py (FastAPI backend with /api/products endpoint, using Supabase for product data), and supabase_setup.sql (SQL for Supabase products table and some sample data). "
        "If the website includes payment functionality, use Pinelabs as the default payment gateway. Always implement the payment flow using the following Pinelabs API steps: "
        "1. Generate Token: POST https://pluraluat.v2.pinepg.in/api/auth/v1/token with client_id, client_secret, and grant_type. "
        "2. Create Order: POST https://pluraluat.v2.pinepg.in/api/pay/v1/orders with order, customer, and amount details. "
        "3. Create Payment: POST https://pluraluat.v2.pinepg.in/api/pay/v1/orders/{orderId}/payments with payment method and payment option details. "
        "4. Fetch Order: GET https://pluraluat.v2.pinepg.in/api/pay/v1/orders/{orderId} to check payment status. "
        "5. (Optional) Capture Payment: PUT https://pluraluat.v2.pinepg.in/api/pay/v1/orders/{orderId}/capture for post-auth flows. "
        "Use Bearer tokens for authentication in all requests. Follow the request and response JSON schemas as per the Pinelabs API documentation. "
        "Add all necessary frontend and backend code to support Pinelabs integration. Do not use any other payment gateway. "
        "Always generate an admin dashboard as part of the project. The admin dashboard must allow management of all products, view and edit users, and track all payments made through the site (including Pinelabs payments). The dashboard UI and backend must be fully aligned with the generated codebase and database schema, and must be accessible only to authenticated admin users. "
        "For the frontend, always use the latest stable versions of all JavaScript libraries and frameworks (such as React, Vue, Bootstrap, etc.) by referencing their official CDN links or npm package versions. Prefer CDN links for index.html. Do not use deprecated or outdated libraries. "
        "Respond with each file as:\n--- filename ---\n<code>\n--- end ---\n. Do not include explanations or extra text."
    )
    user_prompt = f"Prompt: {prompt}"
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=2048,
        temperature=0.5
    )
    content = response.choices[0].message.content
    import re
    files = {filename.strip(): code.strip() for filename, code in re.findall(r"--- ([^\s]+) ---\n([\s\S]*?)--- end ---", content)}
    return files
