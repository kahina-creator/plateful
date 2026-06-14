import AppShell from '@/components/AppShell'
import Link from 'next/link'

const meals = [
  {
    slot: 'Petit-déjeuner',
    time: '08h15',
    items: ['Yaourt grec', 'Granola maison', 'Myrtilles'],
    kcal: 340,
    icon: '🌅',
  },
  {
    slot: 'Déjeuner',
    time: '12h45',
    items: ['Poulet rôti', 'Riz basmati', 'Haricots verts'],
    kcal: 620,
    icon: '☀️',
  },
  {
    slot: 'Collation',
    time: '16h00',
    items: ['Pomme', 'Beurre de cacahuète'],
    kcal: 185,
    icon: '🍎',
  },
]

const emptySlot = { slot: 'Dîner', time: null, items: [], kcal: 0, icon: '🌙' }

const totalKcal = meals.reduce((s, m) => s + m.kcal, 0)
const goalKcal = 1900
const progress = Math.min(totalKcal / goalKcal, 1)

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <AppShell>
      <div className="anim-rise px-4 pt-12 pb-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{todayCapitalized}</p>
            <h1
              className="text-2xl mt-0.5 leading-tight"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
            >
              Bonjour, Kahina
            </h1>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text)' }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>

        {/* Calories card */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-80 font-medium">Calories aujourd'hui</p>
              <p className="text-3xl font-semibold mt-0.5">
                {totalKcal} <span className="text-base font-normal opacity-70">/ {goalKcal} kcal</span>
              </p>
            </div>
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="white" strokeWidth="3"
                  strokeDasharray={`${progress * 100} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { label: 'Protéines', val: '82g', pct: 68 },
              { label: 'Glucides', val: '148g', pct: 55 },
              { label: 'Lipides', val: '41g', pct: 72 },
            ].map(({ label, val, pct }) => (
              <div key={label} className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] opacity-75">{label}</span>
                  <span className="text-[10px] font-semibold">{val}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,.25)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: 'white' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3">
          {[
            { label: '+ Repas', href: '/journal', bg: 'var(--color-primary-light)', fg: 'var(--color-primary)' },
            { label: '+ Recette', href: '/recettes', bg: 'var(--color-green-light)', fg: 'var(--color-green)' },
            { label: '+ Article', href: '/courses', bg: '#F5F0E8', fg: '#8B6914' },
          ].map(({ label, href, bg, fg }) => (
            <Link
              key={label}
              href={href}
              className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold transition-opacity active:opacity-70"
              style={{ background: bg, color: fg }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Today's meals */}
        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
            Mes repas du jour
          </h2>
          <div className="space-y-2.5">
            {[...meals, emptySlot].map((meal) => (
              <div
                key={meal.slot}
                className="flex items-center gap-3 p-3.5 rounded-xl"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <span className="text-xl">{meal.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {meal.slot}
                    </span>
                    {meal.time && (
                      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{meal.time}</span>
                    )}
                  </div>
                  {meal.items.length > 0 ? (
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>
                      {meal.items.join(' · ')}
                    </p>
                  ) : (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-border)' }}>Non enregistré</p>
                  )}
                </div>
                {meal.kcal > 0 && (
                  <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--color-primary)' }}>
                    {meal.kcal} kcal
                  </span>
                )}
                {meal.kcal === 0 && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm"
                    style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                  >
                    +
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recipe suggestion */}
        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
            Suggéré pour ce soir
          </h2>
          <Link href="/recettes" className="block">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="h-36 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFF3EC 0%, #FDE8D8 100%)' }}
              >
                <span className="text-6xl">🥗</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[15px]" style={{ color: 'var(--color-text)' }}>
                      Buddha bowl légumes rôtis
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                      Quinoa, pois chiches, avocat, tahini
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: 'var(--color-green-light)', color: 'var(--color-green)' }}
                  >
                    Végé
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    25 min
                  </span>
                  <span>•</span>
                  <span>480 kcal</span>
                  <span>•</span>
                  <span>Facile</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

      </div>
    </AppShell>
  )
}
