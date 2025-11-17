'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Check, Crown, Zap, ArrowRight } from 'lucide-react';

export default function PlansPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planType: 'free' | 'premium') => {
    setIsProcessing(true);
    
    // Salvar plano escolhido
    const planData = {
      type: planType,
      selectedAt: new Date().toISOString(),
      billingCycle: selectedPlan
    };
    localStorage.setItem('dermaflow_plan', JSON.stringify(planData));
    
    // Redirecionar para dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                DermaFlow
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comece gratuitamente ou desbloqueie todo o potencial do DermaFlow com recursos premium
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedPlan === 'monthly'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setSelectedPlan('annual')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative ${
              selectedPlan === 'annual'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            Anual
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-rose-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Gratuito</h3>
                <p className="text-gray-600 text-sm">Para começar</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                R$ 0
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600 text-sm">Sem cartão de crédito</p>
            </div>

            <ul className="space-y-4 mb-8">
              <FeatureItem text="Questionário completo de pele" />
              <FeatureItem text="Seu Skin ID personalizado" />
              <FeatureItem text="Rotina básica (manhã e noite)" />
              <FeatureItem text="Análise de 3 produtos" />
              <FeatureItem text="Alertas de combinações" />
              <FeatureItem text="Acesso ao blog" />
            </ul>

            <button
              onClick={() => handleSelectPlan('free')}
              disabled={isProcessing}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
            >
              {isProcessing ? 'Processando...' : 'Começar grátis'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              RECOMENDADO
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Premium</h3>
                <p className="text-rose-100 text-sm">Skincare completo</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold mb-2">
                {selectedPlan === 'monthly' ? 'R$ 29,90' : 'R$ 23,90'}
                <span className="text-lg font-normal text-rose-100">/mês</span>
              </div>
              <p className="text-rose-100 text-sm">
                {selectedPlan === 'annual' ? 'R$ 286,80 cobrado anualmente' : 'Cancele quando quiser'}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <FeatureItem text="Tudo do plano gratuito" light />
              <FeatureItem text="Rotinas ilimitadas e dinâmicas" light />
              <FeatureItem text="Análise ilimitada de produtos" light />
              <FeatureItem text="Câmera de evolução com IA" light />
              <FeatureItem text="Modo SOS para crises" light />
              <FeatureItem text="Assistente com voz 24/7" light />
              <FeatureItem text="Comparador de ativos" light />
              <FeatureItem text="Marketplace exclusivo" light />
              <FeatureItem text="Desafios e gamificação" light />
              <FeatureItem text="Suporte prioritário" light />
            </ul>

            <button
              onClick={() => handleSelectPlan('premium')}
              disabled={isProcessing}
              className="w-full py-4 bg-white text-rose-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? 'Processando...' : (
                <>
                  <Zap className="w-5 h-5" />
                  Começar Premium
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-rose-100 text-xs mt-4">
              7 dias de teste grátis • Cancele quando quiser
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Mais de 10.000 mulheres já transformaram sua pele</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 font-medium">Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 font-medium">Dados 100% seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700 font-medium">Suporte dedicado</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${light ? 'text-white' : 'text-emerald-500'}`} />
      <span className={light ? 'text-white' : 'text-gray-700'}>{text}</span>
    </li>
  );
}
