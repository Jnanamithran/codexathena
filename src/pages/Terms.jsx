import PageHero from '@/components/ui/PageHero'
import Reveal   from '@/components/ui/Reveal'

export default function Terms() {
  return (
    <>
      <PageHero label="Legal" title="Terms of Service" />
      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">
          <Reveal>
            <div className="border border-border p-8 bg-surface3 text-[0.8rem] text-muted mb-10">
              ⚠ These terms are a placeholder. The final version should be reviewed by a qualified legal professional before the site goes public.
            </div>
            <div className="max-w-[70ch] text-dim leading-[1.85] flex flex-col gap-5 text-[0.9375rem]">
              <p>Last updated: [Date to be confirmed]</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Services</h2>
              <p>Dexena provides digital services including web development, full-stack development, 3D modeling, video editing, and game development. The scope of each engagement is agreed upon in writing before work begins.</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Project Agreements</h2>
              <p>Each project begins with a clear agreement on scope, deliverables, timeline, and payment. We do not begin billable work until this is confirmed by both parties.</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Intellectual Property</h2>
              <p>Upon full payment, the client receives ownership of all deliverables produced specifically for their project. Dexena retains the right to display work in its portfolio unless explicitly agreed otherwise.</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Payments</h2>
              <p>Payment terms are agreed on a per-project basis. Work through Fiverr follows Fiverr's payment and dispute resolution policies.</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Limitation of Liability</h2>
              <p>Dexena is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.</p>

              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Contact</h2>
              <p>Questions about these terms? Email us at codexathena@gmail.com.</p>

              <p className="text-muted text-[0.8rem] mt-4 italic">[Additional clauses — revisions policy, confidentiality, governing law — to be added by a legal professional.]</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
