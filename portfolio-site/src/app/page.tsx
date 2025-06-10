import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { SkillsSection } from '@/components/sections/skills'
import { ContactSection } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}