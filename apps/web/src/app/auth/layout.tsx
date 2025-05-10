import Image from 'next/image'
import { redirect, RedirectType } from 'next/navigation'

import logo from '@/assets/logo.svg'
import { isAuthenticated } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (await isAuthenticated()) {
    redirect('/', RedirectType.replace)
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center gap-16">
        <Image src={logo} alt="" className="size-16 dark:invert" />

        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
