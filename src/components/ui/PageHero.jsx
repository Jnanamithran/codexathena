import SectionLabel from './SectionLabel'

export default function PageHero({ label, title, subtitle, children }) {
  return (
    <section className="pt-40 pb-20 border-b border-border">
      <div className="max-w-content mx-auto container-pad">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="text-display font-head font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && (
          <p className="text-lg text-dim max-w-[50ch] font-light leading-[1.75]">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}
