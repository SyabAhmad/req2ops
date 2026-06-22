from typing import List


class NextActionEngine:
    def generate(self, missing_info: List[str], risks: List[dict]) -> List[dict]:
        actions = []
        for item in missing_info:
            actions.append({
                "action": f"Ask client to clarify: {item}",
                "owner": "project_manager",
                "reason": f"Missing information — {item}",
            })
        if not actions:
            actions.append({
                "action": "Review execution plan with team",
                "owner": "tech_lead",
                "reason": "All info gathered, ready to proceed",
            })
        return actions
