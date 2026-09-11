import React, { useState } from 'react';
import { HardwareLog } from '../types';

interface ControlIoTScreenProps {
  onIrrigate: (dose: string) => void;
  isIrrigating: boolean;
  irrigationStatus: string | null;
  hardwareLogs: HardwareLog[];
}

export const ControlIoTScreen: React.FC<ControlIoTScreenProps> = ({
  onIrrigate,
  isIrrigating,
  irrigationStatus,
  hardwareLogs,
}) => {
  const [isAutonomous, setIsAutonomous] = useState(true);
  const [selectedDose, setSelectedDose] = useState('50 ml');
  const [drynessThreshold, setDrynessThreshold] = useState(40);
  const [nutrientsActive, setNutrientsActive] = useState(true);
  const [ping, setPing] = useState(24);
  const [isSyncing, setIsSyncing] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(65);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setPing(Math.floor(20 + Math.random() * 8));
      setIsSyncing(false);
    }, 600);
  };

  const doses = ['50 ml', '100 ml', '150 ml', '10 seg'];

  return (
    <div className="pb-32">
      {/* Hardware Connectivity Status Bar */}
      <section className="mt-20 px-4 max-w-2xl mx-auto">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]" data-icon="wifi">
                wifi
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-label text-xs font-semibold text-on-surface">WiFi 2.4GHz</span>
                <span className="text-[10px] px-2 py-0.2 bg-secondary/10 text-secondary rounded-full font-medium">
                  Blynk Cloud
                </span>
              </div>
              <p className="text-[11px] text-outline font-label">NodeMCU ESP8266 v2.1</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-label text-xs font-semibold text-secondary flex items-center justify-end gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span> {ping}ms
              </span>
              <span className="text-[10px] text-outline font-label">Ping estable</span>
            </div>
            <div className="h-6 w-px bg-outline-variant/40"></div>
            <button
              onClick={handleSync}
              className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
              title="Sincronizar telemetría"
            >
              <span
                className={`material-symbols-outlined text-secondary text-lg ${isSyncing ? 'animate-spin' : ''}`}
                data-icon="sync"
              >
                sync
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Canvas */}
      <main className="max-w-2xl mx-auto px-4 mt-4 space-y-5">
        {/* Primary Device Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-primary-container text-white p-5 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.18)]">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-secondary/20 blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-primary-fixed text-[11px] font-label font-medium tracking-wide uppercase">
                Torre Bio-Living 01
              </span>
              <h2 className="font-headline text-xl font-bold tracking-tight text-white mt-2">
                Control Operativo IoT
              </h2>
              <p className="text-xs text-on-primary-container mt-1 font-body">
                Monitoreo en vivo de suelo, microclima y microbomba perimétrica.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 text-primary-fixed">
              <span className="material-symbols-outlined text-2xl" data-icon="memory">
                memory
              </span>
            </div>
          </div>
        </div>

        {/* Panel de Control Rápido de Riego Inmediato */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-container" data-icon="water_drop">
                water_drop
              </span>
              <h3 className="font-headline text-base font-bold text-on-surface">Riego Inmediato</h3>
            </div>
            {/* Maestro Autónomo / Manual */}
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant/20">
              <span className={`text-xs font-medium ${isAutonomous ? 'text-on-surface' : 'text-amber-700 font-bold'}`}>
                {isAutonomous ? 'Autónomo' : 'Manual'}
              </span>
              <button
                type="button"
                onClick={() => setIsAutonomous(!isAutonomous)}
                aria-label="Cambiar modo operativo"
                className={`w-9 h-5 rounded-full relative transition-colors p-0.5 focus:outline-none ${
                  isAutonomous ? 'bg-secondary' : 'bg-outline-variant'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                    isAutonomous ? 'translate-x-4' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Selector de dosis */}
          <div>
            <label className="font-label text-[11px] text-outline font-semibold uppercase tracking-wider block mb-2">
              Selector de Dosis (Minibomba Nivel 1)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {doses.map((dose) => (
                <button
                  key={dose}
                  type="button"
                  onClick={() => setSelectedDose(dose)}
                  className={`py-2 rounded-xl border font-label text-xs transition-all text-center ${
                    selectedDose === dose
                      ? 'border-secondary bg-secondary-container text-on-secondary-container font-bold shadow-xs'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant font-medium'
                  }`}
                >
                  {dose}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Button */}
          <button
            type="button"
            disabled={isIrrigating}
            onClick={() => {
              onIrrigate(selectedDose);
              setSoilMoisture((prev) => Math.min(85, prev + 4));
            }}
            className={`w-full py-3.5 px-4 rounded-xl font-headline font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              irrigationStatus === 'success'
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            {isIrrigating ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                <span>Enviando pulso a NodeMCU...</span>
              </>
            ) : irrigationStatus === 'success' ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>¡Bomba Nivel 1 Activada ({selectedDose})!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]" data-icon="shower">
                  shower
                </span>
                <span>Regar Nivel 1 (Aromáticas)</span>
              </>
            )}
          </button>
        </section>

        {/* Telemetría y Diagnóstico en Tiempo Real (Bento Grid) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" data-icon="sensors">
                sensors
              </span>
              Telemetría en Vivo
            </h3>
            <span className="font-label text-[11px] text-secondary font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Actualizado hace 2s
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Sensor FC-28 */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <span className="font-label text-[11px] text-outline font-medium tracking-wide uppercase">
                  FC-28 Suelo
                </span>
                <span className="material-symbols-outlined text-secondary text-lg" data-icon="psychiatry">
                  psychiatry
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-label text-3xl font-bold text-on-surface tracking-tight">
                    {soilMoisture}
                  </span>
                  <span className="font-label text-sm text-outline font-semibold">%</span>
                </div>
                <p className="font-label text-[11px] text-secondary font-medium">2.1V Analógico • Calibrado</p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: `${soilMoisture}%` }}></div>
              </div>
            </div>

            {/* DHT22 Microclima */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <span className="font-label text-[11px] text-outline font-medium tracking-wide uppercase">
                  DHT22 Clima
                </span>
                <span className="material-symbols-outlined text-tertiary-container text-lg" data-icon="thermostat">
                  thermostat
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-label text-3xl font-bold text-on-surface tracking-tight">22.8</span>
                  <span className="font-label text-sm text-outline font-semibold">°C</span>
                </div>
                <p className="font-label text-[11px] text-on-surface-variant font-medium">
                  Humedad Rel: <span className="text-on-surface font-semibold">54% HR</span>
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>

            {/* Sensor LDR Luz */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <span className="font-label text-[11px] text-outline font-medium tracking-wide uppercase">
                  LDR Fotocélula
                </span>
                <span className="material-symbols-outlined text-amber-600 text-lg" data-icon="wb_sunny">
                  wb_sunny
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-label text-3xl font-bold text-on-surface tracking-tight">720</span>
                  <span className="font-label text-sm text-outline font-semibold">Lux</span>
                </div>
                <p className="font-label text-[11px] text-amber-700 font-medium">Fotoperiodo Óptimo</p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            {/* Relé Minibomba 5V */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <span className="font-label text-[11px] text-outline font-medium tracking-wide uppercase">
                  Relé 5V Bomba
                </span>
                <span className="material-symbols-outlined text-secondary text-lg" data-icon="toggle_on">
                  toggle_on
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isIrrigating ? 'bg-amber-500 animate-ping' : 'bg-secondary'}`}></span>
                  <span className="font-headline text-base font-bold text-on-surface">
                    {isIrrigating ? 'En bombeo' : 'En reposo'}
                  </span>
                </div>
                <p className="font-label text-[10px] text-outline mt-1 leading-tight">
                  Última acción: Hoy 08:30 AM (10s)
                </p>
              </div>
              <div className="w-full bg-secondary-container/40 text-secondary text-[10px] font-label font-bold py-1 px-2 rounded-md text-center mt-2">
                Normal / Sin Bloqueo
              </div>
            </div>
          </div>
        </section>

        {/* Configuración de Umbrales Automatizados por Nivel */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="font-headline text-base font-bold text-on-surface">Umbrales &amp; Seguridad Bomba</h3>
              <p className="text-xs text-outline font-body">Lógica autónoma programada en firmware local</p>
            </div>
            <span className="material-symbols-outlined text-outline" data-icon="tune">
              tune
            </span>
          </div>

          {/* Slider FC-28 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface">Umbral Sequedad FC-28</span>
              <span className="font-label text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                Activar &lt; {drynessThreshold}% | Cortar &gt; 75%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={drynessThreshold}
              onChange={(e) => setDrynessThreshold(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="flex justify-between text-[10px] font-label text-outline">
              <span>Muy Seco (20%)</span>
              <span>Actual: {drynessThreshold}%</span>
              <span>Húmedo (60%)</span>
            </div>
          </div>

          {/* Pulso y anti-inundación */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-surface-container-low p-3 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-secondary text-base" data-icon="timer">
                  timer
                </span>
                <span className="text-xs font-semibold text-on-surface">Pulso de Bomba</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-label text-xl font-bold text-on-surface">12</span>
                <span className="font-label text-xs text-outline">seg / ciclo</span>
              </div>
              <p className="text-[10px] text-outline mt-0.5">Caudal máx: 180 ml</p>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl border border-secondary/20">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-secondary text-base" data-icon="shield">
                  shield
                </span>
                <span className="text-xs font-semibold text-on-surface">Anti-inundación</span>
              </div>
              <p className="font-label text-xs font-bold text-secondary mt-1">Activo (Límite 3x)</p>
              <p className="text-[10px] text-outline mt-0.5">Auto-corte por rebosamiento</p>
            </div>
          </div>

          {/* Dosificación de Nutrientes */}
          <div className="bg-surface-container-low/80 p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl" data-icon="science">
                  science
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">Nutrientes Hidropónicos</h4>
                <p className="text-[11px] text-outline font-label">Ciclo programado: cada 15 días</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNutrientsActive(!nutrientsActive)}
              aria-label="Toggle dosificación nutrientes"
              className={`w-9 h-5 rounded-full relative transition-colors p-0.5 ${
                nutrientsActive ? 'bg-secondary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                  nutrientsActive ? 'translate-x-4' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </section>

        {/* Log de Operaciones IoT Reciente */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
            <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-outline" data-icon="list_alt">
                list_alt
              </span>
              Registro de Actividad Hardware
            </h3>
            <span className="text-[11px] text-secondary font-label font-semibold cursor-pointer hover:underline">
              Ver todo ({hardwareLogs.length})
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {hardwareLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors"
              >
                <span
                  className={`material-symbols-outlined text-lg mt-0.5 ${
                    log.type === 'success'
                      ? 'text-secondary'
                      : log.type === 'info'
                      ? 'text-tertiary-container'
                      : 'text-outline'
                  }`}
                  data-icon={
                    log.type === 'success'
                      ? 'check_circle'
                      : log.type === 'info'
                      ? 'water_full'
                      : 'cloud_done'
                  }
                >
                  {log.type === 'success'
                    ? 'check_circle'
                    : log.type === 'info'
                    ? 'water_full'
                    : 'cloud_done'}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-on-surface">{log.title}</span>
                    <span className="text-[10px] font-label text-outline">{log.time}</span>
                  </div>
                  <p className="text-outline text-[11px] mt-0.5">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ciberseguridad y Red Doméstica */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-lg" data-icon="lock">
                  lock
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-on-surface">Ciberseguridad &amp; Hardware Auth</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-label font-bold bg-secondary/10 text-secondary rounded">
                    WPA3
                  </span>
                </div>
                <p className="text-[10px] font-label text-outline">
                  Token Blynk encriptado TLS 1.3 • Dispositivo Verificado
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-xl" data-icon="verified_user">
              verified_user
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};
