// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Next.js internals (_next)
     * - Static files (images, fonts, etc.)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};