import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store';
import {
  selectBaseStats,
  selectCurrentWeight,
  selectHeroIdentity,
  selectIsOverloaded,
  selectMaxWeightCapacity,
  selectWeightPercentage,
  selectCombatPower,
  selectTotalStr,
  selectTotalAgi,
  selectTotalInt,
} from '../store/selectors';

export const HeroAvatarHUD: React.FC = () => {
  const { currentHp, maxHp } = useAppSelector(selectBaseStats);
  const { heroClass, auraColor, avatarIcon, titleDescription } =
    useAppSelector(selectHeroIdentity);
  const currentWeight = useAppSelector(selectCurrentWeight);
  const maxCapacity = useAppSelector(selectMaxWeightCapacity);
  const isOverloaded = useAppSelector(selectIsOverloaded);
  const weightPercent = useAppSelector(selectWeightPercentage);
  const combatPower = useAppSelector(selectCombatPower);
  const totalStr = useAppSelector(selectTotalStr);
  const totalAgi = useAppSelector(selectTotalAgi);
  const totalInt = useAppSelector(selectTotalInt);

  // Porcentaje de vida
  const hpPercent = Math.min(100, Math.max(0, (currentHp / maxHp) * 100));

  // Color dinámico de la barra de peso
  let weightBarColor = '#10B981'; // Verde (<70%)
  let weightLabel = 'Carga Ligera';
  if (weightPercent >= 100 || isOverloaded) {
    weightBarColor = '#EF4444'; // Rojo (>100% Sobrecargado)
    weightLabel = '¡SOBRECARGADO!';
  } else if (weightPercent >= 70) {
    weightBarColor = '#F59E0B'; // Amarillo (70-100%)
    weightLabel = 'Carga Pesada';
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.zoneTag}>ZONA A</Text>
        <Text style={styles.zoneTitle}>HERO AVATAR HUD</Text>
        <View style={styles.readOnlyBadge}>
          <Text style={styles.readOnlyText}>SOLO LECTURA</Text>
        </View>
      </View>

      {/* Avatar Central con Aura Dinámica */}
      <View style={styles.avatarSection}>
        <View
          style={[
            styles.auraCircle,
            {
              borderColor: auraColor,
              shadowColor: auraColor,
            },
          ]}
        >
          <Text style={styles.avatarEmoji}>{avatarIcon}</Text>
        </View>

        <View style={styles.identityContainer}>
          <View
            style={[
              styles.classBadge,
              { backgroundColor: `${auraColor}25`, borderColor: auraColor },
            ]}
          >
            <Text style={[styles.classBadgeText, { color: auraColor }]}>
              {heroClass}
            </Text>
          </View>
          <Text style={styles.subtitle}>{titleDescription}</Text>
        </View>
      </View>

      {/* Barra de Salud (HP) */}
      <View style={styles.metricBlock}>
        <View style={styles.metricHeader}>
          <Text style={styles.metricTitle}>❤️ Salud (HP)</Text>
          <Text style={styles.metricValue}>
            {currentHp} / {maxHp}{' '}
            <Text style={styles.metricPercentage}>({Math.round(hpPercent)}%)</Text>
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${hpPercent}%`,
                backgroundColor: hpPercent < 25 ? '#EF4444' : '#10B981',
              },
            ]}
          />
        </View>
      </View>

      {/* Barra de Capacidad de Peso */}
      <View style={styles.metricBlock}>
        <View style={styles.metricHeader}>
          <View style={styles.weightTitleRow}>
            <Text style={styles.metricTitle}>⚖️ Capacidad de Carga</Text>
            {isOverloaded && (
              <View style={styles.overloadTag}>
                <Text style={styles.overloadTagText}>PENALIZADO</Text>
              </View>
            )}
          </View>
          <Text style={[styles.metricValue, { color: weightBarColor }]}>
            {currentWeight} / {maxCapacity} kg{' '}
            <Text style={styles.metricPercentage}>({Math.round(weightPercent)}%)</Text>
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.min(100, weightPercent)}%`,
                backgroundColor: weightBarColor,
              },
            ]}
          />
        </View>
        <Text style={[styles.weightStatusNotice, { color: weightBarColor }]}>
          Estado de peso: {weightLabel}
        </Text>
      </View>

      {/* Mini resumen de atributos derivados */}
      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>STR Total</Text>
          <Text style={[styles.quickStatValue, { color: '#F87171' }]}>
            ⚔️ {totalStr}
          </Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>AGI Total</Text>
          <Text style={[styles.quickStatValue, { color: '#34D399' }]}>
            🏹 {totalAgi}
          </Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>INT Total</Text>
          <Text style={[styles.quickStatValue, { color: '#A78BFA' }]}>
            🔮 {totalInt}
          </Text>
        </View>
        <View style={styles.quickStatBox}>
          <Text style={styles.quickStatLabel}>Poder</Text>
          <Text style={[styles.quickStatValue, { color: '#FBBF24' }]}>
            ⚡ {combatPower}
          </Text>
        </View>
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
    marginBottom: 12,
  },
  zoneTag: {
    backgroundColor: '#3B82F620',
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3B82F640',
  },
  zoneTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  readOnlyBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  readOnlyText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 6,
  },
  auraCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarEmoji: {
    fontSize: 42,
  },
  identityContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  classBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  classBadgeText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
  metricBlock: {
    marginTop: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  weightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricTitle: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
  },
  metricValue: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  metricPercentage: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#0F172A',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  weightStatusNotice: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right',
  },
  overloadTag: {
    backgroundColor: '#EF444430',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  overloadTagText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '800',
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    gap: 6,
  },
  quickStatBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  quickStatLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  quickStatValue: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
});
