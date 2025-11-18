'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ONBOARDING_QUESTIONS, generateSkinID, generateSkinDescription, generateInfluencingFactors } from '@/lib/skincare-data';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth/login');
      return;
    }
    setUser(session.user);
  }

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const isLastStep = currentStep === ONBOARDING_QUESTIONS.length - 1;
  const canProceed = !currentQuestion.required || answers[currentQuestion.id];

  function handleAnswer(value: any) {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  }

  function handleMultipleAnswer(value: string) {
    const current = answers[currentQuestion.id] || [];
    const newValue = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: newValue
    }));
  }

  function handleNext() {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }

  async function handleSubmit() {
    if (!user) return;

    setLoading(true);
    try {
      const skinId = generateSkinID(answers);
      const skinDescription = generateSkinDescription(answers);
      const influencingFactors = generateInfluencingFactors(answers);

      const profileData = {
        user_id: user.id,
        skin_id: skinId,
        skin_description: skinDescription,
        skin_type: answers['skin-type'] || '',
        fitzpatrick: answers.fitzpatrick || '',
        sensitivity: answers.sensitivity || '',
        concerns: answers.concerns || [],
        acne_level: answers['acne-level'] || '',
        lifestyle_stress: answers['lifestyle-stress'] || '',
        menstrual_cycle: answers['menstrual-cycle'] || '',
        sun_exposure: answers['sun-exposure'] || '',
        goals: answers.goals || [],
        budget: answers.budget || '',
        influencing_factors: influencingFactors,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Passo {currentStep + 1} de {ONBOARDING_QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-rose-600">
              {Math.round(((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {currentQuestion.title}
            </h2>
            {currentQuestion.subtitle && (
              <p className="text-gray-600 text-lg">
                {currentQuestion.subtitle}
              </p>
            )}
          </div>

          {/* Question Content */}
          <div className="space-y-4 mb-8">
            {currentQuestion.type === 'text' && (
              <div className="text-center py-8">
                <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Clique em "Continuar" para começar
                </p>
              </div>
            )}

            {currentQuestion.type === 'single' && currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id] === option.value && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
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
                </div>
              </button>
            ))}

            {currentQuestion.type === 'multiple' && currentQuestion.options?.map((option) => {
              const isSelected = (answers[currentQuestion.id] || []).includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleMultipleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="font-medium text-gray-900">
                      {option.label}
                    </div>
                  </div>
                </button>
              );
            })}

            {currentQuestion.type === 'visual' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    {typeof option.image === 'string' && option.image.startsWith('http') ? (
                      <img
                        src={option.image}
                        alt={option.label}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="text-4xl mb-3">{option.image}</div>
                    )}
                    <div className="font-semibold text-gray-900 text-sm mb-1">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-xs text-gray-600">
                        {option.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Educational Note */}
          {currentQuestion.educationalNote && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-blue-900">
                💡 <strong>Dica:</strong> {currentQuestion.educationalNote}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-rose-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : isLastStep ? (
                <>
                  Finalizar
                  <Check className="w-5 h-5" />
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
