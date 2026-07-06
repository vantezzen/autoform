import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-5 w-5 mt-2" />
    <AlertTitle className="text-sm/5">{error}</AlertTitle>
  </Alert>
);
