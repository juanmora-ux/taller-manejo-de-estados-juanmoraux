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

  // Color dinámico de la barra de peso y etiquetas temáticas
  let weightBarColor = '#10B981'; // Verde Neón (<70%)
  let weightStatusBadge = 'ÁGIL (<70%)';
  let weightStatusColor = '#34D399';

  if (isOverloaded || weightPercent >= 100) {
    weightBarColor = '#EF4444'; // Rojo Neón (>100% Sobrecargado)
    weightStatusBadge = '¡SOBRECARGADO!';
    weightStatusColor = '#F87171';
  } else if (weightPercent >= 70) {
    weightBarColor = '#F59E0B'; // Ámbar / Naranja (70-99%)
    weightStatusBadge = 'CARGA PESADA';
    weightStatusColor = '#FBBF24';
  }

  return (
    <View style={[styles.container, { borderColor: `${auraColor}50` }]}>
      {/* Header Gamificado */}
      <View style={styles.headerRow}>
        <View style={styles.zoneTagBox}>
          <Text style={styles.zoneTagPrefix}>ZONA</Text>
          <Text style={styles.zoneTagLetter}>A</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.zoneTitle}>HERO AVATAR HUD</Text>
          <Text style={styles.zoneSubtitle}>Estado Biométrico en Tiempo Real</Text>
        </View>
        <View style={styles.readOnlyBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.readOnlyText}>HUD ACTIVO</Text>
        </View>
      </View>

      {/* Escenario del Avatar con Anillos de Aura Neón */}
      <View style={styles.avatarStage}>
        {/* Anillo de aura exterior difuso */}
        <View
          style={[
            styles.outerAuraRing,
            {
              borderColor: `${auraColor}40`,
              shadowColor: auraColor,
            },
          ]}
        >
          {/* Anillo de aura intermedio */}
          <View
            style={[
              styles.midAuraRing,
              {
                borderColor: `${auraColor}80`,
              },
            ]}
          >
            {/* Núcleo del Avatar */}
            <View
              style={[
                styles.avatarCore,
                {
                  borderColor: auraColor,
                  shadowColor: auraColor,
                },
              ]}
            >
              <Text style={styles.avatarEmoji}>{avatarIcon}</Text>
            </View>
          </View>
        </View>

        {/* Badge de Clase Flotante */}
        <View
          style={[
            styles.classBadge,
            {
              borderColor: auraColor,
              shadowColor: auraColor,
              backgroundColor: '#0D1424',
            },
          ]}
        >
          <View
            style={[styles.classBadgeGlowBar, { backgroundColor: auraColor }]}
          />
          <Text style={[styles.classBadgeText, { color: auraColor }]}>
            ⚔️ {heroClass.toUpperCase()}
          </Text>
          <View
            style={[styles.classBadgeGlowBar, { backgroundColor: auraColor }]}
          />
        </View>

        <Text style={styles.subtitleLore}>{titleDescription}</Text>
      </View>

      {/* Barras de Recursos HUD */}
      <View style={styles.barsContainer}>
        {/* Barra de Salud (HP) */}
        <View style={styles.barCard}>
          <View style={styles.barHeader}>
            <View style={styles.barLabelWithIcon}>
              <View style={styles.hpIconBadge}>
                <Text style={styles.hpIconText}>❤️</Text>
              </View>
              <Text style={styles.barLabel}>PUNTOS DE SALUD (HP)</Text>
            </View>
            <View style={styles.barNumbersRow}>
              <Text style={styles.barCurrentValue}>{currentHp}</Text>
              <Text style={styles.barMaxValue}> / {maxHp}</Text>
              <Text
                style={[
                  styles.barPercentText,
                  { color: hpPercent < 30 ? '#EF4444' : '#34D399' },
                ]}
              >
                ({Math.round(hpPercent)}%)
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${hpPercent}%`,
                  backgroundColor: hpPercent < 25 ? '#EF4444' : '#10B981',
                  shadowColor: hpPercent < 25 ? '#EF4444' : '#10B981',
                },
              ]}
            >
              <View style={styles.progressGloss} />
            </View>
          </View>
        </View>

        {/* Barra de Capacidad de Peso */}
        <View style={styles.barCard}>
          <View style={styles.barHeader}>
            <View style={styles.barLabelWithIcon}>
              <View
                style={[
                  styles.weightIconBadge,
                  isOverloaded && styles.weightIconBadgeAlert,
                ]}
              >
                <Text style={styles.weightIconText}>
                  {isOverloaded ? '⚠️' : '⚖️'}
                </Text>
              </View>
              <View>
                <Text style={styles.barLabel}>CARGA DE EQUIPAMIENTO</Text>
                <Text style={[styles.weightStateLabel, { color: weightStatusColor }]}>
                  {weightStatusBadge}
                </Text>
              </View>
            </View>

            <View style={styles.barNumbersRow}>
              <Text style={[styles.barCurrentValue, { color: weightBarColor }]}>
                {currentWeight}
              </Text>
              <Text style={styles.barMaxValue}> / {maxCapacity} kg</Text>
              <Text style={[styles.barPercentText, { color: weightBarColor }]}>
                ({Math.round(weightPercent)}%)
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, weightPercent)}%`,
                  backgroundColor: weightBarColor,
                  shadowColor: weightBarColor,
                },
              ]}
            >
              <View style={styles.progressGloss} />
            </View>
          </View>
        </View>
      </View>

      {/* Mini Matriz de Atributos Totales HUD */}
      <View style={styles.statsMatrix}>
        <View style={[styles.matrixCard, styles.matrixCardStr]}>
          <Text style={styles.matrixCardTitle}>FUERZA</Text>
          <Text style={styles.matrixCardValue}>⚔️ {totalStr}</Text>
          <Text style={styles.matrixCardSub}>Total STR</Text>
        </View>

        <View style={[styles.matrixCard, styles.matrixCardAgi]}>
          <Text style={styles.matrixCardTitle}>AGILIDAD</Text>
          <Text style={styles.matrixCardValue}>🏹 {totalAgi}</Text>
          <Text style={styles.matrixCardSub}>Total AGI</Text>
        </View>

        <View style={[styles.matrixCard, styles.matrixCardInt]}>
          <Text style={styles.matrixCardTitle}>INTELIGENCIA</Text>
          <Text style={styles.matrixCardValue}>🔮 {totalInt}</Text>
          <Text style={styles.matrixCardSub}>Total INT</Text>
        </View>

        <View style={[styles.matrixCard, styles.matrixCardCp]}>
          <Text style={styles.matrixCardTitle}>PODER</Text>
          <Text style={styles.matrixCardValue}>⚡ {combatPower}</Text>
          <Text style={styles.matrixCardSub}>Total CP</Text>
        </View>
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
    borderColor: '#38BDF850',
  },
  zoneTagPrefix: {
    color: '#38BDF8',
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
  readOnlyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131D33',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  readOnlyText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  avatarStage: {
    alignItems: 'center',
    marginVertical: 14,
  },
  outerAuraRing: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 10,
  },
  midAuraRing: {
    width: 98,
    height: 98,
    borderRadius: 49,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#090D16',
  },
  avatarCore: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#1E293B',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  avatarEmoji: {
    fontSize: 42,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 24,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 6,
    gap: 8,
  },
  classBadgeGlowBar: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  classBadgeText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  subtitleLore: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
    textAlign: 'center',
  },
  barsContainer: {
    gap: 12,
    marginTop: 8,
  },
  barCard: {
    backgroundColor: '#090D16',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  barLabelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hpIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#EF444420',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hpIconText: {
    fontSize: 12,
  },
  weightIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightIconBadgeAlert: {
    backgroundColor: '#EF444430',
  },
  weightIconText: {
    fontSize: 12,
  },
  barLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  weightStateLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  barNumbersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  barCurrentValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '900',
  },
  barMaxValue: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  barPercentText: {
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#1E293B',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  progressGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  statsMatrix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  matrixCard: {
    flex: 1,
    backgroundColor: '#090D16',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  matrixCardStr: {
    borderColor: '#EF444440',
  },
  matrixCardAgi: {
    borderColor: '#10B98140',
  },
  matrixCardInt: {
    borderColor: '#8B5CF640',
  },
  matrixCardCp: {
    borderColor: '#F59E0B40',
  },
  matrixCardTitle: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  matrixCardValue: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  matrixCardSub: {
    color: '#475569',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 1,
  },
});
