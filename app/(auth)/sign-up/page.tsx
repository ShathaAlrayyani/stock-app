"use client";
import { CountrySelectField } from "@/components/CountrySelectField";
import { FooterLink } from "@/components/FooterLink";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({
    defaultValues: {
      country: "US",
      email: "",
      fullName: "",
      investmentGoals: "Growth",
      password: "",
      preferredIndustry: "Technology",
      riskTolerance: "Medium",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("🚀 ~ onSubmit ~ data:", data);
      //sign up with email function
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/");
    } catch (e) {
      console.error("🚀 ~ onSubmit ~ e:", e);
      toast.error("Sign up failed", {
        description:
          e instanceof Error ? e.message : "Failed To Create An Account",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          error={errors.fullName}
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          register={register}
          validation={{ required: "This field is required", minLength: 5 }}
        />

        <InputField
          error={errors.email}
          label="Email"
          name="email"
          placeholder="example@email.com"
          register={register}
          validation={{
            required: "This field is required",
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            massage: "Please Write Your Email Correctly",
          }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <InputField
          error={errors.password}
          label="Password"
          name="password"
          placeholder="Enter a strong password"
          register={register}
          type="password"
          validation={{ required: "This field is required", minLength: 8 }}
        />

        <SelectField
          control={control}
          error={errors.investmentGoals}
          label="Investment Goals"
          name="investmentGoals"
          options={INVESTMENT_GOALS}
          placeholder="Select your investment goal"
          required
        />

        <SelectField
          control={control}
          error={errors.riskTolerance}
          label="Risk Tolerance"
          name="riskTolerance"
          options={RISK_TOLERANCE_OPTIONS}
          placeholder="Select your risk tolerance"
          required
        />

        <SelectField
          control={control}
          error={errors.preferredIndustry}
          label="Preferred Industry"
          name="preferredIndustry"
          options={PREFERRED_INDUSTRIES}
          placeholder="Select your preferred industry"
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start your Investing Journey"}
        </Button>
        <FooterLink
          href={"/sign-in"}
          linkText={"Sign In"}
          text={"Already have an account?"}
        />
      </form>
    </>
  );
};

export default SignUp;
