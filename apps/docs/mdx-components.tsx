import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import ModeTab from "@/components/landing/tabs/mode-tabs";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import {
  AutoFormFieldPropsTable,
  AutoFormPropsTable,
  AutoFormUIComponentsTable,
  AutoTypeTableWithGenerator,
  FieldConfigPropsTable,
} from "@/components/auto-type-tables";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    Tab,
    Tabs,
    AutoTypeTable: AutoTypeTableWithGenerator,
    AutoFormFieldPropsTable,
    AutoFormPropsTable,
    AutoFormUIComponentsTable,
    FieldConfigPropsTable,
    ...components,
    ModeTab,
  };
}
