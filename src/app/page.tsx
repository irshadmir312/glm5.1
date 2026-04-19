'use client'

import { useEffect } from 'react'
import ParticleBackground from '@/components/portfolio/ParticleBackground'
import Navigation from '@/components/portfolio/Navigation'
import HeroSection from '@/components/portfolio/HeroSection'
import PersonalStory from '@/components/portfolio/PersonalStory'
import ModeSelector from '@/components/portfolio/ModeSelector'
import JourneyMap from '@/components/portfolio/JourneyMap'
import ProjectLab from '@/components/portfolio/ProjectLab'
import CaseStudies from '@/components/portfolio/CaseStudies'
import Services from '@/components/portfolio/Services'
import WhyHireMe from '@/components/portfolio/WhyHireMe'
import KillerQuotes from '@/components/portfolio/KillerQuotes'
import IslamicQuotes from '@/components/portfolio/IslamicQuotes'
import SkillsShowcase from '@/components/portfolio/SkillsShowcase'
import Certifications from '@/components/portfolio/Certifications'
import LiveDashboard from '@/components/portfolio/LiveDashboard'
import SkillTesting from '@/components/portfolio/SkillTesting'
import Testimonials from '@/components/portfolio/Testimonials'
import BlogInsights from '@/components/portfolio/BlogInsights'
import GamificationPanel from '@/components/portfolio/GamificationPanel'
import ConnectMe from '@/components/portfolio/ConnectMe'
import AIChatBot from '@/components/portfolio/AIChatBot'
import WhatsAppButton from '@/components/portfolio/WhatsAppButton'
import Footer from '@/components/portfolio/Footer'
import { usePortfolioStore } from '@/store/portfolio'

export default function Home() {
  const { visitSection } = usePortfolioStore()

  useEffect(() => {
    visitSection('home')
  }, [visitSection])

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Navigation />

      <main className="flex-1 relative z-10">
        <HeroSection />

        <div className="divider-gradient" />

        <PersonalStory />

        <div className="divider-gradient" />

        <ModeSelector />

        <div className="divider-gradient" />

        <JourneyMap />

        <div className="divider-gradient" />

        <ProjectLab />

        <div className="divider-gradient" />

        <CaseStudies />

        <div className="divider-gradient" />

        <Services />

        <div className="divider-gradient" />

        <WhyHireMe />

        <div className="divider-gradient" />

        <KillerQuotes />

        <div className="divider-gradient" />

        <IslamicQuotes />

        <div className="divider-gradient" />

        <SkillsShowcase />

        <div className="divider-gradient" />

        <Certifications />

        <div className="divider-gradient" />

        <LiveDashboard />

        <div className="divider-gradient" />

        <SkillTesting />

        <div className="divider-gradient" />

        <Testimonials />

        <div className="divider-gradient" />

        <BlogInsights />

        <div className="divider-gradient" />

        <GamificationPanel />

        <div className="divider-gradient" />

        <ConnectMe />
      </main>

      <WhatsAppButton />
      <AIChatBot />
      <Footer />
    </div>
  )
}
