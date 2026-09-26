import PageHero    from '@/components/ui/PageHero'
import Reveal      from '@/components/ui/Reveal'
import Button      from '@/components/ui/Button'
import { posts, categories } from '@/data/blog'
import { SITE }   from '@/data/siteConfig'

function PostCard({ post }) {
  return (
    <Reveal>
      <article className="border border-border bg-surface2 hover:bg-surface3 transition-colors duration-200 overflow-hidden group cursor-pointer">
        {post.cover && (
          <div className="aspect-[16/9] bg-surface3 overflow-hidden">
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[0.65rem] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 border border-border text-muted">{post.category}</span>
            <span className="text-[0.75rem] text-muted">{new Date(post.date).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h3 className="font-head font-semibold text-[1rem] mb-2 group-hover:text-accent transition-colors duration-200">{post.title}</h3>
          <p className="text-[0.85rem] text-dim leading-relaxed mb-4">{post.excerpt}</p>
          <p className="text-[0.75rem] text-muted">{post.author}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Blog() {
  return (
    <>
      <PageHero
        label="Blog"
        title="Thoughts &amp;<br />writing"
        subtitle="Articles from the Dexena team on development, design, 3D, and building things."
      />

      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">

          {posts.length === 0 ? (
            <Reveal>
              <div className="border border-border py-20 px-8 flex flex-col items-center text-center gap-4">
                <span className="text-4xl opacity-20" aria-hidden="true">✎</span>
                <h3 className="font-head font-medium text-[1.125rem] text-dim">No posts yet</h3>
                <p className="text-[0.875rem] text-muted max-w-[38ch] leading-relaxed">
                  Articles will appear here as the Dexena team publishes them. Check back soon.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
