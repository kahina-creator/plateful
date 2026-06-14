import AppShell from '@/components/AppShell'

const filters = ['Tous', 'Rapide', 'Végétarien', 'Faible cal.', 'Sans gluten', 'Batch cooking']

const recipes = [
  { id: 1, name: 'Buddha bowl légumes rôtis', time: '25 min', kcal: 480, tag: 'Végétarien', emoji: '🥗', diff: 'Facile' },
  { id: 2, name: 'Poulet mariné citron-herbes', time: '35 min', kcal: 390, tag: 'Rapide', emoji: '🍋', diff: 'Facile' },
  { id: 3, name: 'Pâtes pesto maison & burrata', time: '20 min', kcal: 560, tag: 'Végétarien', emoji: '🌿', diff: 'Facile' },
  { id: 4, name: 'Saumon en papillote miso', time: '30 min', kcal: 420, tag: null, emoji: '🐟', diff: 'Moyen' },
  { id: 5, name: 'Dahl de lentilles corail', time: '40 min', kcal: 350, tag: 'Végétarien', emoji: '🫘', diff: 'Facile' },
  { id: 6, name: 'Tartare de thon avocat', time: '15 min', kcal: 310, tag: 'Rapide', emoji: '🥑', diff: 'Facile' },
  { id: 7, name: 'Shakshuka aux épices douces', time: '25 min', kcal: 290, tag: 'Végétarien', emoji: '🍳', diff: 'Facile' },
  { id: 8, name: 'Bowl acaï mangue-coco', time: '10 min', kcal: 320, tag: 'Rapide', emoji: '🫐', diff: 'Facile' },
]

const tagColors: Record<string, { bg: string; fg: string }> = {
  'Végétarien': { bg: 'var(--color-green-light)', fg: 'var(--color-green)' },
  'Rapide': { bg: 'var(--color-primary-light)', fg: 'var(--color-primary)' },
  'Sans gluten': { bg: '#FEF9EC', fg: '#A16207' },
  'Faible cal.': { bg: '#F0F4FF', fg: '#3B4FA8' },
}

export default function RecettesPage() {
  return (
    <AppShell>
      <div className="anim-rise">

        {/* Header */}
        <div className="px-4 pt-12 pb-4">
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
          >
            Recettes
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            {recipes.length} recettes sauvegardées
          </p>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div
            className="flex items-center gap-2.5 px-4 h-11 rounded-xl"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted)', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Rechercher une recette…</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 mb-5 overflow-x-auto pf-scroll">
          {filters.map((f, i) => (
            <button
              key={f}
              className="shrink-0 px-4 h-8 rounded-full text-sm font-medium transition-all"
              style={
                i === 0
                  ? { background: 'var(--color-primary)', color: 'white' }
                  : { background: 'var(--color-card)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="px-4 grid grid-cols-2 gap-3 pb-4">
          {recipes.map((r) => {
            const tagStyle = r.tag ? tagColors[r.tag] : null
            return (
              <button
                key={r.id}
                className="text-left rounded-2xl overflow-hidden active:scale-95 transition-transform"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFF3EC 0%, #FDE8D8 100%)' }}
                >
                  <span className="text-4xl">{r.emoji}</span>
                </div>
                <div className="p-3">
                  <p className="text-[13px] font-semibold leading-snug mb-1.5" style={{ color: 'var(--color-text)' }}>
                    {r.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{r.time}</span>
                    <span style={{ color: 'var(--color-border)' }}>·</span>
                    <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{r.kcal} kcal</span>
                  </div>
                  {tagStyle && (
                    <span
                      className="inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: tagStyle.bg, color: tagStyle.fg }}
                    >
                      {r.tag}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* FAB */}
        <button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 z-40"
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
