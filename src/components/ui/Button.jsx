import { Link } from 'react-router-dom'

const base = 'inline-block font-head font-semibold tracking-wide transition-all duration-200 cursor-pointer'

const variants = {
  primary: 'bg-accent text-black hover:opacity-85 hover:-translate-y-px',
  ghost:   'border border-border text-offwhite hover:border-dim',
  accent:  'border border-accent text-accent hover:bg-accent hover:text-black',
}

const sizes = {
  sm:  'text-[0.8rem] px-4 py-2',
  md:  'text-[0.875rem] px-6 py-3',
  lg:  'text-[0.9375rem] px-8 py-4',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return <Link to={to} className={cls} {...props}>{children}</Link>
  }
  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>
  }
  return (
    <button className={cls} {...props}>{children}</button>
  )
}
