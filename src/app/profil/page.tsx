import AppShell from '@/components/AppShell'

const preferences = ['Végétarien', 'Sans lactose', 'Peu de gluten', 'Faible en sucre']
const allergies = ['Arachides', 'Fruits de mer']

const weekStats = [
  { day: 'L', pct: 88 },
  { day: 'M', pct: 102 },
  { day: 'M', pct: 74 },
  { day: 'J', pct: 95 },
  { day: 'V', pct: 110 },
  { day: 'S', pct: 61 },
  { day: 'D', pct: 0 },
]

const settings = [
  { label: 'Objectif calorique', value: '1 900 kcal', icon: '🎯' },
  { label: 'Notifications', value: 'Activées', icon: '🔔' },
  { label: 'Langue', value: 'Français', icon: '🌍' },
  { label: 'Unités', value: 'Métrique (g, ml)', icon: '📏' },
]

export default function ProfilPage() {
  const goalKcal = 1900
  const avgKcal = Math.round(
    weekStats.filter(d => d.pct > 0).reduce((s, d) => s + (d.pct / 100) * goalKcal, 0) /
    weekStats.filter(d => d.pct > 0).length
  )

  return (
    <AppShell>
      <div className="anim-rise">

        {/* Header / Avatar */}
        <div
          className="px-4 pt-12 pb-8 text-center"
          style={{ background: 'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)' }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-3 shadow-sm"
            style={{ background: 'white', border: '3px solid white' }}
          >
            👩🏻‍🍳
          </div>
          <h1
            className="text-xl font-semibold"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
          >
            Kahina
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
            Membre depuis juin 2025 · Objectif forme
          </p>

          <div className="flex justify-center gap-6 mt-5">
            {[
              { label: 'Recettes', val: '34' },
              { label: 'Semaines', val: '12' },
              { label: 'Streak', val: '7j 🔥' },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{val}</p>
                <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-5 pb-6">

          {/* Weekly calorie chart */}
          <section>
            <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Calories cette semaine
            </h2>
            <div
              className="p-4 rounded-2xl"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-end justify-between gap-1 h-20 mb-2">
                {weekStats.map(({ day, pct }, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col justify-end" style={{ height: '56px' }}>
                      {pct > 0 && (
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${Math.min(pct, 110) / 110 * 56}px`,
                            background: pct > 100 ? 'var(--color-primary)' : '#F4C430',
                            opacity: i === 5 ? 1 : 0.7,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {weekStats.map(({ day }, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 flex justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>Moyenne</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{avgKcal} kcal</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>Objectif</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{goalKcal} kcal</p>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Préférences alimentaires
            </h2>
            <div className="flex flex-wrap gap-2">
              {preferences.map(p => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'var(--color-green-light)', color: 'var(--color-green)' }}
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {allergies.map(a => (
                <span
                  key={a}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: '#FEF2F2', color: '#B91C1C' }}
                >
                  ⚠️ {a}
                </span>
              ))}
            </div>
          </section>

          {/* Settings list */}
          <section>
            <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Paramètres
            </h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {settings.map(({ label, value, icon }, idx) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:opacity-70 transition-opacity"
                  style={{
                    background: 'var(--color-card)',
                    borderTop: idx > 0 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span>{icon}</span>
                  <span className="flex-1 text-sm" style={{ color: 'var(--color-text)' }}>{label}</span>
                  <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{value}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-border)' }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </section>

          {/* Logout */}
          <button
            className="w-full py-3.5 rounded-xl text-sm font-semibold"
            style={{ background: '#FEF2F2', color: '#B91C1C' }}
          >
            Se déconnecter
          </button>

        </div>
      </div>
    </AppShell>
  )
}
