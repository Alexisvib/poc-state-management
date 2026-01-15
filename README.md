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

# Notes on developing

Pour vérifier une complexité architecturale je vais faire communiquer 2 domaines cart et checkout

# Notes on Development

To evaluate architectural complexity, I intentionally made **two business domains communicate** with each other: **Cart** and **Checkout**.

This is a very common real-world scenario and a good stress test for state management solutions.

---

## Zustand

### DevTools setup (Expo)

To make DevTools work properly with Expo, you need to install:

- `@csark0812/zustand-expo-devtools`
- Expo SDK **53+**
- Zustand **5.0.5+**

Once installed, the DevTools correctly display **Zustand actions**.

on web you just need the zustand middleware devtool

---

### What you can see in the DevTools

- You can clearly see **actions**
- But **only actions that call `set`**
- Any business logic that does **not mutate state** is **invisible** to the tooling

This is a key difference compared to Redux.

---

### No global store by design

Unlike Redux, Zustand does **not** have:

- a single global store
- a large, centralized state tree

Instead, you typically have:

- **many small, independent stores**
- usually **one store per domain**

👉 With Zustand, **“one store per domain” feels natural and encouraged**.

Because of that:

- you **cannot get a global view of the entire application state**
- not because of a limitation, but because **it is not the philosophy of Zustand**

---

### Developer Experience (DX)

From a DX point of view:

- Boilerplate is **extremely low**
- Syntax is **very intuitive**
- Store creation is **fast**
- DevTools wiring is **simple**

At first glance, everything feels lightweight and pleasant.

---

### Cross-store communication (important point)

Zustand provides **no official architecture** for communication between stores.

You are free to do **whatever you want**.

For example:

- `useCheckoutStore` can directly depend on `useCartStore`
- using `useCartStore.getState()`

This creates:

- an **implicit dependency**
- **not tracked**
- **not visible**
- **not supported by tooling**

There is nothing in the DevTools that tells you:

> “Checkout depends on Cart”

---

### DevTools visibility is per store

From a DevTools perspective:

- Each store is **fully isolated**
- Logs are **separated by store**
- There is **no global timeline**
- No way to see **cross-domain interactions**

This makes it harder to reason about **transverse business flows**.

Zustand do not push the developer to use the devtool

```js
// without devTools
create((set) => ({ ... }))


// with devtools
create(devtools((set) => ({ ... })))
```

With Zustand, DevTools instrumentation is opt-in and store-local. There is no global or default configuration, which means observability depends on team conventions rather than framework guarantees.

---

### Non-mutating business decisions are invisible

This is a very important insight.

With Zustand:

> **Non-mutating business decisions must still go through a dummy state update to be observable in DevTools.**

Tooling visibility is tied to **state mutation**, not to **domain events**.

Example:

```js
if (items.length === 0) {
  set(() => ({}), false, "checkout/blocked_empty_cart");
  return;
}
```

Here:

- No state is actually modified
- The `set` call exists only to make the action visible
- This is a deliberate and slightly hacky workaround

---

### Key takeaway

Zustand is:

- excellent for local state
- very fast to implement
- extremely flexible

But:

- business rules are enforced by convention
- cross-store dependencies are implicit
- tooling shows **what changed**, not **why a decision was made**

It is a direct consequence of **Zustand’s philosophy**.

## Redux Toolkit

On web, Redux DevTools work directly.  
On native (Expo), it requires an additional configuration with `redux-devtools-expo-dev-plugin`.

Example:

```js
export const store = configureStore({
  reducer: {},
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
```

Redux DevTools are automatically connected to all reducers and actions.
They provide a **global view of the application state**, and Immer is enabled by default, ensuring:

- immutability
- reliable time travel
- predictable state transitions

### Derived state

Derived state in Redux is:

- centralized
- testable
- readable
- reusable

In contrast with Zustand, where the developer must remember to update derived state manually on every `set`.

---

### TypeScript integration

Objectively, I find the TypeScript integration **less implicit** than Zustand.
I often need to refer back to the documentation to get the syntax right.

In particular, these two lines are mandatory and non-obvious at first:

