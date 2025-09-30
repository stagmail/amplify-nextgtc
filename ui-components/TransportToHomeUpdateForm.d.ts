import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { TransportToHome } from "./graphql/types";
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
export declare type TransportToHomeUpdateFormInputValues = {
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupTime?: string;
    paxNameId?: string;
};
export declare type TransportToHomeUpdateFormValidationValues = {
    pickupLocation?: ValidationFunction<string>;
    dropoffLocation?: ValidationFunction<string>;
    pickupTime?: ValidationFunction<string>;
    paxNameId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransportToHomeUpdateFormOverridesProps = {
    TransportToHomeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pickupLocation?: PrimitiveOverrideProps<SelectFieldProps>;
    dropoffLocation?: PrimitiveOverrideProps<TextFieldProps>;
    pickupTime?: PrimitiveOverrideProps<TextFieldProps>;
    paxNameId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransportToHomeUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransportToHomeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transportToHome?: TransportToHome;
    onSubmit?: (fields: TransportToHomeUpdateFormInputValues) => TransportToHomeUpdateFormInputValues;
    onSuccess?: (fields: TransportToHomeUpdateFormInputValues) => void;
    onError?: (fields: TransportToHomeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransportToHomeUpdateFormInputValues) => TransportToHomeUpdateFormInputValues;
    onValidate?: TransportToHomeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransportToHomeUpdateForm(props: TransportToHomeUpdateFormProps): React.ReactElement;
