import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Link } from "react-router-dom";

enum Units {
  sqft = "sqft",
  gaz = "gaz",
}

const formSchema = z.object({
  people: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .describe("How many people live in your house?"),
  octBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in October?"),
  sepBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in November?"),
  augBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in August?"),

  size: z.coerce.number().optional().describe("What is the size of your house?"),
});

function Basics() {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Bill-E</CardTitle>
            <CardDescription>This survey aims to</CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              onSubmit={console.log}
              fieldConfig={{
                size: {
                  renderParent: ({ children }) => (
                    <div className="flex items-end gap-20">
                      <div className="flex-5">{children}</div>
                      <div>
                        <RadioGroup
                          onValueChange={(v) => console.log(v)}
                          defaultValue={Units.sqft}
                          className="flex flex-col space-y-1"
                        >
                          {Object.values(Units).map((value: any) => (
                            <FormItem
                              className="flex items-center space-x-5 space-y-0"
                              key={value}
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {value}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  ),
                },
              }}
            >
              <AutoFormSubmit>
              Next</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Basics;
