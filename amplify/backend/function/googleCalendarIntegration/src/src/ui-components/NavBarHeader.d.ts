/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBarHeaderOverridesProps = {
    NavBarHeader?: PrimitiveOverrideProps<FlexProps>;
    LogoWithText?: PrimitiveOverrideProps<ViewProps>;
    Union?: PrimitiveOverrideProps<IconProps>;
    "Frame 321"?: PrimitiveOverrideProps<FlexProps>;
    Dashboard?: PrimitiveOverrideProps<TextProps>;
    Tasks?: PrimitiveOverrideProps<TextProps>;
    Schedule?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type NavBarHeaderProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavBarHeaderOverridesProps | undefined | null;
}>;
export default function NavBarHeader(props: NavBarHeaderProps): React.ReactElement;
