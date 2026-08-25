import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Palette, Eye, Sparkles, BarChart3, ClipboardCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { usePortfolioList } from "@/hooks/usePortfolio";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";

import { HeroContent, HeroItem, FadeUp, SectionHeader, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { TypingHeading } from "@/components/ui/typing-heading";
import HeroSlider from "@/components/HeroSlider";

const Index = () => {
  const {
    data: portfolio,
    isLoading: portfolioLoading
  } = usePortfolioList();
  const featuredPortfolio = portfolio?.slice(0, 6) || [];
  return <Layout hasHero>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <HeroSlider />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Content */}
        <div className="container relative z-10 text-center">
          <HeroContent className="flex flex-col gap-[15px] max-w-5xl mx-auto items-center">
            {/* Text Group */}
            <div className="flex flex-col gap-[10px]">
              <HeroItem>
                <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/70">Filmmaker | Photographer</p>
              </HeroItem>
              <HeroItem>
                <TypingHeading />
              </HeroItem>
              <HeroItem>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">Creating memorable content.</p>
              </HeroItem>
            </div>
            {/* Button */}
            <HeroItem>
              <Link to="/portfolio" className="inline-flex items-center gap-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:gap-4 px-8 py-3.5">
                All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </HeroItem>
          </HeroContent>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="bg-black text-white pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-2">
                  Selected Work
                </p>
                <h2 className="text-3xl md:text-4xl tracking-tight font-normal">
                  Portfolio
                </h2>
              </div>
              <Link to="/portfolio" className="text-sm font-medium tracking-wide uppercase text-white/70 hover:text-white transition-colors">
                View All
              </Link>
            </div>
          </FadeUp>

          {portfolioLoading ? <div className="aspect-[4/5] w-[65%] sm:w-[48%] lg:w-[38%] xl:w-[32%] rounded-3xl bg-white/10 animate-pulse" /> : featuredPortfolio.length > 0 ? <FadeUp>
              <PortfolioSlider projects={featuredPortfolio} />
            </FadeUp> : <div className="text-center py-20 text-white/60">
              <p>No portfolio items yet. Add some in Lovable Cloud.</p>
            </div>}
        </div>
      </section>

      {/* About Section */}
      <section className="pt-8 md:pt-10 pb-12 md:pb-16 bg-black text-white">
        <div className="container">
          {/* Section Header */}
          <SectionHeader className="text-center mb-8">
            {/* Lightning Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/60 mb-3">
              ABOUT
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight mb-3 font-normal lg:text-4xl">
              Marcos Alex
            </h2>
          </SectionHeader>

          {/* Features Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Seamless Collaboration */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  EXPERIENCE
                </span>
                <h3 className="text-xl mb-3 font-normal">Seamless Experience</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Delivered 50+ projects driving tangible results for companies
                </p>
              </div>
            </StaggerItem>

            {/* Design Solutions */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Design
                </span>
                <h3 className="text-xl mb-3 font-normal">Design Solutions</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Improved 30+ user experiences for satisfaction.
                </p>
              </div>
            </StaggerItem>

            {/* Boosted Brand Visibility */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  STORYTELLING
                </span>
                <h3 className="text-xl mb-3 font-normal">Visual Storytelling</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  95% customer satisfaction rate
                </p>
              </div>
            </StaggerItem>

            {/* Brand Impact */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Impact
                </span>
                <h3 className="text-xl mb-3 font-normal">Brand Impact</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Creating memorable brand experiences that resonate with audiences
                </p>
              </div>
            </StaggerItem>

            {/* Data-Driven Insights */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  QUALITY
                </span>
                <h3 className="text-xl mb-3 font-normal">Uncompromising Quality</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Analyzed user behavior for a 25% engagement boost.
                </p>
              </div>
            </StaggerItem>

            {/* Agile Management */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Management
                </span>
                <h3 className="text-xl mb-3 font-normal">Agile Management</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Led teams to achieve milestones early.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </Layout>;
};
export default Index;
