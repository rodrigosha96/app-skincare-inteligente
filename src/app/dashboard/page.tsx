'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Sparkles, LogOut, User, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      setUser(session.user);

      // Buscar perfil do usuário
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        // Se não tem perfil, redirecionar para onboarding
        router.push('/onboarding');
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              DermaFlow
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-rose-600 transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Bem-vinda ao seu painel personalizado de skincare
          </p>
        </div>

        {/* Profile Card */}
        {profile ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-rose-100 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Seu Skin ID
                </h2>
                <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {profile.skin_id}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Descrição da Pele</h3>
                <p className="text-gray-900">{profile.skin_description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Pele</h3>
                  <p className="text-gray-900 capitalize">{profile.skin_type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Fototipo</h3>
                  <p className="text-gray-900">Tipo {profile.fitzpatrick}</p>
                </div>
              </div>

              {profile.concerns && profile.concerns.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Preocupações</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.concerns.map((concern: string) => (
                      <span
                        key={concern}
                        className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.goals && profile.goals.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Objetivos</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.goals.map((goal: string) => (
                      <span
                        key={goal}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100 mb-8 text-center">
            <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Complete seu perfil
            </h2>
            <p className="text-gray-600 mb-6">
              Responda nosso questionário para receber sua rotina personalizada
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Começar questionário
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            icon={<TrendingUp className="w-8 h-8 text-emerald-500" />}
            title="Rotina Matinal"
            description="Veja sua rotina personalizada para a manhã"
            href="/routines/morning"
            gradient="from-emerald-500 to-teal-500"
          />
          <ActionCard
            icon={<Sparkles className="w-8 h-8 text-purple-500" />}
            title="Rotina Noturna"
            description="Sua rotina de cuidados noturnos"
            href="/routines/night"
            gradient="from-purple-500 to-pink-500"
          />
          <ActionCard
            icon={<Settings className="w-8 h-8 text-blue-500" />}
            title="Configurações"
            description="Atualize suas preferências e perfil"
            href="/settings"
            gradient="from-blue-500 to-cyan-500"
          />
        </div>
      </main>
    </div>
  );
}

function ActionCard({ icon, title, description, href, gradient }: any) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
