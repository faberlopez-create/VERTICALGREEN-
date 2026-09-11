import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'control-iot', label: 'Control IoT', icon: 'tune' },
    { id: 'planes', label: 'Planes', icon: 'energy_savings_leaf' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 w-full z-50 flex items-center justify-around px-4 py-2 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-4px_24px_rgba(27,67,50,0.06)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container rounded-full px-4 py-1.5 shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-primary px-3 py-1.5 font-medium'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-icon' : ''}`}
              data-icon={tab.icon}
            >
              {tab.icon}
            </span>
            <span className="font-label text-[10px] tracking-wider uppercase mt-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
