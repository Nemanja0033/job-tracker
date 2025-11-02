import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="DevConnect"',
        },
      });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const [username, password] = atob(base64Credentials).split(':');

    const expectedUser = process.env.BASIC_AUTH_USER;
    const expectedPass = process.env.BASIC_AUTH_PASS;

    if (username !== expectedUser || password !== expectedPass) {
      return new NextResponse('Invalid credentials', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'], 
};
