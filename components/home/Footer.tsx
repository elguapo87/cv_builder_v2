import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer
            id="contact"
            className="flex justify-center py-10 sm:py-12 text-stone-300/90 bg-linear-to-r
                from-black/98 via-green-900/90 to-black/98"
        >
            <div className="flex flex-col items-center gap-3">
                <Link href="/">
                    <Image
                        src={"/cvflow_logo.png"}
                        alt="Logo"
                        width={200}
                        height={200}
                        className="h-6 md:h-10 w-auto"
                    />
                </Link>

                <hr className="w-full text-stone-50" />

                <p className="text-xs md:text-sm mt-1 text-center max-md:flex flex-col gap-1.5">
                   © 2026 All rights reserved | Built with ❤️ by P.G.
                   {" "}
                   <span className="max-md:hidden">|</span>
                   {/* <span>pglogovac@gmail.com</span> */}
                   {" "}
                   <a href="mailto:tvoj.email@gmail.com" className="hover:underline">
                        pglogovac@gmail.com
                   </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer