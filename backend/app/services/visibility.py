from typing import List


class VisibilityService:
    def compute(self, tasks: List[dict]) -> dict:
        done = [t for t in tasks if t.get("status") == "done"]
        blocked = [t for t in tasks if t.get("status") == "blocked"]
        pending = [t for t in tasks if t.get("status") in ("pending", "in_progress")]

        return {
            "done_count": len(done),
            "blocked_count": len(blocked),
            "pending_count": len(pending),
            "done": [t["title"] for t in done],
            "blocked": [t["title"] for t in blocked],
            "pending_clarification": [t["title"] for t in pending],
        }
