import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import ModeTab from "@/components/landing/tabs/mode-tabs";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import {
  AutoFormFieldPropsTable,
  AutoFormPropsTable,
  AutoFormUIComponentsTable,
  AutoTypeTableWithGenerator,
} from "@/components/auto-type-tables";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    AutoTypeTable: AutoTypeTableWithGenerator,
    AutoFormFieldPropsTable,
    AutoFormPropsTable,
    AutoFormUIComponentsTable,
    ...components,
    ModeTab,
  };
}
