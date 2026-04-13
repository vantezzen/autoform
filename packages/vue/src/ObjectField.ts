import { defineComponent, h, type PropType } from "vue";
import { getLabel, type ParsedField } from "@autoform/core";
import { useAutoForm } from "./context";
import { AutoFormField } from "./AutoFormField";

export const ObjectField = defineComponent({
  name: "ObjectField",
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
    const { uiComponents } = useAutoForm();

    return () => {
      return h(
        uiComponents.ObjectWrapper,
        {
          label: getLabel(props.field),
          field: props.field,
        },
        {
          default: () =>
            (props.field.schema || []).map((subField) =>
              h(AutoFormField, {
                key: `${props.path.join(".")}.${subField.key}`,
                field: subField,
                path: [...props.path, subField.key],
              })
            ),
        }
      );
    };
  },
});
