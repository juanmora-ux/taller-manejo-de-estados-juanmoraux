import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import {
  decrementStat,
  incrementStat,
  applyBuildPreset,
  resetStats,
} from '../store/slices/statsSlice';
import { selectBaseStats } from '../store/selectors';
import { StatKey } from '../types';

export const StatsControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { availablePoints, str, agi, int } = useAppSelector(selectBaseStats);

  const statsConfig: {
    key: StatKey;
    label: string;
    icon: string;
    color: string;
    value: number;
    description: string;
  }[] = [
    {
      key: 'str',
      label: 'Fuerza (STR)',
      icon: '⚔️',
      color: '#EF4444',
      value: str,
      description: 'Aumenta poder de ataque físico y capacidad de carga (+2kg c/u)',
    },
    {
      key: 'agi',
      label: 'Agilidad (AGI)',
      icon: '🏹',
      color: '#10B981',
      value: agi,
      description: 'Aumenta velocidad, reflejos y bonificación de evasión (+2 CP)',
    },
    {
      key: 'int',
      label: 'Inteligencia (INT)',
      icon: '🔮',
      color: '#8B5CF6',
      value: int,
      description: 'Canalización de magia, maná arcano y sabiduría (+3 CP)',
    },
  ];

  const maxStatForBar = 25;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.zoneTag}>ZONA B</Text>
        <Text style={styles.zoneTitle}>STATS CONTROL PANEL</Text>
      </View>

      {/* Contador Prominente de Puntos Disponibles */}
      <View style={styles.pointsBanner}>
        <View style={styles.pointsTextContainer}>
          <Text style={styles.pointsTitle}>PUNTOS DISPONIBLES</Text>
          <Text style={styles.pointsSubtitle}>
            {availablePoints > 0
              ? 'Asigna puntos para potenciar tus atributos'
              : 'Sin puntos restantes. Usa reset o redistribuye.'}
          </Text>
        </View>
        <View
          style={[
            styles.pointsBadge,
            availablePoints === 0 && styles.pointsBadgeEmpty,
          ]}
        >
          <Text
            style={[
              styles.pointsNumber,
              availablePoints === 0 && styles.pointsNumberEmpty,
            ]}
          >
            {availablePoints}
          </Text>
          <Text style={styles.pointsBadgeLabel}>PTS</Text>
        </View>
      </View>

      {/* Filas de Atributos */}
      <View style={styles.statsList}>
        {statsConfig.map((statItem) => {
          const barPercentage = Math.min(
            100,
            (statItem.value / maxStatForBar) * 100
          );
          const canDecrement = statItem.value > 1;
          const canIncrement = availablePoints > 0;

          return (
            <View key={statItem.key} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statLabelRow}>
                  <Text style={styles.statIcon}>{statItem.icon}</Text>
                  <Text style={styles.statLabelText}>{statItem.label}</Text>
                </View>

                {/* Controles [-] y [+] */}
                <View style={styles.controlButtonsRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => dispatch(decrementStat(statItem.key))}
                    disabled={!canDecrement}
                    style={[
                      styles.btnRound,
                      !canDecrement && styles.btnDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.btnRoundText,
                        !canDecrement && styles.btnTextDisabled,
                      ]}
                    >
                      -
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.statValueBox}>
                    <Text
                      style={[styles.statValueText, { color: statItem.color }]}
                    >
                      {statItem.value}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => dispatch(incrementStat(statItem.key))}
                    disabled={!canIncrement}
                    style={[
                      styles.btnRound,
                      styles.btnIncrement,
                      !canIncrement && styles.btnDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.btnRoundText,
                        styles.btnIncrementText,
                        !canIncrement && styles.btnTextDisabled,
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Barra de progreso visual del nivel */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarProgress,
                    {
                      width: `${barPercentage}%`,
                      backgroundColor: statItem.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.statDescText}>{statItem.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Presets Rápidos */}
      <View style={styles.presetsSection}>
        <Text style={styles.sectionSmallTitle}>PRESETS RÁPIDOS DE CLASE</Text>
        <View style={styles.presetButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.presetButton, styles.presetWarrior]}
            onPress={() => dispatch(applyBuildPreset('WARRIOR'))}
          >
            <Text style={styles.presetIcon}>⚔️</Text>
            <Text style={styles.presetBtnTitle}>Guerrero</Text>
            <Text style={styles.presetBtnDetail}>STR 15 / AGI 3 / INT 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.presetButton, styles.presetMage]}
            onPress={() => dispatch(applyBuildPreset('MAGE'))}
          >
            <Text style={styles.presetIcon}>🧙‍♂️</Text>
            <Text style={styles.presetBtnTitle}>Mago</Text>
            <Text style={styles.presetBtnDetail}>INT 15 / AGI 3 / STR 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.presetButton, styles.presetRogue]}
            onPress={() => dispatch(applyBuildPreset('ROGUE'))}
          >
            <Text style={styles.presetIcon}>🥷</Text>
            <Text style={styles.presetBtnTitle}>Asesino</Text>
            <Text style={styles.presetBtnDetail}>AGI 15 / STR 3 / INT 2</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de Poción de Reseteo */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.resetButton}
        onPress={() => dispatch(resetStats())}
      >
        <Text style={styles.resetButtonText}>🧪 Poción de Reseteo (Reset Stats)</Text>
      </TouchableOpacity>
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
  zoneTag: {
    backgroundColor: '#10B98120',
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B98140',
  },
  zoneTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  pointsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  pointsTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  pointsTitle: {
    color: '#F1F5F9',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pointsSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  pointsBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  pointsBadgeEmpty: {
    backgroundColor: '#475569',
  },
  pointsNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  pointsNumberEmpty: {
    color: '#94A3B8',
  },
  pointsBadgeLabel: {
    color: '#E0F2FE',
    fontSize: 8,
    fontWeight: '800',
    marginTop: -2,
  },
  statsList: {
    gap: 10,
  },
  statCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    fontSize: 18,
  },
  statLabelText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  controlButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  btnRound: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  btnIncrement: {
    backgroundColor: '#2563EB',
    borderColor: '#3B82F6',
  },
  btnDisabled: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    opacity: 0.4,
  },
  btnRoundText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  btnIncrementText: {
    color: '#FFFFFF',
  },
  btnTextDisabled: {
    color: '#64748B',
  },
  statValueBox: {
    minWidth: 32,
    alignItems: 'center',
  },
  statValueText: {
    fontSize: 18,
    fontWeight: '900',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarProgress: {
    height: '100%',
    borderRadius: 3,
  },
  statDescText: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 6,
  },
  presetsSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  sectionSmallTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  presetButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  presetWarrior: {
    backgroundColor: '#EF444415',
    borderColor: '#EF444460',
  },
  presetMage: {
    backgroundColor: '#8B5CF615',
    borderColor: '#8B5CF660',
  },
  presetRogue: {
    backgroundColor: '#10B98115',
    borderColor: '#10B98160',
  },
  presetIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  presetBtnTitle: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '800',
  },
  presetBtnDetail: {
    color: '#94A3B8',
    fontSize: 8,
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 14,
    backgroundColor: '#374151',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  resetButtonText: {
    color: '#F3F4F6',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
