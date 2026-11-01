import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem, InventoryState } from '../../types';

export const INITIAL_ITEMS: InventoryItem[] = [
  {
    id: 'item-fire-sword',
    name: 'Espada de Fuego',
    icon: '🗡️',
    category: 'weapon',
    bonusStr: 8,
    bonusAgi: 2,
    bonusInt: 0,
    weight: 12,
  },
  {
    id: 'item-titanium-shield',
    name: 'Escudo de Titanio',
    icon: '🛡️',
    category: 'shield',
    bonusStr: 5,
    bonusAgi: 0,
    bonusInt: 0,
    weight: 18,
  },
  {
    id: 'item-arcane-staff',
    name: 'Báculo Arcano',
    icon: '🪄',
    category: 'weapon',
    bonusStr: 0,
    bonusAgi: 1,
    bonusInt: 10,
    weight: 5,
  },
  {
    id: 'item-elven-boots',
    name: 'Botas Élficas',
    icon: '🥾',
    category: 'armor',
    bonusStr: 0,
    bonusAgi: 8,
    bonusInt: 2,
    weight: 3,
  },
  {
    id: 'item-cursed-armor',
    name: 'Armadura Maldita',
    icon: '🦺',
    category: 'armor',
    bonusStr: 10,
    bonusAgi: -2,
    bonusInt: 0,
    weight: 25,
  },
  {
    id: 'item-mana-ring',
    name: 'Anillo de Maná',
    icon: '💍',
    category: 'accessory',
    bonusStr: 0,
    bonusAgi: 2,
    bonusInt: 6,
    weight: 1,
  },
];

const initialState: InventoryState = {
  items: INITIAL_ITEMS,
  equippedIds: [],
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    toggleEquipItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.equippedIds.indexOf(itemId);
      if (index >= 0) {
        state.equippedIds.splice(index, 1);
      } else {
        state.equippedIds.push(itemId);
      }
    },
    clearEquipment: (state) => {
      state.equippedIds = [];
    },
  },
});

export const { toggleEquipItem, clearEquipment } = inventorySlice.actions;

export default inventorySlice.reducer;
