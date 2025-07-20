"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action} className="flex flex-col gap-5">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label className= 'mb-3'  htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          placeholder="Lucas Ferreira"
          defaultValue={state?.data?.name}
        />
      </div>
      {!!state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <div>
        <Label className= 'mb-3' htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="exemplo@exemplo.com"
          defaultValue={state?.data?.email}
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div>
        <Label className= 'mb-3' htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        />
      </div>

      {!!state?.errors?.password && (
        <div className="text-sm text-red-500">
          <p>Senha precisa de:</p>
          <ul>
            {state.errors.password.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton className="bg-[var(--ddc-red)]">Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
