import React from "react";
import { AutoForm } from "@autoform/shadcn/components/ui/autoform/AutoForm";
import { ZodProvider } from "@autoform/zod/v4";
import { z } from "zod/v4";
import { TestWrapper } from "./utils";

describe("AutoForm Form Props Tests (shadcn)", () => {
  const schema = z.object({
    name: z.string(),
  });

  const schemaProvider = new ZodProvider(schema);

  it("applies custom form props", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formProps={{
            className: "custom-form-class",
            "data-testid": "custom-form",
            onKeyDown: cy.stub().as("onKeyDown"),
          }}
        />
      </TestWrapper>,
    );

    cy.get("form")
      .should("have.class", "custom-form-class")
      .and("have.attr", "data-testid", "custom-form");

    cy.get('input[name="name"]').type("{enter}");
    cy.get("@onKeyDown").should("have.been.called");
  });

  it("prevents form submission on enter key", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
          formProps={{
            onKeyDown: (e) => {
              if (e.key === "Enter") e.preventDefault();
            },
          }}
        />
      </TestWrapper>,
    );

    cy.get('input[name="name"]').type("John Doe{enter}");
    cy.get("@onSubmit").should("not.have.been.called");
  });
});
