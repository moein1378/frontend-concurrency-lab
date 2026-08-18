# Failure and Escalation Protocol

## Continue Automatically When

- an optional tool is absent but an equivalent verified path exists
- a non-authoritative cache is stale and source files can be read
- a narrow check is unavailable but another check proves the same property

## Stop or Downgrade the Claim When

- the source of truth cannot be accessed and no equivalent evidence exists
- implementation would require inventing a business rule, API, route, design state, or token
- a required quality gate cannot be run
- a change would cross a public contract the user did not authorize
- visual “pixel-perfect” parity cannot be measured because neither the design reference nor render evidence is available

## Never

- weaken assertions to make a failing test pass when the product is wrong
- replace exact design data with a visually “close” token without documenting the deviation
- assume a browser test passed because unit tests passed
- claim a stale context file is current without comparing its fingerprint
