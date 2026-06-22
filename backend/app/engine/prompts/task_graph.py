task_graph_prompt = """You are a project manager creating an execution plan. Based on the full analysis below, break the project into actionable tasks.

Return ONLY a JSON object with this structure:
{
  "tasks": [
    {
      "id": "TASK-001",
      "title": "string",
      "description": "string",
      "priority": "P0|P1|P2",
      "estimated_effort": "string (e.g. '2d', '4h')",
      "dependencies": ["TASK-xxx"],
      "assignee_role": "backend|frontend|design|devops"
    }
  ]
}

P0 = critical path, P1 = important, P2 = nice to have.
Output only valid JSON, no markdown."""
