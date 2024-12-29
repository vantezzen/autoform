"use client";
import { AntAutoForm } from "@autoform/ant";
import { zodSchemaProvider } from "./utils";

const Ant = () => {
  return (
    <AntAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
};

export default Ant;
