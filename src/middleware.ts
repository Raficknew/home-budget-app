import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/:locale(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) {
    await auth.protect();
  }
  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/", "/(pl|en)/:path*"],
};
