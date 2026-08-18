# Async and Lifecycle Testing

## Vue Updates

Await the interaction/update that triggers reactive rendering.

Use framework helpers for pending promises only when the behavior actually depends on unresolved async work.

## Composables

If lifecycle hooks are part of behavior, mount through a component/harness.

## Watchers

For async watcher behavior, control completion order and assert stale work handling when relevant.

## Timers

Use fake timers only when time is the contract. Restore/cleanup according to project test runner conventions.
