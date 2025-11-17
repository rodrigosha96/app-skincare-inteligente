'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ONBOARDING_QUESTIONS, FITZPATRICK_TYPES, generateSkinID, generateSkinDescription, generateInfluencingFactors } from '@/lib/skincare-data';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateProfile();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateProfile = () => {
    setIsGenerating(true);
    
    // Gerar Skin ID
    const skinID = generateSkinID(answers);
    const description = generateSkinDescription(answers);
    const factors = generateInfluencingFactors(answers);
    
    const profile = {
      ...answers,
      skinID: {
        code: skinID,
        description,
        influencingFactors: factors,
        createdAt: new Date().toISOString()
      }
    };
    
    // Salvar no localStorage (em produção, salvar no backend/Supabase)
    localStorage.setItem('dermaflow_profile', JSON.stringify(profile));
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  const handleContinueToPlans = () => {
    router.push('/plans');
  };

  const canProceed = () => {
    if (currentQuestion.id === 'welcome') return true;
    const answer = answers[currentQuestion.id];
    
    // Para respostas múltiplas, verificar se array tem pelo menos 1 item
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    // Para outras respostas, verificar se não é undefined/null
    return answer !== undefined && answer !== null && answer !== '';
  };

  // Tela de resultados
  if (showResults) {
    const profile = JSON.parse(localStorage.getItem('dermaflow_profile') || '{}');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sua rotina de skincare completa para evolução está pronta!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Analisamos sua pele e criamos um plano personalizado com base científica. 
              Agora vamos desbloquear todo o potencial do DermaFlow para você.
            </p>
            
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-8">
              <div className="text-sm font-semibold text-rose-600 mb-2">SEU SKIN ID</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {profile.skinID?.code}
              </div>
              <div className="text-sm text-gray-600">
                {profile.skinID?.description}
              </div>
            </div>
            
            <button
              onClick={handleContinueToPlans}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              Ver planos de assinatura
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analisando sua pele...
            </h2>
            <p className="text-gray-600">
              Estamos criando seu Skin ID único com base científica
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                DermaFlow
              </span>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {currentStep + 1} de {ONBOARDING_QUESTIONS.length}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-10">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {currentQuestion.title}
            </h2>
            <p className="text-lg text-gray-600">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Educational Note */}
          {currentQuestion.educationalNote && (
            <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-sm text-rose-800 leading-relaxed">
                💡 <strong>Dica:</strong> {currentQuestion.educationalNote}
              </p>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.type === 'text' && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  Clique em "Continuar" para começar
                </p>
              </div>
            )}

            {currentQuestion.type === 'single' && currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-rose-500 bg-rose-50 shadow-md'
                    : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {answers[currentQuestion.id] === option.value && (
                    <Check className="w-6 h-6 text-rose-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}

            {currentQuestion.type === 'visual' && currentQuestion.id === 'fitzpatrick' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {FITZPATRICK_TYPES.map((ft) => (
                  <button
                    key={ft.type}
                    type="button"
                    onClick={() => handleAnswer(ft.type)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion.id] === ft.type
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={ft.image} 
                        alt={ft.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">
                          {ft.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {ft.description}
                        </div>
                      </div>
                      {answers[currentQuestion.id] === ft.type && (
                        <Check className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'visual' && currentQuestion.id === 'skin-type' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(option.value)}
                    className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.image}</div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <Check className="w-5 h-5 text-rose-500 mt-2" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiple' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {currentQuestion.options?.map((option) => {
                  const selected = answers[currentQuestion.id] || [];
                  const isSelected = selected.includes(option.value);
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const newSelected = isSelected
                          ? selected.filter((v: string) => v !== option.value)
                          : [...selected, option.value];
                        handleAnswer(newSelected);
                      }}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50 shadow-md'
                          : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-gray-900">
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                      {answers[currentQuestion.id] === option.value && (
                        <Check className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {currentStep === ONBOARDING_QUESTIONS.length - 1 ? 'Finalizar' : 'Continuar'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
