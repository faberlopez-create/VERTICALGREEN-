import React from 'react';
import { ActiveTab } from '../types';

interface TopAppBarProps {
  currentTab: ActiveTab;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  onOpenNotifications,
  unreadNotificationsCount = 2,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 flex items-center justify-between px-5 py-3.5 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-primary active:scale-95 transition-transform duration-150 shadow-xs">
          <span className="material-symbols-outlined fill-icon text-primary text-2xl" data-icon="potted_plant">
            potted_plant
          </span>
        </div>
        <div>
          <h1 className="font-headline font-semibold text-primary tracking-tight leading-none text-lg">
            Vertical Green
          </h1>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label text-[10px] tracking-wider text-secondary uppercase font-semibold">
              {currentTab === 'control-iot' ? 'ESP8266 v2.1 • ONLINE' : 'En línea · NodeMCU ESP8266'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {currentTab === 'planes' && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-secondary-container/40 rounded-full text-secondary text-xs font-label font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
            Garantía 100% Viva
          </div>
        )}
        <button
          onClick={onOpenNotifications}
          aria-label="Notificaciones"
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]" data-icon="notifications">
            notifications
          </span>
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-surface-container-lowest animate-pulse"></span>
          )}
        </button>
      </div>
    </header>
  );
};
