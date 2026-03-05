import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import BatchSelection from '@/components/landing/BatchSelection';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
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
