import { Form as AntForm, FormInstance } from "antd";
import React from "react";

export const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, ...props }, ref) => {
  const refForm = React.useRef<
    FormInstance & { nativeElement: HTMLFormElement }
  >(null);
  React.useImperativeHandle(
    ref,
    () => refForm.current?.nativeElement as HTMLFormElement
  );
  console.log("Form", props);
  return (
    <AntForm
      ref={refForm}
      onChange={(e) => {
        console.log("onChange", e);
      }}
      onValuesChange={(e) => {
        console.log("onValuesChange", e);
      }}
      onFinish={props.onSubmit}
    >
      {children}
    </AntForm>
  );
});
