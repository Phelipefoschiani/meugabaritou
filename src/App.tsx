import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CareerTargetSelector } from './components/CareerTargetSelector';
import { SubjectsQuadrantSection } from './components/SubjectsQuadrantSection';
import { ComparisonVsTraditionalSection } from './components/ComparisonVsTraditionalSection';
import { AppFeaturesSection } from './components/AppFeaturesSection';
import { SimuladosSection } from './components/SimuladosSection';
import { PricingSection } from './components/PricingSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { ComparisonTableSection } from './components/ComparisonTableSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { LoginModal } from './components/LoginModal';
import { FreeTrialModal } from './components/FreeTrialModal';
import { PDFPreviewModal } from './components/PDFPreviewModal';
import { StudentPortalView } from './components/StudentPortalView';
import { LoginPage } from './components/LoginPage';
import { FunnelMobile } from './components/FunnelMobile';
import { FloatingActionsWidget } from './components/FloatingActionsWidget';
import { PlanId } from './types';
import { openKiwifyCheckout } from './config/kiwifyConfig';
import { Clock, LogIn, ArrowRight, UserPlus } from 'lucide-react';
import { auth, logoutFirebase } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false);
  
  // User state (regular subscriber or 1-day free trial student)
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phone?: string;
    plan: string;
    planId: string;
    isTrial?: boolean;
  } | null>(null);

  // A página de login é a página principal padrão (ou abre o funil se vier via #funil / #planos)
  const [currentView, setCurrentView] = useState<'login' | 'funnel' | 'portal'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash.includes('funil') || 
        hash.includes('planos') || 
        hash.includes('vendas') || 
        search.includes('funil') || 
        search.includes('vendas')
      ) {
        return 'funnel';
      }
    }
    return 'login';
  });

  // Sincroniza hash do navegador para permitir navegação direta (#funil / #login)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('funil') || hash.includes('planos') || hash.includes('vendas')) {
        setCurrentView('funnel');
      } else if (hash.includes('login')) {
        if (!currentUser) {
          setCurrentView('login');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  // Observa sessão de autenticação ativa do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser && fbUser.email && !currentUser) {
        setCurrentUser({
          name: fbUser.displayName || fbUser.email.split('@')[0] || 'Aluno',
          email: fbUser.email,
          plan: 'Intermediário ⭐ (Pratique + Analise)',
          planId: 'intermediario',
          isTrial: false,
        });
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  const navigateToLogin = () => {
    setCurrentView('login');
    window.location.hash = '#login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToFunnel = () => {
    setCurrentView('funnel');
    window.location.hash = '#funil';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = () => {
    navigateToLogin();
  };

  const handleOpenFreeTrial = () => {
    setIsFreeTrialOpen(true);
  };

  const handleScrollToPlans = () => {
    if (currentView !== 'funnel') {
      navigateToFunnel();
      setTimeout(() => {
        const plansEl = document.getElementById('planos');
        if (plansEl) {
          plansEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const plansEl = document.getElementById('planos');
    if (plansEl) {
      plansEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Redireciona diretamente para o checkout oficial da Kiwify
  const handleOpenCheckout = (planId?: string, cycle?: 'monthly' | 'quarterly') => {
    const targetPlan: PlanId = (planId === 'iniciante' || planId === 'intermediario' || planId === 'avancado')
      ? planId
      : 'intermediario';
    openKiwifyCheckout(targetPlan, cycle || 'monthly');
  };

  const handleLoginSuccess = (user: { name: string; email: string; plan: string; planId: string }) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
    setCurrentView('portal');
  };

  const handleTrialActivated = (trialData: { name: string; email: string; phone?: string }) => {
    setCurrentUser({
      name: trialData.name,
      email: trialData.email,
      phone: trialData.phone,
      plan: 'Teste Grátis 24 Horas',
      planId: 'intermediario',
      isTrial: true,
    });
    setIsFreeTrialOpen(false);
    setCurrentView('portal');
  };

  const handleLogout = () => {
    logoutFirebase();
    setCurrentUser(null);
    navigateToLogin();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-24 md:pb-0">
      
      {/* 1. VISÃO PRINCIPAL: PÁGINA DE LOGIN */}
      {currentView === 'login' && !currentUser && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToFunnel={navigateToFunnel}
          onOpenFreeTrial={handleOpenFreeTrial}
        />
      )}

      {/* 2. ÁREA DO ALUNO (QUANDO LOGADO) */}
      {currentView === 'portal' && currentUser && (
        <>
          <Navbar
            onOpenLogin={handleOpenLogin}
            onOpenFreeTrial={handleOpenFreeTrial}
            currentUser={currentUser}
            onLogout={handleLogout}
            onSwitchToStudentPortal={() => setCurrentView('portal')}
            isInPortal={true}
            onBackToLanding={navigateToFunnel}
          />
          <StudentPortalView
            user={currentUser}
            onBackToFunnel={navigateToFunnel}
            onOpenPDFPreview={() => setIsPDFPreviewOpen(true)}
          />
        </>
      )}

      {/* 3. PÁGINA DO FUNIL DE VENDAS (LINK DIRETO #funil) */}
      {currentView === 'funnel' && (
        <>
          {/* A. LAYOUT MOBILE DEDICADO DO FUNIL (Arquivo: FunnelMobile.tsx) */}
          <div className="block lg:hidden">
            <FunnelMobile
              onOpenLogin={navigateToLogin}
              onOpenFreeTrial={handleOpenFreeTrial}
              onOpenPDFPreview={() => setIsPDFPreviewOpen(true)}
              onScrollToPlans={handleScrollToPlans}
              onOpenCheckout={handleOpenCheckout}
              currentUser={currentUser}
              onLogout={handleLogout}
              onNavigateToPortal={() => setCurrentView('portal')}
            />
          </div>

          {/* B. LAYOUT DESKTOP DO FUNIL (PRIMEIRO QUADRANTE DIRETO NO TOPO + BOTÕES FLUTUANTES) */}
          <div className="hidden lg:block relative">
            <main className="flex-1">
              {/* 1. Hero Impacto & Chamada Principal (Inicia direto no topo) */}
              <HeroSection
                onOpenFreeTrial={handleOpenFreeTrial}
                onOpenPDFPreview={() => setIsPDFPreviewOpen(true)}
              />

              {/* 2. Personalização Instantânea: Seletor de Carreira & Teste Prático */}
              <CareerTargetSelector
                onOpenFreeTrial={handleOpenFreeTrial}
                onOpenPlans={handleScrollToPlans}
              />

              {/* 3. Quantidade de Matérias com Celular e Linhas Conectadas */}
              <SubjectsQuadrantSection />

              {/* 4. Quadro Comparativo: Meu Gabaritou vs Plataformas Tradicionais */}
              <ComparisonVsTraditionalSection
                onOpenPlans={handleScrollToPlans}
              />

              {/* 5. "O que o App Faz" - Overview dos Entregáveis */}
              <AppFeaturesSection
                onOpenPDFPreview={() => setIsPDFPreviewOpen(true)}
                onOpenFreeTrial={handleOpenFreeTrial}
              />

              {/* 6. Simulados Híbridos: PDF Escrito para Imprimir vs Digital na Tela */}
              <SimuladosSection
                onOpenPDFPreview={() => setIsPDFPreviewOpen(true)}
                onOpenCheckout={handleOpenCheckout}
                onOpenFreeTrial={handleOpenFreeTrial}
              />

              {/* 7. Flexibilidade & Multi-dispositivos (PC, Celular, Tablet e Papel) */}
              <SocialProofSection
                onOpenFreeTrial={handleOpenFreeTrial}
              />

              {/* 8. Planos & Preços */}
              <PricingSection
                onSelectPlan={(planId, cycle) => handleOpenCheckout(planId, cycle)}
              />

              {/* 9. Bloco de Garantia: Teste Grátis 1 Dia, Compra Segura Kiwify e Garantia 7 Dias */}
              <GuaranteeSection onOpenFreeTrial={handleOpenFreeTrial} />

              {/* 10. Tabela Comparativa Compacta de Recursos */}
              <ComparisonTableSection
                onSelectPlan={(planId) => handleOpenCheckout(planId)}
              />

              {/* 11. Perguntas Frequentes (FAQ Animado) */}
              <FAQSection />
            </main>

            {/* Footer */}
            <Footer
              onOpenLogin={navigateToLogin}
              onOpenCheckout={handleOpenCheckout}
              onOpenFreeTrial={handleOpenFreeTrial}
            />

            {/* Card Flutuante de Ações Rápidas (Com seletor de estilos interativo) */}
            <FloatingActionsWidget
              onOpenFreeTrial={handleOpenFreeTrial}
              onOpenLogin={navigateToLogin}
              currentUser={currentUser}
              onNavigateToPortal={() => setCurrentView('portal')}
              isMobile={false}
            />

          </div>
        </>
      )}

      {/* Login Modal (Disponível caso acionado em overlay) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToPlans={handleScrollToPlans}
        onOpenFreeTrial={handleOpenFreeTrial}
      />

      {/* 1-Day Free Trial Modal */}
      <FreeTrialModal
        isOpen={isFreeTrialOpen}
        onClose={() => setIsFreeTrialOpen(false)}
        onTrialActivated={handleTrialActivated}
      />

      {/* Printable PDF Simulation & Unlock Modal */}
      <PDFPreviewModal
        isOpen={isPDFPreviewOpen}
        onClose={() => setIsPDFPreviewOpen(false)}
        onSelectPlan={(planId, cycle) => handleOpenCheckout(planId, cycle)}
      />

    </div>
  );
}
