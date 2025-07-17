import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full bg-black/80 text-white px-6 py-3 flex justify-between items-center shadow-md">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <span className="text-[var(--ddc-red)] text-2xl">.</span>ddc
            </Link>
            <div className="hidden md:flex gap-8 text-base font-medium">
                <Link href="/">Início</Link>
                <Link href="/login">Login</Link>
            </div>

            <button className="md:hidden p-2" aria-label="Abrir menu">
                <svg width={26} height={26} fill="none" stroke="currentColor">
                    <path strokeWidth={2} strokeLinecap="round" d="M4 8h18M4 16h18" />
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;
