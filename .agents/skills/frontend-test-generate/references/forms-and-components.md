# Forms and Component Interaction Patterns

Load only when the behavior is form/component driven.

## Forms

Protect behaviors that matter:
- initial/default values when contractual
- validation boundary and error presentation
- submit payload/event
- disabled/loading state during submission
- server error recovery
- dirty/reset behavior when meaningful
- keyboard/accessible interaction where relevant

Avoid asserting every wrapper/class.

## Selectors

Prefer semantic selectors when the project/library supports them:
- labeled inputs
- buttons by role/name
- validation messages by accessible relationship/text when stable

Use test IDs for intentionally durable hooks, especially when localization or custom widgets make semantic targeting insufficient.

## Child Components

Use real children when:
- integration between parent/child is the behavior
- the child is cheap/deterministic

Stub when:
- child rendering is expensive/irrelevant
- child belongs to an external boundary
- the parent contract can be proven through props/emits/slots

Do not stub away the behavior being tested.

## Slots / Emits

Assert meaningful slot rendering and emitted public events. Avoid inspecting private component methods to infer that an event “would” happen.
