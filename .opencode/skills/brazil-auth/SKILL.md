---
name: brazil-auth
description: Sistema de autenticação híbrida com OTP via SMS/email e segurança multi-fator para SaaS brasileiros
---

# Brazil Auth Skill

## Integrando Padrões de Autenticação Brasileira

Esta skill implementa as melhores práticas de autenticação encontradas nos repositórios analisados, especialmente:

- **OTP via SMS** (inspirado no `Refine UI`)
- **Autenticação híbrida** (email + SMS)
- **Rate limiting automatizado** (do `awesome-saas-boilerplates-and-starter-kits-main`)
- **Segmentação de clientes** (do `Refine-main`)

## Uso Automático

Esta skill é ativada automaticamente quando você menciona:
- "autenticação brasileira"
- "login com SMS"
- "OTP Brasil"
- "segurança brasileira"

## Código Implementado

### src/auth/brazil-otp.ts

```typescript
import { sendSMS, sendEmail } from '@/utils/messaging';

interface OTPConfig {
  phone?: string;
  email: string;
  duration: number; // minutos
}

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (config: OTPConfig) => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + config.duration * 60000);
  
  // Envia via SMS se telefone fornecido
  if (config.phone) {
    await sendSMS(config.phone, `Seu código de acesso é: ${otp}`);
  }
  
  // Sempre envia email para backup
  await sendEmail(config.email, {
    subject: 'Seu código de acesso',
    body: `Seu código de acesso é: ${otp}. Válido até ${expiresAt.toLocaleString()}.`
  });
  
  return { otp, expiresAt };
};
```

### src/auth/brazil-security.ts

```typescript
interface SecurityConfig {
  password: string;
  userId: string;
  ip: string;
  userAgent: string;
}

export const validateBrazilianSecurity = async (config: SecurityConfig) => {
  // Verifica força da senha (regras brasileiras)
  const passwordStrength = validatePassword(config.password);
  
  // Verifica se é novo dispositivo
  const isNewDevice = await checkDeviceSecurity(config.userId, config.ip, config.userAgent);
  
  // Aplica rate limiting específico para Brasil
  await applyBrazilianRateLimit(config.userId);
  
  return {
    passwordStrength,
    isNewDevice,
    requires2FA: isNewDevice,
  };
};
```

## Componentes Prontos

### components/AuthFormBrazil.tsx

```tsx
'use client';

import { useState } from 'react';
import { sendOTP, validateBrazilianSecurity } from '@/auth/brazil-otp';

export function AuthFormBrazil() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      // Envia OTP via SMS e email
      await sendOTP({ phone, email, duration: 5 });
      
      // Valida segurança específica para Brasil
      const security = await validateBrazilianSecurity({
        password: 'senha_do_usuario',
        userId: 'user123',
        ip: 'user_ip',
        userAgent: navigator.userAgent
      });
      
      // Redireciona ou mostra OTP form
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleAuth} className="space-y-4">
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="(11) 99999-9999"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@exemplo.com"
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Enviar Código'}
      </button>
    </form>
  );
}
```

## Integração com NextAuth.js

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { CredentialsProvider } from 'next-auth/providers/credentials';
import { sendOTP, validateOTP } from '@/auth/brazil-otp';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'OTP',
      credentials: {
        phone: { label: 'Telefone', type: 'text' },
        email: { label: 'Email', type: 'email' },
        otp: { label: 'Código', type: 'text' }
      },
      async authorize(credentials) {
        // Valida OTP específico para Brasil
        const isValid = await validateOTP(credentials.otp, credentials.email);
        if (isValid) {
          return { id: 'user123', name: 'Usuário BR' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login-brasil'
  }
});
```