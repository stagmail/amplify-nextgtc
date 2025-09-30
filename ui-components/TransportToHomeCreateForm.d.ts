import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TransportToHomeCreateFormInputValues = {
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupTime?: string;
    paxNameId?: string;
};
export declare type TransportToHomeCreateFormValidationValues = {
    pickupLocation?: ValidationFunction<string>;
    dropoffLocation?: ValidationFunction<string>;
    pickupTime?: ValidationFunction<string>;
    paxNameId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransportToHomeCreateFormOverridesProps = {
    TransportToHomeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pickupLocation?: PrimitiveOverrideProps<SelectFieldProps>;
    dropoffLocation?: PrimitiveOverrideProps<TextFieldProps>;
    pickupTime?: PrimitiveOverrideProps<TextFieldProps>;
    paxNameId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransportToHomeCreateFormProps = React.PropsWithChildren<{
    overrides?: TransportToHomeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TransportToHomeCreateFormInputValues) => TransportToHomeCreateFormInputValues;
    onSuccess?: (fields: TransportToHomeCreateFormInputValues) => void;
    onError?: (fields: TransportToHomeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransportToHomeCreateFormInputValues) => TransportToHomeCreateFormInputValues;
    onValidate?: TransportToHomeCreateFormValidationValues;
} & React.CSSProperties>;
export default function TransportToHomeCreateForm(props: TransportToHomeCreateFormProps): React.ReactElement;
