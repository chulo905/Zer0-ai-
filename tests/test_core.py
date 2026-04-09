from zer0_ai.core import build_greeting


def test_build_greeting_default() -> None:
    assert build_greeting() == "Hello from Zer0 AI."


def test_build_greeting_custom_name() -> None:
    assert build_greeting(name="Team") == "Hello from Team."


def test_build_greeting_excited() -> None:
    assert build_greeting(name="Team", excited=True) == "Hello from Team!"


def test_build_greeting_blank_name_falls_back_to_default() -> None:
    assert build_greeting(name="   ") == "Hello from Zer0 AI."
