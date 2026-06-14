import AppShell from '@/components/AppShell'

const weekDays = [
  { short: 'L', day: 9, active: false },
  { short: 'M', day: 10, active: false },
  { short: 'M', day: 11, active: false },
  { short: 'J', day: 12, active: false },
  { short: 'V', day: 13, active: false },
  { short: 'S', day: 14, active: true },
  { short: 'D', day: 15, active: false },
]

const entries = [
  {
    slot: 'Petit-déjeuner',
    time: '08h15',
    emoji: '🌅',
    kcal: 340,
    items: [
      { name: 'Yaourt grec 0%', kcal: 90, qty: '150g' },
      { name: 'Granola maison', kcal: 180, qty: '45g' },
      { name: 'Myrtilles fraîches', kcal: 70, qty: '100g' },
    ],
  },
  {
    slot: 'Déjeuner',
    time: '12h45',
    emoji: '☀️',
    kcal: 620,
    items: [
      { name: 'Poulet rôti', kcal: 260, qty: '180g' },
      { name: 'Riz basmati cuit', kcal: 240, qty: '200g' },
      { name: 'Haricots verts vapeur', kcal: 45, qty: '150g' },
      { name: 'Huile olive', kcal: 75, qty: '1 c.s.' },
    ],
  },
  {
    slot: 'Collation',
    time: '16h00',
    emoji: '🍎',
    kcal: 185,
    items: [
      { name: 'Pomme granny smith', kcal: 80, qty: '150g' },
      { name: 'Beurre de cacahuète', kcal: 105, qty: '15g' },
    ],
  },
]

const totalKcal = entries.reduce((s, e) => s + e.kcal, 0)
const goalKcal = 1900

export default function JournalPage() {
  return (
    <AppShell>
      <div className="anim-rise">

        {/* Header */}
        <div className="px-4 pt-12 pb-4">
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
          >
            Journal
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Semaine du 9 au 15 juin</p>
        </div>

        {/* Week strip */}
        <div className="px-4 mb-5">
          <div
            className="flex justify-between p-3 rounded-2xl"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
          >
            {weekDays.map(({ short, day, active }) => (
              <button
                key={day}
                className="flex flex-col items-center gap-1.5 w-9"
              >
                <span className="text-[11px] font-medium" style={{ color: 'var(--color-muted)' }}>{short}</span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={
                    active
                      ? { background: 'var(--color-primary)', color: 'white' }
                      : { color: 'var(--color-text)' }
                  }
                >
                  {day}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily summary */}
        <div className="px-4 mb-5">
          <div
            className="p-4 rounded-2xl"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs opacity-75 mb-0.5">Total de la journée</p>
                <p className="text-2xl font-semibold">
                  {totalKcal} <span className="text-sm font-normal opacity-70">/ {goalKcal} kcal</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75 mb-0.5">Restant</p>
                <p className="text-xl font-semibold">{goalKcal - totalKcal}</p>
              </div>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,.3)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min(totalKcal / goalKcal * 100, 100)}%`, background: 'white' }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs opacity-80">
              {[
                { label: 'P', val: '82g' },
                { label: 'G', val: '148g' },
                { label: 'L', val: '41g' },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center gap-1">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: 'rgba(255,255,255,.25)' }}
                  >
                    {label}
                  </span>
                  <span className="font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meal entries */}
        <div className="px-4 space-y-4 pb-4">
          {entries.map((entry) => (
            <div key={entry.slot}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{entry.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {entry.slot}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{entry.time}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {entry.kcal} kcal
                </span>
              </div>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--color-border)' }}
              >
                {entry.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2.5"
                    style={{
                      background: 'var(--color-card)',
                      borderTop: idx > 0 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <div>
                      <p className="text-sm" style={{ color: 'var(--color-text)' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{item.qty}</p>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{item.kcal} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Empty dinner slot */}
          <button
            className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          >
            <span>🌙</span>
            <span className="text-sm">Ajouter le dîner</span>
            <span
              className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              +
            </span>
          </button>
        </div>

        {/* FAB */}
        <button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform"
          style={{ background: 'var(--color-primary)', color: 'white' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

      </div>
    </AppShell>
  )
}
