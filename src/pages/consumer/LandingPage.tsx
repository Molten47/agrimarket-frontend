import LandingHero from './landing/LandingHero'
import LandingStats from './landing/LandingStats'
import LandingMission from './landing/LandingMission'
import LandingHowItWorks from './landing/LandingHowItWorks'
import LandingTestimonials from './landing/LandingTestimonials'
import LandingFeatures from './landing/LandingFeatures'
import LandingCounties from './landing/LandingCounties'
import LandingCommunity from './landing/LandingCommunity'
import LandingFindFarms from './landing/LandingFindFarms'
import LandingFarmerCTA from './landing/LandingFarmerCTA'
import LandingFooter from './landing/LandingFooter'

export default function LandingPage() {
  return (
    <>
      <LandingHero />           {/* id="hero"         */}
      <LandingStats />
      <LandingMission />        {/* id="mission"      */}
      <LandingHowItWorks />     {/* id="how"          */}
      <LandingTestimonials />   {/* id="testimonials" */}
      <LandingFeatures />
      <LandingCounties />
      <LandingCommunity />      {/* id="community"    */}
      <LandingFindFarms />      {/* id="farms"        */}
      <LandingFarmerCTA />
      <LandingFooter />
    </>
  )
}