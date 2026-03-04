import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import BatchSelection from '@/components/landing/BatchSelection';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-gray-900 to-indigo-900 text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BatchSelection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
