import React from "react";
import Joi from "joi";
import { AutoForm } from "@autoform/ant";
import { JoiProvider } from "@autoform/joi";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketballs",
  Baseball = "Baseballs",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

describe("AutoForm Basic Tests (ANT-JOI)", () => {
  const basicSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.min": "Name must be at least 2 characters",
    }),
    age: Joi.number().min(18).required().messages({
      "number.min": "Must be at least 18 years old",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email address",
      }),
    website: Joi.string().uri().optional().messages({
      "string.uri": "Invalid URL",
    }),
    sports: Joi.valid(...Object.values(Sports)),
    birthdate: Joi.date().required(),
    isStudent: Joi.boolean().required(),
  });

  const schemaProvider = new JoiProvider(basicSchema);

  it("renders all field types correctly", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
      />
    );

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="age"]').should("have.class", "ant-input-number-input");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="website"]').should("exist");
    cy.get('input[name="isStudent"]').should(
      "have.class",
      "ant-checkbox-input"
    );
    cy.get('input[id="sports"]').should("exist");
    cy.get('input[name="birthdate"]');
  });

  it("submits form with correct data types", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(
      <AutoForm schema={schemaProvider} onSubmit={onSubmit} withSubmit />
    );

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="website"]').type("https://example.com");
    cy.get('input[id="sports"]').click();
    cy.get('.ant-select-item-option[title="Hockey (Ice)"]').click();
    cy.get('input[name="birthdate"]').clear().type("1990-01-01");
    cy.get('input[name="isStudent"]').check();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      sports: "Hockey (Ice)",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });
});
