'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  User, 
  Calendar, 
  Droplets, 
  Camera, 
  AlertCircle, 
  BookOpen, 
  Image as ImageIcon,
  ShoppingBag,
  MessageCircle,
  Settings,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import SkinIDCard from '@/components/custom/skin-id-card';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [routineCompleted, setRoutineCompleted] = useState(false);

  useEffect(() => {
    // Verificar se tem perfil
    const savedProfile = localStorage.getItem('dermaflow_profile');
    if (!savedProfile) {
      router.push('/onboarding');
      return;
    }
    
    setProfile(JSON.parse(savedProfile));
    
    // Definir saudação baseada na hora
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // Carregar progresso da rotina
    const savedProgress = localStorage.getItem('dermaflow_routine_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedSteps(progress.completedSteps || []);
      setRoutineCompleted(progress.routineCompleted || false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('dermaflow_profile');
    localStorage.removeItem('dermaflow_routine_progress');
    router.push('/auth/login');
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => {
      const newSteps = prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber];
      
      // Salvar progresso
      localStorage.setItem('dermaflow_routine_progress', JSON.stringify({
        completedSteps: newSteps,
        routineCompleted: false
      }));
      
      return newSteps;
    });
  };

  const completeRoutine = () => {
    setRoutineCompleted(true);
    setCompletedSteps([1, 2, 3, 4, 5]);
    localStorage.setItem('dermaflow_routine_progress', JSON.stringify({
      completedSteps: [1, 2, 3, 4, 5],
      routineCompleted: true
    }));
  };

  const showComingSoon = (feature: string) => {
    alert(`${feature} em breve! 🚀\n\nEstamos trabalhando nesta funcionalidade incrível para você.`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse">
          <Sparkles className="w-12 h-12 text-rose-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pb-20 lg:pb-8">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                DermaFlow
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => showComingSoon('Chat com Assistente')}
                className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => showComingSoon('Configurações')}
                className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {greeting}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Pronta para cuidar da sua pele hoje?
          </p>
        </div>

        {/* Skin ID Card */}
        <div className="mb-8">
          <SkinIDCard skinID={profile.skinID} />
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickActionCard
            icon={<Calendar className="w-6 h-6" />}
            title="Rotina de Hoje"
            description="Ver rotina matinal"
            gradient="from-rose-500 to-pink-500"
            onClick={() => {
              document.getElementById('routine-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <QuickActionCard
            icon={<Droplets className="w-6 h-6" />}
            title="Meus Produtos"
            description="Gerenciar produtos"
            gradient="from-purple-500 to-pink-500"
            onClick={() => showComingSoon('Meus Produtos')}
          />
          <QuickActionCard
            icon={<Camera className="w-6 h-6" />}
            title="Câmera Evolutiva"
            description="Registrar evolução"
            gradient="from-blue-500 to-cyan-500"
            onClick={() => showComingSoon('Câmera Evolutiva')}
          />
          <QuickActionCard
            icon={<AlertCircle className="w-6 h-6" />}
            title="Modo SOS"
            description="Emergência na pele"
            gradient="from-red-500 to-rose-500"
            onClick={() => showComingSoon('Modo SOS')}
          />
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Rotina do Dia */}
          <div id="routine-section" className="lg:col-span-2 bg-white rounded-2xl p-6 border border-rose-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Sua Rotina Matinal
              </h2>
              <span className="text-sm text-gray-500">
                ☀️ Manhã
              </span>
            </div>
            
            {routineCompleted && (
              <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-900">Rotina completa! 🎉</div>
                  <div className="text-sm text-emerald-700">Parabéns! Você cuidou da sua pele hoje.</div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <RoutineStep
                number={1}
                title="Limpeza"
                description="Gel de limpeza suave para pele oleosa"
                time="30 segundos"
                completed={completedSteps.includes(1)}
                onClick={() => toggleStep(1)}
              />
              <RoutineStep
                number={2}
                title="Tônico"
                description="Tônico hidratante sem álcool"
                time="10 segundos"
                completed={completedSteps.includes(2)}
                onClick={() => toggleStep(2)}
              />
              <RoutineStep
                number={3}
                title="Sérum"
                description="Vitamina C 10% - uniformiza tom"
                time="1 minuto"
                completed={completedSteps.includes(3)}
                onClick={() => toggleStep(3)}
              />
              <RoutineStep
                number={4}
                title="Hidratante"
                description="Gel-creme oil-free"
                time="30 segundos"
                completed={completedSteps.includes(4)}
                onClick={() => toggleStep(4)}
              />
              <RoutineStep
                number={5}
                title="Protetor Solar"
                description="FPS 50+ toque seco"
                time="1 minuto"
                completed={completedSteps.includes(5)}
                onClick={() => toggleStep(5)}
              />
            </div>

            <button 
              onClick={completeRoutine}
              disabled={routineCompleted}
              className={`w-full mt-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                routineCompleted
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              {routineCompleted ? 'Rotina completa ✓' : 'Marcar rotina como completa'}
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">7 dias</div>
                  <div className="text-sm text-amber-50">Sequência ativa</div>
                </div>
              </div>
              <p className="text-sm text-amber-50">
                Continue assim! Consistência é a chave para resultados reais.
              </p>
            </div>

            {/* Próxima Missão */}
            <button
              onClick={() => showComingSoon('Câmera Evolutiva')}
              className="w-full bg-white rounded-2xl p-6 border border-rose-100 shadow-sm hover:border-rose-300 hover:shadow-lg transition-all duration-300 text-left"
            >
              <h3 className="font-bold text-gray-900 mb-4">
                🎯 Próxima Missão
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      Registre sua evolução
                    </div>
                    <div className="text-xs text-gray-600">
                      Tire foto semanal para acompanhar resultados
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Dica do Dia */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold">Dica do Dia</h3>
              </div>
              <p className="text-sm text-purple-50 leading-relaxed">
                Aplique o protetor solar 15 minutos antes de sair de casa para melhor absorção e proteção.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-rose-100 lg:hidden z-40">
          <div className="grid grid-cols-5 gap-1 p-2">
            <NavButton icon={<Calendar />} label="Rotina" active onClick={() => {}} />
            <NavButton icon={<Droplets />} label="Produtos" onClick={() => showComingSoon('Meus Produtos')} />
            <NavButton icon={<ImageIcon />} label="Galeria" onClick={() => showComingSoon('Galeria')} />
            <NavButton icon={<BookOpen />} label="Blog" onClick={() => showComingSoon('Blog')} />
            <NavButton icon={<ShoppingBag />} label="Loja" onClick={() => showComingSoon('Marketplace')} />
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickActionCard({ icon, title, description, gradient, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl p-5 border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all duration-300 text-left"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}

function RoutineStep({ number, title, description, time, completed, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-colors duration-300 text-left"
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all duration-300 ${
        completed 
          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white scale-110' 
          : 'bg-white border-2 border-gray-300 text-gray-600'
      }`}>
        {completed ? '✓' : number}
      </div>
      <div className="flex-1">
        <div className={`font-semibold mb-1 ${completed ? 'text-rose-600 line-through' : 'text-gray-900'}`}>
          {title}
        </div>
        <div className="text-sm text-gray-600 mb-1">{description}</div>
        <div className="text-xs text-gray-500">⏱️ {time}</div>
      </div>
    </button>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
        active ? 'text-rose-600' : 'text-gray-600'
      }`}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
