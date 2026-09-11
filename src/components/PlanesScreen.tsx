import React, { useState, useId } from 'react';

interface PlanesScreenProps {
  onOpenSpei: () => void;
  onSubscriptionSuccess: (planName: string) => void;
}

export const PlanesScreen: React.FC<PlanesScreenProps> = ({ onOpenSpei, onSubscriptionSuccess }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'Semilla Esencial' | 'Oasis Urbano Inteligente' | 'Huerto Autónomo Pro'>('Oasis Urbano Inteligente');
  const [cardHolder, setCardHolder] = useState('Elena Romero Soto');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('•••');
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const savePaymentId = useId();

  // Pricing calculations en Pesos Colombianos (COP)
  const priceOasis = billingCycle === 'annual' ? '$31.900 COP' : '$39.900 COP';
  const pricePro = billingCycle === 'annual' ? '$59.900 COP' : '$74.900 COP';
  const periodOasis = billingCycle === 'annual' ? 'Facturado anualmente ($382.800 COP/año)' : 'Facturado mes a mes';
  const periodPro = billingCycle === 'annual' ? 'Facturado anualmente ($718.800 COP/año)' : 'Facturado mes a mes';

  const summaryPrice =
    selectedPlan === 'Semilla Esencial'
      ? '$0 COP'
      : selectedPlan === 'Oasis Urbano Inteligente'
      ? billingCycle === 'annual'
        ? '$382.800 COP /año'
        : '$39.900 COP /mes'
      : billingCycle === 'annual'
      ? '$718.800 COP /año'
      : '$74.900 COP /mes';

  // Calculate trial end date (14 days from now)
  const getTrialEndDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubscriptionSuccess(selectedPlan);
    }, 1200);
  };

  return (
    <main className="pt-20 px-4 max-w-4xl mx-auto pb-32">
      {/* HERO DE VALOR BOTÁNICO */}
      <section className="mt-4 mb-8 relative rounded-xl p-6 sm:p-8 bg-gradient-to-br from-primary-container via-[#163829] to-primary text-on-primary overflow-hidden shadow-[0_12px_32px_-8px_rgba(27,67,50,0.2)]">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-secondary-container/20 pointer-events-none"></div>
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full border border-secondary-container/30 pointer-events-none"></div>
        <div className="absolute right-4 bottom-2 opacity-10 text-secondary-container pointer-events-none">
          <span className="material-symbols-outlined text-[140px]" data-icon="energy_savings_leaf">
            energy_savings_leaf
          </span>
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[11px] font-semibold tracking-wider uppercase mb-3.5">
            <span className="material-symbols-outlined text-sm" data-icon="spa">
              spa
            </span>
            Membresía Cuidado Vital
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5 leading-snug">
            Lleva tu huerto vertical a otro nivel de autonomía
          </h1>
          <p className="text-on-primary-container text-sm sm:text-base leading-relaxed mb-6 font-body">
            Cultiva hierbas aromáticas, brotes y vegetales limpios en casa sin preocuparte por fallos de riego, nutrientes o mantenimiento de tus bombas inteligentes.
          </p>
          {/* Perks Quick Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="material-symbols-outlined text-secondary-fixed text-base" data-icon="cycle">
                cycle
              </span>
              <span>Reposición bimensual orgánica</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="material-symbols-outlined text-secondary-fixed text-base" data-icon="shield">
                shield
              </span>
              <span>Garantía IoT de bombas &amp; sensores</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="material-symbols-outlined text-secondary-fixed text-base" data-icon="psychology">
                psychology
              </span>
              <span>Riego predictivo biófilo</span>
            </div>
          </div>
        </div>
      </section>

      {/* BILLING TOGGLE */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-surface-container-low p-1.5 rounded-full flex items-center shadow-inner border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full font-headline font-semibold text-sm transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Facturación Mensual
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-full font-headline font-semibold text-sm transition-all duration-200 flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span>Facturación Anual</span>
            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-label font-bold px-2 py-0.5 rounded-full uppercase tracking-tight">
              Ahorra 20%
            </span>
          </button>
        </div>
        <p className="text-xs text-outline mt-2 font-label flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-secondary" data-icon="redeem">
            redeem
          </span>
          ¡Plan anual incluye Kit de inicio de semillas orgánicas y sustrato de fibra de coco gratis!
        </p>
      </div>

      {/* SUBSCRIPTION TIERS (BENTO / CARD GRID) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 items-stretch">
        {/* PLAN 1: Semilla Esencial */}
        <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(27,67,50,0.03)] hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label text-[11px] font-semibold tracking-wider text-outline uppercase">
                  Básico
                </span>
                <h2 className="font-headline text-xl font-bold text-primary">Semilla Esencial</h2>
              </div>
              <div className="p-2 rounded-full bg-surface-container-low text-outline">
                <span className="material-symbols-outlined" data-icon="yard">
                  yard
                </span>
              </div>
            </div>
            <div className="mb-5">
              <span className="font-label text-3xl font-bold text-primary tabular-nums">Gratis</span>
              <span className="text-outline text-xs block mt-0.5">Para siempre en tu hogar</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-5">
              Ideal para entusiastas que inician con una sola torre básica de 1 nivel.
            </p>
            <div className="space-y-3 pt-4 border-t border-outline-variant/20 mb-6 text-xs text-on-surface">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Monitoreo básico de humedad y pH en tiempo real</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Control para 1 nivel de huerto (hasta 6 plantas)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Alertas push estándar de tanque vacío</span>
              </div>
              <div className="flex items-start gap-2 text-outline/70">
                <span className="material-symbols-outlined text-base shrink-0" data-icon="remove">
                  remove
                </span>
                <span>Sin IA de riego adaptativo</span>
              </div>
              <div className="flex items-start gap-2 text-outline/70">
                <span className="material-symbols-outlined text-base shrink-0" data-icon="remove">
                  remove
                </span>
                <span>Sin reposición de nutrientes ni semillas</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPlan('Semilla Esencial')}
            className={`w-full py-2.5 rounded-full border text-primary font-headline font-semibold text-sm transition-colors duration-150 ${
              selectedPlan === 'Semilla Esencial'
                ? 'bg-surface-container-high border-primary font-bold'
                : 'border-primary/20 hover:bg-surface-container-low'
            }`}
          >
            {selectedPlan === 'Semilla Esencial' ? 'Plan Seleccionado' : 'Plan Actual'}
          </button>
        </div>

        {/* PLAN 2: Oasis Urbano Inteligente (DESTACADO / POPULAR) */}
        <div className="relative bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between border-2 border-secondary shadow-[0_12px_32px_-4px_rgba(0,108,72,0.15)] ring-4 ring-secondary/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-0.5 rounded-full font-label text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
              star
            </span>
            Más Popular
          </div>
          <div>
            <div className="flex justify-between items-start mb-4 mt-1">
              <div>
                <span className="font-label text-[11px] font-semibold tracking-wider text-secondary uppercase">
                  Recomendado
                </span>
                <h2 className="font-headline text-xl font-bold text-primary">Oasis Urbano Inteligente</h2>
              </div>
              <div className="p-2 rounded-full bg-secondary-container/50 text-secondary">
                <span className="material-symbols-outlined" data-icon="nest_eco_leaf">
                  nest_eco_leaf
                </span>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-baseline gap-1">
                <span className="font-label text-4xl font-bold text-primary tabular-nums">{priceOasis}</span>
                <span className="text-outline text-xs">/ mes</span>
              </div>
              <span className="text-secondary text-xs block font-label font-medium mt-0.5">
                {periodOasis}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-5">
              Cuidado 100% automatizado para departamentos y balcones con hasta 4 niveles de cultivo.
            </p>
            <div className="space-y-3 pt-4 border-t border-outline-variant/20 mb-6 text-xs text-on-surface">
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Automatización multi-nivel (hasta 4 pisos / 24 pods)</span>
              </div>
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Algoritmos predictivos de riego y fotoperíodo por IA</span>
              </div>
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Reposición bimestral de nutrientes ecológicos NPK</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Soporte prioritario para microcontroladores NodeMCU</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Historial telemetry ilimitado de luz, temperatura y humedad</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPlan('Oasis Urbano Inteligente')}
            className="w-full py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm shadow-md hover:bg-primary-container active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>{selectedPlan === 'Oasis Urbano Inteligente' ? 'Plan Seleccionado ✓' : 'Seleccionar Plan Oasis'}</span>
            <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
        </div>

        {/* PLAN 3: Huerto Autónomo Pro / Familias */}
        <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(27,67,50,0.03)] hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label text-[11px] font-semibold tracking-wider text-tertiary uppercase">
                  Todo Incluido
                </span>
                <h2 className="font-headline text-xl font-bold text-primary">Huerto Autónomo Pro</h2>
              </div>
              <div className="p-2 rounded-full bg-tertiary-fixed/30 text-tertiary">
                <span className="material-symbols-outlined" data-icon="diversity_2">
                  diversity_2
                </span>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-baseline gap-1">
                <span className="font-label text-4xl font-bold text-primary tabular-nums">{pricePro}</span>
                <span className="text-outline text-xs">/ mes</span>
              </div>
              <span className="text-tertiary text-xs block font-label font-medium mt-0.5">
                {periodPro}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mb-5">
              Para entusiastas con huertos múltiples, familias y terrazas de alta producción.
            </p>
            <div className="space-y-3 pt-4 border-t border-outline-variant/20 mb-6 text-xs text-on-surface">
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Niveles de huerto ilimitados</span>
              </div>
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Kit anual de recambio de bombas y sensores FC-28</span>
              </div>
              <div className="flex items-start gap-2 font-medium">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 material-symbols-fill" data-icon="check_circle">
                  check_circle
                </span>
                <span>Asesoría botánica agronómica 1-a-1 por videollamada</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Respaldo en nube Blynk IoT Pro con exportación CSV</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0" data-icon="check_circle">
                  check_circle
                </span>
                <span>Suscripción transferible a otros miembros de la familia</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPlan('Huerto Autónomo Pro')}
            className={`w-full py-2.5 rounded-full border text-primary font-headline font-semibold text-sm hover:bg-surface-container-low active:scale-98 transition-all ${
              selectedPlan === 'Huerto Autónomo Pro' ? 'bg-surface-container-high border-primary font-bold' : 'border-primary'
            }`}
          >
            {selectedPlan === 'Huerto Autónomo Pro' ? 'Plan Seleccionado ✓' : 'Seleccionar Plan Pro'}
          </button>
        </div>
      </section>

      {/* CHECKOUT & PAYMENT PLATFORM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* PAYMENT FORM (COL 7) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-lg p-6 sm:p-7 border border-outline-variant/30 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" data-icon="lock">
                lock
              </span>
              <h3 className="font-headline font-bold text-lg text-primary">Método de Pago Seguro</h3>
            </div>
            <span className="text-xs font-label text-outline uppercase tracking-wider">Encriptación 256-bit</span>
          </div>

          {/* Express Pay Gateways */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => alert('Autenticación Apple Pay lista para validar.')}
              className="py-2.5 px-4 rounded-xl border border-outline-variant/50 hover:border-primary flex items-center justify-center gap-2 transition-colors bg-surface-container-low/50 hover:bg-surface-container-lowest"
            >
              <span className="font-headline font-bold text-xs text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-base">file_download</span> Apple Pay
              </span>
            </button>
            <button
              type="button"
              onClick={() => alert('Autenticación Google Pay lista para validar.')}
              className="py-2.5 px-4 rounded-xl border border-outline-variant/50 hover:border-primary flex items-center justify-center gap-2 transition-colors bg-surface-container-low/50 hover:bg-surface-container-lowest"
            >
              <span className="font-headline font-bold text-xs text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-base text-secondary">account_balance_wallet</span> Google Pay
              </span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-4 text-outline font-label text-[11px] uppercase tracking-wider">
              O tarjeta de crédito / débito
            </span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Card Form */}
          <form className="space-y-4" onSubmit={handleCheckout}>
            <div>
              <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-1">
                Titular de la Tarjeta
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm text-on-surface placeholder:text-outline font-body transition-colors"
                placeholder="Nombre como figura en la tarjeta"
                required
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-1">
                Número de Tarjeta
              </label>
              <div className="relative">
                <input
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm font-label tabular-nums text-on-surface placeholder:text-outline transition-colors"
                  placeholder="0000 0000 0000 0000"
                  required
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className="absolute right-3 top-2.5 flex items-center gap-1 text-outline">
                  <span className="material-symbols-outlined text-xl" data-icon="credit_card">
                    credit_card
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-1">
                  Vencimiento
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm font-label tabular-nums text-on-surface transition-colors"
                  placeholder="MM/AA"
                  required
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium mb-1">
                  CVV / CVC
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm font-label tabular-nums text-on-surface transition-colors"
                  maxLength={4}
                  placeholder="123"
                  required
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>

            {/* Other payment alternatives selector */}
            <div className="pt-2 flex items-center justify-between text-xs text-on-surface-variant">
              <label htmlFor={savePaymentId} className="flex items-center gap-2 cursor-pointer">
                <input
                  id={savePaymentId}
                  checked={savePaymentMethod}
                  onChange={(e) => setSavePaymentMethod(e.target.checked)}
                  className="rounded border-outline-variant text-secondary focus:ring-secondary"
                  type="checkbox"
                />
                <span>Guardar método de pago para futuras renovaciones</span>
              </label>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low/80 border border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-secondary" data-icon="account_balance">
                  account_balance
                </span>
                ¿Prefieres transferencia bancaria, PSE o Nequi?
              </span>
              <button
                type="button"
                onClick={onOpenSpei}
                className="text-secondary font-semibold hover:underline cursor-pointer"
              >
                Ver datos
              </button>
            </div>

            {/* SUBMIT CTA */}
            <div className="pt-4">
              <button
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-base shadow-lg shadow-primary/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-secondary-fixed animate-spin">
                      progress_activity
                    </span>
                    <span>Procesando suscripción segura...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-secondary-fixed" data-icon="verified">
                      verified
                    </span>
                    <span>Comenzar prueba gratuita de 14 días</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-outline font-label mt-2.5">
                Sin cobro hoy. Cancela en cualquier momento con 1 solo clic desde tu perfil antes del día 14.
              </p>
            </div>
          </form>
        </div>

        {/* ORDER SUMMARY & TRUST GUARANTEES (COL 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Summary Card */}
          <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/30 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)]">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-4">
              <h3 className="font-headline font-bold text-base text-primary">Resumen de Suscripción</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold uppercase">
                14 Días Gratis
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-on-surface block">Plan {selectedPlan}</span>
                  <span className="text-xs text-outline font-label">
                    {billingCycle === 'annual' ? 'Facturación Anual con 20% Dcto' : 'Facturación Mensual flexible'}
                  </span>
                </div>
                <span className="font-label font-bold text-primary tabular-nums">{summaryPrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" data-icon="inventory_2">
                    inventory_2
                  </span>
                  Kit de Bienvenida de Semillas + Sustrato
                </span>
                <span className="font-label font-bold uppercase">Gratis ($95.000 COP valor)</span>
              </div>
              <div className="flex justify-between items-center text-xs text-outline">
                <span>Período de Prueba (14 Días)</span>
                <span className="font-label tabular-nums">-$0 COP</span>
              </div>
              <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-baseline">
                <div>
                  <span className="font-headline font-bold text-base text-primary block">Total a Pagar Hoy:</span>
                  <span className="text-[11px] text-outline font-label">
                    Primer cobro el <span className="font-semibold">{getTrialEndDate()}</span>
                  </span>
                </div>
                <span className="font-label text-2xl font-bold text-secondary tabular-nums">$0 COP</span>
              </div>
            </div>
          </div>

          {/* Trust Badges & Guarantee */}
          <div className="bg-surface-container-low/60 rounded-lg p-5 border border-outline-variant/20 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-lg material-symbols-fill" data-icon="verified_user">
                  verified_user
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs text-primary">Garantía Vital de 30 Días</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Si tus plantas no prosperan con el algoritmo biófilo, nuestro equipo agrónomo te envía asesoría y nutrientes de reemplazo sin costo alguno.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed/40 text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-lg" data-icon="support_agent">
                  support_agent
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs text-primary">Asistencia Técnica IoT Certificada</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Soporte en línea para conexión WiFi, sensores capacitivos FC-28 y placas NodeMCU ESP8266.
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof Metric Card */}
          <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3.5">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-primary text-secondary-fixed flex items-center justify-center text-xs font-bold font-label">
                ER
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-secondary text-white flex items-center justify-center text-xs font-bold font-label">
                MC
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-tertiary text-white flex items-center justify-center text-xs font-bold font-label">
                AP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
                  star
                </span>
                <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
                  star
                </span>
                <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
                  star
                </span>
                <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
                  star
                </span>
                <span className="material-symbols-outlined text-xs material-symbols-fill" data-icon="star">
                  star
                </span>
                <span className="text-xs font-label font-bold text-on-surface ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Más de <strong className="text-primary font-semibold">4,500 hogares urbanos</strong> cosechando fresco a diario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
