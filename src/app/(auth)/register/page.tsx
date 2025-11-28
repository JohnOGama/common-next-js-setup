"use client";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/src/shared/components/ui";
import Link from "next/link";
import AppSelect from "@/src/shared/components/AppSelect";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaT } from "./forms/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");

  const router = useRouter();

  const form = useForm<RegisterSchemaT>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = form;

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    let formatted = "";
    let offset = 0;

    if (numbers.length > 0) {
      // Handle month
      const firstDigit = numbers[0];

      if (firstDigit === "0") {
        // Month is 01-09
        formatted = numbers.slice(0, 2);
        offset = 2;
      } else if (firstDigit === "1") {
        // Could be 1 (January), 10, 11, or 12
        if (numbers.length > 1) {
          const secondDigit = numbers[1];
          if (
            secondDigit === "0" ||
            secondDigit === "1" ||
            secondDigit === "2"
          ) {
            // It's 10, 11, or 12
            formatted = numbers.slice(0, 2);
            offset = 2;
          } else {
            // It's January (01) followed by day
            formatted = "01";
            offset = 1;
          }
        } else {
          // Just "1" typed so far
          formatted = "1";
          offset = 1;
        }
      } else if (firstDigit >= "2" && firstDigit <= "9") {
        // Single digit month (2-9), add leading zero
        formatted = "0" + firstDigit;
        offset = 1;
      }

      // Handle day
      if (numbers.length > offset) {
        const remainingNumbers = numbers.slice(offset);
        const dayFirstDigit = remainingNumbers[0];

        formatted += "/";

        if (dayFirstDigit === "0") {
          // Day is 01-09
          formatted += remainingNumbers.slice(0, 2);
          offset += 2;
        } else if (
          dayFirstDigit === "1" ||
          dayFirstDigit === "2" ||
          dayFirstDigit === "3"
        ) {
          // Could be single digit or 10-31
          if (remainingNumbers.length > 1) {
            // Always treat as two-digit day if we have two digits
            formatted += remainingNumbers.slice(0, 2);
            offset += 2;
          } else {
            // Just first digit typed
            formatted += dayFirstDigit;
            offset += 1;
          }
        } else if (dayFirstDigit >= "4" && dayFirstDigit <= "9") {
          // Single digit day (4-9), add leading zero
          formatted += "0" + dayFirstDigit;
          offset += 1;
        }
      }

      // Handle year (must be 18+ years old, min year 1970)
      if (numbers.length > offset) {
        const currentYear = new Date().getFullYear();
        const minAllowedYear = 1970; // Minimum year
        const maxAllowedYear = currentYear - 18; // User must be at least 18
        const yearInput = numbers.slice(offset, offset + 4);

        if (yearInput.length > 0) {
          const yearNumber = parseInt(yearInput, 10);

          // Restrict year to valid range as user types
          if (yearInput.length === 4) {
            // Full year entered - validate it
            if (yearNumber >= minAllowedYear && yearNumber <= maxAllowedYear) {
              formatted += "/" + yearInput;
              setAgeError(""); // Clear error if valid
            } else if (yearNumber > maxAllowedYear) {
              // Don't allow years that would make user younger than 18
              formatted += "/" + maxAllowedYear.toString();
              setAgeError("You must be at least 18 years old to register.");
            } else if (yearNumber < minAllowedYear) {
              // Don't allow years before 1970
              formatted += "/" + minAllowedYear.toString();
              setAgeError(`Year must be ${minAllowedYear} or later.`);
            } else {
              // Invalid year
              formatted += "/" + yearInput;
            }
          } else {
            // Partial year being typed - clear error
            formatted += "/" + yearInput;
            setAgeError("");
          }
        }
      }
    }

    setBirthDate(formatted);
    setValue("birthDate", formatted, { shouldValidate: true });
  };

  const handleBirthdateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const birthDate = e.target.value;
    if (birthDate?.length === 10) {
      const parts = birthDate.split("/");
      const year = parseInt(parts[2], 10);
      const currentYear = new Date().getFullYear();
      const minAllowedYear = 1970;
      const maxAllowedYear = currentYear - 18;

      if (year > maxAllowedYear) {
        setAgeError("You must be at least 18 years old to register.");
      } else if (year < minAllowedYear) {
        setAgeError(`Year must be ${minAllowedYear} or later.`);
      } else {
        setAgeError("");
      }
    }
  };

  const onSubmit = async (data: RegisterSchemaT) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/processing");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center  space-y-4 max-w-sm mx-auto">
      <div>
        <h1 className="text-xl font-semibold">Create an account</h1>
        <p className="text-xs text-gray-400">
          Enter your email below to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2 items-start">
          <Input
            placeholder="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            placeholder="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          placeholder="Email Address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <AppSelect
          onValueChange={(gender) => {
            setValue("gender", gender, { shouldValidate: true });
          }}
          placeholder="Select a gender"
          triggerClassName={`${
            errors.gender?.message ? "border-red-500" : ""
          } w-full`}
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          error={errors.gender?.message}
        />

        <div>
          <InputGroup
            className={`${
              ageError || errors.birthDate?.message ? "border-red-500" : ""
            }`}
          >
            <InputGroupInput
              onChange={handleBirthdateChange}
              onBlur={handleBirthdateBlur}
              value={birthDate}
              placeholder="1/20/2003"
              className={`pl-1!`}
            />
            <InputGroupAddon>
              <div className="bg-input rounded-md px-1">
                <InputGroupText className="text-sm">Birthdate</InputGroupText>
              </div>
            </InputGroupAddon>
          </InputGroup>
          {ageError && <p className="text-xs text-red-500 mt-1">{ageError}</p>}
          {errors.birthDate?.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.birthDate?.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-start">
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              isErrorVisible={false}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              isErrorVisible={false}
            />
          </div>
          {errors.password?.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button
          loading={isSubmitting}
          disabled={!isDirty || !isValid || isSubmitting}
          className="w-full"
        >
          Continue Sign Up
        </Button>
      </form>

      <p className="text-xs text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline ">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
