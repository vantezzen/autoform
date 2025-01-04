import { ControllerRenderProps } from "react-hook-form";
import { AntFormContext } from "./types";

// object onChange of inject to field
export const onChange = ({
  path,
  event,
  field,
  setValue,
  controls,
  type,
}: {
  path: string[];
  event: string | number | Date | boolean | null;
  field: ControllerRenderProps<any, string>;
  setValue: (path: string, value: any) => void;
  controls: AntFormContext | undefined;
  type: "select" | "input" | "date" | "boolean" | "number";
}) => {
  // if not children Items
  if (path.length === 1) {
    if (type === "select" || type === "number") return field.onChange(event);
    else return setValue(path[0]!, event);
  }
  // find path
  const findPath = path.findIndex((item) => item === field.name);
  // if not children Items
  if (findPath <= 1) {
    return controls?.control?.onChange({
      ...controls?.getValues(controls?.label),
      [field.name]: event,
    });
  }
  // set new data, if children Items
  const newData = controls?.getValues(path[0]);
  let changedData = newData;
  // change path of items
  path.slice(1).forEach((item) => {
    if (item !== field.name) {
      changedData = changedData[item];
    } else {
      // change newData
      changedData[item] = event;
    }
  });
};
