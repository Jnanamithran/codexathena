import PageHero from '@/components/ui/PageHero'
import Reveal   from '@/components/ui/Reveal'

export default function Privacy() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" />
      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">
          <Reveal>
            <div className="border border-border p-8 bg-surface3 text-[0.8rem] text-muted mb-10">
              ⚠ This privacy policy is a placeholder. The final version should be reviewed by a qualified legal professional before the site goes public.
            </div>
            <div className="max-w-[70ch] text-dim leading-[1.85] flex flex-col gap-5 text-[0.9375rem]">
              <p>Last updated: [Date to be confirmed]</p>
              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Information We Collect</h2>
              <p>When you contact Dexena via email or through a contact form, we collect the information you provide, including your name, email address, and any project details you share.</p>
              <p>We do not collect personal data through cookies or tracking scripts beyond what is strictly necessary for the website to function.</p>
              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">How We Use Your Information</h2>
              <p>Information you provide is used solely to respond to your enquiry and, if a project proceeds, to manage that project. We do not sell or share your information with third parties for marketing purposes.</p>
              <h2 className="font-head font-semibold text-offwhite text-[1.25rem] mt-4">Contact</h2>
              <p>If you have questions about how we handle your data, email us at codexathena@gmail.com.</p>
              <p className="text-muted text-[0.8rem] mt-4 italic">[Additional sections — data retention, third-party services, cookies, user rights — to be added by a legal professional.]</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
