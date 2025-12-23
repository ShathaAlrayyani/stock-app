"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({
  country,
  email,
  fullName,
  investmentGoals,
  password,
  preferredIndustry,
  riskTolerance,
}: SignUpFormData) => {
  try {
    const res = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (res) {
      await inngest.send({
        name: "app/user.created",
        data: {
          name: fullName,
          country,
          email,
          investmentGoals,
          preferredIndustry,
          riskTolerance,
        },
      });
    }

    return { success: true, data: res };
  } catch (err) {
    console.error("sign up failed: ", err);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const res = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: res };
  } catch (e) {
    console.error("Sign in Failed: ", e);
    return { success: false, error: "Sign in Failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.error("Sign out Failed: ", e);
    return { success: false, error: "Sign out Failed" };
  }
};
