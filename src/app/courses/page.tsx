'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'

type Item = { id: number; name: string; qty: string; checked: boolean }
type Category = { name: string; emoji: string; items: Item[] }

const initialCategories: Category[] = [
  {
    name: 'Légumes & Fruits',
    emoji: '🥦',
    items: [
      { id: 1, name: 'Épinards frais', qty: '200g', checked: true },
      { id: 2, name: 'Carottes', qty: '500g', checked: true },
      { id: 3, name: 'Avocat', qty: '× 2', checked: false },
      { id: 4, name: 'Citrons', qty: '× 4', checked: false },
      { id: 5, name: 'Myrtilles', qty: '250g', checked: false },
    ],
  },
  {
    name: 'Protéines',
    emoji: '🥩',
    items: [
      { id: 6, name: 'Poulet (filets)', qty: '600g', checked: false },
      { id: 7, name: 'Saumon frais', qty: '400g', checked: false },
      { id: 8, name: 'Œufs bio', qty: '× 12', checked: true },
      { id: 9, name: 'Pois chiches cuits', qty: '400g', checked: false },
    ],
  },
  {
    name: 'Féculents & Céréales',
    emoji: '🌾',
    items: [
      { id: 10, name: 'Quinoa', qty: '500g', checked: false },
      { id: 11, name: 'Riz basmati', qty: '1 kg', checked: true },
      { id: 12, name: 'Pâtes complètes', qty: '500g', checked: false },
    ],
  },
  {
    name: 'Produits laitiers',
    emoji: '🧀',
    items: [
      { id: 13, name: 'Yaourt grec 0%', qty: '× 4', checked: false },
      { id: 14, name: 'Feta', qty: '200g', checked: false },
    ],
  },
  {
    name: 'Épicerie',
    emoji: '🫙',
    items: [
      { id: 15, name: 'Tahini', qty: '1 pot', checked: false },
      { id: 16, name: 'Sauce soja', qty: '1 bouteille', checked: true },
      { id: 17, name: 'Huile d\'olive extra vierge', qty: '1 L', checked: false },
    ],
  },
]

export default function CoursesPage() {
  const [categories, setCategories] = useState(initialCategories)

  const toggle = (catIdx: number, itemId: number) => {
    setCategories(prev =>
      prev.map((cat, ci) =>
        ci !== catIdx ? cat : {
          ...cat,
          items: cat.items.map(item =>
            item.id !== itemId ? item : { ...item, checked: !item.checked }
          ),
        }
      )
    )
  }

  const allItems = categories.flatMap(c => c.items)
  const checkedCount = allItems.filter(i => i.checked).length
  const totalCount = allItems.length

  return (
    <AppShell>
      <div className="anim-rise">

        {/* Header */}
        <div className="px-4 pt-12 pb-4">
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
          >
            Courses
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            {checkedCount} / {totalCount} articles
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-4 mb-5">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(checkedCount / totalCount) * 100}%`,
                background: 'var(--color-primary)',
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 space-y-5 pb-4">
          {categories.map((cat, catIdx) => {
            const remaining = cat.items.filter(i => !i.checked).length
            return (
              <section key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{cat.emoji}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {cat.name}
                    </span>
                  </div>
                  {remaining > 0 && (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                    >
                      {remaining} restant{remaining > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  {cat.items.map((item, itemIdx) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(catIdx, item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left active:opacity-70 transition-opacity"
                      style={{
                        background: item.checked ? '#FAFAF8' : 'var(--color-card)',
                        borderTop: itemIdx > 0 ? '1px solid var(--color-border)' : 'none',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                        style={
                          item.checked
                            ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' }
                            : { borderColor: 'var(--color-border)' }
                        }
                      >
                        {item.checked && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </span>
                      <span
                        className="flex-1 text-sm transition-colors"
                        style={{
                          color: item.checked ? 'var(--color-muted)' : 'var(--color-text)',
                          textDecoration: item.checked ? 'line-through' : 'none',
                        }}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: 'var(--color-muted)' }}>
                        {item.qty}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
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
