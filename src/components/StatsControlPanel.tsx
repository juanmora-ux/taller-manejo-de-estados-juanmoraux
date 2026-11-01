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
    glowColor: string;
    value: number;
    description: string;
  }[] = [
    {
      key: 'str',
      label: 'FUERZA (STR)',
      icon: '⚔️',
      color: '#EF4444',
      glowColor: '#EF444480',
      value: str,
      description: 'Potencia daño físico y carga máxima (+2kg/pt)',
    },
    {
      key: 'agi',
      label: 'AGILIDAD (AGI)',
      icon: '🏹',
      color: '#10B981',
      glowColor: '#10B98180',
      value: agi,
      description: 'Velocidad de ataque y evasión táctica (+2 CP)',
    },
    {
      key: 'int',
      label: 'INTELIGENCIA (INT)',
      icon: '🔮',
      color: '#8B5CF6',
      glowColor: '#8B5CF680',
      value: int,
      description: 'Afinidad con hechizos y maná arcano (+3 CP)',
    },
  ];

  const maxStatForBar = 25;

  return (
    <View style={styles.container}>
      {/* Header Gamificado */}
      <View style={styles.headerRow}>
        <View style={styles.zoneTagBox}>
          <Text style={styles.zoneTagPrefix}>ZONA</Text>
          <Text style={styles.zoneTagLetter}>B</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.zoneTitle}>STATS CONTROL PANEL</Text>
          <Text style={styles.zoneSubtitle}>Asignación de Puntos & Árbol de Talentos</Text>
        </View>
      </View>

      {/* Contador Arcade / HUD de Puntos de Habilidad */}
      <View
        style={[
          styles.pointsBanner,
          availablePoints > 0 ? styles.pointsBannerActive : styles.pointsBannerDepleted,
        ]}
      >
        <View style={styles.pointsIconPlate}>
          <Text style={styles.pointsPlateIcon}>✨</Text>
        </View>
        <View style={styles.pointsTextCol}>
          <Text style={styles.pointsBannerTitle}>PUNTOS DE HABILIDAD</Text>
          <Text style={styles.pointsBannerHint}>
            {availablePoints > 0
              ? `Tienes ${availablePoints} punto${availablePoints > 1 ? 's' : ''} listo${availablePoints > 1 ? 's' : ''} para invertir`
              : 'Reserva agotada. Usa la Poción de Reseteo.'}
          </Text>
        </View>
        <View
          style={[
            styles.pointsCrystalBadge,
            availablePoints > 0
              ? styles.pointsCrystalActive
              : styles.pointsCrystalDepleted,
          ]}
        >
          <Text
            style={[
              styles.pointsBigNumber,
              availablePoints > 0
                ? styles.pointsBigNumberActive
                : styles.pointsBigNumberDepleted,
            ]}
          >
            {availablePoints}
          </Text>
          <Text style={styles.pointsUnitLabel}>PTS</Text>
        </View>
      </View>

      {/* Filas de Atributos */}
      <View style={styles.statsDeck}>
        {statsConfig.map((statItem) => {
          const barPercentage = Math.min(
            100,
            (statItem.value / maxStatForBar) * 100
          );
          const canDecrement = statItem.value > 1;
          const canIncrement = availablePoints > 0;

          return (
            <View
              key={statItem.key}
              style={[
                styles.statCard,
                { borderColor: `${statItem.color}35` },
              ]}
            >
              <View style={styles.statCardHeader}>
                <View style={styles.statIdentityRow}>
                  <View
                    style={[
                      styles.statIconBadge,
                      {
                        backgroundColor: `${statItem.color}18`,
                        borderColor: `${statItem.color}60`,
                      },
                    ]}
                  >
                    <Text style={styles.statIconGlyph}>{statItem.icon}</Text>
                  </View>
                  <View>
                    <Text style={[styles.statTitleText, { color: statItem.color }]}>
                      {statItem.label}
                    </Text>
                    <Text style={styles.statBrief}>{statItem.description}</Text>
                  </View>
                </View>

                {/* Controles de Consola 3D [-] y [+] */}
                <View style={styles.arcadeControlsRow}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => dispatch(decrementStat(statItem.key))}
                    disabled={!canDecrement}
                    style={[
                      styles.arcadeBtn,
                      styles.arcadeBtnDec,
                      !canDecrement && styles.arcadeBtnDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.arcadeBtnText,
                        !canDecrement && styles.arcadeBtnTextDisabled,
                      ]}
                    >
                      -
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.statDigitBox,
                      { borderColor: `${statItem.color}60` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statDigitNumber,
                        { color: statItem.color },
                      ]}
                    >
                      {statItem.value}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => dispatch(incrementStat(statItem.key))}
                    disabled={!canIncrement}
                    style={[
                      styles.arcadeBtn,
                      {
                        backgroundColor: canIncrement ? statItem.color : '#1E293B',
                        borderColor: canIncrement ? '#FFFFFF40' : '#334155',
                        shadowColor: canIncrement ? statItem.color : 'transparent',
                      },
                      !canIncrement && styles.arcadeBtnDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.arcadeBtnText,
                        { color: canIncrement ? '#FFFFFF' : '#475569' },
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Barra Visual de Nivel de Habilidad */}
              <View style={styles.levelBarTrack}>
                <View
                  style={[
                    styles.levelBarFill,
                    {
                      width: `${barPercentage}%`,
                      backgroundColor: statItem.color,
                      shadowColor: statItem.color,
                    },
                  ]}
                >
                  <View style={styles.levelBarGloss} />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Presets Rápidos Interactivos */}
      <View style={styles.presetsBlock}>
        <View style={styles.presetsHeaderRow}>
          <Text style={styles.presetsTitle}>⚡ BUILDS PREDEFINIDAS</Text>
          <Text style={styles.presetsNote}>1-Tap Preset</Text>
        </View>

        <View style={styles.presetsRow}>
          {/* Preset Guerrero */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.presetCard, styles.presetCardWarrior]}
            onPress={() => dispatch(applyBuildPreset('WARRIOR'))}
          >
            <View style={styles.presetTopTag}>
              <Text style={styles.presetWarriorTagText}>BERSERKER</Text>
            </View>
            <Text style={styles.presetIcon}>⚔️</Text>
            <Text style={styles.presetName}>Guerrero</Text>
            <Text style={styles.presetFormula}>STR 15 • AGI 3 • INT 2</Text>
          </TouchableOpacity>

          {/* Preset Mago */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.presetCard, styles.presetCardMage]}
            onPress={() => dispatch(applyBuildPreset('MAGE'))}
          >
            <View style={styles.presetTopTag}>
              <Text style={styles.presetMageTagText}>ARCANO</Text>
            </View>
            <Text style={styles.presetIcon}>🔮</Text>
            <Text style={styles.presetName}>Mago</Text>
            <Text style={styles.presetFormula}>INT 15 • AGI 3 • STR 2</Text>
          </TouchableOpacity>

          {/* Preset Asesino */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.presetCard, styles.presetCardRogue]}
            onPress={() => dispatch(applyBuildPreset('ROGUE'))}
          >
            <View style={styles.presetTopTag}>
              <Text style={styles.presetRogueTagText}>SOMBRA</Text>
            </View>
            <Text style={styles.presetIcon}>🥷</Text>
            <Text style={styles.presetName}>Asesino</Text>
            <Text style={styles.presetFormula}>AGI 15 • STR 3 • INT 2</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de Poción de Reseteo Alquímica */}
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.resetPotionBtn}
        onPress={() => dispatch(resetStats())}
      >
        <Text style={styles.resetPotionIcon}>🧪</Text>
        <View style={styles.resetPotionTextCol}>
          <Text style={styles.resetPotionTitle}>POCIÓN DE RESETEO (RESET TOTAL)</Text>
          <Text style={styles.resetPotionSubtitle}>
            Restaura 15 puntos y regresa los atributos base a 5 / 5 / 5
          </Text>
        </View>
        <Text style={styles.resetPotionChevron}>↺</Text>
      </TouchableOpacity>
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
    borderColor: '#38BDF830',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: '#10B98150',
  },
  zoneTagPrefix: {
    color: '#10B981',
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
  pointsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    borderWidth: 1.5,
  },
  pointsBannerActive: {
    backgroundColor: '#0A1E3A',
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  pointsBannerDepleted: {
    backgroundColor: '#090D16',
    borderColor: '#1E293B',
  },
  pointsIconPlate: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  pointsPlateIcon: {
    fontSize: 18,
  },
  pointsTextCol: {
    flex: 1,
  },
  pointsBannerTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pointsBannerHint: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  pointsCrystalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
    borderWidth: 1,
  },
  pointsCrystalActive: {
    backgroundColor: '#2563EB',
    borderColor: '#60A5FA',
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  pointsCrystalDepleted: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  pointsBigNumber: {
    fontSize: 22,
    fontWeight: '900',
  },
  pointsBigNumberActive: {
    color: '#FFFFFF',
  },
  pointsBigNumberDepleted: {
    color: '#64748B',
  },
  pointsUnitLabel: {
    color: '#E0F2FE',
    fontSize: 8,
    fontWeight: '900',
    marginTop: -3,
  },
  statsDeck: {
    gap: 12,
    marginTop: 14,
  },
  statCard: {
    backgroundColor: '#090D16',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statIdentityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  statIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  statIconGlyph: {
    fontSize: 20,
  },
  statTitleText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  statBrief: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
    maxWidth: 160,
  },
  arcadeControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arcadeBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  arcadeBtnDec: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  arcadeBtnDisabled: {
    opacity: 0.3,
    shadowOpacity: 0,
    elevation: 0,
  },
  arcadeBtnText: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
  },
  arcadeBtnTextDisabled: {
    color: '#475569',
  },
  statDigitBox: {
    minWidth: 36,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#131D33',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  statDigitNumber: {
    fontSize: 17,
    fontWeight: '900',
  },
  levelBarTrack: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  levelBarGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 3,
  },
  presetsBlock: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  presetsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  presetsTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  presetsNote: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '700',
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1.5,
    backgroundColor: '#090D16',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  presetCardWarrior: {
    borderColor: '#EF444470',
    shadowColor: '#EF4444',
  },
  presetCardMage: {
    borderColor: '#8B5CF670',
    shadowColor: '#8B5CF6',
  },
  presetCardRogue: {
    borderColor: '#10B98170',
    shadowColor: '#10B981',
  },
  presetTopTag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  presetWarriorTagText: {
    color: '#F87171',
    fontSize: 7,
    fontWeight: '900',
  },
  presetMageTagText: {
    color: '#A78BFA',
    fontSize: 7,
    fontWeight: '900',
  },
  presetRogueTagText: {
    color: '#34D399',
    fontSize: 7,
    fontWeight: '900',
  },
  presetIcon: {
    fontSize: 22,
    marginVertical: 2,
  },
  presetName: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '900',
  },
  presetFormula: {
    color: '#94A3B8',
    fontSize: 8,
    marginTop: 2,
    fontWeight: '700',
    textAlign: 'center',
  },
  resetPotionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#181E2E',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#64748B50',
  },
  resetPotionIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  resetPotionTextCol: {
    flex: 1,
  },
  resetPotionTitle: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  resetPotionSubtitle: {
    color: '#94A3B8',
    fontSize: 9,
    marginTop: 2,
  },
  resetPotionChevron: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 6,
  },
});
