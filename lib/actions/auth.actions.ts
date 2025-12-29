/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const isUserExist = async () => {
  try {
    const users = await auth.api.listUserAccounts({ headers: await headers() });
    // const user = await auth.api.({ headers: await headers() });
    return { success: true, data: users };
  } catch (err) {
    console.error("failed to get userList ", err);
    return { success: false, error: err };
  }
};

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
          email: email.toLowerCase().trim(),
          investmentGoals,
          preferredIndustry,
          riskTolerance,
        },
      });
    }

    return { success: true, data: res };
  } catch (err: any) {
    console.error("sign up failed: ", err);
    return { success: false, error: "sign up failed: " + err.message };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const res = await auth.api.signInEmail({
      body: { email: email.toLowerCase().trim(), password },
    });

    return { success: true, data: res };
  } catch (e: any) {
    console.error("Sign in Failed: ", e);
    return { success: false, error: "Sign in Failed: " + e.message };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e: any) {
    console.error("Sign out Failed: ", e);
    return { success: false, error: "Sign out Failed: " + e.message };
  }
};
