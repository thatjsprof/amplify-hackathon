/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TextareaOverridesProps = {
    Textarea?: PrimitiveOverrideProps<FlexProps>;
    TextAreaField?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TextareaProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: TextareaOverridesProps | undefined | null;
}>;
export default function Textarea(props: TextareaProps): React.ReactElement;
