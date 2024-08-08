import Link from "next/link";

import { Button } from "@/components/ui/button";

const notFoundPage = () => {
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain flex flex-col flex-1 items-center justify-center gap-8">
      <h1 className="h1-bold">Page Not Found!</h1>
      <p className="p-regular-20 md:p-regular-24">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg" className="button w-full sm:w-fit">
        <Link href="/">Go to Home</Link>
      </Button>
    </section>
  );
};

export default notFoundPage;
