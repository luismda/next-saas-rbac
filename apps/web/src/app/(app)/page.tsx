import { Header } from '@/components/header'

export default async function HomePage() {
  return (
    <div className="space-y-8 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px]">
        <p className="text-muted-foreground text-sm">Select an organization.</p>
      </main>
    </div>
  )
}
