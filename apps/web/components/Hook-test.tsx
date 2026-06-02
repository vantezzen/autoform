import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AutoFormFieldProps } from "@acp-autoform/react";

// initialise test state
const tests = {
  dirtyFields: "initial",
  touchedFields: "initial",
  isValid: "initial",
  isSubmitSuccessful: "initial",
  trigger: "initial",
  watch: "initial",
  clear: "initial", // Renamed to "clear" to avoid conflict with HTML's reserved "reset"
  setValue: "initial",
  // getValue: "initial"
  // setError and setFocus with shouldFocus
  // clearErrors
};

const formFields = ["name", "age", "color", "birthdate", "isStudent"] as const;

const HookTest = (_props: AutoFormFieldProps) => {
  const {
    formState: {
      dirtyFields,
      touchedFields,
      isValid,
      isSubmitSuccessful,
      errors,
    },
    trigger,
    watch,
    reset,
    setValue,
  } = useFormContext();
  const [test, setTest] = useState<typeof tests>(tests);

  function btnStyle(value: string): React.CSSProperties {
    return {
      backgroundColor: value === "true" ? "#C2F7C2" : "buttonface",
      border: "1px solid black",
      borderRadius: "25px",
      padding: "5px 10px",
      cursor: "pointer",
      margin: "10px",
    };
  }

  // ------------------------------------
  // functions to test useForm-properties
  function checkDirtyFields() {
    console.log("dirtyFields", dirtyFields);
    setTest((prev) => ({
      ...prev,
      dirtyFields: String(formFields.every((key) => dirtyFields[key] === true)),
    }));
  }

  function checkTouchedFields() {
    console.log("touchedFields", touchedFields);
    setTest((prev) => ({
      ...prev,
      touchedFields: String(
        formFields.every((key) => touchedFields[key] === true),
      ),
    }));
  }

  function checkIsValid() {
    console.log("isValid", isValid);
    setTest((prev) => ({
      ...prev,
      isValid: String(isValid),
    }));
  }

  function checkIsSubmitSuccessful() {
    console.log("isSubmitSuccessful", isSubmitSuccessful);
    setTest((prev) => ({
      ...prev,
      isSubmitSuccessful: String(isSubmitSuccessful),
    }));
  }

  function checkWatch() {
    const result = {
      name: "John Doe",
      age: "25",
      color: "green",
      birthdate: "1990-01-01",
      isStudent: true,
    };

    const watchValues = watch();
    console.log("checkWatch", watchValues);

    setTest((prev) => ({
      ...prev,
      watch: String(
        formFields.every((key) => {
          if (key === "age") {
            return String(watchValues[key]) === String(result[key]); // watch can return number or string
          }
          return watchValues[key] === result[key];
        }),
      ),
    }));
  }

  async function checkClear() {
    const result = {
      name: undefined,
      age: undefined,
      color: undefined,
      birthdate: undefined,
      isStudent: false,
    };
    reset();

    const watchValues = watch();
    console.log("checkClear", watchValues);

    setTest((prev) => ({
      ...prev,
      clear: String(
        formFields.every((key) => watchValues[key] === result[key]),
      ),
    }));
  }

  async function checkTrigger() {
    const result = await trigger();
    console.log("checkTrigger", result);
    setTest((prev) => ({
      ...prev,
      trigger: String(result),
    }));
  }

  function checkSetValue() {
    const result = {
      name: "John Doe",
      age: 25,
      color: "blue",
      birthdate: "1990-01-01",
      isStudent: true,
    };

    setValue("name", "John Doe");
    setValue("age", 25);
    setValue("color", "blue");
    setValue("birthdate", "1990-01-01");
    setValue("isStudent", true);
    const watchValues = watch();
    console.log("checkSetValue", watchValues);

    setTest((prev) => ({
      ...prev,
      setValue: String(
        formFields.every((key) => watchValues[key] === result[key]),
      ),
    }));
  }

  return (
    <div>
      <button
        type="button"
        name="dirtyFields"
        onClick={checkDirtyFields}
        data-item={test.dirtyFields}
        style={btnStyle(test.dirtyFields)}
      >
        dirtyFields
      </button>
      <button
        type="button"
        name="touchedFields"
        onClick={checkTouchedFields}
        data-item={test.touchedFields}
        style={btnStyle(test.touchedFields)}
      >
        touchedFields
      </button>
      <button
        type="button"
        name="isValid"
        onClick={checkIsValid}
        data-item={test.isValid}
        style={btnStyle(test.isValid)}
      >
        isValid
      </button>
      <button
        type="button"
        name="isSubmitSuccessful"
        onClick={checkIsSubmitSuccessful}
        data-item={test.isSubmitSuccessful}
        style={btnStyle(test.isSubmitSuccessful)}
      >
        isSubmitSuccessful
      </button>
      <button
        type="button"
        name="watch"
        onClick={checkWatch}
        data-item={test.watch}
        style={btnStyle(test.watch)}
      >
        Watch
      </button>
      <button
        type="button"
        name="clear"
        onClick={checkClear}
        data-item={test.clear}
        style={btnStyle(test.clear)}
      >
        Clear
      </button>
      <button
        type="button"
        name="trigger"
        onClick={checkTrigger}
        data-item={test.trigger}
        style={btnStyle(test.trigger)}
      >
        Trigger
      </button>
      <button
        type="button"
        name="setValue"
        onClick={checkSetValue}
        data-item={test.setValue}
        style={btnStyle(test.setValue)}
      >
        SetValue
      </button>
    </div>
  );
};

export default HookTest;
