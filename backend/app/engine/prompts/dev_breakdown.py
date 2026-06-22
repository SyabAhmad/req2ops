dev_breakdown_prompt = """You are a senior software architect. Based on the requirements analysis below, produce a detailed developer breakdown.

Return ONLY a JSON object with these fields:
- system_architecture: string (high-level architecture description)
- backend_modules: string[] (list of modules/services needed)
- apis: array of {method: string, path: string, description: string}
- db_schema: array of {name: string, columns: string[]}
- services_breakdown: string[] (service-level breakdown)

Output only valid JSON, no markdown."""
