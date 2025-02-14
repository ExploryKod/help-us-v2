import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

  function middleware(req) {
    const { token } = req.nextauth
    const { pathname, origin } = req.nextUrl

    const protectedRoutes = [
      {
        path: '/dashboard',
        requiredRole: ['admin', 'user']
      },
      {
        path: '/donations',
        requiredRole: ['admin']
      },
      {
        path: '/donors',
        requiredRole: ['admin']
      },
      {
        path: '/beneficiaries',
        requiredRole: ['admin']
      },
      {
        path: 'api/donations',
        requiredRole: ['admin']
      },
      {
        path: 'api/donors',
        requiredRole: ['admin']
      },
      {
        path: 'api/beneficiaries',
        requiredRole: ['admin']
      },
      {
        path: '/chat',
        requiredRole: ['admin', 'donor', 'beneficiary']
      }
    ];

    const protectedRoute = protectedRoutes.find(route =>
      pathname.startsWith(route.path)
    );

    if (!protectedRoute) {
      return NextResponse.next();
    }

    if (!token || !protectedRoute.requiredRole.find(role => role === token.role)) {
      return NextResponse.redirect(`${origin}/unauthorized`);
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = { matcher:
        ["/profile",
          "/dashboard/:path*",
          "/donations/:path*",
          "/donors/:path*",
          "/beneficiaries/:path*",
          "/api/donors/:path*,",
          "/api/beneficiaries/:path*,",
          "/api/donations/:path*",] };