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
        <View style={styles.appHeader}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandIcon}>⚔️</Text>
            <View>
              <Text style={styles.brandTitle}>HeroForge RPG</Text>
              <Text style={styles.brandSubtitle}>
                Redux Toolkit State & Derived Selectors
              </Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.liveIndicator} />
            <Text style={styles.statusBadgeText}>REDUX LIVE</Text>
          </View>
        </View>

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

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              HeroForge RPG • React Native + Redux Toolkit
            </Text>
            <Text style={styles.footerSubtext}>
              Arquitectura de Estado Global & Selectores Cruzados al Vuelo
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
    backgroundColor: '#0B0F19',
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0B0F19',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    fontSize: 26,
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 5,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusBadgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 4,
  },
  footerText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  footerSubtext: {
    color: '#334155',
    fontSize: 10,
    marginTop: 2,
  },
});
