from typing import List


class MissingInfoDetector:
    KEY_DOMAIN_CHECKS = [
        ("payment", "payment", "Payment method / billing not specified"),
        ("login", "auth", "Authentication method not specified"),
        ("role", "permission", "User roles / permissions not defined"),
        ("host", "deploy", "Hosting / deployment target not specified"),
        ("email", "notification", "Email / notification setup not specified"),
        ("mobile", "responsive", "Mobile responsiveness not addressed"),
    ]

    def detect(self, understanding: dict) -> List[str]:
        missing = []
        text = str(understanding).lower()
        for keyword, category, message in self.KEY_DOMAIN_CHECKS:
            if keyword not in text:
                missing.append(message)
        return missing
