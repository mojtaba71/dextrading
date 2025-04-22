import Link from "next/link";
import Subscribe from "../features/footer/Subscribe";
import { BsTwitterX } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="mx-auto" />
      <section className="container py-20 flex flex-col gap-3 md:flex-row items-start justify-between">
        <div className="w-full mb-5 md:w-1/3">
          <a
            href="/"
            className="font-bold text-xl flex items-center space-x-2 text-['Fira_Code']"
          >
            <span className="text-brand2">Dex</span>
            Trading
          </a>
          <p className="mt-3 text-muted-foreground text-base leading-5">
            Empowering crypto traders uncover investment opportunities.
          </p>
          <Subscribe />
        </div>

        <div className="flex flex-col gap-2 md:w-1/3 w-full md:pl-40">
          <h3 className="font-bold text-lg">General</h3>
          {/* <Link href="/about-us" className="opacity-60 hover:opacity-100">
            About us
          </Link> */}
          <Link href="/pricing" className="opacity-60 hover:opacity-100">
            Pricing
          </Link>
          <Link href="/pricing" className="opacity-60 hover:opacity-100">
            FAQ
          </Link>
          <Link href="/contact" className="opacity-60 hover:opacity-100">
            Contact us
          </Link>
          <Link href="/pricing" className="opacity-60 hover:opacity-100">
            Disclaimer
          </Link>
        </div>

        <div className="flex flex-col gap-2 md:w-1/3 w-full md:px-8">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <p className="text-sm opacity-60 max-w-full md:max-w-[50%]">
            Stay connected! Follow us for the latest updates, tips, and
            exclusive content.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Link
              href="https://x.com/dextradingapp"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              <BsTwitterX className="text-[18px]" />
            </Link>
            <Link
              href="https://t.me/dextrading"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              <SiTelegram className="text-[20px]" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/dextrading/"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              <FaLinkedin className="text-[22px]" />
            </Link>
            <Link
              href="https://www.youtube.com/@dextrading"
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              <IoLogoYoutube className="text-[26px]" />
            </Link>
            <Link
              href="https://www.instagram.com/dextrading_com?igsh=MXY4dDEyYTJpcGhyNw=="
              className="opacity-60 hover:opacity-100"
              target="_blank"
            >
              <AiFillInstagram className="text-[26px]" />
            </Link>
          </div>
        </div>

        {/* <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Products</h3>
          <Link href="/about-us" className="opacity-60 hover:opacity-100"></Link>

        </div> */}
      </section>
      {/* <Separator orientation="horizontal" flex /> */}
      <section className="container pb-14 text-center mt-10 flex items-center justify-between">
        <p className="mb-3">
          &copy; {new Date().getFullYear()} DexTrading. All rights reserved.
        </p>
      </section>
    </footer>
  );
};
