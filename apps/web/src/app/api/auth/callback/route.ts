import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.search = ''

  if (!code) {
    redirectUrl.pathname = '/auth/sign-in'
    redirectUrl.searchParams.set('oauth_error', 'true')

    return NextResponse.redirect(redirectUrl)
  }

  try {
    const { token } = await signInWithGithub({ code })

    const cookiesStore = await cookies()

    cookiesStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookiesStore.get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        cookiesStore.delete('inviteId')
      } catch {}
    }
  } catch (error) {
    redirectUrl.pathname = '/auth/sign-in'
    redirectUrl.searchParams.set('oauth_error', 'true')

    return NextResponse.redirect(redirectUrl)
  }

  redirectUrl.pathname = '/'

  return NextResponse.redirect(redirectUrl)
}
