import { FormEvent, useEffect, useState } from "react";

export interface IValidation<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export type IValue = Record<string, unknown>;

export type IError = Record<keyof IValue, boolean>;

const initializeErrors = (values: IValue) => {
  const reduced = Object.keys(values).reduce((acc, cur) => {
    const element = document.getElementsByName(cur)[0];

    if (element) {
      const required = element.hasAttribute("required");
      if (required) acc[cur] = false;
    }

    return acc;
  }, {} as IError);

  return reduced;
};

const useValidation = <T extends IValue>({
  onSubmit,
  initialValues,
}: IValidation<T>) => {
  const [formState, setFormState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<IError>({});

  const resetForm = () => {
    setFormState(initialValues);
  };

  const setError = (name: string) => {
    if (errors.hasOwnProperty(name)) {
      setErrors((errors) => ({
        ...errors,
        [name]: !formState[name] ? true : false,
      }));
    }
  };

  const setFieldValue = (name: string, value: unknown) => {
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));

    setError(name);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;
    setError(name);
  };

  const checkError = () => {
    let newErrors = {} as IError;

    Object.entries(formState).map(([key, value]) => {
      if (!value && errors.hasOwnProperty(key)) newErrors[key] = true;
    });

    setErrors((state) => ({ ...state, ...newErrors }));

    return Object.values(newErrors).some((value) => value);
  };

  useEffect(() => {
    const errors = initializeErrors(initialValues);
    setErrors(errors);
  }, [initialValues]);

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
