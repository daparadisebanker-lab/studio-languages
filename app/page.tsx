import Cursor from '@/components/ui/Cursor'
import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import TheGap from '@/components/sections/TheGap'
import ElPrograma from '@/components/sections/ElPrograma'
import Languages from '@/components/sections/Languages'
import Curriculum from '@/components/sections/Curriculum'
import Philosophy from '@/components/sections/Philosophy'
import Destinations from '@/components/sections/Destinations'
import Pricing from '@/components/sections/Pricing'
import WhySection from '@/components/sections/WhySection'
import Modality from '@/components/sections/Modality'
import StudioPath from '@/components/sections/StudioPath'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/sections/ContactForm'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <TheGap />
        <ElPrograma />
        <Languages />
        <Curriculum />
        <Philosophy />
        <Destinations />
        <Pricing />
        <WhySection />
        <Modality />
        <StudioPath />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
