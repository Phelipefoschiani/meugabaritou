export interface KiwifyPlanUrls {
  monthly: string;
  quarterly: string;
}

// Configuração centralizada dos links de checkout da Kiwify.
// Substitua as URLs abaixo pelos links oficiais gerados na sua conta Kiwify.
export const KIWIFY_CHECKOUT_URLS: Record<'iniciante' | 'intermediario' | 'avancado', KiwifyPlanUrls> = {
  iniciante: {
    monthly: 'https://pay.kiwify.com.br/iniciante-mensal',
    quarterly: 'https://pay.kiwify.com.br/iniciante-trimestral',
  },
  intermediario: {
    monthly: 'https://pay.kiwify.com.br/intermediario-mensal',
    quarterly: 'https://pay.kiwify.com.br/intermediario-trimestral',
  },
  avancado: {
    monthly: 'https://pay.kiwify.com.br/avancado-mensal',
    quarterly: 'https://pay.kiwify.com.br/avancado-trimestral',
  },
};

export const getKiwifyCheckoutUrl = (
  planId: 'iniciante' | 'intermediario' | 'avancado',
  cycle: 'monthly' | 'quarterly' = 'monthly'
): string => {
  return KIWIFY_CHECKOUT_URLS[planId]?.[cycle] || KIWIFY_CHECKOUT_URLS[planId]?.monthly || 'https://pay.kiwify.com.br';
};

export const openKiwifyCheckout = (
  planId: 'iniciante' | 'intermediario' | 'avancado',
  cycle: 'monthly' | 'quarterly' = 'monthly'
): void => {
  const url = getKiwifyCheckoutUrl(planId, cycle);
  window.open(url, '_blank', 'noopener,noreferrer');
};
