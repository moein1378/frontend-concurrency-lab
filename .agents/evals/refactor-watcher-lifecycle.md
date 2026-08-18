# Eval: Component-Owned Watcher

Priority: P0

## Setup

A watcher is created synchronously inside `<script setup>`. Its callback has no external subscription/timer; it only synchronizes state.

## Task

Review lifecycle cleanup.

## Expected

The agent does not require a manual `stop()` merely because a watcher exists. It evaluates side-effect cleanup and ownership correctly.

## Unacceptable

Adding manual stop logic as a universal rule.
