import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { faq } from '@/data/faq'
import { SITE } from '@/data/siteConfig'

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-border ${index === 0 ? 'border-t' : ''}`}>
      <button
        className="w-full flex items-center justify-between gap-6 py-5 text-left font-head text-[1rem] font-medium text-offwhite hover:text-accent transition-colors duration-200 bg-transparent"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {item.q}
        <span className="flex-shrink-0 w-6 h-6 border border-border flex items-center justify-center transition-colors duration-200"
          style={{ borderColor: open ? 'var(--tw-color-accent, #9EFF00)' : undefined }}>
          {open
            ? <Minus size={13} className="text-accent" />
            : <Plus size={13} className="text-muted" />
          }
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[0.9rem] text-dim leading-[1.75] max-w-[65ch]">{item.a}</p>
      )}
    </div>
  )
}

export default function FAQSection({ preview = false }) {
  const items = preview ? faq.slice(0, 5) : faq

  return (
    <section id="faq" className="section-pad bg-surface2">
      <div className="max-w-content mx-auto container-pad">

        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="text-h2 font-head font-semibold">FAQ</h2>
          </div>
        </Reveal>

        <Reveal>
          <div>
            {items.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[0.9rem] text-dim">Have a question that isn't covered here?</p>
          <div className="flex gap-3 flex-wrap">
            <Button href={`mailto:${SITE.email}`} variant="ghost" size="sm">Ask Us Directly</Button>
            {preview && <Button to="/faq" variant="ghost" size="sm">All Questions →</Button>}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
