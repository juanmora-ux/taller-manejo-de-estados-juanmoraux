# ⚔️ HeroForge RPG - Redux Store & Derived Selectors

Aplicación móvil construida en **React Native con Expo**, **TypeScript** y **Redux Toolkit (@reduxjs/toolkit y react-redux)**, diseñada bajo patrones de arquitectura de estado predecibles, inmutables y de alto rendimiento.

---

## 🏛️ Estructura del Proyecto

```text
├── App.tsx                      # Componente raíz con Provider Redux y ScrollView
├── src/
│   ├── types/
│   │   └── index.ts             # Tipos e interfaces de Stats, Inventory y Logs
│   ├── store/
│   │   ├── index.ts             # Configuración del store, RootState y hooks tipados
│   │   ├── selectors.ts         # SELECTORES CRUZADOS Y ESTADO DERIVADO (Regla de Oro)
│   │   └── slices/
│   │       ├── statsSlice.ts    # Atributos base (STR, AGI, INT), HP y Presets
│   │       ├── inventorySlice.ts# Catálogo de 6 ítems y gestión de equipamiento
│   │       └── actionLogSlice.ts# addMatcher para auditar acciones en tiempo real
│   └── components/
│       ├── HeroAvatarHUD.tsx     # (Zona A) HUD de solo lectura con Aura y Barras
│       ├── StatsControlPanel.tsx # (Zona B) Asignador de puntos, +/- y Presets
│       ├── ArmoryGrid.tsx        # (Zona C) Cuadrícula de ítems y alerta de sobrecarga
│       └── ReduxLiveInspector.tsx# (Zona D) Arena de combate contra Boss y consola Ticker
```

---

## 🌟 Regla de Oro: Estado Derivado y Selectores Cruzados

**PROHIBIDO guardar datos calculados dentro de los Slices.** Todos los cálculos de juego se resuelven en tiempo real mediante `createSelector` memoizado en `src/store/selectors.ts`:

1. **Atributos Totales (`totalStr`, `totalAgi`, `totalInt`)**:
   $$\text{Total} = \text{Atributo Base} + \sum \text{Bonos de Ítems Equipados}$$

2. **Capacidad de Carga y Sobrecarga**:
   $$\text{Capacidad Máxima} = 10 + (\text{Total STR} \times 2)$$
   $$\text{isOverloaded} = \text{Peso Actual} > \text{Capacidad Máxima}$$

3. **Clase y Aura Dinámica**:
   Calcula automáticamente según ítems equipados y atributo dominante:
   - **Tanque Pesado** (`#F59E0B` Ámbar): Escudo o armadura pesada equipada y STR $\ge$ 10 o peso $\ge$ 25 kg.
   - **Guerrero Berserker** (`#EF4444` Carmesí): STR dominante.
   - **Archimago Arcano** (`#8B5CF6` Violeta): INT dominante.
   - **Asesino Sombrío** (`#10B981` Esmeralda): AGI dominante.
   - **Aldeano Novato** (`#94A3B8` Pizarra): Atributos iniciales sin equipamiento.

4. **Poder de Combate (CP)**:
   $$\text{CP Base} = (\text{Total STR} \times 3) + (\text{Total AGI} \times 2) + (\text{Total INT} \times 3)$$
   $$\text{CP Final} = \begin{cases} \text{round}(\text{CP Base} \times 0.70) & \text{si } \text{isOverloaded} \\ \text{CP Base} & \text{si no} \end{cases}$$

---

## 🎮 Las 4 Zonas de la Interfaz

- **Zona A (`HeroAvatarHUD`)**: HUD de solo lectura con avatar dinámico, aura reactiva, badge de clase, barra de salud (HP) y barra de capacidad de peso con umbrales cromáticos (Verde `<70%`, Amarillo `70-100%`, Rojo `>100% SOBRECARGADO`).
- **Zona B (`StatsControlPanel`)**: Contador de puntos de habilidad disponibles, controles interactivos `[-]` y `[+]` por atributo, nivel visual, botón de **Poción de Reseteo** y Presets rápidos (**Guerrero**, **Mago**, **Asesino**).
- **Zona C (`ArmoryGrid`)**: Cuadrícula de 6 ítems con ícono, estadísticas, peso y borde dorado al equipar. Incluye banner de alerta por sobrecarga y botón **Desequipar Todo**.
- **Zona D (`ReduxLiveInspector`)**: Arena contra el Boss con daño en tiempo real y curación, visualización del Poder de Combate y **Consola Ticker** con las últimas 5 acciones Redux interceptadas por `builder.addMatcher`.

---

## 🚀 Cómo Ejecutar la Aplicación

```bash
# Iniciar el servidor de desarrollo de Expo
npm start

# O abrir directamente en plataforma web o emulador
npm run web
npm run android
npm run ios
```
