export type StatKey = 'str' | 'agi' | 'int';

export type BuildPreset = 'WARRIOR' | 'MAGE' | 'ROGUE';

export interface StatsState {
  availablePoints: number;
  str: number;
  agi: number;
  int: number;
  currentHp: number;
  maxHp: number;
}

export type ItemCategory = 'weapon' | 'shield' | 'armor' | 'accessory';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  category: ItemCategory;
  bonusStr: number;
  bonusAgi: number;
  bonusInt: number;
  weight: number;
}

export interface InventoryState {
  items: InventoryItem[];
  equippedIds: string[];
}

export interface ActionLogEntry {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
}

export interface ActionLogState {
  logs: ActionLogEntry[];
}

export type HeroClass =
  | 'Aldeano Novato'
  | 'Guerrero Berserker'
  | 'Archimago Arcano'
  | 'Tanque Pesado'
  | 'Asesino Sombrío';

export interface RootState {
  stats: StatsState;
  inventory: InventoryState;
  actionLog: ActionLogState;
}
