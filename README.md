# Expo State Management POC

**Redux Toolkit vs Zustand vs MobX State Tree**

This repository is a **Proof of Concept (POC)** designed to objectively compare three state management approaches in a **cross-platform One App context** (React Native + Web):

- **Redux Toolkit (+ RTK Query)**
- **Zustand (+ TanStack Query)**
- **MobX + MobX State Tree (MST)**

The goal is **not** to crown a “winner”, but to **make trade-offs visible** based on real code, real features, and real developer experience.

---

## 🎯 Objectives

This POC aims to:

- Compare **client state**, **server state**, and **side effects**
- Evaluate **developer experience (DX)**, **debuggability**, and **maintainability**
- Assess **scalability**, **refactorability**, and **future-proofing**
- Validate conclusions from an internal **decision matrix**
- Support an **enterprise One App strategy** with concrete evidence

---

## 🧠 Why Expo?

Expo was chosen intentionally because it:

- Supports **React Native + Web** with the same codebase
- Represents a **neutral, cross-platform environment**
- Avoids Web-only or Native-only bias
- Is aligned with modern React / React Native ecosystems

---

## 📦 Tech Stack

- **Expo + Expo Router**
- **TypeScript**
- **pnpm**
- **Redux Toolkit + RTK Query**
- **Zustand + TanStack Query**
- **MobX + MobX State Tree**
- **Fake Store API** (no backend required)

---

## 🌐 API Used (No Backend)

This POC uses a public API:

https://fakestoreapi.com/products

It provides realistic product data for:

- Fetching lists
- Cache & invalidation
- Simulated mutations
- Loading & error states

---

## 🧪 Features Implemented

### 1️⃣ Server State — Products

- Fetch product list
- Loading & error handling
- Cache & refetch
- Invalidation (simulated)

Comparison focus:

- RTK Query vs TanStack Query vs MST async flows

---

### 2️⃣ Client State — Cart (Core Feature)

- Add / remove product
- Update quantity
- Derived total price
- Derived item count
- Business invariant: `quantity >= 1`

Comparison focus:

- Redux slice
- Zustand store
- MST model (runtime invariants)

---

### 3️⃣ UI / Draft State — Checkout

- Multi-step checkout (step 1 / 2 / 3)
- Draft form state
- Reset / cancel flow

Comparison focus:

- Local vs global state decisions
- Refactor cost
- State colocation

---

### 4️⃣ Derived State & Performance

- Computed totals
- Fake discount rules
- Memoization strategies

Comparison focus:

- Redux selectors
- Zustand selectors
- MST computed values

---

### 5️⃣ Debugging & Refactor Scenarios

The POC intentionally documents:

- A bug introduction
- A business rule change
- A field rename

Purpose:

> Measure **how easy it is to understand, debug, and refactor** each solution.

---

## 🧱 Project Structure

```txt
expo-state-poc/
├─ app/
│  ├─ index.tsx              # Home → StateSwitcher
│  ├─ redux/
│  │  └─ index.tsx           # Redux implementation
│  ├─ zustand/
│  │  └─ index.tsx           # Zustand implementation
│  ├─ mobx/
│  │  └─ index.tsx           # MobX + MST implementation
│  └─ _layout.tsx            # Expo Router layout
│
├─ features/
│  ├─ cart/
│  │  ├─ CartView.tsx
│  │  └─ cart.types.ts
│  ├─ products/
│  │  ├─ ProductsView.tsx
│  │  └─ products.types.ts
│  └─ checkout/
│     └─ CheckoutView.tsx
│
├─ state/
│  ├─ redux/
│  │  ├─ store.ts
│  │  ├─ cart.slice.ts
│  │  └─ products.api.ts
│  │
│  ├─ zustand/
│  │  ├─ cart.store.ts
│  │  └─ products.query.ts
│  │
│  └─ mst/
│     ├─ root.store.ts
│     ├─ cart.model.ts
│     └─ products.model.ts
│
├─ shared/
│  ├─ ui/
│  │  ├─ StateSwitcher.tsx   # Navigation Redux / Zustand / MST
│  ├─ api/
│  │  └─ client.ts
│
└─ README.md

```

The UI and features are identical across implementations.
Only the state management layer changes.

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
pnpm install
```

### 2️⃣ Start Expo

```bash
pnpm start
```

Then choose:

- i → iOS
- a → Android
- w → Web

---

## 🔀 Navigation

Each implementation is accessible via **Expo Router**:

- /redux → Redux Toolkit + RTK Query
- /zustand → Zustand + TanStack Query
- /mst → MobX + MST + TanStack Query

---

## 📊 Evaluation Criteria

Each solution is evaluated based on:

- Developer Experience (DX)
- Debugging & Tooling
- Type Safety
- Performance & Memory
- Scalability & Maintenance
- Business Safety (Invariants)
- SSR & Server-State handling
- Refactorability
- React 19 Compiler alignment
- Cross-platform ergonomics

---

## 🧠 Key Architectural Principle

Same UI. Same features. Same constraints.  
Only the state management approach changes.

This ensures:

- Fair comparison
- No artificial advantages
- Evidence-based conclusions

---

## ⚠️ Important Notes

- This is not a benchmark project
- This is not a “best practices” showcase
- This is a decision-support tool for architecture discussions

---

## 🧭 Expected Outcomes

This POC is meant to help answer:

- Which solution is easier to evolve?
- Which one reduces cognitive load?
- Which one scales better across teams?
- Which one aligns best with modern React?
- Which one fits a One App enterprise strategy?
