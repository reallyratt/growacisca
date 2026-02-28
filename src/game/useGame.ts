import { useState, useEffect, useCallback, useRef } from 'react';

export interface GameState {
  affection: number;
  trust: number;
  bondLevel: number;
  upgrades: {
    kinderJoy: number;
    brunoMarsCd: number;
    lily: number;
    dateNight: boolean;
  };
  lastLogin: number;
  sessionStart: number;
  activeEvents: {
    busyDay: number; // timestamp when it expires
    overthinkingTax: number;
    overthinkingBoost: number;
    magicMoment: number;
  };
  tutorialStep: number;
}

const INITIAL_STATE: GameState = {
  affection: 0,
  trust: 0,
  bondLevel: 0,
  upgrades: {
    kinderJoy: 0,
    brunoMarsCd: 0,
    lily: 0,
    dateNight: false,
  },
  lastLogin: Date.now(),
  sessionStart: Date.now(),
  activeEvents: {
    busyDay: 0,
    overthinkingTax: 0,
    overthinkingBoost: 0,
    magicMoment: 0,
  },
  tutorialStep: 0,
};

export const getKinderJoyCost = (count: number) => Math.floor(15 * Math.pow(1.15, count));
export const getBrunoMarsCdCost = (count: number) => Math.floor(50 * Math.pow(1.20, count));
export const getLilyCost = (count: number) => Math.floor(120 * Math.pow(1.35, count));
export const getDateNightCost = () => 400;

