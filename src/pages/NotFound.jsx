import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-svh flex flex-col items-center justify-center text-center container-pad">
      <p className="font-head text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-muted mb-4">404</p>
      <h1 className="text-display font-head font-bold mb-4">
        Page not<br /><span className="text-accent">found</span>
      </h1>
      <p className="text-dim text-[1.0625rem] leading-relaxed max-w-[40ch] mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button to="/" size="lg">Back to Home</Button>
    </section>
  )
}
