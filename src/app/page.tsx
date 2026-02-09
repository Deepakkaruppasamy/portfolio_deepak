import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PlatformProfiles from '@/components/PlatformProfiles';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageReveal from '@/components/PageReveal';
import FloatingDock from '@/components/FloatingDock';
import DataInsights from '@/components/DataInsights';
import { fetchGitHubRepos } from '@/lib/github';

export default async function Home() {
  // Fetch GitHub repositories on the server
  const githubRepos = await fetchGitHubRepos('Deepakkaruppasamy');

  return (
    <PageReveal>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <PlatformProfiles />
        <Skills />
        <Projects githubRepos={githubRepos} />
        <DataInsights />
        <Achievements />
        <Contact />
        <Footer />
        <FloatingDock />
      </main>
    </PageReveal>
  );
}
