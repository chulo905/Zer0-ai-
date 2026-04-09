# Zer0-ai

A small, production-ready Python starter project for Zer0-ai.

## What this project includes

- A reusable Python package (`zer0_ai`) using a `src/` layout.
- A command-line interface with useful options.
- Unit tests with `pytest`.
- Basic project tooling configuration (`pyproject.toml`, lint/test settings).
- Legacy script compatibility via `hello.py`.

## Project structure

```text
.
├── hello.py
├── pyproject.toml
├── README.md
├── src/
│   └── zer0_ai/
│       ├── __init__.py
│       ├── cli.py
│       └── core.py
└── tests/
    └── test_core.py
```

## Quick start

### 1) Create a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2) Install in editable mode

```bash
pip install -e .[dev]
```

### 3) Run the CLI

```bash
zer0-ai
zer0-ai --name "Team"
zer0-ai --excited
```

## Development

### Run tests

```bash
pytest
```

### Run via Python module

```bash
PYTHONPATH=src python -m zer0_ai.cli --name "Developer"
```

### Legacy compatibility script

```bash
python hello.py
```

## Future recommended additions

- CI workflow (GitHub Actions) for lint + tests.
- Type-checking with `mypy` for stricter correctness.
- Packaging/release automation.
- Optional API layer (FastAPI) if this evolves into a service.