export const getBondLevelCost = (level: number) => {
  if (level >= 30) return Infinity;
  const baseCosts = [20, 40, 70, 110, 160, 220, 300, 400, 520, 700];
  if (level < 10) return baseCosts[level];
  let cost = 700;
  for (let i = 10; i < level; i++) {
    if (i < 20) cost *= 1.5;
    else cost *= 1.7;
  }
  return Math.floor(cost);
};

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('cisca_simulator_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old saves
        if (parsed.tutorialCompleted === true) {
          parsed.tutorialStep = 5;
          delete parsed.tutorialCompleted;
        }
        return { ...INITIAL_STATE, ...parsed, sessionStart: Date.now() };
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  const [offlineEarnings, setOfflineEarnings] = useState<number>(0);
  const [eventModal, setEventModal] = useState<'overthinking' | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<{ id: number; text: string }[]>([]);

  const addNotification = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  // Derived values
  const now = Date.now();
  const isBusyDay = state.activeEvents.busyDay > now;
  const isOverthinkingTax = state.activeEvents.overthinkingTax > now;
  const isOverthinkingBoost = state.activeEvents.overthinkingBoost > now;
  const isMagicMoment = state.activeEvents.magicMoment > now;
  const sessionDurationMinutes = (now - state.sessionStart) / 60000;
  const hasConsistencyBonus = sessionDurationMinutes >= 5;

  const baseTaxRate = Math.max(0.05, 0.20 - (state.upgrades.lily * 0.02));
  const currentTaxRate = baseTaxRate + (isOverthinkingTax ? 0.10 : 0);

  const formBonusMultiplier = state.bondLevel >= 21 ? 0.35 : state.bondLevel >= 11 ? 0.15 : state.bondLevel >= 1 ? 0.05 : 0;
  const formFlatBonus = state.bondLevel >= 21 ? 5 : state.bondLevel >= 11 ? 1 : 0;

  let globalMultiplier = 1 * (1 + formBonusMultiplier);
  if (state.upgrades.dateNight) globalMultiplier *= 1.25;
  if (hasConsistencyBonus) globalMultiplier *= 1.10;
  if (isOverthinkingBoost) globalMultiplier *= 1.20;
  if (isMagicMoment) globalMultiplier *= 2.00;

  const clickPower = (1 + state.upgrades.kinderJoy) * globalMultiplier;
  const autoGenPerSec = (0 + state.upgrades.brunoMarsCd + formFlatBonus) * globalMultiplier * (isBusyDay ? 0.5 : 1);

  // Offline earnings calculation
  useEffect(() => {
    if (state.lastLogin && state.lastLogin < now - 1000) {
      const offlineMs = now - state.lastLogin;
      const maxOfflineMs = 4 * 60 * 60 * 1000; // 4 hours
      const effectiveOfflineMs = Math.min(offlineMs, maxOfflineMs);
      
      const offlineSeconds = effectiveOfflineMs / 1000;
      // 50% of auto gen while offline
      const earned = (autoGenPerSec * 0.5) * offlineSeconds;
      
      if (earned > 1) {
        setOfflineEarnings(Math.floor(earned));
        setState(s => ({ ...s, affection: s.affection + earned }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Game loop
  const lastTickRef = useRef(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const currentNow = Date.now();
      const delta = (currentNow - lastTickRef.current) / 1000;
      lastTickRef.current = currentNow;

      setState((s) => {
        const newAffection = s.affection + (autoGenPerSec * delta);
        return { ...s, affection: newAffection, lastLogin: currentNow };
      });
    }, 100); // 10 ticks per second

    return () => clearInterval(interval);
  }, [autoGenPerSec]);

  // Autosave
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('cisca_simulator_save', JSON.stringify(state));
    }, 10000);
    return () => clearInterval(interval);
  }, [state]);

  // Random Events Loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        // Trigger event
        const events = ['busyDay', 'overthinking', 'magicMoment'];
        const chosen = events[Math.floor(Math.random() * events.length)];
        
        if (chosen === 'busyDay') {
          setState(s => ({ ...s, activeEvents: { ...s.activeEvents, busyDay: Date.now() + 30000 } }));
          addNotification("Event: Busy Day! Auto generation halved for 30s.");
        } else if (chosen === 'overthinking') {
          setEventModal('overthinking');
        } else if (chosen === 'magicMoment' && state.upgrades.brunoMarsCd >= 10) {
          setState(s => ({ ...s, activeEvents: { ...s.activeEvents, magicMoment: Date.now() + 20000 } }));
          addNotification("Event: 24K Magic Moment! +100% Affection for 20s.");
        }
      }
    }, 60000); // Every 60 seconds
    return () => clearInterval(interval);
  }, [state.upgrades.brunoMarsCd, addNotification]);

  // Actions
  const click = useCallback(() => {
    setState(s => {
      const newState = { ...s, affection: s.affection + clickPower };
      if (s.tutorialStep === 0 && newState.affection >= 5) {
        newState.tutorialStep = 1;
      }
      return newState;
    });
  }, [clickPower]);

  const buyUpgrade = useCallback((type: keyof GameState['upgrades']) => {
    setState(s => {
      let cost = 0;
      if (type === 'kinderJoy') cost = getKinderJoyCost(s.upgrades.kinderJoy);
      else if (type === 'brunoMarsCd') cost = getBrunoMarsCdCost(s.upgrades.brunoMarsCd);
      else if (type === 'lily') cost = getLilyCost(s.upgrades.lily);
      else if (type === 'dateNight') cost = getDateNightCost();

      if (s.affection >= cost) {
        if (type === 'dateNight' && s.upgrades.dateNight) return s; // already bought
        return {
          ...s,
          affection: s.affection - cost,
          upgrades: {
            ...s.upgrades,
            [type]: type === 'dateNight' ? true : (s.upgrades[type] as number) + 1
          }
        };
      }
      return s;
    });
  }, []);

  const confess = useCallback(() => {
    setState(s => {
      if (s.affection <= 0) return s;
      
      const taxToApply = currentTaxRate;
      let trustGained = s.affection * (1 - taxToApply);
      
      // Bonus mechanic
      if (s.affection > 1000) {
        trustGained *= 1.10;
      }
      
      // Form 3 bonus
      if (s.bondLevel >= 21) {
        trustGained *= 1.10;
      }

      addNotification(`Converted ${Math.floor(s.affection)} Affection to ${Math.floor(trustGained)} Trust!`);

      return {
        ...s,
        affection: 0,
        trust: s.trust + trustGained
      };
    });
  }, [currentTaxRate, addNotification]);

  const levelUpBond = useCallback(() => {
    setState(s => {
      const cost = getBondLevelCost(s.bondLevel);
      if (s.trust >= cost && s.bondLevel < 30) {
        const newLevel = s.bondLevel + 1;
        setLevelUpModal(newLevel);
        addNotification(`Bond Level increased to ${newLevel}!`);
        return {
          ...s,
          trust: s.trust - cost,
          bondLevel: newLevel
        };
      }
      return s;
    });
  }, [addNotification]);

  const advanceTutorial = useCallback((step: number) => {
    setState(s => ({ ...s, tutorialStep: step }));
  }, []);

  const dismissLevelUpModal = useCallback(() => {
    setLevelUpModal(null);
  }, []);

  const resolveOverthinking = useCallback((correct: boolean) => {
    setEventModal(null);
    if (correct) {
      setState(s => ({ ...s, activeEvents: { ...s.activeEvents, overthinkingBoost: Date.now() + 60000 } }));
      addNotification("Good choice! +20% Affection boost for 1m.");
    } else {
      setState(s => ({ ...s, activeEvents: { ...s.activeEvents, overthinkingTax: Date.now() + 60000 } }));
      addNotification("Oops! +10% temporary tax for 1m.");
    }
  }, [addNotification]);

  const dismissOfflineEarnings = () => setOfflineEarnings(0);

  return {
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
  };
}
