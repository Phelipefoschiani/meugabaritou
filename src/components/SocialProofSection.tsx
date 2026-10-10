import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Printer, 
  Cloud, 
  Zap, 
  Clock, 
  Flame, 
  Check, 
  TrendingUp, 
  Wifi, 
  Battery, 
  Paperclip,
  Command,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { BrandName } from './BrandName';
import { BrandIcon } from './BrandLogo';

interface SocialProofSectionProps {
  onOpenFreeTrial?: () => void;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = () => {
  const [activeCard, setActiveCard] = useState<'mobile' | 'desktop' | 'paper'>('desktop');
  const [mobileAnswered, setMobileAnswered] = useState<string>('B');

  return (
    <section id="ecossistema" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/90 relative overflow-hidden">
      
      {/* ========================================================================= */}
      {/* FUNDO DINÂMICO COM MOVIMENTO REAL (ONDAS FLUIDAS, ORBS E PARTÍCULAS)     */}
      {/* ========================================================================= */}
      
      {/* 1. Malha Geométrica Sutil no Fundo */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0284c7 1.5px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* 2. Ondas Fluidas em SVG com Movimento Contínuo (Ribbon Waves) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        
        {/* Onda Fluida Superior (Azul / Ciano) */}
        <motion.svg
          className="absolute -top-10 left-0 w-[1800px] h-[340px] opacity-40 text-sky-400"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            x: [0, -120, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M0,160 C320,300 480,40 800,180 C1120,320 1280,80 1440,200 L1440,0 L0,0 Z"
            fill="url(#wave-grad-1)"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Onda Fluida Inferior (Índigo / Esmeralda) */}
        <motion.svg
          className="absolute -bottom-16 -right-20 w-[1900px] h-[360px] opacity-40 text-indigo-400"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            x: [0, 100, 0],
            y: [0, -25, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M0,96 C280,240 560,30 840,160 C1120,290 1300,100 1440,220 L1440,320 L0,320 Z"
            fill="url(#wave-grad-2)"
          />
          <defs>
            <linearGradient id="wave-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </motion.svg>

      </div>

      {/* 3. Grandes Orbs de Luz com Movimento Amplo e Bem Perceptível */}
      <motion.div 
        className="absolute top-8 left-1/6 w-[520px] h-[520px] bg-gradient-to-tr from-sky-400/35 via-blue-300/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        animate={{ 
          x: [0, 70, -50, 0],
          y: [0, -45, 30, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <motion.div 
        className="absolute top-1/4 -right-16 w-[550px] h-[550px] bg-gradient-to-bl from-indigo-400/30 via-cyan-300/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        animate={{ 
          x: [0, -60, 40, 0],
          y: [0, 50, -35, 0],
          scale: [1, 1.12, 0.88, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        className="absolute -bottom-10 left-1/3 w-[500px] h-[450px] bg-gradient-to-r from-emerald-300/30 via-teal-200/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        animate={{ 
          x: [0, 50, -40, 0],
          y: [0, -35, 45, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* 4. Elementos de Movimento Flutuantes (Partículas e Ícones Vivos) */}
      
      {/* Mini Ícone Flutuante Celular */}
      <motion.div 
        className="absolute top-24 left-10 lg:left-24 hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200 shadow-md text-sky-600 pointer-events-none -z-10"
        animate={{
          y: [0, -18, 0],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Smartphone className="w-5 h-5" />
      </motion.div>

      {/* Mini Ícone Flutuante Nuvem com feixe pulsante */}
      <motion.div 
        className="absolute top-20 right-12 lg:right-28 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-indigo-200 shadow-md text-xs font-bold text-indigo-700 pointer-events-none -z-10"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.04, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
      >
        <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Sincronizando...</span>
      </motion.div>

      {/* Mini Folha de Prova Flutuante */}
      <motion.div 
        className="absolute bottom-28 left-8 lg:left-20 hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-200 shadow-md text-emerald-600 pointer-events-none -z-10"
        animate={{
          y: [0, 16, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2
        }}
      >
        <FileCheck2 className="w-5 h-5" />
      </motion.div>

      {/* Partícula Cintilante 1 */}
      <motion.div 
        className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-sky-400/70 blur-xs pointer-events-none -z-10"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.9, 0.3],
          scale: [0.8, 1.4, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Partícula Cintilante 2 */}
      <motion.div 
        className="absolute top-1/3 right-8 w-3.5 h-3.5 rounded-full bg-indigo-400/70 blur-xs pointer-events-none -z-10"
        animate={{
          y: [0, 35, 0],
          opacity: [0.3, 0.85, 0.3],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Partícula Cintilante 3 */}
      <motion.div 
        className="absolute bottom-36 right-16 w-2.5 h-2.5 rounded-full bg-emerald-400/80 blur-xs pointer-events-none -z-10"
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.3, 0.8]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DIRETO (SEM O TEXTO ECOSSISTEMA MULTIPLATAFORMA) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-900 leading-tight">
            <span>Estude no celular, no computador</span>{' '}
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 whitespace-nowrap">
              ou no papel impresso.
            </span>
          </h2>

          <div className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto flex items-center justify-center flex-wrap gap-x-1.5">
            <span>O</span>
            <BrandName theme="blue" />
            <span>acompanha sua rotina com tudo sincronizado em tempo real.</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRID DOS 3 CARDS COM ALTURAS HARMÔNICAS E PROPORÇÕES CORRETAS (WIDESCREEN)*/}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12 items-stretch">
          
          {/* ===================================================================== */}
          {/* 1. CELULAR & APP                                                      */}
          {/* ===================================================================== */}
          <div 
            onClick={() => setActiveCard('mobile')}
            className={`group rounded-3xl p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
              activeCard === 'mobile'
                ? 'bg-white border-2 border-blue-500 shadow-[0_24px_50px_-12px_rgba(37,99,235,0.22)] ring-4 ring-blue-100'
                : 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06)] hover:-translate-y-1'
            }`}
          >
            {/* Topo do Card */}
            <div className="mb-4">
              <div className="flex items-center mb-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-600 font-extrabold">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  No Celular & Web App
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                Praticidade para treinar em qualquer intervalo do dia
              </h3>
            </div>

            {/* PALCO VISUAL DO SMARTPHONE */}
            <div className="flex-1 flex flex-col justify-center items-center py-4 px-3 rounded-2xl bg-gradient-to-b from-sky-50/70 via-blue-50/40 to-sky-100/40 border border-blue-100/70 relative overflow-hidden">
              
              {/* Brilho ambiente */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-300/25 blur-2xl pointer-events-none rounded-full" />

              {/* Smartphone iPhone Pro */}
              <div className="w-[230px] sm:w-[240px] bg-slate-950 rounded-[44px] p-2.5 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.35)] border-[5px] border-slate-900 relative transition-transform duration-300 group-hover:-translate-y-1.5 select-none">
                
                {/* Botões laterais */}
                <div className="absolute -left-[7px] top-20 w-[3px] h-7 bg-slate-700 rounded-l" />
                <div className="absolute -left-[7px] top-30 w-[3px] h-7 bg-slate-700 rounded-l" />
                <div className="absolute -right-[7px] top-24 w-[3px] h-10 bg-slate-700 rounded-r" />

                {/* Ilha Dinâmica */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-1.5 flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-blue-950/80 ring-1 ring-slate-800" />
                </div>

                {/* Tela interna OLED */}
                <div className="bg-slate-50 rounded-[34px] p-3 text-slate-900 overflow-hidden border border-slate-200/90 space-y-2.5">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[9px] font-black text-slate-500 px-1 pt-0.5">
                    <span>09:41</span>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Wifi className="w-2.5 h-2.5" />
                      <Battery className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Header do App */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5 px-0.5">
                    <div className="flex items-center gap-1">
                      <BrandIcon size={14} />
                      <BrandName theme="blue" />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>7 seguidos</span>
                    </div>
                  </div>

                  {/* Card de Questão Mobile */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-extrabold text-blue-600 uppercase">
                      <span>Direito Constitucional</span>
                      <span className="text-slate-400">Q. 06/10</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-900 leading-snug">
                      A inviolabilidade do domicílio autoriza o ingresso noturno em caso de:
                    </p>
                  </div>

                  {/* Alternativas */}
                  <div className="space-y-1.5">
                    <div 
                      onClick={(e) => { e.stopPropagation(); setMobileAnswered('A'); }}
                      className={`p-2 rounded-xl border text-[10px] flex items-center justify-between transition-colors ${
                        mobileAnswered === 'A'
                          ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>A) Investigação policial simples</span>
                    </div>

                    <div 
                      onClick={(e) => { e.stopPropagation(); setMobileAnswered('B'); }}
                      className={`p-2 rounded-xl border text-[10px] flex items-center justify-between transition-colors ${
                        mobileAnswered === 'B'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <strong>B)</strong> Flagrante delito ou socorro
                      </span>
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-black shrink-0" />
                    </div>
                  </div>

                  {/* Feedback Instantâneo */}
                  <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[9.5px] font-bold shadow-sm flex items-center justify-between">
                    <span>✓ Resposta Correta!</span>
                    <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded">Art. 5º CF</span>
                  </div>

                  {/* Home Indicator */}
                  <div className="pt-1 flex justify-center">
                    <div className="w-20 h-1 bg-slate-300 rounded-full" />
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 2. COMPUTADOR: MACBOOK PRO WIDESCREEN REAL (NÃO ESTICADO!)            */}
          {/* ===================================================================== */}
          <div 
            onClick={() => setActiveCard('desktop')}
            className={`group rounded-3xl p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
              activeCard === 'desktop'
                ? 'bg-white border-2 border-indigo-500 shadow-[0_26px_55px_-12px_rgba(79,70,229,0.25)] ring-4 ring-indigo-100 lg:-translate-y-2'
                : 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-indigo-300 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06)] hover:-translate-y-1'
            }`}
          >
            {/* Topo do Card */}
            <div className="mb-4">
              <div className="flex items-center mb-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-indigo-600 font-extrabold">
                  <Laptop className="w-4 h-4 text-indigo-600" />
                  No Computador & Web
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                Imersão total para simulados longos e cronometrados
              </h3>
            </div>

            {/* PALCO DO NOTEBOOK COM MOCKUP WIDESCREEN HORIZONTAL E CHIPS DE SUPORTE */}
            <div className="flex-1 flex flex-col justify-between items-center py-4 px-3 sm:px-4 rounded-2xl bg-gradient-to-b from-indigo-50/70 via-blue-50/40 to-indigo-100/40 border border-indigo-100/70 relative overflow-hidden">
              
              {/* Brilho ambiente */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-indigo-300/25 blur-2xl pointer-events-none rounded-full" />

              {/* Chips Sutis no Topo do Palco para preencher o espaço com valor */}
              <div className="w-full flex items-center justify-between mb-3 z-10">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
                  <Command className="w-3 h-3 text-indigo-600" />
                  <span>Atalhos [A] [B] [C] [D]</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Cronômetro Oficial</span>
                </span>
              </div>

              {/* MacBook Pro Widescreen (Proporção Real 16:10, Elegante e Não Esticado) */}
              <div className="w-full max-w-[330px] my-auto relative transition-transform duration-300 group-hover:-translate-y-1.5 select-none">
                
                {/* Tampa e Tela Widescreen do Laptop */}
                <div className="bg-slate-950 rounded-t-xl p-2 shadow-[0_16px_32px_-6px_rgba(15,23,42,0.35)] border-t border-x border-slate-800">
                  
                  {/* Barra do Navegador */}
                  <div className="flex items-center gap-1.5 pb-2 px-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/90" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/90" />
                    <div className="ml-2 flex-1 bg-slate-800/90 rounded-md px-2 py-0.5 text-[8.5px] text-slate-300 text-center font-mono flex items-center justify-center gap-1">
                      <span className="text-emerald-400">🔒</span>
                      <span>meugabaritou.com.br/simulado</span>
                    </div>
                  </div>

                  {/* Tela interna da plataforma com proporção widescreen ampla */}
                  <div className="bg-slate-50 rounded-lg p-2.5 text-slate-900 space-y-1.5 border border-slate-200">
                    
                    {/* Topo da Prova com Cronômetro */}
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-[9.5px]">
                      <span className="font-black text-indigo-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                        Simulado CEBRASPE Oficial
                      </span>
                      <span className="font-mono font-black text-indigo-900 bg-white px-1.5 py-0.5 rounded border border-indigo-200 flex items-center gap-1 text-[9px] shadow-2xs">
                        <Clock className="w-2.5 h-2.5 text-indigo-600" />
                        <span>01:42:18</span>
                      </span>
                    </div>

                    {/* 3 Métricas Horizontais Compactas */}
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-white p-1 rounded border border-slate-200 shadow-2xs">
                        <div className="text-[7.5px] text-slate-400 font-bold uppercase">Acertos</div>
                        <div className="text-[11px] font-black text-emerald-600">89%</div>
                      </div>
                      <div className="bg-white p-1 rounded border border-slate-200 shadow-2xs">
                        <div className="text-[7.5px] text-slate-400 font-bold uppercase">Média/Q</div>
                        <div className="text-[11px] font-black text-blue-600">1m 30s</div>
                      </div>
                      <div className="bg-white p-1 rounded border border-slate-200 shadow-2xs">
                        <div className="text-[7.5px] text-slate-400 font-bold uppercase">Progresso</div>
                        <div className="text-[11px] font-black text-indigo-600">45/50</div>
                      </div>
                    </div>

                    {/* Questão na tela ampla */}
                    <div className="bg-white p-2 rounded-lg border border-slate-200 text-[9px] space-y-1 shadow-2xs">
                      <div className="flex justify-between items-center text-slate-400 text-[8px] font-bold">
                        <span className="text-slate-700 font-sans">Língua Portuguesa • Sintaxe & Regência</span>
                        <span className="bg-indigo-50 text-indigo-700 px-1 py-0.2 rounded font-bold">Q. 46</span>
                      </div>
                      <div className="p-1 rounded bg-emerald-50 border border-emerald-400 text-emerald-950 font-bold text-[8.5px] flex items-center justify-between">
                        <span>[B] Visava à proteção dos direitos fundamentais</span>
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Base e Chassi de Alumínio do MacBook */}
                <div className="w-[108%] -ml-[4%] h-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl shadow-lg border-t border-slate-600 relative flex justify-center items-start">
                  <div className="w-14 h-1 bg-slate-600/80 rounded-b-sm" />
                </div>

              </div>

              {/* Rodapé Informativo Sutil do Palco */}
              <div className="w-full text-center pt-2">
                <span className="text-[10px] text-indigo-700 font-semibold">
                  Sem mouse: avance questões apertando barra de espaço
                </span>
              </div>

            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3. PAPEL: FORMATO A4 PROPORCIONAL, SEM VAZIO, COM CANETA BIC PRETA    */}
          {/* ===================================================================== */}
          <div 
            onClick={() => setActiveCard('paper')}
            className={`group rounded-3xl p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
              activeCard === 'paper'
                ? 'bg-white border-2 border-emerald-500 shadow-[0_24px_50px_-12px_rgba(16,185,129,0.22)] ring-4 ring-emerald-100'
                : 'bg-white/95 hover:bg-white border border-slate-200/90 hover:border-emerald-300 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06)] hover:-translate-y-1'
            }`}
          >
            {/* Topo do Card */}
            <div className="mb-4">
              <div className="flex items-center mb-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                  <Printer className="w-4 h-4 text-emerald-600" />
                  No Papel (PDF A4)
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                Cadernos diagramados para treinar o dia da prova real
              </h3>
            </div>

            {/* PALCO DO PAPEL COM ALTURA EQUILIBRADA */}
            <div className="flex-1 flex flex-col justify-center items-center py-4 px-3 sm:px-4 rounded-2xl bg-gradient-to-b from-emerald-50/70 via-teal-50/40 to-emerald-100/40 border border-emerald-100/70 relative overflow-hidden">
              
              {/* Brilho ambiente */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-300/25 blur-2xl pointer-events-none rounded-full" />

              {/* Conjunto de Folhas de Prova A4 */}
              <div className="w-[240px] sm:w-[250px] relative transition-transform duration-300 group-hover:-translate-y-1.5 select-none">
                
                {/* Folhas de trás para profundidade */}
                <div className="absolute inset-0 bg-slate-100 rounded-lg transform rotate-2 translate-y-1 shadow-xs border border-slate-300/80 -z-10" />
                <div className="absolute inset-0 bg-slate-50 rounded-lg transform -rotate-1.5 translate-y-0.5 shadow-xs border border-slate-300/70 -z-5" />

                {/* Folha Principal A4 */}
                <div className="bg-white rounded-lg p-3.5 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.14)] border border-slate-300 relative space-y-2">
                  
                  {/* Clipe metálico superior */}
                  <div className="absolute -top-2 left-4 text-slate-400 drop-shadow-xs">
                    <Paperclip className="w-5 h-5 -rotate-45 text-slate-500 fill-slate-300/50" />
                  </div>

                  {/* Carimbo de Prova Oficial */}
                  <div className="absolute top-2 right-2 border border-emerald-600/40 bg-emerald-50 text-emerald-800 rounded px-1.5 py-0.5 text-[7px] font-black uppercase rotate-3 pointer-events-none">
                    OFICIAL FGV
                  </div>

                  {/* Cabeçalho da Folha de Prova */}
                  <div className="border-b-2 border-slate-900 pb-1 pt-1 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-900">CADERNO DE QUESTÕES A4</div>
                      <div className="text-[7.5px] text-slate-500 font-bold uppercase">PROVA SIMULADA • EDIÇÃO IMPRESSA</div>
                    </div>
                    <div className="w-6 h-6 rounded border border-slate-800 flex items-center justify-center font-bold text-[8.5px] bg-slate-50">
                      A4
                    </div>
                  </div>

                  {/* Questão 01 Formatada no Padrão de Concurso */}
                  <div className="space-y-1 text-[8.5px] text-slate-700 font-serif leading-tight">
                    <div className="space-y-0.5">
                      <strong className="text-slate-900 block font-sans text-[8.5px]">QUESTÃO 01 (FGV - 2024)</strong>
                      <p className="text-slate-600">O servidor público perderá o cargo exclusivamente por...</p>
                      <div className="pl-1 text-slate-500 font-sans text-[7.5px] space-y-0.5">
                        <div>(A) processo administrativo disciplinar com ampla defesa...</div>
                        <div>(B) decisão judicial transitada em julgado...</div>
                      </div>
                    </div>

                    {/* Cartão de Respostas Oficial com Bolinhas Preenchidas a Caneta */}
                    <div className="pt-2 border-t border-slate-300 bg-slate-50/90 p-2 rounded border border-slate-200 font-sans">
                      <div className="flex items-center justify-between text-[7.5px] font-black text-slate-900 uppercase mb-1">
                        <span>Cartão-Resposta</span>
                        <span className="text-emerald-700">Caneta Preta</span>
                      </div>

                      {/* Fileiras de bolinhas */}
                      <div className="space-y-1 font-mono text-[7.5px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">01:</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">A</span>
                          <span className="w-3 h-3 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shadow-xs">B</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">C</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">D</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">02:</span>
                          <span className="w-3 h-3 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shadow-xs">A</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">B</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">C</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">D</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">03:</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">A</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">B</span>
                          <span className="w-3 h-3 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shadow-xs">C</span>
                          <span className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center">D</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[7px] text-slate-400 font-mono">
                      <span>Diagramação econômica</span>
                      <span>QR Code de Correção</span>
                    </div>

                  </div>
                </div>

                {/* Caneta Esferográfica Preta Oficial (Bic) sobre o Caderno */}
                <div className="absolute -bottom-2 -right-3 w-32 h-3.5 bg-gradient-to-r from-amber-100 via-white to-slate-900 rounded-full shadow-md border border-slate-400/80 transform -rotate-12 flex items-center justify-between px-1 pointer-events-none">
                  {/* Ponta metálica da caneta */}
                  <div className="w-2.5 h-1.5 bg-amber-400 clip-path-triangle" />
                  <div className="w-12 h-1 bg-slate-900/40 rounded-full" />
                  {/* Tampa preta */}
                  <div className="w-6 h-2.5 bg-slate-950 rounded-r-full border-l border-slate-600 flex items-center">
                    <div className="w-4 h-0.5 bg-slate-500 rounded" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BANNER DE SINCRONIZAÇÃO EM NUVEM: ACABAMENTO PREMIUM E ELEGANTE           */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-800/40 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold">
                <Cloud className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Nuvem Integrada</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Comece no celular. Continue no computador.
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Seu progresso, histórico de acertos e simulados salvos continuam exatamente de onde você parou.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm shadow-xs">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Zero Instalação</span>
              </div>

              <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center gap-2 text-white font-bold text-xs sm:text-sm shadow-xs">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Histórico Unificado</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
