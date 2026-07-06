// Docs-only shim.
// Demo source files import AutoForm from here so they compile unchanged
// in the docs app. In a user's installed project this path resolves to
// the real @autoform/shadcn AutoForm component, no difference to the
// installed code.
export { AutoForm } from "./autoform/react-hook-form";
export type { ExtendableAutoFormProps } from "@autoform/react";