```js
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

This setup is powerful, but it introduces **initial friction:**
Redux Toolkit requires understanding the recommended patterns before being productive.

---

### Required rigor

Even with Redux Toolkit, a certain level of rigor is required:

- selectors should be created explicitly
- cross-reducer communication should live in thunks
- orchestration logic should not leak into slices

Nothing technically prevents a team from putting everything inside slices,
but doing so quickly leads to architectural debt.

Redux gives you structure — **but it does not enforce good architecture by itself**.

---

### 🔗 Cross-domain dependencies — Redux philosophy

Redux does not make dependencies visible as static relationships.  
Instead, it makes them visible as **a sequence of coherent business events over time**.

For example:

- cart/addItem
- cart/addItem
- checkout/submit/pending
- checkout/checkoutCompleted

This timeline tells a story of what happened in the application, in order.

---

### Actions as first-class business events

In Redux:

Each action:

- has a name
- has a payload
- produces a state transition
- never exists only for tooling purposes

> **“In Redux Toolkit, cross-domain dependencies are explicit in orchestration code (thunks/selectors) and observable through a global action timeline, even though DevTools do not visualize dependency graphs directly.”**

---

### Event-driven, not state-driven

In Redux Toolkit, a reducer can react to an **action** emitted by another domain.  
It does **not** react to, nor read, the **state** of another reducer.

This enables true event-driven behavior.

For example, multiple reducers can react to:

- `user/userHasLoggedIn`

without:

- importing the User slice
- knowing the User state shape
- coupling to the User domain model

This is a **fundamental difference** in Redux:

- A Redux slice **never reads another slice’s state**
- A Redux slice **may react to actions emitted by other domains**

---

### Core Redux philosophy

Redux is built on:

- **Event-driven architecture**
- **Unidirectional data flow**

It is fundamentally:

- event-driven
- decoupled
- inspired by event-based systems (CQRS / light event sourcing)

The core principle is:

> **Slices never look at each other.  
> They react to shared, public domain events.**

That is why in Redux:

- reducers are pure
- actions are public contracts
- orchestration lives elsewhere (thunks)

---

### Orchestration vs reaction (recommended guideline)

**Recommendation**

Cross-domain orchestration should be **explicit and centralized**.

For complex business flows affecting multiple domains:

- explicit orchestration via **thunks**
- provides better readability
- better predictability
- better debuggability

---

### When to use `extraReducers`

`extraReducers` should be used when:

- the reaction is obvious
- the consequence is technical
- the behavior is expected everywhere

Examples:

- `logout → reset all state`
- `userDeleted → clear session`

In these cases, reducers are **reacting to a global event**, not making business decisions.

---

### Boilerplate and verbosity

Some Redux patterns still introduce a noticeable amount of boilerplate,
especially for developers who are not already familiar with Redux.

Example:

```js
export const checkout = createAsyncThunk<void, void, { state: RootState }>(
"checkout/submit",
async (\_, { getState, dispatch }) => {
const state = getState();
const items = state.cart.items;

    if (items.length === 0) {
      dispatch(checkoutBlocked("Cart is empty"));
      return;
    }

    dispatch(checkoutCompleted());

}
);

```

This code is explicit and safe, but clearly more verbose than a Zustand equivalent.

---

### Core philosophy recap

Redux favors:

- **event-based dependencies over state-based coupling**
- **explicit orchestration over implicit side effects**
- **temporal understanding (a global timeline) over structural graphs**

This philosophy explains both:

- Redux’s strength at scale
- the need for architectural discipline when using `extraReducers`

---

### Redux Toolkit vs Zustand — final perspective

The biggest strength of **Redux Toolkit** is its **single global timeline**,  
which tells a clear and coherent story of what happens over time in the application.

This timeline:

- makes business flows observable
- allows time travel and replay
- helps teams understand _why_ the application reached a given state

**Zustand**, on the other hand, intentionally separates stores and does **not** aim to provide:

- a unified action timeline
- a global view of application behavior

This is not a flaw — it is a deliberate design choice aligned with its philosophy.

---

### Opinionated but evidence-based conclusion

In my opinion:

- **Redux Toolkit’s main weakness compared to Zustand** is its syntax and initial verbosity, especially for developers who are not already familiar with Redux patterns.
- **Redux Toolkit’s main strength** is its default, first-class debugging experience, built around a global action timeline and systematic action tracking.

Ultimately, the choice is not about “better vs worse”,  
but about **local simplicity versus global observability**,  
and about how much structure an organization is willing — and able — to enforce.
