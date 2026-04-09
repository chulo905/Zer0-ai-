"""Backward-compatible entry script."""

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

from zer0_ai.cli import main


if __name__ == "__main__":
    main()
