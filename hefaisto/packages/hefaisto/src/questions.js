import { input, select, checkbox, confirm } from '@inquirer/prompts';
import path from 'node:path';

export async function ask(targetDir, detection) {
  const answers = {};

  answers.projectName = await input({
    message: 'Nome do projeto:',
    default: path.basename(targetDir),
  });

  answers.projectType = await select({
    message: 'Tipo de projeto:',
    choices: [
      { name: 'Landing Page', value: 'landing-page' },
      { name: 'SaaS', value: 'saas' },
      { name: 'E-commerce', value: 'e-commerce' },
      { name: 'API / Backend', value: 'api' },
      { name: 'Full-Stack', value: 'full-stack' },
    ],
  });

  if (['landing-page', 'saas', 'full-stack', 'e-commerce'].includes(answers.projectType)) {
    answers.techStack = await select({
      message: 'Tech stack:',
      choices: [
        { name: 'Next.js', value: 'next' },
        { name: 'Nuxt', value: 'nuxt' },
        { name: 'Astro', value: 'astro' },
        { name: 'HTML/CSS/JS puro', value: 'html' },
        { name: 'Deixar o Hefaisto decidir', value: 'hefaisto-decide' },
      ],
    });
  } else {
    answers.techStack = 'hefaisto-decide';
  }

  answers.integrations = await checkbox({
    message: 'Integracoes necessarias:',
    choices: [
      { name: 'CRM (HubSpot, Salesforce, Pipedrive)', value: 'crm' },
      { name: 'Email Marketing (ActiveCampaign, Mailchimp, Klaviyo)', value: 'email' },
      { name: 'Analytics (GA4, Mixpanel, Meta Pixel)', value: 'analytics' },
      { name: 'Pagamento (Stripe, Shopify)', value: 'payment' },
      { name: 'Autenticacao (Auth0, Supabase Auth)', value: 'auth' },
      { name: 'Nenhuma por enquanto', value: 'none' },
    ],
  });

  answers.language = await select({
    message: 'Idioma do framework:',
    choices: [
      { name: 'Portugues', value: 'portuguese' },
      { name: 'English', value: 'english' },
      { name: 'Espanol', value: 'spanish' },
    ],
    default: 'portuguese',
  });

  if (detection.hasHefaistoCore) {
    answers.reinstall = await confirm({
      message: 'Hefaisto ja esta instalado. Reinstalar? (atualiza arquivos do framework)',
      default: false,
    });
    if (!answers.reinstall) {
      answers.abort = true;
    }
  }

  return answers;
}
