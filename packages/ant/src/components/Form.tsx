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
    // The ref of the form that exposes antd-design's form instance
    () => refForm.current?.nativeElement as HTMLFormElement
  );
  return (
    <AntForm
      ref={refForm}
      onFinish={(e) => {
        props.onSubmit?.(e[0]);
      }}
      {...props}
    >
      {children}
    </AntForm>
  );
});
