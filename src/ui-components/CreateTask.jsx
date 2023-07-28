/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Heading,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
export default function CreateTask(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="26px"
      direction="column"
      width="529px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="32px 32px 32px 32px"
      backgroundColor="rgba(250,250,250,1)"
      {...getOverrideProps(overrides, "CreateTask")}
      {...rest}
    >
      <Heading
        width="unset"
        height="unset"
        shrink="0"
        level="5"
        children="Create Task"
        {...getOverrideProps(overrides, "Heading")}
      ></Heading>
      <TextField
        width="465px"
        height="unset"
        label="Title"
        shrink="0"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "TextField")}
      ></TextField>
      <TextAreaField
        width="465px"
        height="unset"
        label="Description"
        shrink="0"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "TextAreaField")}
      ></TextAreaField>
      <Button
        width="465px"
        height="unset"
        borderRadius="8px"
        padding="16px 15px 16px 15px"
        shrink="0"
        size="default"
        isDisabled={false}
        variation="primary"
        children="Create"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}
