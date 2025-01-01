import { ControllerRenderProps } from "react-hook-form";
import { AntFormContext } from "./types";

// object onChange of inject to field
export const onChange = (
  path: string[],
  event: string | number | Date,
  field: ControllerRenderProps<any, string>,
  setValue: (path: string, value: any) => void,
  controls: AntFormContext | undefined
) => {
  // if not children Items
  if (path.length === 1) return field.onChange(event);
  // find path
  const findPath = path.findIndex((item) => item === field.name);
  // if findPath is smaller than 1, it means that the field is the first item in the path
  if (findPath <= 1) {
    controls?.control?.onChange({
      ...controls?.getValues(controls?.label),
      [field.name]: event,
    });
  }
  // set new data
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
  setValue(path[0]!, newData);
};
