import { defineComponent, h, type PropType } from "vue";
import { getLabel, type ParsedField } from "@autoform/core";
import { useAutoForm } from "./context";
import { ObjectField } from "./ObjectField";
import { ArrayField } from "./ArrayField";
import { getPathInObject } from "./utils";

export const AutoFormField = defineComponent({
  name: "AutoFormField",
  props: {
    field: {
      type: Object as PropType<ParsedField>,
      required: true,
    },
    path: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const { formComponents, uiComponents, values, errors, setFieldValue } =
      useAutoForm();

    return () => {
      const fullPath = props.path.join(".");
      const error =
        getPathInObject(errors, props.path.join(".").split(".")) ??
        errors[fullPath as keyof typeof errors];
      const value = getPathInObject(values, props.path);
      const label = getLabel(props.field);

      // Compute description, avoiding duplicate when it matches the label
      const rawDescription =
        props.field.fieldConfig?.description ?? props.field.description;
      const description =
        typeof rawDescription === "string" && rawDescription !== label
          ? rawDescription
          : undefined;

      const FieldWrapper =
        props.field.fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

      let FieldComponent: any;

      if (props.field.type === "array") {
        FieldComponent = ArrayField;
      } else if (props.field.type === "object") {
        FieldComponent = ObjectField;
      } else if (props.field.type in formComponents) {
        FieldComponent = formComponents[props.field.type]!;
      } else if ("fallback" in formComponents) {
        FieldComponent = formComponents.fallback;
      } else {
        return h(uiComponents.ErrorMessage, {
          error: `[AutoForm] No component found for type "${props.field.type}"`,
        });
      }

      return h(
        FieldWrapper,
        {
          label,
          description,
          error: typeof error === "string" ? error : undefined,
          id: fullPath,
          field: props.field,
        },
        {
          default: () =>
            h(FieldComponent, {
              label,
              field: props.field,
              value,
              error: typeof error === "string" ? error : undefined,
              id: fullPath,
              path: props.path,
              inputProps: {
                required: props.field.required,
                ...props.field.fieldConfig?.inputProps,
                modelValue: value,
                "onUpdate:modelValue": (newValue: any) => {
                  setFieldValue(fullPath, newValue);
                },
              },
            }),
        }
      );
    };
  },
});
