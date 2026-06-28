import {
  createFileSystemGeneratorCache,
  createGenerator,
} from "fumadocs-typescript";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { TypeTable, type TypeNode } from "fumadocs-ui/components/type-table";
import { ExtendedTypeTable } from "@/components/extended-type-table";
import {
  UIComponentsTypeTable,
  type UIComponentEntry,
} from "@/components/ui-components-table";

const generator = createGenerator({
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

async function createTypeTableData(
  path: string,
  name: string,
): Promise<Record<string, TypeNode>> {
  const [doc] = await generator.generateTypeTable({ path, name });

  return Object.fromEntries(
    doc.entries.map((entry) => {
      const defaultTag = entry.tags.find((tag) => tag.name === "default");
      const defaultValue = defaultTag ? (
        <code>{defaultTag.text}</code>
      ) : undefined;

      return [
        entry.name,
        {
          type: <code>{entry.simplifiedType}</code>,
          typeDescription: <code>{entry.type}</code>,
          typeDescriptionLink: entry.typeHref,
          description: entry.description,
          required: entry.required,
          default: defaultValue,
          deprecated: entry.deprecated,
        } satisfies TypeNode,
      ];
    }),
  );
}

function withNestedDescriptionTable(
  node: TypeNode,
  description: string,
  tableId: string,
  type: Record<string, TypeNode>,
) {
  return {
    ...node,
    description: (
      <>
        {node.description}
        <div className="grid grid-cols-[1fr_3fr] gap-y-2 mt-2 not-prose text-sm">
          <p className="text-fd-muted-foreground">Type</p>
          <div>{node.typeDescription ?? node.type}</div>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-sm text-fd-muted-foreground">{description}</p>
          <TypeTable id={tableId} type={type} />
        </div>
      </>
    ),
    typeDescription: undefined,
  } satisfies TypeNode;
}

export function AutoTypeTableWithGenerator(props: Partial<AutoTypeTableProps>) {
  return <AutoTypeTable {...props} generator={generator} />;
}

export async function AutoFormPropsTable() {
  const autoFormProps = await createTypeTableData(
    "../../packages/react/src/types.ts",
    "AutoFormProps",
  );

  return (
    <ExtendedTypeTable id="type-table-auto-form-props" type={autoFormProps} />
  );
}

export async function AutoFormFieldPropsTable() {
  const [fieldProps, parsedField, fieldConfig] = await Promise.all([
    createTypeTableData(
      "../../packages/react/src/types.ts",
      "AutoFormFieldProps",
    ),
    createTypeTableData("../../packages/core/src/types.ts", "ParsedField"),
    createTypeTableData("../../packages/core/src/types.ts", "FieldConfig"),
  ]);

  if (parsedField.fieldConfig) {
    parsedField.fieldConfig = withNestedDescriptionTable(
      parsedField.fieldConfig,
      "AutoForm-specific configuration available at field.fieldConfig.",
      "type-table-field-config",
      fieldConfig,
    );
  }

  if (fieldProps.parsedField) {
    fieldProps.parsedField = withNestedDescriptionTable(
      fieldProps.parsedField,
      "Parsed schema metadata available on the current field.",
      "type-table-parsed-field",
      parsedField,
    );
  }

  return <TypeTable id="type-table-auto-form-field-props" type={fieldProps} />;
}

const MUI_BASE =
  "https://github.com/adityacodepublic/autoform/tree/tanstack-form-integration/packages/mui/src/components";

export async function AutoFormUIComponentsTable() {
  const [
    fieldWrapperProps,
    arrayWrapperProps,
    arrayElementWrapperProps,
    objectWrapperProps,
    parsedField,
    fieldConfig,
  ] = await Promise.all([
    createTypeTableData(
      "../../packages/react/src/types.ts",
      "FieldWrapperProps",
    ),
    createTypeTableData(
      "../../packages/react/src/types.ts",
      "ArrayWrapperProps",
    ),
    createTypeTableData(
      "../../packages/react/src/types.ts",
      "ArrayElementWrapperProps",
    ),
    createTypeTableData(
      "../../packages/react/src/types.ts",
      "ObjectWrapperProps",
    ),
    createTypeTableData("../../packages/core/src/types.ts", "ParsedField"),
    createTypeTableData("../../packages/core/src/types.ts", "FieldConfig"),
  ]);

  // For FieldWrapper, ArrayWrapper, ObjectWrapper. Nest ParsedField > FieldConfig
  // under their `parsedField` prop, each with unique table IDs to avoid duplicate keys.
  const componentIds = ["field-wrapper", "array-wrapper", "object-wrapper"];
  const propsWithField = [
    fieldWrapperProps,
    arrayWrapperProps,
    objectWrapperProps,
  ];

  for (let i = 0; i < propsWithField.length; i++) {
    const props = propsWithField[i];
    const prefix = componentIds[i];

    if (props.parsedField) {
      const nestedParsedField = { ...parsedField };
      if (nestedParsedField.fieldConfig) {
        nestedParsedField.fieldConfig = withNestedDescriptionTable(
          nestedParsedField.fieldConfig,
          "AutoForm-specific configuration available at field.fieldConfig.",
          `type-table-ui-${prefix}-field-config`,
          fieldConfig,
        );
      }
      props.parsedField = withNestedDescriptionTable(
        props.parsedField,
        "Parsed schema metadata available on the current field.",
        `type-table-ui-${prefix}-parsed-field`,
        nestedParsedField,
      );
    }
  }

  function propsTable(tableId: string, data: Record<string, TypeNode>) {
    return <TypeTable key={tableId} id={tableId} type={data} />;
  }

  const entries: UIComponentEntry[] = [
    {
      name: "Form",
      purpose: "Root form element.",
      exampleLabel: "MUI Form",
      exampleHref: `${MUI_BASE}/Form.tsx`,
      type: <code>{'React.ComponentType<React.ComponentProps<"form">>'}</code>,
    },
    {
      name: "FieldWrapper",
      purpose: "Label, error, description, and field layout.",
      exampleLabel: "MUI FieldWrapper",
      exampleHref: `${MUI_BASE}/FieldWrapper.tsx`,
      type: <code>React.ComponentType&lt;FieldWrapperProps&gt;</code>,
      propsContent: propsTable(
        "type-table-ui-field-wrapper-props",
        fieldWrapperProps,
      ),
    },
    {
      name: "ErrorMessage",
      purpose: "Configuration error display.",
      exampleLabel: "MUI ErrorMessage",
      exampleHref: `${MUI_BASE}/ErrorMessage.tsx`,
      type: <code>{"React.ComponentType<{ error: string }>"}</code>,
    },
    {
      name: "SubmitButton",
      purpose: "Default submit button for withSubmit.",
      exampleLabel: "MUI SubmitButton",
      exampleHref: `${MUI_BASE}/SubmitButton.tsx`,
      type: <code>{"React.ComponentType<{ children: ReactNode }>"}</code>,
    },
    {
      name: "ObjectWrapper",
      purpose: "Nested object field layout.",
      exampleLabel: "MUI ObjectWrapper",
      exampleHref: `${MUI_BASE}/ObjectWrapper.tsx`,
      type: <code>React.ComponentType&lt;ObjectWrapperProps&gt;</code>,
      propsContent: propsTable(
        "type-table-ui-object-wrapper-props",
        objectWrapperProps,
      ),
    },
    {
      name: "ArrayWrapper",
      purpose: "Array field layout and add-item control.",
      exampleLabel: "MUI ArrayWrapper",
      exampleHref: `${MUI_BASE}/ArrayWrapper.tsx`,
      type: <code>React.ComponentType&lt;ArrayWrapperProps&gt;</code>,
      propsContent: propsTable(
        "type-table-ui-array-wrapper-props",
        arrayWrapperProps,
      ),
    },
    {
      name: "ArrayElementWrapper",
      purpose: "One array item and remove-item control.",
      exampleLabel: "MUI ArrayElementWrapper",
      exampleHref: `${MUI_BASE}/ArrayElementWrapper.tsx`,
      type: <code>React.ComponentType&lt;ArrayElementWrapperProps&gt;</code>,
      propsContent: propsTable(
        "type-table-ui-array-element-wrapper-props",
        arrayElementWrapperProps,
      ),
    },
  ];

  return (
    <UIComponentsTypeTable id="type-table-ui-components" entries={entries} />
  );
}
