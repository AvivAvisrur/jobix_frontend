import React, { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";

interface FormWrapperProps<T extends Record<string, unknown>> {
  defaultValues: T; // Strongly typed default values for the form
  onSubmit: SubmitHandler<T>; // Strongly typed submission handler
  children: ReactNode; // Child components (e.g., input fields)
}

const FormWrapper = <T extends Record<string, unknown>>({
  defaultValues,
  onSubmit,
  children,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;
