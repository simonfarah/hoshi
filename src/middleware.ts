import { type NextRequest, NextResponse } from 'next/server';
import { verifyRequestOrigin } from 'lucia';

export function middleware(request: NextRequest) {
  if (request.method === 'GET') {
    return NextResponse.next();
  }

  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');

  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse('FORBIDDEN', {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
