'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            DermaFlow
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vinda de volta
            </h1>
            <p className="text-gray-600">
              Entre para continuar sua jornada de skincare
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#f43f5e',
                    brandAccent: '#ec4899',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'white',
                    defaultButtonBackgroundHover: '#f9fafb',
                    defaultButtonBorder: '#e5e7eb',
                    defaultButtonText: '#374151',
                    dividerBackground: '#e5e7eb',
                    inputBackground: 'white',
                    inputBorder: '#e5e7eb',
                    inputBorderHover: '#f43f5e',
                    inputBorderFocus: '#f43f5e',
                    inputText: '#1f2937',
                    inputLabelText: '#374151',
                    inputPlaceholder: '#9ca3af',
                  },
                  space: {
                    spaceSmall: '8px',
                    spaceMedium: '16px',
                    spaceLarge: '24px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  radii: {
                    borderRadiusButton: '9999px',
                    buttonBorderRadius: '9999px',
                    inputBorderRadius: '12px',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                button: 'font-semibold transition-all duration-300 hover:scale-105',
                input: 'transition-all duration-300',
                label: 'font-medium',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Crie uma senha forte',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Cadastrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                  confirmation_text: 'Verifique seu email para confirmar',
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando...',
                  link_text: 'Esqueceu sua senha?',
                  confirmation_text: 'Verifique seu email para redefinir a senha',
                },
                update_password: {
                  password_label: 'Nova senha',
                  password_input_placeholder: 'Nova senha',
                  button_label: 'Atualizar senha',
                  loading_button_label: 'Atualizando...',
                  confirmation_text: 'Senha atualizada com sucesso',
                },
                verify_otp: {
                  email_input_label: 'Email',
                  email_input_placeholder: 'seu@email.com',
                  phone_input_label: 'Telefone',
                  phone_input_placeholder: 'Seu telefone',
                  token_input_label: 'Código',
                  token_input_placeholder: 'Código de verificação',
                  button_label: 'Verificar',
                  loading_button_label: 'Verificando...',
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-rose-600 transition-colors duration-300"
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
