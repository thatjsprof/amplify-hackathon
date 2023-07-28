import { FormEvent, useState } from "react";

export interface IValidation<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export type IValue = Record<string, PropertyKey>;

export type IError = Record<keyof IValue, boolean>;

const useValidation = <T extends IValue>({
  onSubmit,
  initialValues,
}: IValidation<T>) => {
  const [formState, setFormState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<IError>(
    Object.keys(initialValues).reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {} as IError)
  );

  const resetForm = () => {
    setFormState(initialValues);
  };

  const setError = (name: string) => {
    setErrors((errors) => ({
      ...errors,
      [name]: !formState[name] ? true : false,
    }));
  };

  const setFieldValue = (name: string, value: string) => {
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setError(name);

    setFieldValue(name, value);
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;

    setError(name);
  };

  const checkError = () => {
    let errors = {} as IError;

    Object.entries(formState).map(([key, value]) => {
      if (!value) errors[key] = true;
    });

    setErrors((state) => ({ ...state, ...errors }));

    return Object.values(errors).some((value) => value);
  };

  return {
    errors,
    resetForm,
    handleBlur,
    handleChange,
    setFieldValue,
    values: formState,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!checkError()) {
        onSubmit(formState);
      }
    },
  };
};

export default useValidation;
