/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, HeadingProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateTaskOverridesProps = {
    CreateTask?: PrimitiveOverrideProps<FlexProps>;
    Heading?: PrimitiveOverrideProps<HeadingProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    TextAreaField?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type CreateTaskProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: CreateTaskOverridesProps | undefined | null;
}>;
export default function CreateTask(props: CreateTaskProps): React.ReactElement;
