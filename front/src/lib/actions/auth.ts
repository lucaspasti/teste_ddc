"use server";

import { SignUpFormState } from "@/lib/types/formState";
import { SignUpFormSchema } from "@/lib/zodSchemas/signUpFormSchema";
import { fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "@/lib/queries";
import { redirect } from "next/navigation";
import { LoginFormSchema } from "@/lib/zodSchemas/loginFormSchema";
import { revalidatePath } from "next/cache";
import { createSession, deleteSession } from "@/lib/session";
export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };
  redirect("/auth/signin");
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Invalid Credentials",
    };
  }
  // Todo: create a session
  await createSession({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
    },
    accessToken: data.signIn.accessToken,
  });


  revalidatePath("/");
  redirect("/");
}

export async function signOut() {
    await deleteSession();
    window.location.reload();
    redirect("/");
}