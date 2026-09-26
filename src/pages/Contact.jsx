import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import PageHero  from '@/components/ui/PageHero'
import Reveal    from '@/components/ui/Reveal'
import Button    from '@/components/ui/Button'
import { SITE }  from '@/data/siteConfig'

const projectTypes = ['Web Development','Full-Stack Development','3D / Blender','Video Editing','Game Development','Multiple Services','Other / Not Sure']
const budgets      = ['Under $500','$500 – $1,500','$1,500 – $5,000','$5,000+','Let\'s discuss']

const FUNCTION_URL = '/api/sendContactEmail'

const inputStyle = {
  width: '100%', background: '#0A0A0A', border: '1px solid #1A1A1A',
  padding: '.875rem 1rem', fontSize: '.9rem', color: '#F7F5F0',
  fontFamily: 'Inter, sans-serif', outline: 'none',
  transition: 'border-color .2s',
}
const labelStyle = {
  display: 'block', fontFamily: 'Space Grotesk', fontSize: '.7rem',
  fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
  color: '#444', marginBottom: '.5rem',
}

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', type:'', budget:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleFocus  = e => e.target.style.borderColor = '#333'
  const handleBlur   = e => e.target.style.borderColor = '#1A1A1A'

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      const res = await fetch(FUNCTION_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name:'', email:'', type:'', budget:'', message:'' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Could not reach the server. Please email us directly.')
    }
  }

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk"
        subtitle={`Reach us at ${SITE.email} or fill in the form — we reply within 24 hours.`}
      />

      <section style={{ padding:'clamp(5rem,10vw,9rem) 0', background:'#0A0A0A' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.25rem,5vw,3rem)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'4rem', alignItems:'start' }}>

            {/* ── Left — contact info ── */}
            <Reveal>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

                <motion.a href={`mailto:${SITE.email}`}
                  whileHover={{ borderColor:'#333' }}
                  style={{ display:'flex',alignItems:'center',gap:'1rem',border:'1px solid #1A1A1A',padding:'1.25rem',textDecoration:'none',transition:'border-color .2s' }}>
                  <div style={{ width:'2.5rem',height:'2.5rem',border:'1px solid #1A1A1A',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <Mail size={16} color="#9A9A9A"/>
                  </div>
                  <div>
                    <p style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'.875rem',marginBottom:'.2rem' }}>Email</p>
                    <p style={{ fontSize:'.8125rem',color:'#666' }}>{SITE.email}</p>
                  </div>
                </motion.a>

                <motion.a href={SITE.fiverr.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ borderColor:'#333' }}
                  style={{ display:'flex',alignItems:'center',gap:'1rem',border:'1px solid #1A1A1A',padding:'1.25rem',textDecoration:'none',transition:'border-color .2s' }}>
                  <div style={{ width:'2.5rem',height:'2.5rem',border:'1px solid #1A1A1A',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <ExternalLink size={16} color="#9A9A9A"/>
                  </div>
                  <div>
                    <p style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'.875rem',marginBottom:'.2rem' }}>Fiverr</p>
                    <p style={{ fontSize:'.8125rem',color:'#666' }}>{SITE.fiverr.handle}</p>
                  </div>
                </motion.a>

                <div style={{ padding:'1.25rem',border:'1px solid #1A1A1A',background:'#060606' }}>
                  <p style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'.875rem',marginBottom:'.5rem' }}>Response time</p>
                  <p style={{ fontSize:'.8375rem',color:'#666',lineHeight:1.7 }}>
                    We typically reply within 24 hours. For urgent projects, email directly at{' '}
                    <a href={`mailto:${SITE.email}`} style={{ color:'#9EFF00',textDecoration:'none' }}>{SITE.email}</a>
                  </p>
                </div>

              </div>
            </Reveal>

            {/* ── Right — form ── */}
            <Reveal delay={100}>
              <AnimatePresence mode="wait">

                {/* Success state */}
                {status === 'success' && (
                  <motion.div key="success"
                    initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    style={{ border:'1px solid #1A3A1A',background:'#060F06',padding:'3rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem',textAlign:'center' }}>
                    <CheckCircle size={40} color="#9EFF00"/>
                    <h3 style={{ fontFamily:'Space Grotesk',fontWeight:700,fontSize:'1.25rem' }}>Message sent!</h3>
                    <p style={{ fontSize:'.9rem',color:'#9A9A9A',lineHeight:1.7 }}>
                      We'll get back to you within 24 hours. Check your inbox for a confirmation email.
                    </p>
                    <button onClick={() => setStatus('idle')}
                      style={{ marginTop:'.5rem',fontFamily:'Space Grotesk',fontSize:'.8rem',fontWeight:600,color:'#9EFF00',background:'none',border:'1px solid #9EFF00',padding:'.5rem 1.25rem',cursor:'pointer' }}>
                      Send another
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {status !== 'success' && (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'1.25rem' }} noValidate>

                    <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }} className="max-sm:grid-cols-1">
                      <div>
                        <label style={labelStyle} htmlFor="name">Name <span style={{ color:'#9EFF00' }}>*</span></label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          placeholder="Your name" style={inputStyle}/>
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="email">Email <span style={{ color:'#9EFF00' }}>*</span></label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          placeholder="you@example.com" style={inputStyle}/>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="type">Project Type</label>
                      <select id="type" name="type" value={form.type} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={{ ...inputStyle, appearance:'none' }}>
                        <option value="">Select a service</option>
                        {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="budget">Budget Range</label>
                      <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={{ ...inputStyle, appearance:'none' }}>
                        <option value="">Select a range</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle} htmlFor="message">Message <span style={{ color:'#9EFF00' }}>*</span></label>
                      <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        placeholder="Tell us about your project..."
                        style={{ ...inputStyle, resize:'vertical', minHeight:130 }}/>
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }}
                        style={{ display:'flex',alignItems:'center',gap:'.75rem',padding:'1rem',border:'1px solid #3A1A1A',background:'#100606',fontSize:'.85rem',color:'#CC6666' }}>
                        <AlertCircle size={16} style={{ flexShrink:0 }}/>
                        {errorMsg}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button type="submit" disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { opacity:.88 } : {}}
                      whileTap={status !== 'loading' ? { scale:.98 } : {}}
                      style={{ width:'100%',padding:'1rem',background: status === 'loading' ? '#4A7A00' : '#9EFF00',
                        color:'#000',fontFamily:'Space Grotesk',fontWeight:700,fontSize:'.9375rem',
                        letterSpacing:'.03em',border:'none',cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        display:'flex',alignItems:'center',justifyContent:'center',gap:'.625rem',
                        transition:'background .2s' }}>
                      {status === 'loading'
                        ? <><Loader size={16} style={{ animation:'spin 1s linear infinite' }}/> Sending…</>
                        : 'Send Message →'
                      }
                    </motion.button>

                    <p style={{ fontSize:'.75rem',color:'#333',textAlign:'center' }}>
                      Or email us directly at{' '}
                      <a href={`mailto:${SITE.email}`} style={{ color:'#555',borderBottom:'1px solid #222' }}>{SITE.email}</a>
                    </p>

                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
