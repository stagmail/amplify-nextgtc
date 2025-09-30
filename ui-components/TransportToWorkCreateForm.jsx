/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTransportToWork } from "./graphql/mutations";
const client = generateClient();
export default function TransportToWorkCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    pickupLocation: "",
    dropoffLocation: "",
    pickupTime: "",
    paxNameId: "",
  };
  const [pickupLocation, setPickupLocation] = React.useState(
    initialValues.pickupLocation
  );
  const [dropoffLocation, setDropoffLocation] = React.useState(
    initialValues.dropoffLocation
  );
  const [pickupTime, setPickupTime] = React.useState(initialValues.pickupTime);
  const [paxNameId, setPaxNameId] = React.useState(initialValues.paxNameId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPickupLocation(initialValues.pickupLocation);
    setDropoffLocation(initialValues.dropoffLocation);
    setPickupTime(initialValues.pickupTime);
    setPaxNameId(initialValues.paxNameId);
    setErrors({});
  };
  const validations = {
    pickupLocation: [{ type: "Required" }],
    dropoffLocation: [],
    pickupTime: [{ type: "Required" }],
    paxNameId: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          pickupLocation,
          dropoffLocation,
          pickupTime,
          paxNameId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTransportToWork.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TransportToWorkCreateForm")}
      {...rest}
    >
      <TextField
        label="Pickup location"
        isRequired={true}
        isReadOnly={false}
        value={pickupLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pickupLocation: value,
              dropoffLocation,
              pickupTime,
              paxNameId,
            };
            const result = onChange(modelFields);
            value = result?.pickupLocation ?? value;
          }
          if (errors.pickupLocation?.hasError) {
            runValidationTasks("pickupLocation", value);
          }
          setPickupLocation(value);
        }}
        onBlur={() => runValidationTasks("pickupLocation", pickupLocation)}
        errorMessage={errors.pickupLocation?.errorMessage}
        hasError={errors.pickupLocation?.hasError}
        {...getOverrideProps(overrides, "pickupLocation")}
      ></TextField>
      <SelectField
        label="Dropoff location"
        placeholder="Please select an option"
        isDisabled={false}
        value={dropoffLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pickupLocation,
              dropoffLocation: value,
              pickupTime,
              paxNameId,
            };
            const result = onChange(modelFields);
            value = result?.dropoffLocation ?? value;
          }
          if (errors.dropoffLocation?.hasError) {
            runValidationTasks("dropoffLocation", value);
          }
          setDropoffLocation(value);
        }}
        onBlur={() => runValidationTasks("dropoffLocation", dropoffLocation)}
        errorMessage={errors.dropoffLocation?.errorMessage}
        hasError={errors.dropoffLocation?.hasError}
        {...getOverrideProps(overrides, "dropoffLocation")}
      >
        <option
          children="Location one"
          value="LocationOne"
          {...getOverrideProps(overrides, "dropoffLocationoption0")}
        ></option>
        <option
          children="Location two"
          value="LocationTwo"
          {...getOverrideProps(overrides, "dropoffLocationoption1")}
        ></option>
        <option
          children="Location three"
          value="LocationThree"
          {...getOverrideProps(overrides, "dropoffLocationoption2")}
        ></option>
        <option
          children="Location four"
          value="LocationFour"
          {...getOverrideProps(overrides, "dropoffLocationoption3")}
        ></option>
        <option
          children="Location five"
          value="LocationFive"
          {...getOverrideProps(overrides, "dropoffLocationoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Pickup time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={pickupTime && convertToLocal(new Date(pickupTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              pickupLocation,
              dropoffLocation,
              pickupTime: value,
              paxNameId,
            };
            const result = onChange(modelFields);
            value = result?.pickupTime ?? value;
          }
          if (errors.pickupTime?.hasError) {
            runValidationTasks("pickupTime", value);
          }
          setPickupTime(value);
        }}
        onBlur={() => runValidationTasks("pickupTime", pickupTime)}
        errorMessage={errors.pickupTime?.errorMessage}
        hasError={errors.pickupTime?.hasError}
        {...getOverrideProps(overrides, "pickupTime")}
      ></TextField>
      <TextField
        label="Pax name id"
        isRequired={true}
        isReadOnly={false}
        value={paxNameId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pickupLocation,
              dropoffLocation,
              pickupTime,
              paxNameId: value,
            };
            const result = onChange(modelFields);
            value = result?.paxNameId ?? value;
          }
          if (errors.paxNameId?.hasError) {
            runValidationTasks("paxNameId", value);
          }
          setPaxNameId(value);
        }}
        onBlur={() => runValidationTasks("paxNameId", paxNameId)}
        errorMessage={errors.paxNameId?.errorMessage}
        hasError={errors.paxNameId?.hasError}
        {...getOverrideProps(overrides, "paxNameId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
