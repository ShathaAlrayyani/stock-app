import { inngest } from "@/lib/inngest/client";
import { sendSignUpEmail } from "@/lib/inngest/functions";
import { serve } from "inngest/next";

export const handler = serve({
  client: inngest,
  functions: [sendSignUpEmail],
});
