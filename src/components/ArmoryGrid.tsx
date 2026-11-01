import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import {
  clearEquipment,
  toggleEquipItem,
} from '../store/slices/inventorySlice';
import {
  selectCurrentWeight,
  selectInventory,
  selectIsOverloaded,
  selectMaxWeightCapacity,
} from '../store/selectors';
import { InventoryItem } from '../types';

export const ArmoryGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, equippedIds } = useAppSelector(selectInventory);
  const isOverloaded = useAppSelector(selectIsOverloaded);
  const currentWeight = useAppSelector(selectCurrentWeight);
  const maxWeight = useAppSelector(selectMaxWeightCapacity);

  const getCategoryLabel = (cat: InventoryItem['category']) => {
    switch (cat) {
      case 'weapon':
        return 'Arma';
      case 'shield':
        return 'Escudo';
      case 'armor':
        return 'Armadura';
      case 'accessory':
        return 'Accesorio';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleInfoRow}>
          <Text style={styles.zoneTag}>ZONA C</Text>
          <Text style={styles.zoneTitle}>ARMORY GRID</Text>
        </View>

        {equippedIds.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.clearBtn}
            onPress={() => dispatch(clearEquipment())}
          >
            <Text style={styles.clearBtnText}>Desequipar Todo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Alerta de Advertencia de Sobrecarga */}
      {isOverloaded && (
        <View style={styles.overloadAlert}>
          <Text style={styles.overloadAlertIcon}>⚠️</Text>
          <View style={styles.overloadAlertTextContainer}>
            <Text style={styles.overloadAlertTitle}>
              ¡SOBRECARGADO! (-30% Poder)
            </Text>
            <Text style={styles.overloadAlertDesc}>
              Peso {currentWeight}kg excede el límite de {maxWeight}kg.
              ¡Desequipa objetos o aumenta tu Fuerza (STR)!
            </Text>
          </View>
        </View>
      )}

      {/* Cuadrícula de 6 Ítems */}
      <View style={styles.grid}>
        {items.map((item) => {
          const isEquipped = equippedIds.includes(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={[
                styles.itemCard,
                isEquipped && styles.itemCardEquipped,
              ]}
              onPress={() => dispatch(toggleEquipItem(item.id))}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.itemCategoryBadge}>
                  {getCategoryLabel(item.category)}
                </Text>
                <Text style={styles.itemWeightText}>{item.weight} kg</Text>
              </View>

              <View style={styles.itemIconContainer}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
              </View>

              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>

              {/* Bonificaciones */}
              <View style={styles.bonusesContainer}>
                {item.bonusStr !== 0 && (
                  <View style={[styles.bonusTag, styles.bonusStr]}>
                    <Text style={styles.bonusTagText}>
                      {item.bonusStr > 0 ? `+${item.bonusStr}` : item.bonusStr}{' '}
                      STR
                    </Text>
                  </View>
                )}
                {item.bonusAgi !== 0 && (
                  <View style={[styles.bonusTag, styles.bonusAgi]}>
                    <Text style={styles.bonusTagText}>
                      {item.bonusAgi > 0 ? `+${item.bonusAgi}` : item.bonusAgi}{' '}
                      AGI
                    </Text>
                  </View>
                )}
                {item.bonusInt !== 0 && (
                  <View style={[styles.bonusTag, styles.bonusInt]}>
                    <Text style={styles.bonusTagText}>
                      {item.bonusInt > 0 ? `+${item.bonusInt}` : item.bonusInt}{' '}
                      INT
                    </Text>
                  </View>
                )}
              </View>

              {/* Estado Equipado */}
              <View
                style={[
                  styles.statusFooter,
                  isEquipped && styles.statusFooterEquipped,
                ]}
              >
                <Text
                  style={[
                    styles.statusFooterText,
                    isEquipped && styles.statusFooterTextEquipped,
                  ]}
                >
                  {isEquipped ? '✓ EQUIPADO' : 'Tocar para equipar'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#26334D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  zoneTag: {
    backgroundColor: '#F59E0B20',
    color: '#FBBF24',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F59E0B40',
  },
  zoneTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  clearBtn: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  clearBtnText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '700',
  },
  overloadAlert: {
    flexDirection: 'row',
    backgroundColor: '#EF444415',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    alignItems: 'center',
  },
  overloadAlertIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  overloadAlertTextContainer: {
    flex: 1,
  },
  overloadAlertTitle: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  overloadAlertDesc: {
    color: '#FCA5A5',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    justifyContent: 'space-between',
  },
  itemCardEquipped: {
    borderColor: '#F59E0B',
    backgroundColor: '#1E2333',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategoryBadge: {
    backgroundColor: '#1E293B',
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  itemWeightText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  itemIconContainer: {
    alignItems: 'center',
    marginVertical: 6,
  },
  itemIcon: {
    fontSize: 32,
  },
  itemName: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  bonusesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
    marginBottom: 8,
    minHeight: 22,
  },
  bonusTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bonusStr: {
    backgroundColor: '#EF444420',
  },
  bonusAgi: {
    backgroundColor: '#10B98120',
  },
  bonusInt: {
    backgroundColor: '#8B5CF620',
  },
  bonusTagText: {
    color: '#E2E8F0',
    fontSize: 9,
    fontWeight: '800',
  },
  statusFooter: {
    backgroundColor: '#1E293B',
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: 'center',
  },
  statusFooterEquipped: {
    backgroundColor: '#F59E0B25',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  statusFooterText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  statusFooterTextEquipped: {
    color: '#FBBF24',
    fontWeight: '800',
  },
});
