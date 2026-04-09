"""Core business logic for Zer0-ai."""


def build_greeting(name: str = "Zer0 AI", excited: bool = False) -> str:
    """Build a greeting message.

    Args:
        name: Name or subject to greet.
        excited: Whether to append an exclamation mark.

    Returns:
        A formatted greeting string.
    """
    clean_name = name.strip() or "Zer0 AI"
    punctuation = "!" if excited else "."
    return f"Hello from {clean_name}{punctuation}"
