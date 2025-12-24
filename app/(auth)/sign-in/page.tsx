"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField";
import { FooterLink } from "@/components/FooterLink";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success === false) {
        toast.error(result.error);
      }
      if (result.success) router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          error={errors.email}
          label="Email"
          name="email"
          placeholder="example@email.com"
          register={register}
          validation={{
            required: "This field is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please Write Your Email Correctly",
            },
          }}
        />

        <InputField
          error={errors.password}
          label="Password"
          name="password"
          placeholder="Enter a strong password"
          register={register}
          type="password"
          validation={{ required: "This field is required" }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
