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
export declare type TransportToWorkCreateFormInputValues = {
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupTime?: string;
    paxNameId?: string;
};
export declare type TransportToWorkCreateFormValidationValues = {
    pickupLocation?: ValidationFunction<string>;
    dropoffLocation?: ValidationFunction<string>;
    pickupTime?: ValidationFunction<string>;
    paxNameId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransportToWorkCreateFormOverridesProps = {
    TransportToWorkCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pickupLocation?: PrimitiveOverrideProps<TextFieldProps>;
    dropoffLocation?: PrimitiveOverrideProps<SelectFieldProps>;
    pickupTime?: PrimitiveOverrideProps<TextFieldProps>;
    paxNameId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransportToWorkCreateFormProps = React.PropsWithChildren<{
    overrides?: TransportToWorkCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TransportToWorkCreateFormInputValues) => TransportToWorkCreateFormInputValues;
    onSuccess?: (fields: TransportToWorkCreateFormInputValues) => void;
    onError?: (fields: TransportToWorkCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransportToWorkCreateFormInputValues) => TransportToWorkCreateFormInputValues;
    onValidate?: TransportToWorkCreateFormValidationValues;
} & React.CSSProperties>;
export default function TransportToWorkCreateForm(props: TransportToWorkCreateFormProps): React.ReactElement;
