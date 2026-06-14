import BottomNav from './BottomNav'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen max-w-sm mx-auto" style={{ background: 'var(--color-bg)' }}>
      <main className="flex-1 overflow-y-auto pf-scroll" style={{ paddingBottom: '72px' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
