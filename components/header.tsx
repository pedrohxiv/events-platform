import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex flex-row items-center gap-2 w-56">
          <Image src="/icons/logo.svg" height={38} width={38} alt="logo" />
          <h1 className="p-bold-20">Events Platform</h1>
        </Link>
        <div className="flex w-32 justify-end gap-3"></div>
      </div>
    </header>
  );
};
