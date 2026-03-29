# TickerSage Integration Architecture

## Purpose
Bind live market-state inspection from TickerSage into the Zer0 stack, using n8n as the automation and routing layer.

## What TickerSage can currently provide in this environment
TickerSage currently exposes a live kline/chart function that can return:
- symbol
- market
- interval
- OHLCV candles
- chart indicators
- overlays

This makes it useful as a **market state source**, not as a broker or execution engine.

## Important constraint
In the current environment, TickerSage is exposed as an internal tool surface. No public REST endpoint, webhook endpoint, auth method, or SDK is visible from here.

That means:
- Zer0 **can reason over TickerSage outputs**
- n8n **can orchestrate around a TickerSage-compatible adapter**
- but n8n cannot be honestly claimed to call TickerSage directly until a public/private API endpoint is exposed or discovered

## Binding model

### Layer 1 — Market state acquisition
TickerSage provides live candles and indicators.

Output should be normalized into a single contract:
- instrument metadata
- candle window
- indicator summary
- structure levels
- alert context

### Layer 2 — Zer0 reasoning layer
Zer0 should not read raw candles only. It should read a normalized market snapshot and score:
- trend
- momentum
- volatility expansion/compression
- volume participation
- structural risk
- invalidation zones
- confidence by timeframe alignment

### Layer 3 — n8n orchestration
n8n should be used to:
- schedule pulls
- route symbols by watchlist
- persist snapshots
- compare current snapshot vs prior snapshot
- trigger downstream summaries/alerts
- log decisions and post-analysis

## Recommended operating pattern

### Mode A — Manual analyst mode
1. Pull a TickerSage chart for a symbol and timeframe.
2. Normalize the output.
3. Feed the snapshot into Zer0.
4. Return:
   - regime
   - likely paths
   - invalidation
   - risk notes
   - what would change the view

### Mode B — Semi-automated watchlist mode
1. n8n cycles through a watchlist.
2. A market adapter fetches TickerSage-equivalent data.
3. Snapshot is normalized.
4. Zer0 scores the snapshot.
5. Only high-change or high-conviction states produce alerts.

### Mode C — Experience memory mode
Store repeated snapshot -> outcome pairs so Zer0 can compare the present regime to prior observed regimes.

This should include:
- symbol
- timeframe
- feature vector summary
- thesis
- invalidation
- realized follow-through after N bars
- post-mortem label

## Suggested insight model
Use a weighted score rather than one-line bullish/bearish output.

### Core score blocks
- Trend strength
- Momentum confirmation
- Volume confirmation
- Range condition vs breakout condition
- Timeframe agreement
- Nearby risk/overhead supply
- Mean-reversion pressure

### Output form
Each snapshot should produce:
- regime: trend / range / breakout watch / breakdown watch / chop
- bias: long / short / neutral / no-trade
- confidence: 0-100
- invalidation
- best next check time
- evidence summary
- contradictions

## What each repo should do

### Zer0-ai-
Own:
- contracts
- scoring logic specs
- prompt format
- memory schema for outcome tracking
- analyst output templates

### n8n
Own:
- scheduling
- routing
- persistence
- notifications
- comparing current state to prior saved states

## Clean implementation path
1. Keep TickerSage as a chart/state source.
2. Introduce a `market_snapshot` normalization layer.
3. Feed normalized snapshots into Zer0 for reasoning.
4. Use n8n to schedule and route.
5. Add an outcome journal so insight becomes experience-backed instead of single-pass commentary.

## What not to do
- Do not let Zer0 reason directly from huge raw candle dumps every time.
- Do not label every setup as actionable.
- Do not claim TickerSage is directly callable by n8n without a real endpoint.
- Do not mix execution logic into the same layer as narrative reasoning.

## Next useful build targets
1. Market snapshot schema
2. Feature extractor
3. Regime classifier
4. Alert threshold rules
5. Outcome journal schema
6. Backfill evaluator

## Minimal real first milestone
A practical first version is:
- manual TickerSage pull
- normalized snapshot object
- Zer0 regime analysis
- stored snapshot + later outcome review

That already gives better insight than raw chart viewing, because it turns live chart state into structured judgment and cumulative experience.
