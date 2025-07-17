import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import 'animate.css';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <Card className='max-w-md mx-auto p-6 bg-white shadow-lg mt-30 animate__animated animate__fadeInLeft'>
            <h1 className="text-2xl font-bold mb-2">Login</h1>
            <label htmlFor="email" className="block mb-2">Email:</label>
            <Input id="email" type="email" placeholder="Digite seu email" className="mb-2" />

            <label htmlFor="password" className="block mb-2">Senha:</label>
            <Input id="password" type="password" placeholder="Digite sua senha" className="mb-3" />

            <Button className="bg-[var(--ddc-red)]">
                Entrar
            </Button>
            <Link href={'/register'} className="text-center mt-4 text-sm text-gray-600 hover:underline hover:text-[var(--ddc-red)]">
                Não tem uma conta? Registre-se aqui
            </Link>
        </Card>
    );
}
export default LoginForm;