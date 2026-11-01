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

  const getCategoryTheme = (cat: InventoryItem['category']) => {
    switch (cat) {
      case 'weapon':
        return { label: 'ARMA', color: '#EF4444', bg: '#EF444415' };
      case 'shield':
        return { label: 'ESCUDO', color: '#38BDF8', bg: '#38BDF815' };
      case 'armor':
        return { label: 'ARMADURA', color: '#10B981', bg: '#10B98115' };
      case 'accessory':
        return { label: 'ACCESORIO', color: '#A855F7', bg: '#A855F715' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Gamificado */}
      <View style={styles.headerRow}>
        <View style={styles.zoneTagBox}>
          <Text style={styles.zoneTagPrefix}>ZONA</Text>
          <Text style={styles.zoneTagLetter}>C</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.zoneTitle}>ARMORY GRID</Text>
          <Text style={styles.zoneSubtitle}>Arsenal de Equipo & Modificadores</Text>
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

      {/* Alerta Visual de Sobrecarga Neón */}
      {isOverloaded && (
        <View style={styles.overloadBanner}>
          <View style={styles.overloadIconBox}>
            <Text style={styles.overloadIcon}>⚠️</Text>
          </View>
          <View style={styles.overloadTextCol}>
            <Text style={styles.overloadBannerTitle}>
              ¡SOBRECARGADO! -30% PODER DE COMBATE
            </Text>
            <Text style={styles.overloadBannerDetail}>
              Límite de carga excedido: {currentWeight}kg de {maxWeight}kg permitidos.
              Desequipa armamento o incrementa tu Fuerza (STR).
            </Text>
          </View>
        </View>
      )}

      {/* Grid de Ítems Estilo Inventario RPG */}
      <View style={styles.grid}>
        {items.map((item) => {
          const isEquipped = equippedIds.includes(item.id);
          const categoryTheme = getCategoryTheme(item.category);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={[
                styles.itemCard,
                isEquipped ? styles.itemCardEquipped : styles.itemCardUnequipped,
              ]}
              onPress={() => dispatch(toggleEquipItem(item.id))}
            >
              {/* Badge Superior Flotante: Categoría y Peso */}
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.catBadge,
                    {
                      backgroundColor: categoryTheme.bg,
                      borderColor: `${categoryTheme.color}50`,
                    },
                  ]}
                >
                  <Text
                    style={[styles.catBadgeText, { color: categoryTheme.color }]}
                  >
                    {categoryTheme.label}
                  </Text>
                </View>

                <View style={styles.weightBadge}>
                  <Text style={styles.weightBadgeText}>{item.weight} kg</Text>
                </View>
              </View>

              {/* Pedestal del Ícono */}
              <View
                style={[
                  styles.iconPedestal,
                  isEquipped && styles.iconPedestalEquipped,
                ]}
              >
                <Text style={styles.itemIcon}>{item.icon}</Text>
              </View>

              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>

              {/* Contenedor de Bonificaciones */}
              <View style={styles.bonusStrip}>
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

              {/* Estado de Acción Equipado / Equipar */}
              <View
                style={[
                  styles.slotStateBanner,
                  isEquipped
                    ? styles.slotStateBannerEquipped
                    : styles.slotStateBannerUnequipped,
                ]}
              >
                <Text
                  style={[
                    styles.slotStateText,
                    isEquipped
                      ? styles.slotStateTextEquipped
                      : styles.slotStateTextUnequipped,
                  ]}
                >
                  {isEquipped ? '✨ EQUIPADO' : '+ EQUIPAR'}
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
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F59E0B30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  zoneTagBox: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B50',
  },
  zoneTagPrefix: {
    color: '#F59E0B',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  zoneTagLetter: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '900',
    marginTop: -2,
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  zoneTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  zoneSubtitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '500',
  },
  clearBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
  },
  clearBtnText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  overloadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#450A0A',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 6,
  },
  overloadIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7F1D1D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  overloadIcon: {
    fontSize: 20,
  },
  overloadTextCol: {
    flex: 1,
  },
  overloadBannerTitle: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  overloadBannerDetail: {
    color: '#FECACA',
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 14,
  },
  itemCard: {
    width: '48.3%',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1.5,
    justifyContent: 'space-between',
  },
  itemCardUnequipped: {
    backgroundColor: '#090D16',
    borderColor: '#1E293B',
  },
  itemCardEquipped: {
    backgroundColor: '#1C1917',
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  catBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  weightBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightBadgeText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
  },
  iconPedestal: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#131A2A',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  iconPedestalEquipped: {
    borderColor: '#F59E0B80',
    backgroundColor: '#292113',
  },
  itemIcon: {
    fontSize: 28,
  },
  itemName: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  bonusStrip: {
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
    backgroundColor: '#EF444425',
  },
  bonusAgi: {
    backgroundColor: '#10B98125',
  },
  bonusInt: {
    backgroundColor: '#8B5CF625',
  },
  bonusTagText: {
    color: '#F1F5F9',
    fontSize: 9,
    fontWeight: '900',
  },
  slotStateBanner: {
    borderRadius: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotStateBannerUnequipped: {
    backgroundColor: '#1E293B',
  },
  slotStateBannerEquipped: {
    backgroundColor: '#F59E0B',
  },
  slotStateText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  slotStateTextUnequipped: {
    color: '#94A3B8',
  },
  slotStateTextEquipped: {
    color: '#1C1917',
  },
});
