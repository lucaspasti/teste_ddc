import Image from "next/image"
import 'animate.css'

export default function Hero() {
    return (
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center  px-4 py-20 text-white">

            <div className="w-full md:w-3/5 space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-extrabold animate__animated animate__fadeInRight">
                    Bem-vindo ao Blog DDC
                </h1>
                <p className="text-xl md:text-2xl opacity-90 animate__animated animate__fadeInRight animate__delay-1s">
                    Tecnologia, criatividade e inspiração em um só lugar.
                </p>

            </div>

            <div className="w-full md:w-2/5 flex justify-center mb-8 md:mb-0">
                <Image
                    src="/logo_ddc.svg"
                    alt="DDC logo"
                    width={300}
                    height={300}
                    className="w-2/3 md:w-full animate__animated animate__fadeInLeft animate__delay-1s"
                />
            </div>

        </div>
    )
}
