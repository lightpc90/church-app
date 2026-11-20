import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Optimistic check only: send signed-out visitors to sign in.
// The real admin-role check happens server-side in the admin page and in every API handler
// (see src/lib/auth.ts and src/lib/api.ts).
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next internals and static files unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
