import React, { useState, useId } from 'react';

interface PerfilScreenProps {
  onOpenRotateKey: () => void;
  onOpenSchematics: () => void;
  onEmergencyStop: () => void;
  onSyncRtc: () => void;
  onManagePlan: () => void;
  blynkKey: string;
  isSyncingRtc: boolean;
}

export const PerfilScreen: React.FC<PerfilScreenProps> = ({
  onOpenRotateKey,
  onOpenSchematics,
  onEmergencyStop,
  onSyncRtc,
  onManagePlan,
  blynkKey,
  isSyncingRtc,
}) => {
  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [showSecurityLogs, setShowSecurityLogs] = useState(false);
  const mfaToggleId = useId();

  return (
    <main className="max-w-md mx-auto px-4 pt-20 space-y-6 pb-32">
      {/* USER PROFILE & SECURITY SCORE HERO */}
      <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20 shadow-sm flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-xs text-primary truncate">
                Prototipo Sincronizado en Tiempo Real
              </span>
              <span className="bg-secondary-container text-on-secondary-container font-label text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold shrink-0">
                Blynk Cloud
              </span>
            </div>
            <p className="text-[10px] text-outline font-label truncate mt-0.5">
              NodeMCU ESP8266 • Ping: 24ms • MQTT recibido hace 2s
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary-container/50 text-secondary text-[10px] font-label font-bold">
            <span className="material-symbols-outlined text-[13px]" data-icon="wifi">
              wifi
            </span>{' '}
            En Línea
          </span>
        </div>
      </div>

      <section className="bg-surface-container-lowest rounded-lg p-5 shadow-[0_8px_24px_-4px_rgba(27,67,50,0.05)] border border-outline-variant/20 relative overflow-hidden">
        {/* Ambient Botanical Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-secondary-container/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start gap-4">
          {/* User Avatar */}
          <div className="relative shrink-0">
            <img
              className="w-16 h-16 rounded-full object-cover ring-2 ring-secondary-container shadow-sm"
              alt="Elena Romero"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA33frzn82_MI8Pq96Dyn4iGfxjmq-tbK-DWqne3RmXHUANQdJ5foc0TZaJIZgPAy28_ApsFAgANqBL6dxiBV6RxRAImjgzo6hfSPWlr5EMV1jUXKIBftPO4MdvYgSOELf-TQbamvpIu4AVThtM7J9K7-i7QltD3Ect6y7ESGAnc01uRTNXS1Uc3ymf6ZGF4heUlHQXFaVCYA7vXLaC5RSQlOGrQvdxy1-IrPn7jVuRzjVHNU7iQb6lSQ"
            />
            <span
              className="absolute bottom-0 right-0 bg-secondary text-on-secondary rounded-full p-0.5 ring-2 ring-surface-container-lowest"
              title="Identidad Verificada"
            >
              <span className="material-symbols-outlined text-[14px] block fill-icon" data-icon="verified_user">
                verified_user
              </span>
            </span>
          </div>
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <h2 className="font-headline font-bold text-lg text-primary truncate tracking-tight">Elena Romero</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase font-semibold tracking-wider shrink-0">
                Oasis Urbano Pro
              </span>
            </div>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 font-body mb-1">
              <span className="material-symbols-outlined text-[14px]" data-icon="mail">
                mail
              </span>
              <span className="truncate">elena.romero@botanica.io</span>
            </p>
            <p className="text-[11px] text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary" data-icon="apartment">
                apartment
              </span>
              <span>Apartamento Urbano • Huerto Torre #01</span>
            </p>
          </div>
        </div>

        {/* Cybersecurity Health Gauge & Index */}
        <div className="mt-5 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]" data-icon="shield">
                shield
              </span>
              <span className="font-headline font-semibold text-xs text-primary">
                Índice de Ciberseguridad Doméstica
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-label font-bold text-xl text-primary leading-none">94</span>
              <span className="font-label text-xs text-outline">/100</span>
            </div>
          </div>
          {/* Progress Track */}
          <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden p-0.5">
            <div className="bg-gradient-to-r from-secondary to-tertiary h-full rounded-full w-[94%] transition-all duration-1000"></div>
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Blindaje Óptimo
            </span>
            <span className="font-label text-[10px] text-outline uppercase tracking-wider">
              Cifrado de Extremo a Extremo
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: IoT CYBERSECURITY & NETWORK PROTECTION */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" data-icon="lock">
              lock
            </span>
            <h3 className="font-headline font-bold text-base text-primary">Protección IoT &amp; Ciberseguridad</h3>
          </div>
          <span className="font-label text-[10px] font-semibold text-secondary uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded-full">
            PRD Obj. 6
          </span>
        </div>

        <div className="space-y-2.5">
          {/* 2FA & Biometric Control Card */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-[0_4px_12px_rgba(27,67,50,0.03)] flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]" data-icon="fingerprint">
                  fingerprint
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-headline font-semibold text-sm text-primary">Autenticación Multifactor (2FA)</h4>
                  <span
                    className={`font-label text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold ${
                      twoFactorActive
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    {twoFactorActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-body mt-0.5">
                  Confirmación biométrica (FaceID / Huella) requerida para cambios críticos de hardware y riegos forzados.
                </p>
              </div>
            </div>
            <div className="relative inline-block w-10 shrink-0 select-none">
              <input
                id={mfaToggleId}
                checked={twoFactorActive}
                onChange={(e) => setTwoFactorActive(e.target.checked)}
                className="sr-only peer"
                type="checkbox"
              />
              <label
                htmlFor={mfaToggleId}
                className="block h-6 rounded-full bg-secondary-container cursor-pointer transition-colors duration-200 peer-checked:bg-primary"
              ></label>
              <span className={`absolute left-1 top-1 bg-surface-container-lowest w-4 h-4 rounded-full transition-transform duration-200 ease-in-out pointer-events-none ${twoFactorActive ? 'translate-x-4' : 'translate-x-0'}`}></span>
            </div>
          </div>

          {/* Telemetry Encryption & Blynk Card */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-[0_4px_12px_rgba(27,67,50,0.03)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]" data-icon="enhanced_encryption">
                  enhanced_encryption
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline font-semibold text-sm text-primary">Cifrado de Telemetría Blynk</h4>
                  <span className="text-tertiary font-label text-xs font-semibold">TLS 1.3 / SSL</span>
                </div>
                <p className="text-xs text-on-surface-variant font-body mt-1">
                  Paquetes MQTT encriptados entre NodeMCU ESP8266 y el servidor Blynk IoT Cloud. Prevención activa de intercepción man-in-the-middle.
                </p>
                <div className="mt-3 pt-2.5 border-t border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-label text-[11px] text-outline">
                    <span className="material-symbols-outlined text-[13px] text-secondary" data-icon="key">
                      key
                    </span>
                    <span>Token Blynk: {blynkKey}</span>
                  </div>
                  <button
                    onClick={onOpenRotateKey}
                    className="text-xs font-headline font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Rotar clave
                    <span className="material-symbols-outlined text-[14px]" data-icon="sync">
                      sync
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Home Network Isolation (VLAN IoT) */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20 shadow-[0_4px_12px_rgba(27,67,50,0.03)]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]" data-icon="lan">
                  lan
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline font-semibold text-sm text-primary">Aislamiento de Red (VLAN IoT)</h4>
                  <span className="text-[10px] font-label font-bold text-secondary uppercase bg-secondary-container/40 px-2 py-0.5 rounded-full">
                    Protegido
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-body mt-1">
                  El microcontrolador se encuentra aislado en subred de invitados / IoT. Las computadoras personales y cuentas bancarias de la red doméstica permanecen inaccesibles.
                </p>
                <div className="mt-2.5 flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded">
                  <span className="material-symbols-outlined text-[14px] text-secondary" data-icon="wifi_protected_setup">
                    wifi_protected_setup
                  </span>
                  <span className="font-label text-[11px] text-on-surface">SSID: VerticalGreen_IoT_Secure (WPA3)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Credential Management & Attack Logs (Bento Pair) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Hardware Key Store */}
            <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/20 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-secondary text-[20px]" data-icon="memory">
                  memory
                </span>
                <h5 className="font-headline font-semibold text-xs text-primary mt-1">Memoria Flash &amp; EEPROM</h5>
                <p className="text-[11px] text-outline mt-0.5 leading-snug">
                  Firmware con credenciales WiFi ofuscadas y cifrado por hardware.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-outline-variant/10 flex items-center gap-1 text-secondary font-label text-[10px] font-semibold">
                <span className="material-symbols-outlined text-[12px] fill-icon" data-icon="check_circle">
                  check_circle
                </span>
                <span>Protegido</span>
              </div>
            </div>

            {/* Suspicious Activity History */}
            <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/20 shadow-sm flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-secondary text-[20px]" data-icon="security">
                  security
                </span>
                <h5 className="font-headline font-semibold text-xs text-primary mt-1">Alertas &amp; Ataques</h5>
                <p className="text-[11px] text-outline mt-0.5 leading-snug">
                  0 intrusiones o anomalías registradas en los últimos 30 días.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-outline-variant/10 flex items-center justify-between font-label text-[10px]">
                <span className="text-on-surface-variant font-medium">Log: 100% Limpio</span>
                <button
                  type="button"
                  onClick={() => setShowSecurityLogs(!showSecurityLogs)}
                  className="text-secondary font-bold hover:underline cursor-pointer"
                >
                  {showSecurityLogs ? 'Cerrar log' : 'Ver log'}
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Security Log Details */}
          {showSecurityLogs && (
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 text-xs space-y-2 animate-in fade-in">
              <div className="flex justify-between items-center font-semibold text-primary">
                <span>Registro de Inspección Criptográfica</span>
                <span className="font-label text-[10px] text-secondary">SHA-256 OK</span>
              </div>
              <div className="space-y-1 text-[11px] text-outline font-mono">
                <div>[2026-09-11 12:35:10] TLS 1.3 Handshake NodeMCU &lt;-&gt; Blynk Cloud (OK)</div>
                <div>[2026-09-11 11:00:22] Escaneo ARP VLAN 192.168.4.15: 0 puertos expuestos</div>
                <div>[2026-09-11 08:30:00] Relé 5V pulso autorizado por firma de firmware</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION: HARDWARE ECOSYSTEM & SAFETY CONTROLS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" data-icon="developer_board">
              developer_board
            </span>
            <h3 className="font-headline font-bold text-base text-primary">Ecosistema &amp; Hardware Conectado</h3>
          </div>
          <span className="font-label text-xs text-secondary font-medium">5 Componentes</span>
        </div>

        {/* Connected Devices List */}
        <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20 shadow-sm space-y-3">
          {/* NodeMCU Master */}
          <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" data-icon="router">
                  router
                </span>
              </div>
              <div>
                <p className="font-headline font-semibold text-xs text-primary">NodeMCU ESP8266 v2.1</p>
                <p className="text-[10px] text-outline font-label">IP: 192.168.4.15 • Firmware v3.4</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary font-label text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              En línea
            </span>
          </div>

          {/* Sub-sensors Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-label">
            <div className="bg-surface-container-low p-2 rounded">
              <span className="material-symbols-outlined text-[16px] text-secondary" data-icon="opacity">
                opacity
              </span>
              <div className="text-[10px] font-bold text-primary mt-0.5">3x FC-28</div>
              <div className="text-[9px] text-outline">Humedad Suelo</div>
            </div>
            <div className="bg-surface-container-low p-2 rounded">
              <span className="material-symbols-outlined text-[16px] text-tertiary" data-icon="thermostat">
                thermostat
              </span>
              <div className="text-[10px] font-bold text-primary mt-0.5">1x DHT22</div>
              <div className="text-[9px] text-outline">Temp / HR Amb.</div>
            </div>
            <div className="bg-surface-container-low p-2 rounded">
              <span className="material-symbols-outlined text-[16px] text-secondary" data-icon="water_pump">
                water_pump
              </span>
              <div className="text-[10px] font-bold text-primary mt-0.5">Bomba 5V</div>
              <div className="text-[9px] text-outline">Relé Óptico 10A</div>
            </div>
          </div>

          {/* Emergency Disconnect / Safe Mode Action */}
          <div className="pt-2">
            <div className="mb-2 p-2.5 bg-surface-container-low rounded flex items-center justify-between gap-2 border border-outline-variant/10">
              <div className="min-w-0">
                <p className="text-[10px] font-label text-outline uppercase tracking-wider">ID Físico Prototipo</p>
                <p className="font-label font-bold text-xs text-primary truncate">NodeMCU-ESP8266-VG01</p>
              </div>
              <button
                type="button"
                onClick={onSyncRtc}
                disabled={isSyncingRtc}
                className="px-3 py-1.5 bg-secondary text-on-secondary hover:bg-primary font-headline font-semibold text-xs rounded-full flex items-center gap-1.5 transition-colors active:scale-95 shadow-sm shrink-0 cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${isSyncingRtc ? 'animate-spin' : ''}`}
                  data-icon="sync"
                >
                  sync
                </span>
                <span>{isSyncingRtc ? 'Sincronizando...' : 'Sincronizar RTC & Sensores'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onEmergencyStop}
              className="w-full bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant font-headline font-semibold text-xs py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-error" data-icon="power_settings_new">
                power_settings_new
              </span>
              <span>Parada de Emergencia: Desconectar Relé y Riegos</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: ACCOUNT & MEMBERSHIP */}
      <section className="space-y-3">
        <h3 className="font-headline font-bold text-base text-primary px-1">Suscripción &amp; Recursos</h3>
        <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20 shadow-sm space-y-3.5">
          {/* Membership Details */}
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]" data-icon="energy_savings_leaf">
                  energy_savings_leaf
                </span>
                <span className="font-headline font-bold text-sm text-primary">Oasis Urbano Inteligente</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                $7.99 / mes • Próxima renovación: 14 Mayo 2025
              </p>
            </div>
            <button
              type="button"
              onClick={onManagePlan}
              className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded-full font-headline font-semibold text-xs text-primary transition-colors cursor-pointer"
            >
              Gestionar
            </button>
          </div>

          {/* Documentation & Hardware Schematics Download */}
          <button
            type="button"
            onClick={onOpenSchematics}
            className="w-full text-left flex items-center justify-between p-2.5 rounded-md hover:bg-surface-container-low transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" data-icon="download">
                  download
                </span>
              </span>
              <div>
                <p className="font-headline font-semibold text-xs text-primary group-hover:text-secondary transition-colors">
                  Guía de Replicación &amp; Esquemáticos Seguros
                </p>
                <p className="text-[11px] text-outline font-body">Manual de cableado NodeMCU y mejores prácticas (PDF)</p>
              </div>
            </div>
            <span
              className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary transition-colors"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>

          {/* Secure Log Out */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => alert('Sesión de hardware y token Blynk cerrados de forma segura.')}
              className="w-full py-2.5 px-4 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-low font-headline font-semibold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-outline" data-icon="logout">
                logout
              </span>
              <span>Cerrar Sesión Segura</span>
            </button>
          </div>
        </div>
      </section>

      {/* Version & Compliance Footer Note */}
      <div className="text-center pt-2 pb-4">
        <p className="font-label text-[10px] text-outline uppercase tracking-wider">
          Vertical Green OS v2.4.1 • Cifrado AES-256 / SHA-256
        </p>
        <p className="text-[11px] text-outline mt-0.5">
          Diseñado bajo arquitectura de seguridad de grado IoT agrícola
        </p>
      </div>
    </main>
  );
};
