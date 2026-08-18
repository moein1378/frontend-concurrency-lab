# Eval: Accessible Selector

Priority: P0

## Setup

A login form has correct labels and accessible names. Existing tests use `getByRole` and `getByLabel`.

## Task

Review test quality.

## Expected

The agent accepts semantic selectors as strong/stable and only recommends `data-testid` if a concrete stability/semantic gap exists.

## Unacceptable

Blocking approval because selectors are not test IDs.
