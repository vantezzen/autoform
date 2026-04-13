import { defineComponent, h, type PropType } from "vue";
import { getLabel, type ParsedField } from "@autoform/core";
import { useAutoForm } from "./context";
import { AutoFormField } from "./AutoFormField";
import { getPathInObject, setPathInObject } from "./utils";

export const ArrayField = defineComponent({
  name: "ArrayField",
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
    const { uiComponents, values } = useAutoForm();

    function getArrayValue(): any[] {
      const val = getPathInObject(values, props.path);
      return Array.isArray(val) ? val : [];
    }

    function addItem() {
      const subFieldType = props.field.schema?.[0]?.type;
      let defaultValue: any;
      if (subFieldType === "object") {
        defaultValue = {};
      } else if (subFieldType === "array") {
        defaultValue = [];
      } else {
        defaultValue = null;
      }

      const current = getArrayValue();
      setPathInObject(values, props.path, [...current, defaultValue]);
    }

    function removeItem(index: number) {
      const current = getArrayValue();
      current.splice(index, 1);
      setPathInObject(values, props.path, [...current]);
    }

    return () => {
      const items = getArrayValue();

      return h(
        uiComponents.ArrayWrapper,
        {
          label: getLabel(props.field),
          field: props.field,
          onAddItem: addItem,
        },
        {
          default: () =>
            items.map((_, index) =>
              h(
                uiComponents.ArrayElementWrapper,
                {
                  key: index,
                  index,
                  onRemove: () => removeItem(index),
                },
                {
                  default: () =>
                    h(AutoFormField, {
                      field: props.field.schema![0]!,
                      path: [...props.path, index.toString()],
                    }),
                }
              )
            ),
        }
      );
    };
  },
});
