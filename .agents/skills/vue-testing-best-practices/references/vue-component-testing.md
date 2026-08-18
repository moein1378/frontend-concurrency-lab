# Vue Component Testing

Test components as black boxes around public behavior.

Prefer:
- props in
- rendered accessible state
- user interaction
- emits/navigation/side effects out

Use shallow/stubs only when a child is an irrelevant expensive boundary. Avoid stubbing away the behavior under test.

For Teleport/Suspense/async components, choose a harness/environment that preserves the relevant framework behavior rather than asserting private component internals.

Snapshots can support review but should not be the sole assertion for meaningful behavior.
