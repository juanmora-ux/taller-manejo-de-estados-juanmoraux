import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { healHero, takeDamage } from '../store/slices/statsSlice';
import { clearLogs } from '../store/slices/actionLogSlice';
import {
  selectActionLogs,
  selectBaseCombatPower,
  selectCombatPower,
  selectIsOverloaded,
} from '../store/selectors';

export const ReduxLiveInspector: React.FC = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectActionLogs);
  const combatPower = useAppSelector(selectCombatPower);
  const basePower = useAppSelector(selectBaseCombatPower);
  const isOverloaded = useAppSelector(selectIsOverloaded);

  const handleAttackBoss = () => {
    // El héroe ataca al boss pero recibe un contragolpe de 20 de daño
    dispatch(takeDamage(20));
  };

  const handleHeal = () => {
    dispatch(healHero());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleInfoRow}>
          <Text style={styles.zoneTag}>ZONA D</Text>
          <Text style={styles.zoneTitle}>REDUX LIVE INSPECTOR & ARENA</Text>
        </View>
      </View>

      {/* Arena de Combate */}
      <View style={styles.arenaCard}>
        <View style={styles.arenaHeader}>
          <View style={styles.bossAvatarCircle}>
            <Text style={styles.bossIcon}>🐉</Text>
          </View>
          <View style={styles.bossInfo}>
            <Text style={styles.bossName}>Señor de las Sombras</Text>
            <Text style={styles.bossStatus}>Jefe de Mazmorra - Nivel 50</Text>
          </View>
        </View>

        {/* Display del Poder de Combate Calculado en Vivo */}
        <View style={styles.combatPowerDisplay}>
          <Text style={styles.combatPowerLabel}>PODER DE COMBATE EN VIVO</Text>
          <View style={styles.combatPowerNumberRow}>
            <Text style={styles.combatPowerNumber}>⚡ {combatPower}</Text>
            {isOverloaded ? (
              <View style={styles.overloadPenaltyBadge}>
                <Text style={styles.overloadPenaltyText}>-30% PENALIZADO</Text>
              </View>
            ) : (
              <View style={styles.optimalBadge}>
                <Text style={styles.optimalBadgeText}>100% EFICIENCIA</Text>
              </View>
            )}
          </View>
          {isOverloaded && (
            <Text style={styles.combatPowerFormula}>
              Base: {basePower} CP × 0.7 (Sobrecarga) = {combatPower} CP
            </Text>
          )}
          {!isOverloaded && (
            <Text style={styles.combatPowerFormula}>
              Fórmula: STR×3 + AGI×2 + INT×3 = {combatPower} CP
            </Text>
          )}
        </View>

        {/* Acciones de Combate */}
        <View style={styles.arenaActionsRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.attackButton}
            onPress={handleAttackBoss}
          >
            <Text style={styles.actionBtnIcon}>⚔️</Text>
            <Text style={styles.attackButtonText}>Atacar al Boss</Text>
            <Text style={styles.actionBtnSubtext}>(-20 HP Contragolpe)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.healButton}
            onPress={handleHeal}
          >
            <Text style={styles.actionBtnIcon}>💖</Text>
            <Text style={styles.healButtonText}>Curar Héroe</Text>
            <Text style={styles.actionBtnSubtext}>(HP al 100%)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Consola Ticker Redux en Pantalla */}
      <View style={styles.consoleContainer}>
        <View style={styles.consoleHeader}>
          <View style={styles.consoleTitleRow}>
            <View style={styles.consoleLed} />
            <Text style={styles.consoleTitle}>
              CONSOLA REDUX (ÚLTIMAS 5 ACCIONES)
            </Text>
          </View>
          {logs.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => dispatch(clearLogs())}
              style={styles.clearLogsBtn}
            >
              <Text style={styles.clearLogsText}>Limpiar</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.terminalBody}>
          {logs.length === 0 ? (
            <Text style={styles.emptyLogsText}>
              _ Esperando acciones... Modifica stats o equipamiento para registrar dispatches.
            </Text>
          ) : (
            logs.map((log, index) => {
              const isStats = log.type.startsWith('stats/');
              const isInventory = log.type.startsWith('inventory/');
              const tagColor = isStats ? '#60A5FA' : isInventory ? '#FBBF24' : '#34D399';

              return (
                <View key={log.id || index} style={styles.logRow}>
                  <Text style={styles.logTimestamp}>[{log.timestamp}]</Text>
                  <View style={styles.logContent}>
                    <Text style={[styles.logType, { color: tagColor }]}>
                      [{log.type}]
                    </Text>
                    <Text style={styles.logArrow}> → </Text>
                    <Text style={styles.logPayload} numberOfLines={2}>
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
    backgroundColor: '#131A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
    backgroundColor: '#8B5CF620',
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8B5CF640',
  },
  zoneTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  arenaCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 14,
  },
  arenaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bossAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#371B26',
    borderWidth: 2,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bossIcon: {
    fontSize: 26,
  },
  bossInfo: {
    flex: 1,
  },
  bossName: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: '900',
  },
  bossStatus: {
    color: '#94A3B8',
    fontSize: 11,
  },
  combatPowerDisplay: {
    backgroundColor: '#162032',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#24324A',
    marginBottom: 12,
  },
  combatPowerLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  combatPowerNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  combatPowerNumber: {
    color: '#FBBF24',
    fontSize: 26,
    fontWeight: '900',
  },
  overloadPenaltyBadge: {
    backgroundColor: '#EF444425',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  overloadPenaltyText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '800',
  },
  optimalBadge: {
    backgroundColor: '#10B98125',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  optimalBadgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
  },
  combatPowerFormula: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 4,
  },
  arenaActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  attackButton: {
    flex: 1,
    backgroundColor: '#7F1D1D',
    borderColor: '#DC2626',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  healButton: {
    flex: 1,
    backgroundColor: '#064E3B',
    borderColor: '#059669',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionBtnIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  attackButtonText: {
    color: '#FECACA',
    fontSize: 12,
    fontWeight: '800',
  },
  healButtonText: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '800',
  },
  actionBtnSubtext: {
    color: '#D1D5DB',
    fontSize: 9,
    marginTop: 2,
    opacity: 0.8,
  },
  consoleContainer: {
    backgroundColor: '#080C14',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  consoleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consoleLed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  consoleTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clearLogsBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  clearLogsText: {
    color: '#64748B',
    fontSize: 10,
  },
  terminalBody: {
    padding: 10,
    minHeight: 120,
    gap: 6,
  },
  emptyLogsText: {
    color: '#475569',
    fontSize: 11,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  logRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
    paddingBottom: 4,
  },
  logTimestamp: {
    color: '#475569',
    fontSize: 9,
    fontFamily: 'monospace',
  },
  logContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 1,
  },
  logType: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  logArrow: {
    color: '#64748B',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  logPayload: {
    color: '#E2E8F0',
    fontSize: 10,
    fontFamily: 'monospace',
    flexShrink: 1,
  },
});
