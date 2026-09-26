import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import Cursor         from '@/components/ui/Cursor'
import Loader         from '@/components/ui/Loader'
import PageTransition from '@/components/ui/PageTransition'
import Home       from '@/pages/Home'
import About      from '@/pages/About'
import Services   from '@/pages/Services'
import Work       from '@/pages/Work'
import Team       from '@/pages/Team'
import FiverrPage from '@/pages/FiverrPage'
import Contact    from '@/pages/Contact'
import Blog       from '@/pages/Blog'
import FAQ        from '@/pages/FAQ'
import Privacy    from '@/pages/Privacy'
import Terms      from '@/pages/Terms'
import NotFound   from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <PageTransition>
        <main>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work"     element={<Work />} />
            <Route path="/team"     element={<Team />} />
            <Route path="/fiverr"   element={<FiverrPage />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/blog"     element={<Blog />} />
            <Route path="/faq"      element={<FAQ />} />
            <Route path="/privacy"  element={<Privacy />} />
            <Route path="/terms"    element={<Terms />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </main>
      </PageTransition>
      <Footer />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <AppInner />
      </div>
    </BrowserRouter>
  )
}
