// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/profile"] }

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    // console.log(req.nextUrl)
    const { token } = req.nextauth
    const { pathname, origin } = req.nextUrl

      // Define protected routes and their required roles
      const protectedRoutes = [
          {
              path: '/dashboard',
              requiredRole: 'admin'
          },
          {
              path: '/donations',
              requiredRole: 'admin'
          },
          {
              path: '/donors',
              requiredRole: 'admin'
          },
          {
              path: '/beneficiaries',
              requiredRole: 'admin'
          }
      ];

      // Find matching protected route
      const protectedRoute = protectedRoutes.find(route =>
          pathname.startsWith(route.path)
      );

      // Check if route requires authentication
      if (!protectedRoute) {
          return NextResponse.next();
      }

      // Handle unauthorized access
      if (!token || token.role !== protectedRoute.requiredRole) {
          return NextResponse.redirect(`${origin}/unauthorized`);
      }

      return NextResponse.next()

    // if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
    //   return NextResponse.redirect(`${origin}/unauthorized`)
    // }
  },
  {
    callbacks: {
      // If `authorized` returns `true`, the middleware function will execute.
      authorized: ({ token }) => !!token
    },
  }
)

export const config = { matcher: ["/profile", "/dashboard/:path*", "/donations/:path*", "/donors/:path*", "/beneficiaries/:path*"] };