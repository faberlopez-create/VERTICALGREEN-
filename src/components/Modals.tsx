import React, { useState, useEffect } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, title, icon, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="w-8 h-8 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </div>
            )}
            <h3 className="font-headline font-bold text-base text-primary">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// 1. Notifications Modal
export const NotificationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}> = ({ isOpen, onClose, onClear }) => {
  const notifications = [
    {
      id: '1',
      title: 'Riego Nivel 1 completado',
      desc: 'Microbomba 5V operó 10s • Dosis de 50ml suministrada a Albahaca y Menta.',
      time: 'Hace 15 min',
      icon: 'water_drop',
      type: 'success',
    },
    {
      id: '2',
      title: 'Fotoperíodo LDR en rango óptimo',
      desc: '720 Lux detectados en torre superior. Fotosíntesis activa al 98%.',
      time: 'Hace 1 hora',
      icon: 'wb_sunny',
      type: 'info',
    },
    {
      id: '3',
      title: 'Chequeo de Blindaje IoT superado',
      desc: 'Firmware ESP8266 v3.4 validó canal TLS 1.3 con Blynk Cloud.',
      time: 'Hace 3 horas',
      icon: 'verified_user',
      type: 'shield',
    },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Notificaciones del Huerto" icon="notifications">
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">{n.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-headline font-semibold text-xs text-primary truncate">{n.title}</h4>
                <span className="text-[10px] text-outline font-label">{n.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-3 border-t border-outline-variant/20 flex justify-end gap-2">
        <button
          onClick={() => {
            onClear();
            onClose();
          }}
          className="px-4 py-2 rounded-full border border-outline-variant/40 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          Marcar todas como leídas
        </button>
      </div>
    </ModalWrapper>
  );
};

// 2. Refill Reservoir Modal
export const RefillModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amountLiters: number) => void;
  currentVolume: number;
}> = ({ isOpen, onClose, onConfirm, currentVolume }) => {
  const [amount, setAmount] = useState<number>(0.8);
  const [solutionType, setSolutionType] = useState('Organica NPK');

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Registrar Relleno de Depósito" icon="water_drop">
      <div className="space-y-4">
        <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-label text-outline uppercase tracking-wide">Volumen Actual</span>
            <p className="font-label text-xl font-bold text-primary">{currentVolume.toFixed(1)} L / 4.0 L</p>
          </div>
          <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold font-label">
            {Math.round((currentVolume / 4.0) * 100)}% Lleno
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-2">Cantidad a Añadir (Litros)</label>
          <div className="grid grid-cols-3 gap-2">
            {[0.8, 1.5, 2.0].map((liters) => (
              <button
                key={liters}
                onClick={() => setAmount(liters)}
                className={`py-2 rounded-xl border text-xs font-label font-bold transition-all ${
                  amount === liters
                    ? 'border-secondary bg-secondary-container text-on-secondary-container'
                    : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                +{liters} L
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-2">Fórmula de Nutrición</label>
          <select
            value={solutionType}
            onChange={(e) => setSolutionType(e.target.value)}
            className="w-full p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-body text-on-surface focus:outline-none focus:border-secondary"
          >
            <option value="Organica NPK">Solución Hidropónica Orgánica NPK (Albahaca/Rúcula)</option>
            <option value="Agua Filtrada">Agua Filtrada Desclorada (Mantenimiento)</option>
            <option value="Bioestimulante">Bioestimulante Radicular con Algas Marinas</option>
          </select>
        </div>

        <button
          onClick={() => {
            onConfirm(amount);
            onClose();
          }}
          className="w-full py-3 rounded-full bg-primary text-on-primary font-headline font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-98 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">check</span>
          Confirmar Relleno (+{amount} L)
        </button>
      </div>
    </ModalWrapper>
  );
};

// 3. Sensor Calibration Modal
export const SensorCalibrationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCalibrate: () => void;
}> = ({ isOpen, onClose, onCalibrate }) => {
  const [calibrating, setCalibrating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startCalibration = () => {
    setCalibrating(true);
    setProgress(20);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCalibrating(false);
            onCalibrate();
            onClose();
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Calibración de Sensores IoT" icon="tune">
      <div className="space-y-4 text-xs">
        <p className="text-on-surface-variant leading-relaxed">
          Este procedimiento sincroniza la curva de conversión ADC analógica del sensor capacitivo FC-28 y el ultrasonido del depósito con el microcontrolador ESP8266.
        </p>

        <div className="bg-surface-container-low p-3.5 rounded-xl space-y-2 border border-outline-variant/20">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">Suelo FC-28 (A0)</span>
            <span className="font-label text-secondary font-bold">2.1V / 65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">DHT22 Digital (D4)</span>
            <span className="font-label text-secondary font-bold">22.4°C • 55% HR</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">Nivel Depósito</span>
            <span className="font-label text-secondary font-bold">Ultrasonido OK</span>
          </div>
        </div>

        {calibrating ? (
          <div className="py-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-secondary font-semibold">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span>Calibrando lecturas por telemetría MQTT ({progress}%)...</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-secondary h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        ) : (
          <button
            onClick={startCalibration}
            className="w-full py-3 rounded-full bg-secondary text-on-secondary font-headline font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-98 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
            Ejecutar Auto-Calibración en ESP8266
          </button>
        )}
      </div>
    </ModalWrapper>
  );
};

// 4. Adjust Watering Schedule Modal
export const ScheduleAdjustModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  levelName: string;
  currentSchedule: string;
  onSave: (newTime: string) => void;
}> = ({ isOpen, onClose, levelName, currentSchedule, onSave }) => {
  const [selectedTime, setSelectedTime] = useState(currentSchedule.split(' ')[0] || '18:30');
  const [mode, setMode] = useState('Automático por IA');

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={`Ajustar Ciclo · ${levelName}`} icon="schedule">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Hora Programada de Riego</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm font-label font-bold text-primary focus:outline-none focus:border-secondary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Modo de Control</label>
          <div className="grid grid-cols-2 gap-2">
            {['Automático por IA', 'Horario Fijo'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                  mode === m
                    ? 'border-secondary bg-secondary-container text-on-secondary-container font-bold'
                    : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-outline font-body mt-2 leading-relaxed">
            {mode === 'Automático por IA'
              ? 'El algoritmo retrasa o adelanta el riego según la humedad del sustrato FC-28 y la transpiración solar LDR.'
              : 'El relé se activará estrictamente a la hora programada sin importar el umbral del suelo.'}
          </p>
        </div>

        <button
          onClick={() => {
            onSave(`${selectedTime} (Auto)`);
            onClose();
          }}
          className="w-full py-3 rounded-full bg-primary text-on-primary font-headline font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-98"
        >
          Guardar Configuración de Ciclo
        </button>
      </div>
    </ModalWrapper>
  );
};

// 5. Breathing / Contemplation Modal
export const BreathingExerciseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'Inhala' | 'Retén' | 'Exhala'>('Inhala');
  const [secondsRemaining, setSecondsRemaining] = useState(180);

  useEffect(() => {
    if (!isOpen) return;

    const phaseTimer = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'Inhala') return 'Retén';
        if (prev === 'Retén') return 'Exhala';
        return 'Inhala';
      });
    }, 4000);

    const countdown = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(phaseTimer);
      clearInterval(countdown);
    };
  }, [isOpen]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Contemplación & Respiración Biófila" icon="self_improvement">
      <div className="flex flex-col items-center text-center py-4 space-y-4">
        <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
          Sintoniza tu respiración con el oxígeno puro generado por tu torre vertical. Inhala profundamente la fragancia viva de tus plantas.
        </p>

        {/* Breathing Circle animation */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div
            className={`w-32 h-32 rounded-full bg-secondary-container/60 border-4 border-secondary flex flex-col items-center justify-center transition-all duration-1000 transform ${
              phase === 'Inhala' ? 'scale-110 shadow-lg shadow-secondary/30' : phase === 'Retén' ? 'scale-105' : 'scale-90 opacity-80'
            }`}
          >
            <span className="font-headline font-bold text-lg text-primary">{phase}</span>
            <span className="text-[11px] font-label text-secondary font-bold mt-1">4 seg</span>
          </div>
        </div>

        <div className="bg-surface-container-low px-4 py-1.5 rounded-full font-label text-xs font-bold text-primary">
          Tiempo restante: {formatTime(secondsRemaining)}
        </div>

        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 rounded-full border border-outline-variant/40 text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
        >
          Finalizar Sesión
        </button>
      </div>
    </ModalWrapper>
  );
};

// 6. Emergency Stop Modal
export const EmergencyStopModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirmEmergencyStop: () => void;
}> = ({ isOpen, onClose, onConfirmEmergencyStop }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Parada de Emergencia de Hardware" icon="power_settings_new">
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-base">warning</span>
            <span>Acción Crítica Inmediata</span>
          </div>
          <p className="leading-relaxed">
            Se enviará una orden prioritaria por hardware para forzar el corte de señal al Relé Óptico de 10A, deteniendo de inmediato la minibomba sumergible de 5V y cancelando cualquier ciclo de riego pendiente.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-outline-variant/40 font-headline font-semibold text-xs text-on-surface hover:bg-surface-container-low transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmEmergencyStop();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-error text-on-error font-headline font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            Desconectar Ahora
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// 7. Rotate Key Modal
export const RotateKeyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onKeyRotated: (newKey: string) => void;
}> = ({ isOpen, onClose, onKeyRotated }) => {
  const [generatedKey, setGeneratedKey] = useState('••••••••••b9F2');
  const [rotated, setRotated] = useState(false);

  const handleRotate = () => {
    const chars = '0123456789abcdef';
    let randomEnding = '';
    for (let i = 0; i < 4; i++) {
      randomEnding += chars[Math.floor(Math.random() * chars.length)];
    }
    const newKey = `••••••••••${randomEnding}`;
    setGeneratedKey(newKey);
    setRotated(true);
    onKeyRotated(newKey);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Rotar Token de Telemetría Blynk" icon="enhanced_encryption">
      <div className="space-y-4 text-xs">
        <p className="text-on-surface-variant leading-relaxed">
          La rotación de credenciales genera un nuevo secreto criptográfico SHA-256 sincronizado con el microcontrolador ESP8266 y el servidor Blynk IoT Cloud.
        </p>

        <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between font-label">
          <span className="text-outline">Token Actual:</span>
          <span className="font-bold text-primary text-sm">{generatedKey}</span>
        </div>

        {rotated ? (
          <div className="p-3 bg-secondary-container/50 text-secondary rounded-xl font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>¡Nuevo token emitido y cifrado por hardware con éxito!</span>
          </div>
        ) : (
          <button
            onClick={handleRotate}
            className="w-full py-3 rounded-full bg-secondary text-on-secondary font-headline font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            Generar y Aplicar Nueva Clave
          </button>
        )}
      </div>
    </ModalWrapper>
  );
};

// 8. PDF Schematics Modal
export const SchematicsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Guía de Replicación & Esquemáticos" icon="memory">
      <div className="space-y-3 text-xs">
        <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 space-y-2 font-mono text-[11px]">
          <div className="text-primary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-secondary">developer_board</span>
            Esquemático de Conexión NodeMCU ESP8266 v2.1
          </div>
          <div className="text-outline">
            • Pin A0 ────────── Entrada Analógica Sensor FC-28<br />
            • Pin D4 (GPIO2) ── Datos DHT22 con pull-up 4.7kΩ<br />
            • Pin D1 (GPIO5) ── Señal Disparo Relé Óptico 10A (Bomba 5V)<br />
            • Pin D2 (GPIO4) ── Entrada Divisor de Tensión LDR Luz<br />
            • Alimentación ──── Vin 5V Regulada / GND Común Optoacoplador
          </div>
        </div>

        <div className="p-3 bg-tertiary-fixed/30 text-tertiary rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            <div>
              <p className="font-semibold">Manual_NodeMCU_VerticalGreen_v2.4.pdf</p>
              <p className="text-[10px] text-outline font-label">2.4 MB • Versión Oficial de Laboratorio</p>
            </div>
          </div>
          <button
            onClick={() => alert('Descargando PDF de esquemáticos completos...')}
            className="px-3 py-1.5 rounded-full bg-tertiary text-on-tertiary text-xs font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Descargar
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// 9. SPEI / PSE Colombia Info Modal
export const SpeiInfoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Transferencia Bancaria / PSE / Nequi" icon="account_balance">
      <div className="space-y-3 text-xs">
        <p className="text-on-surface-variant">
          Puedes realizar el pago o activación de tu membresía en pesos colombianos (COP) mediante PSE, Nequi o transferencia bancaria:
        </p>

        <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-outline">Banco / Pasarela:</span>
            <span className="font-bold text-primary">Bancolombia / PSE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Tipo de Cuenta:</span>
            <span className="font-semibold text-primary">Ahorros</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Nº de Cuenta Bancolombia:</span>
            <span className="font-mono font-bold text-secondary text-sm select-all">452-981726-34</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Llave Nequi / Transfiya:</span>
            <span className="font-mono font-bold text-secondary text-sm select-all">310 892 4156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Beneficiario:</span>
            <span className="font-semibold text-primary">Vertical Green Colombia S.A.S.</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">NIT:</span>
            <span className="font-mono text-on-surface">901.482.319-1</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Moneda:</span>
            <span className="font-bold text-secondary">Pesos Colombianos (COP)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-outline">Concepto / Referencia:</span>
            <span className="font-mono font-bold text-primary">VG-OASIS-ELENA</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-primary text-on-primary font-semibold text-xs mt-2 cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </ModalWrapper>
  );
};
