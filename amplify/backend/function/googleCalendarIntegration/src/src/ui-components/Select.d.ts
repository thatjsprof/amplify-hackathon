/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, SelectFieldProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectOverridesProps = {
    Select?: PrimitiveOverrideProps<FlexProps>;
    SelectField?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type SelectProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SelectOverridesProps | undefined | null;
}>;
export default function Select(props: SelectProps): React.ReactElement;
