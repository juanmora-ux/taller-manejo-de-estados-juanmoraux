import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildPreset, StatKey, StatsState } from '../../types';

const initialState: StatsState = {
  availablePoints: 15,
  str: 5,
  agi: 5,
  int: 5,
  currentHp: 100,
  maxHp: 100,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementStat: (state, action: PayloadAction<StatKey>) => {
      const stat = action.payload;
      if (state.availablePoints > 0) {
        state[stat] += 1;
        state.availablePoints -= 1;
      }
    },
    decrementStat: (state, action: PayloadAction<StatKey>) => {
      const stat = action.payload;
      // Ningún atributo base puede bajar de 1
      if (state[stat] > 1) {
        state[stat] -= 1;
        state.availablePoints += 1;
      }
    },
    takeDamage: (state, action: PayloadAction<number>) => {
      const damage = action.payload;
      // Resta el daño recibido garantizando un mínimo de 0 HP
      state.currentHp = Math.max(0, state.currentHp - damage);
    },
    healHero: (state) => {
      // Restablece currentHp al máximo de salud (100)
      state.currentHp = state.maxHp;
    },
    applyBuildPreset: (state, action: PayloadAction<BuildPreset>) => {
      const preset = action.payload;
      switch (preset) {
        case 'WARRIOR':
          state.str = 15;
          state.agi = 3;
          state.int = 2;
          state.availablePoints = 10;
          break;
        case 'MAGE':
          state.str = 2;
          state.agi = 3;
          state.int = 15;
          state.availablePoints = 10;
          break;
        case 'ROGUE':
          state.str = 3;
          state.agi = 15;
          state.int = 2;
          state.availablePoints = 10;
          break;
      }
    },
    resetStats: (state) => {
      state.availablePoints = 15;
      state.str = 5;
      state.agi = 5;
      state.int = 5;
    },
  },
});

export const {
  incrementStat,
  decrementStat,
  takeDamage,
  healHero,
  applyBuildPreset,
  resetStats,
} = statsSlice.actions;

export default statsSlice.reducer;
