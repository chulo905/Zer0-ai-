"""Command-line interface for Zer0-ai."""

from __future__ import annotations

import argparse

from zer0_ai.core import build_greeting


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Print a Zer0-ai greeting.")
    parser.add_argument(
        "--name",
        default="Zer0 AI",
        help="Name to greet (default: Zer0 AI)",
    )
    parser.add_argument(
        "--excited",
        action="store_true",
        help="Add an exclamation mark.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    print(build_greeting(name=args.name, excited=args.excited))


if __name__ == "__main__":
    main()
