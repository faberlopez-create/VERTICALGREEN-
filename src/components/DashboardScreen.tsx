import React from 'react';
import { PlantLevel } from '../types';

interface DashboardScreenProps {
  levels: PlantLevel[];
  reservoirVolume: number;
  onOpenRefill: () => void;
  onOpenCalibrate: () => void;
  onAdjustSchedule: (level: PlantLevel) => void;
  onStartBreathing: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  levels,
  reservoirVolume,
  onOpenRefill,
  onOpenCalibrate,
  onAdjustSchedule,
  onStartBreathing,
}) => {
  const reservoirCapacity = 4.0;
  const reservoirPct = Math.min(100, Math.round((reservoirVolume / reservoirCapacity) * 100));
  const estimatedDays = (reservoirVolume * 1.875).toFixed(0);

  return (
    <main className="max-w-md mx-auto pt-20 px-4 space-y-6">
      {/* Card: Resumen de Bienestar & Salud Global */}
      <section className="mt-2 bg-surface-container-lowest rounded-lg p-5 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)] border border-primary-container/5 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-secondary-container/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[11px] font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm fill-icon" data-icon="eco">
                eco
              </span>
              Vitalidad Biófila
            </span>
            <h2 className="mt-3 font-headline font-bold text-2xl text-primary tracking-tight">Tu oasis urbano</h2>
            <p className="text-sm font-body text-on-surface-variant mt-0.5 leading-relaxed">
              Está en perfecto equilibrio. Respiración vegetal y absorción radicular óptima.
            </p>
          </div>

          {/* Score Circular Indicator */}
          <div className="flex flex-col items-center justify-center pl-2 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                ></path>
                <path
                  className="text-secondary stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray="98, 100"
                  strokeLinecap="round"
                  strokeWidth="3.2"
                ></path>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-label font-bold text-lg text-primary leading-none">
                  98<span className="text-xs">%</span>
                </span>
              </div>
            </div>
            <span className="font-label text-[10px] text-on-surface-variant mt-1 font-medium whitespace-nowrap">
              Índice Bienestar
            </span>
          </div>
        </div>

        {/* Live DHT22 Atmospheric Strip */}
        <div className="mt-5 pt-4 border-t border-surface-container grid grid-cols-3 gap-2">
          <div className="bg-surface-container-low/70 rounded-md p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center text-on-surface-variant gap-1">
              <span className="material-symbols-outlined text-sm text-secondary" data-icon="thermostat">
                thermostat
              </span>
              <span className="font-label text-[10px] tracking-wider uppercase text-outline">Temp</span>
            </div>
            <span className="font-label font-bold text-base text-primary mt-1">
              22.4<span className="text-xs font-normal">°C</span>
            </span>
          </div>
          <div className="bg-surface-container-low/70 rounded-md p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center text-on-surface-variant gap-1">
              <span className="material-symbols-outlined text-sm text-tertiary-container" data-icon="humidity_percentage">
                humidity_percentage
              </span>
              <span className="font-label text-[10px] tracking-wider uppercase text-outline">Humedad</span>
            </div>
            <span className="font-label font-bold text-base text-primary mt-1">
              55<span className="text-xs font-normal">%</span>
            </span>
          </div>
          <div className="bg-surface-container-low/70 rounded-md p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center text-on-surface-variant gap-1">
              <span className="material-symbols-outlined text-sm text-secondary" data-icon="air">
                air
              </span>
              <span className="font-label text-[10px] tracking-wider uppercase text-outline">Aire/Luz</span>
            </div>
            <span className="font-label font-bold text-xs text-secondary mt-1.5 uppercase tracking-tight">
              Óptimo
            </span>
          </div>
        </div>
      </section>

      {/* Depósito Central de Agua Hidropónica */}
      <section className="bg-surface-container-lowest rounded-lg p-5 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)] border border-outline-variant/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-lg fill-icon" data-icon="water_drop">
                water_drop
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-primary">Depósito de Agua Central</h3>
              <span className="font-label text-[11px] text-on-surface-variant">Solución hidropónica enriquecida</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label text-[11px] font-semibold">
            {reservoirPct}% Lleno
          </span>
        </div>

        {/* Water Gauge Visual Meter */}
        <div className="relative w-full bg-surface-container rounded-full h-3.5 overflow-hidden">
          <div
            className="bg-tertiary-container h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${reservoirPct}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-baseline space-x-1">
            <span className="font-label font-semibold text-lg text-primary">{reservoirVolume.toFixed(1)}</span>
            <span className="text-on-surface-variant font-body">L restantes (Capacidad {reservoirCapacity.toFixed(1)}L)</span>
          </div>
          <div className="flex items-center gap-1 font-label text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-sm text-secondary" data-icon="timelapse">
              timelapse
            </span>
            <span>~{estimatedDays} días de autonomía</span>
          </div>
        </div>

        {/* Reservoir Actions */}
        <div className="mt-4 pt-3 border-t border-surface-container-low flex gap-2">
          <button
            onClick={onOpenRefill}
            className="flex-1 py-2 px-3 rounded-full bg-primary-container text-on-primary font-headline text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm hover:opacity-90"
          >
            <span className="material-symbols-outlined text-sm" data-icon="add_circle">
              add_circle
            </span>
            Registrar Relleno
          </button>
          <button
            onClick={onOpenCalibrate}
            className="py-2 px-3 rounded-full bg-surface-container-high text-primary font-headline text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined text-sm" data-icon="tune">
              tune
            </span>
            Calibrar Sensor
          </button>
        </div>
      </section>

      {/* Niveles Verticales del Huerto (Bento Grid Style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline font-bold text-lg text-primary tracking-tight">Niveles del Jardín Vertical</h3>
          <span className="font-label text-xs text-secondary font-semibold">3 Niveles Sincronizados</span>
        </div>

        {/* Level Cards */}
        {levels.map((level) => {
          const badgeClass =
            level.badgeType === 'optimal'
              ? 'bg-primary-fixed text-on-primary-fixed'
              : level.badgeType === 'growing'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-secondary-container text-on-secondary-container';

          return (
            <article
              key={level.id}
              className="bg-surface-container-lowest rounded-lg p-5 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)] border border-outline-variant/20 hover:border-secondary/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 flex items-center justify-center text-primary font-label font-bold text-sm">
                    {level.number}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-base text-primary">{level.name}</h4>
                    <span className="font-label text-[11px] text-outline font-medium tracking-wide uppercase">
                      {level.category}
                    </span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-label text-[10px] font-semibold tracking-wider uppercase ${badgeClass}`}>
                  {level.statusBadge}
                </span>
              </div>

              {/* Telemetry Pod Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-surface-container-low rounded-md p-2.5">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label text-[10px] tracking-wider uppercase">
                      {level.number === '01' ? 'Suelo FC-28' : 'Humedad'}
                    </span>
                    <span className="material-symbols-outlined text-xs text-secondary fill-icon" data-icon="water_drop">
                      water_drop
                    </span>
                  </div>
                  <p className="font-label font-bold text-base text-primary mt-1">
                    {level.soilMoisture}
                    <span className="text-xs font-normal">%</span>
                  </p>
                  <div className="w-full bg-surface-container-highest rounded-full h-1 mt-1.5">
                    <div className="bg-secondary h-1 rounded-full" style={{ width: `${level.soilMoisture}%` }}></div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-md p-2.5">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label text-[10px] tracking-wider uppercase">Luz LDR</span>
                    <span className="material-symbols-outlined text-xs text-amber-600 fill-icon" data-icon="light_mode">
                      light_mode
                    </span>
                  </div>
                  <p className="font-label font-bold text-base text-primary mt-1">
                    {level.lightLuxPct}
                    <span className="text-xs font-normal">%</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant truncate block font-body">
                    {level.lightStatus}
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-md p-2.5">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="font-label text-[10px] tracking-wider uppercase">
                      {level.number === '01' ? 'Ambiente' : 'Temp'}
                    </span>
                    <span className="material-symbols-outlined text-xs text-primary" data-icon="device_thermostat">
                      device_thermostat
                    </span>
                  </div>
                  <p className="font-label font-bold text-base text-primary mt-1">
                    {level.temperature}
                    <span className="text-xs font-normal">°C</span>
                  </p>
                  <span className="text-[10px] text-secondary font-medium truncate block">
                    {level.tempStatus}
                  </span>
                </div>
              </div>

              {/* Bottom detail row */}
              <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant pt-2.5 border-t border-surface-container">
                {level.nextCycle ? (
                  <>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-secondary" data-icon="schedule">
                        schedule
                      </span>
                      Próximo ciclo de riego: <strong className="text-primary font-medium">{level.nextCycle}</strong>
                    </span>
                    <button
                      onClick={() => onAdjustSchedule(level)}
                      className="text-secondary font-semibold hover:underline flex items-center text-[11px] gap-0.5 cursor-pointer"
                    >
                      Ajustar
                      <span className="material-symbols-outlined text-xs" data-icon="chevron_right">
                        chevron_right
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1 font-body">
                      <span className="material-symbols-outlined text-sm text-secondary" data-icon={level.number === '02' ? 'energy_savings_leaf' : 'check_circle'}>
                        {level.number === '02' ? 'energy_savings_leaf' : 'check_circle'}
                      </span>
                      {level.statusNote}
                    </span>
                    <span className={`font-label text-[11px] ${level.number === '03' ? 'text-secondary font-semibold' : 'text-outline'}`}>
                      {level.statusSecondary}
                    </span>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Sección: Contemplación & Consejos del Día */}
      <section className="bg-primary-container text-on-primary rounded-lg p-5 shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-secondary-fixed text-lg" data-icon="self_improvement">
            self_improvement
          </span>
          <span className="font-label text-[11px] tracking-wider uppercase text-secondary-fixed font-semibold">
            Contemplación &amp; Cuidado Biófilo
          </span>
        </div>
        <h4 className="font-headline font-bold text-lg text-white">Momento de Cosecha &amp; Gratitud</h4>
        <p className="font-body text-xs text-on-primary-container mt-1.5 leading-relaxed">
          Tus hojas de albahaca en el Nivel 1 han alcanzado su mayor concentración de aceites esenciales con el sol de esta mañana. Poda las puntas apicales para estimular nuevos brotes y aromatizar tu cocina.
        </p>
        <button
          onClick={onStartBreathing}
          className="mt-4 w-full flex items-center justify-between bg-primary/40 rounded-full px-4 py-2 border border-primary-fixed/20 hover:bg-primary/60 transition-colors text-left"
        >
          <span className="text-xs text-white/90 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary-fixed text-sm" data-icon="nature">
              nature
            </span>
            Disfruta 3 minutos respirando junto a tus plantas
          </span>
          <span className="material-symbols-outlined text-secondary-fixed text-sm" data-icon="arrow_forward">
            arrow_forward
          </span>
        </button>
      </section>
    </main>
  );
};
