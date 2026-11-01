import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { HeroAvatarHUD } from './src/components/HeroAvatarHUD';
import { StatsControlPanel } from './src/components/StatsControlPanel';
import { ArmoryGrid } from './src/components/ArmoryGrid';
import { ReduxLiveInspector } from './src/components/ReduxLiveInspector';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        {/* Header Gamificado Principal */}
        <View style={styles.appHeader}>
          <View style={styles.brandContainer}>
            <View style={styles.brandIconEmblem}>
              <Text style={styles.brandIconText}>⚔️</Text>
            </View>
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.brandTitle}>HEROFORGE</Text>
                <Text style={styles.brandTitleAccent}>RPG</Text>
              </View>
              <Text style={styles.brandSubtitle}>
                State Management & Derived Telemetry
              </Text>
            </View>
          </View>

          <View style={styles.statusIndicator}>
            <View style={styles.livePulseDot} />
            <Text style={styles.statusBadgeText}>REDUX LIVE</Text>
          </View>
        </View>

        {/* ScrollView Principal con las 4 Zonas */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Zona A: Hero Avatar HUD */}
          <HeroAvatarHUD />

          {/* Zona B: Stats Control Panel */}
          <StatsControlPanel />

          {/* Zona C: Armory Grid */}
          <ArmoryGrid />

          {/* Zona D: Redux Live Inspector & Boss Arena */}
          <ReduxLiveInspector />

          {/* Footer RPG */}
          <View style={styles.footer}>
            <Text style={styles.footerShield}>🛡️</Text>
            <Text style={styles.footerText}>
              HeroForge RPG • React Native & Redux Toolkit
            </Text>
            <Text style={styles.footerSubtext}>
              Arquitectura de Estado Global Inmutable & Selectores Memoizados
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#090D16',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIconEmblem: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#38BDF860',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  brandIconText: {
    fontSize: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandTitleAccent: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B98150',
    gap: 5,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  statusBadgeText: {
    color: '#34D399',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 8,
  },
  footerShield: {
    fontSize: 24,
    marginBottom: 6,
    opacity: 0.7,
  },
  footerText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footerSubtext: {
    color: '#334155',
    fontSize: 9,
    marginTop: 2,
    fontWeight: '600',
  },
});
