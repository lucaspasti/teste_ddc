import Link from "next/link";
import SignUpForm from "@/components/signUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center animate__animated animate__fadeInLeft ">
      <h2 className="text-center text-2xl font-bold mb-4">Registro</h2>
      {/* Sign Up form here */}
      <SignUpForm />
      <div>
        <p className= 'mb-2 mt-2 ' >Já tem uma conta?</p>
        <Link className="hover:underline text-center" href={"/auth/signin"}>
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
