import React from "react";
import { AutoForm } from "@autoform/chakra";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";

describe("AutoForm Sub-objects Tests", () => {
  const subObjectSchema = z.object({
    user: z.object({
      name: z.string(),
      address: z.object({
        street: z.string(),
        city: z.string(),
      }),
    }),
  });

  const schemaProvider = new ZodProvider(subObjectSchema);

  it("renders sub-object fields correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get('input[name="user.name"]').should("exist");
    cy.get('input[name="user.address.street"]').should("exist");
    cy.get('input[name="user.address.city"]').should("exist");
  });

  it("submits sub-object data correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get('input[name="user.name"]').type("John Doe");
    cy.get('input[name="user.address.street"]').type("123 Main St");
    cy.get('input[name="user.address.city"]').type("New York");

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      user: {
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "New York",
        },
      },
    });
  });

  it("handles sub-sub-objects correctly", () => {
    const subSubObjectSchema = z.object({
      user: z.object({
        name: z.string(),
        contact: z.object({
          email: z.string().email(),
          phone: z.object({
            country: z.string(),
            number: z.string(),
          }),
        }),
      }),
    });

    const subSubSchemaProvider = new ZodProvider(subSubObjectSchema);

    cy.mount(
      <AutoForm
        schema={subSubSchemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get('input[name="user.name"]').type("John Doe");
    cy.get('input[name="user.contact.email"]').type("john@example.com");
    cy.get('input[name="user.contact.phone.country"]').type("US");
    cy.get('input[name="user.contact.phone.number"]').type("1234567890");

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      user: {
        name: "John Doe",
        contact: {
          email: "john@example.com",
          phone: {
            country: "US",
            number: "1234567890",
          },
        },
      },
    });
  });
});
