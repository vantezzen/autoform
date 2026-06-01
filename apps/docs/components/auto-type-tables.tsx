import {
  createFileSystemGeneratorCache,
  createGenerator,
} from "fumadocs-typescript";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { TypeTable, type TypeNode } from "fumadocs-ui/components/type-table";
import { ExtendedTypeTable } from "@/components/extended-type-table";

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
      const defaultValue = defaultTag ? <code>{defaultTag.text}</code> : undefined;

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
        <div>
          <p className="mb-2 text-sm text-fd-muted-foreground">
            {description}
          </p>
          <TypeTable id={tableId} type={type} />
        </div>
      </>
    ),
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
    <ExtendedTypeTable
      id="type-table-auto-form-props"
      type={autoFormProps}
    />
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

  if (fieldProps.field) {
    fieldProps.field = withNestedDescriptionTable(
      fieldProps.field,
      "Parsed schema metadata available on the current field.",
      "type-table-parsed-field",
      parsedField,
    );
  }

  return <TypeTable id="type-table-auto-form-field-props" type={fieldProps} />;
}
