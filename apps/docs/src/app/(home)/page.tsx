import type { Metadata } from 'next';
import Link from 'next/link';

import {
  ShieldCheckIcon,
  FileTextIcon,
  PenToolIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documenso - Plataforma de Assinatura Digital',
  description:
    'A plataforma open-source de assinatura de documentos. Envie documentos, colete assinaturas e gerencie seus contratos com total controle e segurança.',
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="mb-20 pt-10 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
          Assinatura de Documentos <br className="hidden sm:block" />
          <span className="text-documenso block mt-2">Simples e Segura</span>
        </h1>
        <p className="text-fd-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed">
          Simplifique seus processos de assinatura. Envie contratos, propostas e acordos para serem assinados digitalmente em segundos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 items-center justify-center rounded-lg px-8 text-base font-semibold transition-colors shadow-lg"
          >
            Criar Conta Grátis
          </Link>
          <Link
            href="/signin"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-12 items-center justify-center rounded-lg border px-8 text-base font-semibold transition-colors"
          >
            Fazer Login
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3 mb-24">
        <div className="bg-fd-card/50 rounded-xl border p-8 shadow-sm">
          <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <PenToolIcon className="size-7" />
          </div>
          <h3 className="mb-3 text-xl font-bold">Assinatura Digital</h3>
          <p className="text-fd-muted-foreground leading-relaxed">
            Assine documentos legalmente válidos de qualquer dispositivo. Suporte para assinaturas manuscritas e certificadas.
          </p>
        </div>

        <div className="bg-fd-card/50 rounded-xl border p-8 shadow-sm">
          <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <FileTextIcon className="size-7" />
          </div>
          <h3 className="mb-3 text-xl font-bold">Gestão de Documentos</h3>
          <p className="text-fd-muted-foreground leading-relaxed">
            Organize seus contratos e acordos em um só lugar. Acompanhe o status de cada documento em tempo real.
          </p>
        </div>

        <div className="bg-fd-card/50 rounded-xl border p-8 shadow-sm">
          <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldCheckIcon className="size-7" />
          </div>
          <h3 className="mb-3 text-xl font-bold">Segurança Total</h3>
          <p className="text-fd-muted-foreground leading-relaxed">
            Seus dados são criptografados e protegidos. Controle total sobre quem acessa e assina seus documentos.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="rounded-2xl bg-fd-accent/10 border border-fd-accent/20 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Pronto para começar?</h2>
        <p className="text-fd-muted-foreground mb-8 max-w-xl mx-auto text-lg">
          Junte-se a milhares de usuários que já simplificaram seus processos de assinatura de documentos.
        </p>
        <Link
          href="/signup"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 items-center gap-2 rounded-lg px-8 text-base font-semibold transition-colors shadow-md"
        >
          Começar Agora
        </Link>
      </div>
    </main>
  );
}
