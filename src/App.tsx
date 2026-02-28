import { useState } from 'react';
import { useGame, getKinderJoyCost, getBrunoMarsCdCost, getLilyCost, getDateNightCost, getBondLevelCost } from './game/useGame';
import { TopBar } from './components/TopBar';
import { CenterStage } from './components/CenterStage';
import { BottomNav, TabType } from './components/BottomNav';
import { BottomSheet } from './components/BottomSheet';
import { ConfessPanel } from './components/ConfessPanel';
import { BondPanel } from './components/BondPanel';
import { UpgradesPanel } from './components/UpgradesPanel';
import { EventModal } from './components/EventModal';
import { Notifications } from './components/Notifications';
import { OfflineModal } from './components/OfflineModal';
import { InteractiveTutorial } from './components/InteractiveTutorial';
import { LevelUpModal } from './components/LevelUpModal';

export default function App() {
  const {
    state,
    clickPower,
    autoGenPerSec,
    currentTaxRate,
    globalMultiplier,
    click,
    buyUpgrade,
    confess,
    levelUpBond,
    advanceTutorial,
    levelUpModal,
    dismissLevelUpModal,
    offlineEarnings,
    dismissOfflineEarnings,
    eventModal,
    resolveOverthinking,
    notifications,
    isBusyDay,
    isOverthinkingTax,
    isOverthinkingBoost,
    isMagicMoment,
    hasConsistencyBonus
  } = useGame();

  const [activeTab, setActiveTab] = useState<TabType>('none');

  const costs = {
    kinderJoy: getKinderJoyCost(state.upgrades.kinderJoy),
    brunoMarsCd: getBrunoMarsCdCost(state.upgrades.brunoMarsCd),
    lily: getLilyCost(state.upgrades.lily),
    dateNight: getDateNightCost(),
  };

  const bondLevelCost = getBondLevelCost(state.bondLevel);

  return (
    <div className="fixed inset-0 bg-pink-50 font-sans text-gray-800 selection:bg-pink-200 overflow-hidden flex justify-center">
      <div className="w-full max-w-md h-full flex flex-col relative bg-white shadow-2xl">
        {/* Background Parallax */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-100 via-purple-50 to-pink-50" />
        
        {/* Top Bar */}
        <div className="relative z-10 p-4 pb-0">
          <TopBar 
            affection={state.affection} 
            trust={state.trust} 
            bondLevel={state.bondLevel} 
            bondLevelCost={bondLevelCost} 
          />
        </div>

        {/* Center Stage */}
        <div className="flex-1 relative z-0 flex flex-col">
          <CenterStage 
            bondLevel={state.bondLevel} 
            onClick={click} 
            clickPower={clickPower} 
          />
          
          {/* Stats Footer (Compact) */}
          <div className="w-full px-4 pb-24">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700">Click:</span>
                <span className="font-mono">{clickPower.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700">Auto:</span>
                <span className="font-mono">{autoGenPerSec.toFixed(1)}/s</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700">Mult:</span>
                <span className="font-mono text-purple-600">x{globalMultiplier.toFixed(2)}</span>
              </div>
              
              {/* Active Effects */}
              <div className="flex flex-wrap justify-center gap-1 w-full mt-1">
                {isBusyDay && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">Busy (-50%)</span>}
                {isOverthinkingTax && <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-bold">Tax (+10%)</span>}
                {isOverthinkingBoost && <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-[10px] font-bold">Boost (+20%)</span>}
                {isMagicMoment && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-[10px] font-bold">Magic (+100%)</span>}
                {hasConsistencyBonus && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold">Consistent (+10%)</span>}
              </div>
            </div>
            <div className="text-center text-[10px] text-gray-400 mt-3 font-medium">
              Personally Created for Cey by Cay
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Bottom Sheet Content */}
        <BottomSheet 
          isOpen={activeTab !== 'none'} 
          onClose={() => setActiveTab('none')}
          title={
            activeTab === 'confess' ? 'Confess Feelings' :
            activeTab === 'bond' ? 'Deepen Bond' :
            activeTab === 'upgrades' ? 'Upgrades' : ''
          }
        >
          {activeTab === 'confess' && (
            <ConfessPanel 
              affection={state.affection}
              currentTaxRate={currentTaxRate}
              bondLevel={state.bondLevel}
              onConfess={confess}
            />
          )}
          {activeTab === 'bond' && (
            <BondPanel 
              trust={state.trust}
              bondLevel={state.bondLevel}
              bondLevelCost={bondLevelCost}
              onLevelUpBond={levelUpBond}
            />
          )}
          {activeTab === 'upgrades' && (
            <UpgradesPanel 
              affection={state.affection}
              upgrades={state.upgrades}
              costs={costs}
              onBuyUpgrade={buyUpgrade}
            />
          )}
        </BottomSheet>

        {/* Modals & Overlays */}
        <InteractiveTutorial step={state.tutorialStep} activeTab={activeTab} onAdvance={advanceTutorial} />
        <LevelUpModal level={levelUpModal} onDismiss={dismissLevelUpModal} />
        <EventModal isOpen={eventModal === 'overthinking'} onResolve={resolveOverthinking} />
        <OfflineModal earnings={offlineEarnings} onDismiss={dismissOfflineEarnings} />
        <Notifications notifications={notifications} />
      </div>
    </div>
  );
}
