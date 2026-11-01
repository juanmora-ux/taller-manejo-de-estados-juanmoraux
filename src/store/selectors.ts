import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { HeroClass, InventoryItem } from '../types';

// Selectores base
export const selectBaseStats = (state: RootState) => state.stats;
export const selectInventory = (state: RootState) => state.inventory;
export const selectActionLogs = (state: RootState) => state.actionLog.logs;

// Ítems equipados
export const selectEquippedItems = createSelector(
  [selectInventory],
  (inventory): InventoryItem[] =>
    inventory.items.filter((item) => inventory.equippedIds.includes(item.id))
);

// Bonificaciones acumuladas del equipamiento
export const selectEquipmentBonuses = createSelector(
  [selectEquippedItems],
  (equippedItems) => {
    return equippedItems.reduce(
      (acc, item) => {
        acc.str += item.bonusStr;
        acc.agi += item.bonusAgi;
        acc.int += item.bonusInt;
        acc.weight += item.weight;
        return acc;
      },
      { str: 0, agi: 0, int: 0, weight: 0 }
    );
  }
);

// Atributos totales (Base + Equipamiento)
export const selectTotalStr = createSelector(
  [selectBaseStats, selectEquipmentBonuses],
  (base, bonus) => base.str + bonus.str
);

export const selectTotalAgi = createSelector(
  [selectBaseStats, selectEquipmentBonuses],
  (base, bonus) => base.agi + bonus.agi
);

export const selectTotalInt = createSelector(
  [selectBaseStats, selectEquipmentBonuses],
  (base, bonus) => base.int + bonus.int
);

// Peso actual de los ítems equipados
export const selectCurrentWeight = createSelector(
  [selectEquipmentBonuses],
  (bonus) => bonus.weight
);

// Capacidad máxima de carga: (10 + totalStr * 2)
export const selectMaxWeightCapacity = createSelector(
  [selectTotalStr],
  (totalStr) => 10 + totalStr * 2
);

// Estado de sobrecarga: currentWeight > maxWeightCapacity
export const selectIsOverloaded = createSelector(
  [selectCurrentWeight, selectMaxWeightCapacity],
  (currentWeight, maxCapacity) => currentWeight > maxCapacity
);

// Porcentaje de carga para las barras visuales
export const selectWeightPercentage = createSelector(
  [selectCurrentWeight, selectMaxWeightCapacity],
  (currentWeight, maxCapacity) =>
    maxCapacity > 0 ? (currentWeight / maxCapacity) * 100 : 0
);

export interface HeroIdentity {
  heroClass: HeroClass;
  auraColor: string;
  avatarIcon: string;
  titleDescription: string;
}

// Clase de Héroe y Color de Aura dinámicos
export const selectHeroIdentity = createSelector(
  [
    selectTotalStr,
    selectTotalAgi,
    selectTotalInt,
    selectCurrentWeight,
    selectEquippedItems,
  ],
  (str, agi, int, weight, equippedItems): HeroIdentity => {
    const hasShieldOrHeavyGear = equippedItems.some(
      (item) => item.category === 'shield' || item.weight >= 20
    );

    // Tanque Pesado: Si lleva escudo/armadura pesada o peso >= 25 y STR >= 10
    if (hasShieldOrHeavyGear && (str >= 10 || weight >= 25)) {
      return {
        heroClass: 'Tanque Pesado',
        auraColor: '#F59E0B', // Ámbar dorado
        avatarIcon: '🛡️',
        titleDescription: 'Muralla indestructible acorazada',
      };
    }

    // Aldeano Novato: Si los atributos están en nivel básico y sin ítems
    const isNovice =
      str <= 7 && agi <= 7 && int <= 7 && equippedItems.length === 0;
    if (isNovice) {
      return {
        heroClass: 'Aldeano Novato',
        auraColor: '#94A3B8', // Gris pizarra
        avatarIcon: '🧑‍🌾',
        titleDescription: 'Aspirante sin especialización',
      };
    }

    const maxStat = Math.max(str, agi, int);

    if (str === maxStat && str > agi && str > int) {
      return {
        heroClass: 'Guerrero Berserker',
        auraColor: '#EF4444', // Rojo carmesí
        avatarIcon: '⚔️',
        titleDescription: 'Furia bélica y combate cuerpo a cuerpo',
      };
    }

    if (int === maxStat && int > str && int > agi) {
      return {
        heroClass: 'Archimago Arcano',
        auraColor: '#8B5CF6', // Violeta arcano
        avatarIcon: '🧙‍♂️',
        titleDescription: 'Canalizador supremo de magia ancestral',
      };
    }

    if (agi === maxStat && agi > str && agi > int) {
      return {
        heroClass: 'Asesino Sombrío',
        auraColor: '#10B981', // Verde esmeralda sombrío
        avatarIcon: '🥷',
        titleDescription: 'Letal, sigiloso y veloz en las sombras',
      };
    }

    // En caso de empate en atributos avanzados
    if (str >= agi && str >= int) {
      return {
        heroClass: 'Guerrero Berserker',
        auraColor: '#EF4444',
        avatarIcon: '⚔️',
        titleDescription: 'Combatiente intrépido',
      };
    } else if (int >= agi) {
      return {
        heroClass: 'Archimago Arcano',
        auraColor: '#8B5CF6',
        avatarIcon: '🧙‍♂️',
        titleDescription: 'Místico arcano',
      };
    } else {
      return {
        heroClass: 'Asesino Sombrío',
        auraColor: '#10B981',
        avatarIcon: '🥷',
        titleDescription: 'Explorador ágil',
      };
    }
  }
);

// Poder de Combate Base: (totalStr * 3 + totalAgi * 2 + totalInt * 3)
export const selectBaseCombatPower = createSelector(
  [selectTotalStr, selectTotalAgi, selectTotalInt],
  (str, agi, int) => str * 3 + agi * 2 + int * 3
);

// Poder de Combate Final: Si isOverloaded es true, aplica penalización del 30% (x0.7)
export const selectCombatPower = createSelector(
  [selectBaseCombatPower, selectIsOverloaded],
  (basePower, isOverloaded) => {
    if (isOverloaded) {
      return Math.round(basePower * 0.7);
    }
    return basePower;
  }
);
