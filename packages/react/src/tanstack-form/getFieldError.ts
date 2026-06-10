import { AnyFieldApi } from "@tanstack/react-form";

/**
 * Extracts the first error message from a TanStack FieldApi.
 * Mirrors the single-string contract of the RHF useFieldError hook.
 */
export function getFieldError(field: AnyFieldApi, errorMapFromState?: any): string | undefined {
  let errors = field.state.meta.errors;

  // Fallback to errorMap if meta.errors is empty, as TanStack form may not 
  // sync form-level errors to untouched fields inside arrays
  const errorMap = errorMapFromState?.onChange || field.form.state.errorMap?.onChange;
  if ((!errors || errors.length === 0) && errorMap) {
    let errorMapErrors = errorMap[field.name];

    if (!errorMapErrors || errorMapErrors.length === 0) {
      let path = field.name;
      while (path.length > 0) {
        const lastDot = path.lastIndexOf(".");
        const lastBracket = path.lastIndexOf("[");
        const cutIndex = Math.max(lastDot, lastBracket);
        
        if (cutIndex === -1) break;
        
        path = path.substring(0, cutIndex);
        const parentErrors = errorMap[path];
        
        if (parentErrors && Array.isArray(parentErrors) && parentErrors.length > 0) {
           // If the parent has a "Required" error, then this field is essentially missing too.
           // This handles the case where Zod bails out on an undefined parent object.
           const parentHasRequiredError = parentErrors.some((e: any) => {
             const msg = typeof e === "string" ? e : (e as any).message;
             return msg && msg.toLowerCase().includes("required");
           });
           
           if (parentHasRequiredError) {
             errorMapErrors = parentErrors;
             break;
           }
        }
      }
    }

    if (errorMapErrors && Array.isArray(errorMapErrors) && errorMapErrors.length > 0) {
      errors = errorMapErrors;
    }
  }

  if (!errors || errors.length === 0) return undefined;
  
  const first = errors[0];
  let finalError;
  if (typeof first === "string") finalError = first;
  else if (first && typeof (first as any).message === "string") {
    finalError = (first as any).message;
  } else {
    finalError = String(first);
  }
  
  if (field.name.includes("city")) {
    console.log("CITY ERROR:", { errors, finalError, errorMapErrors: errorMap?.[field.name] });
  }
  
  return finalError;
}
