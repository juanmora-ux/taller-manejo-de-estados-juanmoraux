import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { healHero, takeDamage } from '../store/slices/statsSlice';
import { clearLogs } from '../store/slices/actionLogSlice';
import {
  selectActionLogs,
  selectBaseCombatPower,
  selectCombatPower,
  selectHeroComputedStatus,
  selectIsOverloaded,
} from '../store/selectors';

export const ReduxLiveInspector: React.FC = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectActionLogs);
  const combatPower = useAppSelector(selectCombatPower);
  const basePower = useAppSelector(selectBaseCombatPower);
  const isOverloaded = useAppSelector(selectIsOverloaded);
  const { currentHp, isDefeated } = useAppSelector(selectHeroComputedStatus);

  const handleAttackBoss = () => {
    // El héroe asesta un golpe al jefe pero recibe 25 pts de daño por contragolpe
    dispatch(takeDamage(25));
  };

  const handleHeal = () => {
    // Restablece la salud al 100%
    dispatch(healHero());
  };

  return (
    <View style={styles.container}>
      {/* Header Gamificado */}
      <View style={styles.headerRow}>
        <View style={styles.zoneTagBox}>
          <Text style={styles.zoneTagPrefix}>ZONA</Text>
          <Text style={styles.zoneTagLetter}>D</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.zoneTitle}>REDUX LIVE INSPECTOR & ARENA</Text>
          <Text style={styles.zoneSubtitle}>Simulador de Batalla & Telemetría Redux</Text>
        </View>
      </View>

      {/* Arena de Batalla contra el Boss */}
      <View style={styles.arenaCard}>
        <View style={styles.arenaTopBar}>
          <View style={styles.bossAvatarRing}>
            <Text style={styles.bossGlyph}>🐉</Text>
          </View>
          <View style={styles.bossDetails}>
            <View style={styles.bossNameRow}>
              <Text style={styles.bossTitle}>SEÑOR DE LAS CENIZAS</Text>
              <View style={styles.bossLevelBadge}>
                <Text style={styles.bossLevelText}>LVL 99 BOSS</Text>
              </View>
            </View>
            <Text style={styles.bossThreat}>
              {isDefeated
                ? '⚠️ ¡El héroe ha caído! Usa "Curar Héroe" para revivirlo.'
                : 'Amenaza Abisal • Mazmorra de Fuego'}
            </Text>
          </View>
        </View>

        {/* Display Gigante del Poder de Combate */}
        <View style={styles.combatPowerMonument}>
          <View style={styles.powerMonumentHeader}>
            <Text style={styles.powerMonumentLabel}>PODER DE COMBATE EN VIVO</Text>
            {isOverloaded ? (
              <View style={styles.penaltyTag}>
                <Text style={styles.penaltyTagText}>⚠️ -30% SOBRECARGA</Text>
              </View>
            ) : (
              <View style={styles.optimalTag}>
                <Text style={styles.optimalTagText}>⚡ 100% EFICIENCIA</Text>
              </View>
            )}
          </View>

          <Text style={styles.combatPowerGigantic}>
            ⚡ {combatPower}{' '}
            <Text style={styles.combatPowerUnit}>CP</Text>
          </Text>

          <View style={styles.formulaPill}>
            {isOverloaded ? (
              <Text style={styles.formulaText}>
                Base: {basePower} CP × 0.70 (Penalización de peso) = {combatPower} CP
              </Text>
            ) : (
              <Text style={styles.formulaText}>
                Fórmula: (STR × 3) + (AGI × 2) + (INT × 3) = {combatPower} CP
              </Text>
            )}
          </View>
        </View>

        {/* Botones de Acción de Combate */}
        <View style={styles.combatActionRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.attackBossBtn,
              isDefeated && styles.attackBossBtnDisabled,
            ]}
            onPress={handleAttackBoss}
            disabled={isDefeated}
          >
            <Text style={styles.actionButtonIcon}>
              {isDefeated ? '💀' : '⚔️'}
            </Text>
            <View>
              <Text style={styles.attackBossText}>
                {isDefeated ? 'HÉROE CAÍDO' : 'ATACAR AL BOSS'}
              </Text>
              <Text style={styles.attackBossSub}>
                {isDefeated ? '(HP en 0 - Revive)' : 'Recibe -25 HP de daño'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.healHeroBtn}
            onPress={handleHeal}
          >
            <Text style={styles.actionButtonIcon}>💖</Text>
            <View>
              <Text style={styles.healHeroText}>CURAR HÉROE</Text>
              <Text style={styles.healHeroSub}>Restaura HP al 100%</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Consola Terminal Hacker Redux Ticker */}
      <View style={styles.terminalContainer}>
        <View style={styles.terminalHeader}>
          <View style={styles.terminalSignals}>
            <View style={styles.terminalDotGreen} />
            <View style={styles.terminalDotYellow} />
            <View style={styles.terminalDotRed} />
            <Text style={styles.terminalHeaderTitle}>REDUX ACTION TICKER (ÚLTIMAS 5)</Text>
          </View>
          {logs.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => dispatch(clearLogs())}
              style={styles.terminalClearBtn}
            >
              <Text style={styles.terminalClearText}>LIMPIAR</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.terminalScreen}>
          {logs.length === 0 ? (
            <View style={styles.terminalEmptyState}>
              <Text style={styles.terminalPromptSign}>&gt;</Text>
              <Text style={styles.terminalEmptyText}>
                Esperando dispatches de Redux Toolkit... Modifica stats o ataca al boss.
              </Text>
            </View>
          ) : (
            logs.map((log, index) => {
              const isStats = log.type.startsWith('stats/');
              const isInventory = log.type.startsWith('inventory/');
              const typeColor = isStats ? '#38BDF8' : isInventory ? '#FBBF24' : '#34D399';

              return (
                <View key={log.id || index} style={styles.terminalEntry}>
                  <View style={styles.terminalTimeCol}>
                    <Text style={styles.terminalPromptSign}>&gt;</Text>
                    <Text style={styles.terminalTimestamp}>[{log.timestamp}]</Text>
                  </View>
                  <View style={styles.terminalLogContent}>
                    <Text style={[styles.terminalActionType, { color: typeColor }]}>
                      [{log.type}]
                    </Text>
                    <Text style={styles.terminalArrow}> → </Text>
                    <Text style={styles.terminalPayload} numberOfLines={2}>
                      {log.payload !== null && log.payload !== undefined
                        ? JSON.stringify(log.payload)
                        : 'void'}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
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
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#8B5CF630',
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
    borderColor: '#8B5CF650',
  },
  zoneTagPrefix: {
    color: '#8B5CF6',
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
  arenaCard: {
    backgroundColor: '#090D16',
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: '#EF444440',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  arenaTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  bossAvatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#3B0716',
    borderWidth: 2,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  bossGlyph: {
    fontSize: 24,
  },
  bossDetails: {
    flex: 1,
  },
  bossNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bossTitle: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bossLevelBadge: {
    backgroundColor: '#EF444425',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  bossLevelText: {
    color: '#FCA5A5',
    fontSize: 8,
    fontWeight: '900',
  },
  bossThreat: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  combatPowerMonument: {
    backgroundColor: '#121A2E',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F59E0B60',
    marginBottom: 14,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  powerMonumentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
  },
  powerMonumentLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  penaltyTag: {
    backgroundColor: '#EF444425',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  penaltyTagText: {
    color: '#EF4444',
    fontSize: 8,
    fontWeight: '900',
  },
  optimalTag: {
    backgroundColor: '#10B98125',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  optimalTagText: {
    color: '#34D399',
    fontSize: 8,
    fontWeight: '900',
  },
  combatPowerGigantic: {
    color: '#FBBF24',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1,
    textShadowColor: 'rgba(251, 191, 36, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginVertical: 4,
  },
  combatPowerUnit: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: '800',
  },
  formulaPill: {
    backgroundColor: '#090D16',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 4,
  },
  formulaText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
  },
  combatActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  attackBossBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F1D1D',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  attackBossBtnDisabled: {
    backgroundColor: '#271116',
    borderColor: '#4A1D24',
    opacity: 0.6,
  },
  healHeroBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    borderWidth: 1.5,
    borderColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonIcon: {
    fontSize: 20,
  },
  attackBossText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  attackBossSub: {
    color: '#FCA5A5',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 1,
  },
  healHeroText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  healHeroSub: {
    color: '#A7F3D0',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 1,
  },
  terminalContainer: {
    backgroundColor: '#05070D',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    marginTop: 16,
    overflow: 'hidden',
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0B1120',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  terminalSignals: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  terminalDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  terminalDotYellow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  terminalDotRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  terminalHeaderTitle: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginLeft: 6,
  },
  terminalClearBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  terminalClearText: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '900',
  },
  terminalScreen: {
    padding: 10,
    minHeight: 125,
    gap: 6,
  },
  terminalEmptyState: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  terminalPromptSign: {
    color: '#10B981',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '900',
  },
  terminalEmptyText: {
    color: '#475569',
    fontSize: 10,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    flex: 1,
  },
  terminalEntry: {
    borderBottomWidth: 1,
    borderBottomColor: '#0E1726',
    paddingBottom: 4,
  },
  terminalTimeCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  terminalTimestamp: {
    color: '#475569',
    fontSize: 8,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  terminalLogContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
    marginLeft: 12,
  },
  terminalActionType: {
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  terminalArrow: {
    color: '#64748B',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  terminalPayload: {
    color: '#E2E8F0',
    fontSize: 9,
    fontFamily: 'monospace',
    flexShrink: 1,
  },
});
