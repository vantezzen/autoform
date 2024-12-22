import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AutoFormFieldProps } from "@autoform/react";
import React, { useEffect } from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
	field,
	inputProps,
	error,
	id,
}) => (
	<Select
		{...inputProps}
		// set the value on change
		onValueChange={(value) =>
			inputProps.onChange({
				target: { value, name: inputProps.name },
			})
		}
		// set the default value if there's default
		defaultValue={field.default}
		//! fix error where if the field is required and none selected it never show error
		required={false}
	>
		<SelectTrigger id={id} className={error ? "border-destructive" : ""}>
			<SelectValue placeholder="Select an option" />
		</SelectTrigger>
		<SelectContent>
			{(field.options || []).map(([key, label]) => (
				<SelectItem key={key} value={key}>
					{label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);
