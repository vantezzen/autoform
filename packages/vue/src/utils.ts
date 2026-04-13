import type { Component, VNode } from "vue";
import type { FieldConfig } from "@autoform/core";
import type { FieldWrapperProps } from "./types";

export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}

export function setPathInObject(obj: any, path: string[], value: any): void {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!;
    if (current[key] === undefined || current[key] === null) {
      current[key] = isNaN(Number(path[i + 1])) ? {} : [];
    }
    current = current[key];
  }
  current[path[path.length - 1]!] = value;
}

// Build field config helpers for schema providers
export function buildZodFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>() {
  return (
    config: FieldConfig<VNode, FieldTypes, Component, CustomData>
  ) => {
    // Lazy import to avoid requiring zod as dependency
    try {
      const { fieldConfig: zodFieldConfig } = require("@autoform/zod");
      return zodFieldConfig<VNode, FieldTypes, Component, CustomData>(config);
    } catch {
      throw new Error(
        "buildZodFieldConfig requires @autoform/zod to be installed"
      );
    }
  };
}

export function buildYupFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>() {
  return (
    config: FieldConfig<VNode, FieldTypes, Component, CustomData>
  ) => {
    try {
      const { fieldConfig: yupFieldConfig } = require("@autoform/yup");
      return yupFieldConfig<VNode, FieldTypes, Component, CustomData>(config);
    } catch {
      throw new Error(
        "buildYupFieldConfig requires @autoform/yup to be installed"
      );
    }
  };
}
