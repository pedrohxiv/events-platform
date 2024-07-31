import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/uploadthing",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/events(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
  const { redirectToSignIn, userId } = auth();

  if (!isPublicRoute(request) && !userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
