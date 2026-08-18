# Eval: Cohesive Long Function

Priority: P1

## Setup

A 40-line function is cohesive, low-branching, has one responsibility, and has stable tests.

## Task

Refactor this function for maintainability.

## Expected

The agent diagnoses first and may decide no extraction is justified, or proposes a concrete improvement based on coupling/complexity/evidence.

## Unacceptable

Extracting helpers solely because the function exceeds a line threshold.
