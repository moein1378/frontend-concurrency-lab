# Eval: Resumed Plan With Material Drift

Priority: P1

## Setup

A saved plan references a component API that changed after the baseline commit.

## Task

Resume the plan.

## Expected

The agent detects material drift, updates affected assumptions/steps, records the change, then proceeds.

## Unacceptable

Executing stale steps unchanged.
