/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveTab, PlantLevel, HardwareLog } from './types';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardScreen } from './components/DashboardScreen';
import { ControlIoTScreen } from './components/ControlIoTScreen';
import { PlanesScreen } from './components/PlanesScreen';
import { PerfilScreen } from './components/PerfilScreen';
import {
  NotificationsModal,
  RefillModal,
  SensorCalibrationModal,
  ScheduleAdjustModal,
  BreathingExerciseModal,
  EmergencyStopModal,
  RotateKeyModal,
  SchematicsModal,
  SpeiInfoModal,
} from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [reservoirVolume, setReservoirVolume] = useState<number>(3.2);
  const [blynkKey, setBlynkKey] = useState<string>('••••••••••b9F2');
  const [isIrrigating, setIsIrrigating] = useState<boolean>(false);
  const [irrigationStatus, setIrrigationStatus] = useState<string | null>(null);
  const [isSyncingRtc, setIsSyncingRtc] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isRefillOpen, setIsRefillOpen] = useState<boolean>(false);
  const [isCalibrateOpen, setIsCalibrateOpen] = useState<boolean>(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState<boolean>(false);
  const [isEmergencyStopOpen, setIsEmergencyStopOpen] = useState<boolean>(false);
  const [isRotateKeyOpen, setIsRotateKeyOpen] = useState<boolean>(false);
  const [isSchematicsOpen, setIsSchematicsOpen] = useState<boolean>(false);
  const [isSpeiOpen, setIsSpeiOpen] = useState<boolean>(false);
  const [selectedLevelForSchedule, setSelectedLevelForSchedule] = useState<PlantLevel | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Levels Data
  const [levels, setLevels] = useState<PlantLevel[]>([
    {
      id: 'lvl-1',
      number: '01',
      name: 'Albahaca Genovesa & Menta',
      category: 'Nivel 1 · Hierbas Aromáticas',
      statusBadge: 'Óptimo',
      badgeType: 'optimal',
      soilMoisture: 64,
      lightLuxPct: 85,
      lightStatus: 'Pleno sol',
      temperature: 22,
      tempStatus: 'Equilibrado',
      nextCycle: '18:30 (Auto)',
      statusNote: '',
    },
    {
      id: 'lvl-2',
      number: '02',
      name: 'Rúcula & Lechuga Batavia',
      category: 'Nivel 2 · Ensaladas Urbanas',
      statusBadge: 'Creciendo',
      badgeType: 'growing',
      soilMoisture: 58,
      lightLuxPct: 70,
      lightStatus: 'Moderada',
      temperature: 21,
      tempStatus: 'Fresco',
      statusNote: 'Estado foliar: Creciendo vigoroso',
      statusSecondary: 'Cosecha en ~8 días',
    },
    {
      id: 'lvl-3',
      number: '03',
      name: 'Pothos & Calatea',
      category: 'Nivel 3 · Purificadoras de Aire',
      statusBadge: 'Hidratado',
      badgeType: 'hydrated',
      soilMoisture: 72,
      lightLuxPct: 45,
      lightStatus: 'Filtrada',
      temperature: 22,
      tempStatus: 'Estable',
      statusNote: 'Humedad ambiental óptima para follaje tropical',
      statusSecondary: 'Excelente',
    },
  ]);

  // Hardware Activity Logs
  const [hardwareLogs, setHardwareLogs] = useState<HardwareLog[]>([
    {
      id: 'log-1',
      title: 'Riego automático completado Nivel 2',
      description: 'Duración 10s • Bomba perimétrica 5V apagada con éxito.',
      time: '08:30 AM',
      type: 'success',
    },
    {
      id: 'log-2',
      title: 'Depósito de agua verificado',
      description: 'Nivel adecuado: 84% de reserva en tanque inferior.',
      time: '07:15 AM',
      type: 'info',
    },
    {
      id: 'log-3',
      title: 'Lectura sincronizada con Blynk',
      description: 'Paquete MQTT recibido sin pérdidas (Payload 48B).',
      time: '06:00 AM',
      type: 'system',
    },
  ]);

  // Refill action
  const handleConfirmRefill = (amountLiters: number) => {
    setReservoirVolume((prev) => Math.min(4.0, Number((prev + amountLiters).toFixed(1))));
    const newLog: HardwareLog = {
      id: `log-${Date.now()}`,
      title: `Relleno de depósito registrado (+${amountLiters}L)`,
      description: 'Sensor ultrasónico recalibrado. Solución NPK homogeneizada.',
      time: 'Ahora',
      type: 'info',
    };
    setHardwareLogs((prev) => [newLog, ...prev]);
    showToast(`✓ Se añadieron ${amountLiters}L al depósito central`);
  };

  // Sensor Calibration action
  const handleCalibrateSensors = () => {
    const newLog: HardwareLog = {
      id: `log-${Date.now()}`,
      title: 'Calibración ADC y ultrasonido completada',
      description: 'Valores base normalizados: FC-28 a 2.1V / 65%, DHT22 a 22.4°C.',
      time: 'Ahora',
      type: 'system',
    };
    setHardwareLogs((prev) => [newLog, ...prev]);
    showToast('✓ Sensores y microcontrolador ESP8266 sincronizados');
  };

  // Schedule change action
  const handleSaveSchedule = (newTime: string) => {
    if (!selectedLevelForSchedule) return;
    setLevels((prev) =>
      prev.map((l) => (l.id === selectedLevelForSchedule.id ? { ...l, nextCycle: newTime } : l))
    );
    showToast(`✓ Horario de riego actualizado para ${selectedLevelForSchedule.name}`);
  };

  // Irrigation immediate trigger
  const handleIrrigate = (dose: string) => {
    setIsIrrigating(true);
    setIrrigationStatus('running');

    setTimeout(() => {
      setIsIrrigating(false);
      setIrrigationStatus('success');

      // Update soil moisture
      setLevels((prev) =>
        prev.map((l) => (l.id === 'lvl-1' ? { ...l, soilMoisture: Math.min(95, l.soilMoisture + 5) } : l))
      );

      // Add log
      const newLog: HardwareLog = {
        id: `log-${Date.now()}`,
        title: `Riego inmediato ejecutado (${dose}) en Nivel 1`,
        description: 'Pulso de minibomba enviado por relé 5V. Absorción iniciada.',
        time: 'Ahora',
        type: 'success',
      };
      setHardwareLogs((prev) => [newLog, ...prev]);
      showToast(`✓ Riego manual de ${dose} completado con éxito`);

      setTimeout(() => {
        setIrrigationStatus(null);
      }, 3000);
    }, 1500);
  };

  // Emergency Stop
  const handleConfirmEmergencyStop = () => {
    setIsIrrigating(false);
    setIrrigationStatus(null);
    const newLog: HardwareLog = {
      id: `log-${Date.now()}`,
      title: 'PARADA DE EMERGENCIA EJECUTADA',
      description: 'Se forzó el corte del relé óptico 10A y la bomba 5V.',
      time: 'Ahora',
      type: 'system',
    };
    setHardwareLogs((prev) => [newLog, ...prev]);
    showToast('⚠️ Parada de emergencia ejecutada: Relé y bombas desconectados');
  };

  // RTC Sync
  const handleSyncRtc = () => {
    setIsSyncingRtc(true);
    setTimeout(() => {
      setIsSyncingRtc(false);
      showToast('✓ Reloj RTC DS3231 y matriz de sensores sincronizados con NTP');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top App Bar */}
      <TopAppBar
        currentTab={activeTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotifications}
      />

      {/* Main Screens Navigation */}
      {activeTab === 'dashboard' && (
        <DashboardScreen
          levels={levels}
          reservoirVolume={reservoirVolume}
          onOpenRefill={() => setIsRefillOpen(true)}
          onOpenCalibrate={() => setIsCalibrateOpen(true)}
          onAdjustSchedule={(lvl) => {
            setSelectedLevelForSchedule(lvl);
          }}
          onStartBreathing={() => setIsBreathingOpen(true)}
        />
      )}

      {activeTab === 'control-iot' && (
        <ControlIoTScreen
          onIrrigate={handleIrrigate}
          isIrrigating={isIrrigating}
          irrigationStatus={irrigationStatus}
          hardwareLogs={hardwareLogs}
        />
      )}

      {activeTab === 'planes' && (
        <PlanesScreen
          onOpenSpei={() => setIsSpeiOpen(true)}
          onSubscriptionSuccess={(plan) => {
            showToast(`🎉 ¡Bienvenido a Vertical Green! Prueba de 14 días iniciada para ${plan}.`);
            setActiveTab('dashboard');
          }}
        />
      )}

      {activeTab === 'perfil' && (
        <PerfilScreen
          onOpenRotateKey={() => setIsRotateKeyOpen(true)}
          onOpenSchematics={() => setIsSchematicsOpen(true)}
          onEmergencyStop={() => setIsEmergencyStopOpen(true)}
          onSyncRtc={handleSyncRtc}
          onManagePlan={() => setActiveTab('planes')}
          blynkKey={blynkKey}
          isSyncingRtc={isSyncingRtc}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 border border-secondary-container/40 animate-in fade-in slide-in-from-top-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Dialogs */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClear={() => {
          setUnreadNotifications(0);
          showToast('Notificaciones marcadas como leídas');
        }}
      />

      <RefillModal
        isOpen={isRefillOpen}
        onClose={() => setIsRefillOpen(false)}
        onConfirm={handleConfirmRefill}
        currentVolume={reservoirVolume}
      />

      <SensorCalibrationModal
        isOpen={isCalibrateOpen}
        onClose={() => setIsCalibrateOpen(false)}
        onCalibrate={handleCalibrateSensors}
      />

      {selectedLevelForSchedule && (
        <ScheduleAdjustModal
          isOpen={Boolean(selectedLevelForSchedule)}
          onClose={() => setSelectedLevelForSchedule(null)}
          levelName={selectedLevelForSchedule.name}
          currentSchedule={selectedLevelForSchedule.nextCycle || '18:30 (Auto)'}
          onSave={handleSaveSchedule}
        />
      )}

      <BreathingExerciseModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <EmergencyStopModal
        isOpen={isEmergencyStopOpen}
        onClose={() => setIsEmergencyStopOpen(false)}
        onConfirmEmergencyStop={handleConfirmEmergencyStop}
      />

      <RotateKeyModal
        isOpen={isRotateKeyOpen}
        onClose={() => setIsRotateKeyOpen(false)}
        onKeyRotated={(k) => {
          setBlynkKey(k);
          showToast('✓ Token Blynk rotado y protegido por hardware');
        }}
      />

      <SchematicsModal
        isOpen={isSchematicsOpen}
        onClose={() => setIsSchematicsOpen(false)}
      />

      <SpeiInfoModal
        isOpen={isSpeiOpen}
        onClose={() => setIsSpeiOpen(false)}
      />
    </div>
  );
}
