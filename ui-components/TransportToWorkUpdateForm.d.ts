import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { TransportToWork } from "./graphql/types";
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
export declare type TransportToWorkUpdateFormInputValues = {
    pickupLocation?: string;
    dropoffLocation?: string;
    pickupTime?: string;
    paxNameId?: string;
};
export declare type TransportToWorkUpdateFormValidationValues = {
    pickupLocation?: ValidationFunction<string>;
    dropoffLocation?: ValidationFunction<string>;
    pickupTime?: ValidationFunction<string>;
    paxNameId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransportToWorkUpdateFormOverridesProps = {
    TransportToWorkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pickupLocation?: PrimitiveOverrideProps<TextFieldProps>;
    dropoffLocation?: PrimitiveOverrideProps<SelectFieldProps>;
    pickupTime?: PrimitiveOverrideProps<TextFieldProps>;
    paxNameId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransportToWorkUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransportToWorkUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transportToWork?: TransportToWork;
    onSubmit?: (fields: TransportToWorkUpdateFormInputValues) => TransportToWorkUpdateFormInputValues;
    onSuccess?: (fields: TransportToWorkUpdateFormInputValues) => void;
    onError?: (fields: TransportToWorkUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransportToWorkUpdateFormInputValues) => TransportToWorkUpdateFormInputValues;
    onValidate?: TransportToWorkUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransportToWorkUpdateForm(props: TransportToWorkUpdateFormProps): React.ReactElement;
