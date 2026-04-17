import { defineComponent, h, reactive, ref, watch, type PropType } from "vue";
import {
  parseSchema,
  getDefaultValues,
  removeEmptyValues,
  type SchemaProvider,
} from "@autoform/core";
import type {
  AutoFormUIComponents,
  AutoFormFieldComponents,
} from "./types";
import { provideAutoForm } from "./context";
import { AutoFormField } from "./AutoFormField";
import { getPathInObject, setPathInObject } from "./utils";

export const AutoForm = defineComponent({
  name: "AutoForm",
  props: {
    schema: {
      type: Object as PropType<SchemaProvider>,
      required: true,
    },
    defaultValues: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    values: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    uiComponents: {
      type: Object as PropType<AutoFormUIComponents>,
      required: true,
    },
    formComponents: {
      type: Object as PropType<AutoFormFieldComponents>,
      required: true,
    },
    withSubmit: {
      type: Boolean,
      default: false,
    },
    formProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  emits: ["submit", "formInit"],
  setup(props, { emit, slots, expose }) {
    const parsedSchema = parseSchema(props.schema);

    const formValues = reactive<Record<string, any>>({
      ...getDefaultValues(props.schema),
      ...props.defaultValues,
    });

    const errors = ref<Record<string, string>>({});
    const isSubmitting = ref(false);

    // Sync external values
    if (props.values) {
      watch(
        () => props.values,
        (newValues) => {
          if (newValues) {
            Object.assign(formValues, newValues);
          }
        },
        { deep: true }
      );
    }

    function setFieldValue(path: string, value: any) {
      setPathInObject(formValues, path.split("."), value);
    }

    function getFieldValue(path: string): any {
      return getPathInObject(formValues, path.split("."));
    }

    function getFieldError(path: string): string | undefined {
      return errors.value[path];
    }

    function clearErrors() {
      errors.value = {};
    }

    function reset() {
      Object.keys(formValues).forEach((key) => delete formValues[key]);
      Object.assign(formValues, {
        ...getDefaultValues(props.schema),
        ...props.defaultValues,
      });
      clearErrors();
    }

    async function handleSubmit() {
      isSubmitting.value = true;
      clearErrors();

      try {
        const data = removeEmptyValues(formValues);
        const validationResult = props.schema.validateSchema(data);

        if (validationResult.success) {
          await emit("submit", validationResult.data);
        } else {
          validationResult.errors?.forEach((error) => {
            const path = error.path.join(".");
            errors.value[path] = error.message;

            // Handle zod's duplicate path issue
            const correctedPath = error.path?.slice?.(0, -1);
            if (correctedPath?.length > 0) {
              errors.value[correctedPath.join(".")] = error.message;
            }
          });
        }
      } finally {
        isSubmitting.value = false;
      }
    }

    // Provide context to child components
    provideAutoForm({
      schema: parsedSchema,
      uiComponents: props.uiComponents,
      formComponents: props.formComponents,
      values: formValues,
      errors: errors.value,
      setFieldValue,
      getFieldValue,
      getFieldError,
    });

    // Expose form controls
    expose({ values: formValues, errors, isSubmitting, reset, clearErrors });

    // Emit form init
    emit("formInit", { values: formValues, errors, isSubmitting, reset, clearErrors });

    return () => {
      const FormComponent = props.uiComponents.Form;
      const SubmitButton = props.uiComponents.SubmitButton;

      return h(
        FormComponent,
        {
          onSubmit: (e: Event) => {
            e.preventDefault();
            handleSubmit();
          },
          ...props.formProps,
        },
        {
          default: () => [
            ...parsedSchema.fields.map((field) =>
              h(AutoFormField, {
                key: field.key,
                field,
                path: [field.key],
              })
            ),
            props.withSubmit
              ? h(SubmitButton, null, {
                  default: () => "Submit",
                })
              : null,
            slots.default?.(),
          ],
        }
      );
    };
  },
});
