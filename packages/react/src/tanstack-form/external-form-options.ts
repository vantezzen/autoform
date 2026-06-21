import { useIsomorphicLayoutEffect } from "@tanstack/react-form";

type FormOptionsLike = Record<string, any>;
type FormLike = {
  options: FormOptionsLike;
  update: (options?: FormOptionsLike) => void;
  [optionsCoordinatorKey]?: OptionsCoordinator;
};
type OptionsCoordinator = {
  autoFormOptions?: FormOptionsLike;
  effectiveOptions: FormOptionsLike;
  externalOptions: FormOptionsLike;
  originalUpdate: FormLike["update"];
};

const optionsCoordinatorKey = Symbol.for(
  "@acp-autoform/react.tanstackFormOptionsCoordinator.v1",
);

function mergeFormOptions(
  externalOptions: FormOptionsLike,
  autoFormOptions: FormOptionsLike,
): FormOptionsLike {
  const validators =
    externalOptions.validators || autoFormOptions.validators
      ? {
          ...autoFormOptions.validators,
          ...externalOptions.validators,
        }
      : undefined;

  return {
    ...externalOptions,
    ...(validators ? { validators } : {}),
    validationLogic:
      externalOptions.validationLogic ?? autoFormOptions.validationLogic,
    defaultValues: autoFormOptions.defaultValues,
    onSubmit: autoFormOptions.onSubmit,
    onSubmitInvalid:
      externalOptions.onSubmitInvalid ?? autoFormOptions.onSubmitInvalid,
  };
}

function ensureOptionsCoordinator(form: FormLike): OptionsCoordinator {
  const existingCoordinator = form[optionsCoordinatorKey];
  if (existingCoordinator) return existingCoordinator;

  const coordinator: OptionsCoordinator = {
    effectiveOptions: form.options,
    externalOptions: form.options,
    originalUpdate: form.update,
  };

  form[optionsCoordinatorKey] = coordinator;
  // TanStack's React adapter snapshots FormApi properties when extending it.
  // Keep the exposed options and the underlying submit logic on the same value.
  Object.defineProperty(form, "options", {
    configurable: true,
    enumerable: true,
    get: () => coordinator.effectiveOptions,
    set: (options: FormOptionsLike) => {
      coordinator.externalOptions = options;
      applyCoordinatedOptions(coordinator);
    },
  });
  form.update = (options = {}) => {
    coordinator.externalOptions = options;
    applyCoordinatedOptions(coordinator);
  };

  return coordinator;
}

function applyCoordinatedOptions(coordinator: OptionsCoordinator): void {
  coordinator.effectiveOptions = coordinator.autoFormOptions
    ? mergeFormOptions(
        coordinator.externalOptions,
        coordinator.autoFormOptions,
      )
    : coordinator.externalOptions;
  coordinator.originalUpdate(coordinator.effectiveOptions);
}

export function coordinateExternalFormOptions(
  form: FormLike,
  options: FormOptionsLike | undefined,
): void {
  const coordinator = ensureOptionsCoordinator(form);
  coordinator.externalOptions = options ?? {};
}

export function reapplyCoordinatedFormOptions(form: FormLike): void {
  applyCoordinatedOptions(ensureOptionsCoordinator(form));
}

export function useExternalFormOptions(
  form: FormLike | undefined,
  autoFormOptions: FormOptionsLike,
): void {
  useIsomorphicLayoutEffect(() => {
    if (!form) return;

    const coordinator = ensureOptionsCoordinator(form);
    coordinator.autoFormOptions = autoFormOptions;
    applyCoordinatedOptions(coordinator);

    return () => {
      if (coordinator.autoFormOptions !== autoFormOptions) return;

      coordinator.autoFormOptions = undefined;
      applyCoordinatedOptions(coordinator);
    };
  }, [autoFormOptions, form]);
}
