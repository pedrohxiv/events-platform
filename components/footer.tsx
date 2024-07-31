import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="flex flex-row items-center gap-2 w-56">
          <Image src="/icons/logo.svg" height={38} width={38} alt="logo" />
          <h1 className="p-bold-20">Events Platform</h1>
        </Link>
        <p className="text-grey-500">
          &copy; 2023 Events Platform. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
