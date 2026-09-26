export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`font-head text-[0.7rem] font-medium tracking-[0.12em] uppercase text-muted mb-3 ${className}`}>
      {children}
    </p>
  )
}
