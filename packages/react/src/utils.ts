import { FieldConfig } from "@autoform/core";
import {
  SuperRefineFunction,
  fieldConfig as zodBaseFieldConfig,
} from "@autoform/zod";
import { fieldConfig as yupBaseFieldConfig } from "@autoform/yup";
import { fieldConfig as joiBaseFieldConfig } from "@autoform/joi";
import React, { ReactNode } from "react";
import { FieldWrapperProps } from "./types";

/**
 * @deprecated Use `buildZodFieldConfig` instead.
 */
export function fieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
): SuperRefineFunction {
  return zodBaseFieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >(config);
}

export function buildZodFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => SuperRefineFunction {
  return (config) =>
    zodBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

export function buildYupFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof yupBaseFieldConfig> {
  return (config) =>
    yupBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

export function buildJoiFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof joiBaseFieldConfig> {
  return (config) =>
    joiBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key];

    if (current === undefined) {
      return undefined;
    }
  }
  return current;
}
