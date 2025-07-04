"use client";
import { AutoForm } from "@autoform/ant";
import { zodSchemaProvider } from "./utils";

const Ant = () => {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      // Ant Design Form Props
      antFormProps={{
        layout: "horizontal",
        className: "no-margin-form",
        onValuesChange: (e) => {
          console.log("inputChange", e);
        },
        // onFinish: (e) => {
        //   console.log("onFinish", e);
        // },
      }}
      withSubmit
    />
  );
};

export default Ant;
