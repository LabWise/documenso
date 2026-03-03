# Especificação Geral do Sistema Documenso

## 1. Visão Geral
O Documenso é uma plataforma de assinatura eletrônica open-source que permite o envio, assinatura e gestão de documentos digitais de forma segura e verificável. O sistema é construído sobre uma arquitetura moderna (Next.js/Remix, Prisma, PostgreSQL) e foca na transparência e controle dos dados pelo usuário.

## 2. Autenticação e Autorização
O sistema utiliza um módulo de autenticação robusto (`@documenso/auth`) que suporta múltiplos métodos de entrada:
- **Login com Credenciais**: E-mail e senha, com senhas criptografadas (hashing seguro).
- **OAuth**: Integração com provedores externos como Google e GitHub para login rápido.
- **Autenticação de Dois Fatores (2FA)**: Camada extra de segurança via aplicativos autenticadores (TOTP).
- **Gerenciamento de Sessão**: Controle de sessões ativas com possibilidade de revogação remota.

O controle de acesso é baseado em **Times (Teams)** e **Papéis (Roles)**, permitindo que usuários colaborem em documentos compartilhados com diferentes níveis de permissão (Admin, Membro, etc.).

## 3. Upload e Armazenamento de Documentos
O armazenamento de arquivos é abstrato e configurável, suportando múltiplas estratégias para garantir segurança e flexibilidade:

### Mecanismo de Upload
1. **Upload Seguro**: O upload é realizado diretamente para o armazenamento final ou via servidor, garantindo validação de tipo (PDF) e tamanho.
2. **Criptografia**: Os documentos podem ser armazenados de forma criptografada em repouso.

### Provedores de Armazenamento
O sistema suporta oficialmente:
- **S3 Compatible Storage (Recomendado)**: AWS S3, Cloudflare R2, MinIO ou **Supabase Storage**. Esta é a opção mais segura e escalável para produção.
- **Banco de Dados**: Para instâncias menores, arquivos podem ser salvos como `Base64` diretamente no PostgreSQL, embora não recomendado para grandes volumes.

*Nota: O uso do Supabase como provedor de armazenamento é totalmente suportado através da compatibilidade com a API S3.*

## 4. Gestão de Documentos e PDFs
O núcleo do sistema gira em torno do "Envelope" (o pacote de documentos a ser assinado).

### Preparação do Documento
- **Editor de Campos (Drag-and-Drop)**: O remetente carrega o PDF e arrasta campos para as áreas onde os signatários devem interagir.
- **Tipos de Campos Suportados**:
  - **Assinatura**: Área para desenhar/inserir a firma.
  - **Iniciais**: Para rubricar páginas.
  - **Texto/Data/Número**: Para preenchimento de dados cadastrais.
  - **Checkbox/Radio**: Para seleção de opções.

### Identificação da Área de Assinatura
O sistema armazena as coordenadas `(x, y)` e a página de cada campo. No momento da assinatura, o frontend renderiza esses campos exatamente sobre o PDF visualizado, garantindo que a assinatura seja aplicada no local correto.

## 5. Fluxo de Assinatura
O processo de assinatura é flexível e oferece três modalidades para o signatário:

1. **Desenhar (Draw)**: O usuário utiliza o mouse ou touch para desenhar sua assinatura manualmente.
2. **Digitar (Type)**: O usuário digita seu nome e o sistema gera uma representação estilizada (cursiva) da assinatura.
3. **Upload**: O usuário faz o upload de uma imagem (JPG/PNG) de sua assinatura física digitalizada.

### Validação e Segurança
- Cada assinatura é associada a um **Certificado de Conclusão**, que registra IP, User Agent, data e hora da ação.
- O sistema suporta **Ordem de Assinatura**:
  - **Sequencial**: Signatário B só recebe após Signatário A assinar.
  - **Paralela**: Todos recebem e assinam simultaneamente.

## 6. Notificações e Disparo de E-mails
O sistema de notificações é assíncrono e baseado em eventos:

- **Gatilhos**: Envio de documento, documento visualizado, documento assinado, documento concluído.
- **Infraestrutura**: Utiliza `Nodemailer` com suporte a transportes como SMTP (padrão), Resend ou AWS SES.
- **Conteúdo**: Os e-mails contêm links seguros e únicos (tokens) que permitem ao signatário acessar o documento sem necessidade de criar conta na plataforma (para signatários externos).

## 7. Controle de Status (Workflow)
O documento transita por estados definidos no banco de dados (`DocumentStatus`):

1. **DRAFT (Rascunho)**: Em edição pelo remetente.
2. **PENDING (Pendente)**: Enviado, aguardando assinaturas. O sistema monitora individualmente quem já assinou.
3. **COMPLETED (Concluído)**: Todos assinaram. O PDF final é gerado com todas as assinaturas "queimadas" no arquivo e um certificado de auditoria é anexado.
4. **REJECTED (Rejeitado)**: Um signatário recusou assinar (ex: erro no contrato), encerrando o fluxo.

## 8. Cadastro e Criação de Usuários
- **Self-Service**: Usuários podem se cadastrar publicamente (se habilitado).
- **Convite**: Administradores podem convidar membros para seus times via e-mail.
- **Onboarding**: O fluxo de cadastro coleta nome, e-mail e preferência de assinatura inicial.

---
*Este documento reflete a arquitetura atual do sistema Documenso e serve como referência para desenvolvimento e manutenção.*
