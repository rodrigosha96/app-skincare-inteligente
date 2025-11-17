'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Brain, Heart, TrendingUp, ArrowRight, X } from 'lucide-react';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchDemo = () => {
    setShowVideo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              DermaFlow
            </span>
          </div>
          <Link 
            href="/auth/login"
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Skincare Inteligente + Ciência Biomédica
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Seu skincare explicado,
            <br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              personalizado e evolutivo
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bem-vinda ao cuidado inteligente da sua pele. Ciência + IA + comportamento feminino real para uma jornada de skincare que realmente funciona.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/auth/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={handleWatchDemo}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
            >
              Ver como funciona
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Sparkles className="w-16 h-16 text-rose-500 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Vídeo demonstrativo em breve
                </h3>
                <p className="text-gray-600">
                  Estamos preparando um tour completo pelo DermaFlow
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-rose-500" />}
            title="IA Biomédica"
            description="Análise profunda da sua pele com inteligência artificial e base científica dermatológica"
            gradient="from-rose-500 to-pink-500"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-purple-500" />}
            title="Segurança Primeiro"
            description="Alertas de combinações perigosas, interações de ativos e rotinas emergenciais SOS"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-red-500" />}
            title="Comportamento Real"
            description="Considera estresse, ciclo menstrual, rotina corrida e vida real feminina"
            gradient="from-red-500 to-rose-500"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-emerald-500" />}
            title="Evolução Visível"
            description="Câmera inteligente que analisa textura, manchas e mede a idade da sua pele"
            gradient="from-emerald-500 to-teal-500"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-amber-500" />}
            title="Rotinas Dinâmicas"
            description="Ajusta automaticamente ao clima, ciclo menstrual e estado da sua pele"
            gradient="from-amber-500 to-orange-500"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Consultora 24/7"
            description="Assistente com voz que responde dúvidas com precisão clínica a qualquer hora"
            gradient="from-blue-500 to-cyan-500"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Como funciona
          </h2>
          <p className="text-lg text-gray-600">
            4 passos simples para transformar seu skincare
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <StepCard
            number="1"
            title="Questionário Inteligente"
            description="5 minutos para mapear sua pele, rotina e vida real"
          />
          <StepCard
            number="2"
            title="Seu Skin ID"
            description="Receba sua assinatura única de pele com base científica"
          />
          <StepCard
            number="3"
            title="Rotina Personalizada"
            description="Rotinas matinal, noturna e semanal feitas para você"
          />
          <StepCard
            number="4"
            title="Evolução Contínua"
            description="Acompanhe resultados e ajustes automáticos"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronta para transformar sua pele?
          </h2>
          <p className="text-lg text-rose-50 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de mulheres que já descobriram o poder do skincare inteligente e personalizado.
          </p>
          <Link 
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Começar gratuitamente
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                DermaFlow
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 DermaFlow. Skincare inteligente e personalizado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
          {number}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
