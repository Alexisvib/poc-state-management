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

# Notes on developing

Pour vérifier une complexité architecturale je vais faire communiquer 2 domaines cart et checkout

# Notes

### State management comparison — concise summary

This summary focuses on **philosophy**, **strengths**, and **weaknesses** that emerged from the POC and hands-on implementation, without marketing bias.

---

## Redux Toolkit

### Philosophy

- **Event-driven**
- **Global, temporal view of the application**
- State evolves through **explicit actions**
- Architecture optimized for **observability and auditability**

Redux favors:

- event-based dependencies over state-based coupling
- explicit orchestration over implicit side effects
- temporal understanding (timeline) over structural graphs

### Strengths

- **Single global timeline** that tells a clear story of what happens over time
- First-class DevTools with:
  - action history
  - time travel
  - global state inspection
- Actions are always visible (no tooling hacks)
- Cross-domain logic can be centralized in thunks
- Strong fit for large teams and long-lived applications

### Weaknesses

- Verbose syntax, especially for newcomers
- TypeScript setup is explicit and not implicit
- Requires discipline (selectors, thunks, slice boundaries)
- More boilerplate than alternatives

**Key takeaway**  
Redux Toolkit optimizes for **global understanding and debugging**, at the cost of **initial complexity and verbosity**.

---

## Zustand

### Philosophy

- **Local-first**
- Minimal and unopinionated
- State as simple mutable logic with subscriptions
- Tooling is optional, not foundational

Zustand favors:

- simplicity over structure
- flexibility over guarantees
- local reasoning over global narratives

### Strengths

- Extremely low boilerplate
- Very fast to implement and iterate
- Easy mental model
- Excellent performance
- Pairs well with TanStack Query for server state

### Weaknesses

- No global state or action timeline
- Tooling visibility depends on state mutation
- Cross-store dependencies are implicit
- Business rules enforced by convention only
- No official architecture for large-scale orchestration

**Key takeaway**  
Zustand optimizes for **developer happiness and speed**, at the cost of **global observability and architectural guarantees**.

---

## MobX + MobX State Tree (MST)

### Philosophy

- **State-centric**, not event-centric
- The state is a living object graph
- Business rules live **inside the models**
- Focus on **state validity**, not history

MST favors:

- correctness over traceability
- reactive models over event flows
- object relationships over orchestration layers

### Strengths

- Strong domain modeling
- Runtime enforcement of invariants
- Very fine-grained reactivity
- Minimal UI boilerplate with observer
- Derived state feels natural and expressive

### Weaknesses

- Very different syntax and mental model
- Steep learning curve
- TypeScript friction (nodes, snapshots, arrays)
- Direct, structural cross-domain coupling
- No visual DevTools or global timeline
- Debugging is console-based

**Key takeaway**  
MobX + MST optimizes for **state correctness and reactive domain modeling**, at the cost of **global traceability, tooling UX, and ease of standardization**.
