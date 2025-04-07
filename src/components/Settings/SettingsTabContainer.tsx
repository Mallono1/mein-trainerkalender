import { Receipt, UserCog } from 'lucide-react';
import React, { useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { InvoicePage } from './InvoicePage';

enum SettingsTab {
  Profile = 'PROFILE',
  Invoice = 'INVOICE',
}

interface SettingsTabButtonProps {
  label: SettingsTab;
  isActive: boolean;
  onClick: () => void;
}

const SettingsTabButton: React.FC<SettingsTabButtonProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`
      px-4 py-3 
      text-xs 
      font-semibold 
      tracking-wider 
      uppercase 
      flex 
      items-center 
      gap-2 
      ${
        isActive
          ? 'text-black border-b-2 border-black'
          : 'text-gray-500 hover:text-black'
      }
      transition-colors 
      duration-200 
      focus:outline-none
    `}
    onClick={onClick}
  >
    {label === SettingsTab.Profile && (
      <span>
        <UserCog size={18} />
      </span>
    )}
    {label === SettingsTab.Invoice && (
      <span>
        <Receipt size={18} />
      </span>
    )}
    {label}
  </button>
);

const SettingsTabContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.Profile);

  const renderSettingsPage = () => {
    switch (activeTab) {
      case SettingsTab.Profile:
        return <ProfilePage />;
      case SettingsTab.Invoice:
        return <InvoicePage />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="bg-white">
        <div className="flex justify-center border-b">
          {Object.values(SettingsTab).map((tab) => (
            <SettingsTabButton
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {renderSettingsPage()}
      </div>
    </div>
  );
};

export default SettingsTabContainer;
