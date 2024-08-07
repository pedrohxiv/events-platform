"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { headerLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isLoaded, isSignedIn } = useUser();

  const pathname = usePathname();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex flex-row items-center gap-2 w-56">
          <Image src="/icons/logo.svg" height={38} width={38} alt="logo" />
          <h1 className="p-bold-20">Events Platform</h1>
        </Link>
        {isSignedIn && (
          <nav className="md:flex-between hidden w-full max-w-xs">
            {headerLinks.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className={cn("flex-center p-medium-16 whitespace-nowrap", {
                  "text-primary-500": pathname === link.route,
                })}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="h-11 w-32 flex items-center justify-end gap-3">
          {isSignedIn ? (
            <>
              <UserButton afterSwitchSessionUrl="/" />
              <Sheet>
                <SheetTrigger className="md:hidden align-middle">
                  <Image
                    src="/icons/menu.svg"
                    height={24}
                    width={24}
                    alt="menu"
                    className="cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="md:hidden flex flex-col gap-6 bg-white">
                  <div className="flex flex-row items-center gap-2 w-56">
                    <Image
                      src="/icons/logo.svg"
                      height={38}
                      width={38}
                      alt="logo"
                    />
                    <h1 className="p-bold-20">Events Platform</h1>
                  </div>
                  <Separator className="border border-gray-50" />
                  <div className="flex flex-col items-start gap-5">
                    {headerLinks.map((link) => (
                      <Link
                        key={link.route}
                        href={link.route}
                        className={cn(
                          "flex-center p-medium-16 whitespace-nowrap",
                          {
                            "text-primary-500": pathname === link.route,
                          }
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : isLoaded ? (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          ) : (
            <Skeleton className="h-11 rounded-full w-[101px]" />
          )}
        </div>
      </div>
    </header>
  );
};
