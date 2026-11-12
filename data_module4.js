// Module 4: Modern React & State (Topics 217 to 222)
module.exports = [
  {
    topicId: 217,
    title: 'React Introduction Notes',
    definition: `- **Official Definition**: **React** is a declarative, component-based, efficient open-source JavaScript library developed by Meta (Facebook) for building dynamic user interfaces, particularly Single Page Applications (SPAs).
- **Declarative**: Developers describe *what* the UI should look like for a given state, and React manages updating the actual DOM efficiently.
- **Component-Based**: UIs are constructed from encapsulated, reusable, independent units called components.
- **Virtual DOM (VDOM)**: An in-memory lightweight representation of the real DOM used to compute minimal mutations via reconciliation.`,
    simpleExplanation: `- **The Architectural Blueprint & Construction Crew Analogy**:
  • Instead of manually knocking down and rebuilding physical walls whenever a room changes (traditional manual DOM manipulation), you draw a revised blueprint in software (**Virtual DOM**).
  • React's diffing engine (**Reconciliation**) compares the new blueprint against the previous one, identifies only the exact brick that changed, and instructs the construction crew to replace that single brick without disturbing the rest of the house.`,
    whyNeeded: `- **Eliminates Manual DOM Overhead**: Directly querying and modifying DOM nodes is slow and error-prone; React automates reconciliation.
- **Predictable Unidirectional Data Flow**: State flows top-down via props, making debugging, tracking, and testing predictable.
- **High Performance via React Fiber**: Fiber architecture enables incremental rendering, interruptible work, and concurrent scheduling.
- **Cross-Platform Ecosystem**: Concepts translate seamlessly to native mobile apps via React Native.`,
    howItWorks: `- **1. JSX Compilation**: JSX tags are compiled by Babel or SWC into \`React.createElement()\` or \`jsx-runtime\` calls.
- **2. Render Phase**: React executes component functions, produces Virtual DOM nodes (Fiber tree), and diffs old vs new Fibers.
- **3. Commit Phase**: React takes the computed list of side-effects and applies minimal changes to the real DOM synchronously.
- **4. Paint**: The browser repaints the updated pixels to the screen.`,
    importantConcepts: `- **JSX (JavaScript XML)**:
  • Syntactic extension allowing HTML-like markup directly inside JavaScript.
  • Requires a single root element (or Fragment \`<>...</>\`).
  • Attribute naming uses camelCase (e.g., \`className\`, \`htmlFor\`, \`onClick\`).
- **React Fiber Reconciliation Engine**:
  • The underlying reconciliation engine in React 16+.
  • Represents the component tree as a linked list of Fiber nodes.
  • Breaks rendering work into granular priority-based chunks that can be paused, resumed, or aborted based on user input priority.
- **Unidirectional Data Flow**:
  • Data flows strictly downwards from parent to child through props.
  • Child components communicate changes upward by invoking callback functions passed as props.`,
    realWorldExamples: `- **Social Media Feed**: Dynamically rendering posts, reactions, and live comments with instant sub-tree updates without full page reloads.
- **Interactive Dashboards**: Live data widgets updating analytics charts independently without re-rendering parent navigation bars.
- **E-Commerce Checkout Flow**: Multi-step wizard encapsulating payment forms, address validation, and cart summaries into modular components.`,
    javaCodeExamples: `// 1. Functional Component with JSX
import React from 'react';

function UserGreeting({ username, role }) {
  return (
    <div className="greeting-card">
      <h2>Welcome back, {username}!</h2>
      {role === 'admin' ? (
        <span className="badge bg-danger">Administrator Access</span>
      ) : (
        <span className="badge bg-secondary">Standard Member</span>
      )}
    </div>
  );
}

// 2. React Fragment Usage
function NavigationLinks() {
  return (
    <>
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </>
  );
}

export default UserGreeting;`,
    internalWorking: `- **Reconciliation Diffing Algorithm Heuristics**:
  • React assumes two elements of different types will produce completely different trees; it tears down the old tree and mounts a new one.
  • For elements of the same type, React compares attributes, updating only changed properties.
  • For lists of children, React relies on stable, unique **\`key\`** props to match items across renders, avoiding full list re-creations.`,
    advantagesDisadvantages: `- **Advantages**:
  • Virtual DOM diffing minimizes expensive real-DOM reflows and repaints.
  • Massive global community, vast library ecosystem, and high developer demand.
  • Component reusability accelerates engineering velocity and consistency across teams.
- **Disadvantages**:
  • React is a view library, not a full framework; developers must select third-party solutions for routing, state, and SSR.
  • JSX requires build toolchains (Vite, Webpack) and continuous updates.`,
    importantDifferences: `- **React vs Angular**:
  • React is a lightweight UI library with unidirectional data flow; Angular is a full-featured opinionated framework with bidirectional two-way data binding.
- **Real DOM vs Virtual DOM**:
  • Real DOM: Slow updates, triggers browser layout/reflow, direct memory representation.
  • Virtual DOM: Fast in-memory JavaScript object tree, batches updates, calculates minimal diff before touching Real DOM.`,
    commonTrickyQuestions: `- **Tricky Q1**: Why must JSX return a single parent root element?
  • **Answer**: JSX compiles down to \`React.createElement(tag, props, ...children)\`. A function can only return a single expression value. To avoid extra DOM nodes, use React Fragments (\`<>...</>\`).
- **Tricky Q2**: Why should you never use array indices as keys in dynamic lists?
  • **Answer**: If items are reordered, inserted, or deleted, index keys will shift and falsely identify different items as identical, corrupting component state (such as uncontrolled inputs) and degrading diff performance.
- **Tricky Q3**: Is the Virtual DOM always faster than direct DOM manipulation?
  • **Answer**: No. Carefully crafted vanilla JS directly targeting a specific element is theoretically faster because it skips diffing overhead. The Virtual DOM provides *consistently predictable and optimal* performance across complex, declarative UIs at scale.`,
    interviewReadyAnswer: `- "React is an open-source JavaScript library for building declarative, component-driven user interfaces. It employs a Virtual DOM and the Fiber reconciliation engine to diff state updates against the existing tree, applying minimal, batched mutations to the real DOM. With unidirectional data flow and modular components, React ensures predictable state management and high rendering performance across modern Single Page Applications."`,
    quickRevisionPoints: `- React is a component-based UI library utilizing a declarative paradigm.
- JSX compiles down to \`React.createElement()\` calls; requires a single root (or Fragment).
- The Fiber reconciliation algorithm breaks rendering into priority-based interruptible tasks.
- Always provide unique, stable keys for dynamic array mapping; avoid using array indices.`
  },
  {
    topicId: 218,
    title: 'Components and Props Notes',
    definition: `- **Official Definition**: **Components** are self-contained, independent, reusable building blocks of a React user interface that accept arbitrary inputs called **Props** (short for properties) and return React elements describing what should appear on screen.
- **Props**: Read-only (immutable) parameters passed from parent to child components.
- **Pure Component Principle**: All React components must act like pure functions with respect to their props—they must never mutate their incoming props directly.`,
    simpleExplanation: `- **The Function Argument Analogy**:
  • Think of a React component like a JavaScript function that accepts arguments:
    \`function Card(props) { return <div>{props.title}</div>; }\`
  • The props are the input arguments passed into the function.
  • You cannot change the argument from inside the function; you simply consume it to render customized UI.`,
    whyNeeded: `- **Code Reusability**: Build a button, card, or modal once, and reuse it dozens of times with different props throughout the application.
- **Separation of Concerns**: Deconstructs massive pages into bite-sized, isolated, easily testable components.
- **Predictable Data Flow**: Prop passing enforces explicit parent-to-child data dependencies, preventing hidden global state mutations.`,
    howItWorks: `- **1. Prop Passing**: The parent passes attributes in JSX (\`<UserCard name="Bob" age={28} />\`).
- **2. Prop Gathering**: React bundles all attributes into a single frozen JavaScript object.
- **3. Prop Consumption**: The child receives the props object as its first argument and renders values.
- **4. Children Prop**: Anything placed between opening and closing component tags (\`<Modal><h1>Content</h1></Modal>\`) is accessible via \`props.children\`.`,
    importantConcepts: `- **Props Destructuring & Default Values**:
  • Clean unpacking: \`function Avatar({ src = '/default.png', alt = 'Avatar', size = 48 })\`
- **The \`children\` Prop**:
  • Enables component composition, layout wrappers, and containment patterns.
- **Prop Drilling**:
  • The scenario where props are passed down through multiple intermediate levels of components that don't need the data themselves, merely forwarding it to deep children.
  • Mitigated by React Context API or state management libraries (Redux, Zustand).
- **Callback Props (Inverted Data Flow)**:
  • Passing functions as props (\`onDelete={handleDelete}\`) allows children to notify parents of user interactions.`,
    realWorldExamples: `- **Design System Buttons**: A unified \`<Button variant="primary" size="lg" onClick={handleSubmit}>Save</Button>\` component reused across an entire enterprise app.
- **Layout Containers**: A \`<DashboardLayout sidebar={<Sidebar />}>\` passing nested view sections via props.
- **Card Grids**: Mapping an array of product data to render instances of \`<ProductCard key={product.id} {...product} />\`.`,
    javaCodeExamples: `// 1. Reusable Component with Destructuring & Defaults
import React from 'react';

export function MetricCard({ label, value, trend = 'neutral', onRefresh }) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-secondary';

  return (
    <div className="card p-3 shadow-sm">
      <span className="text-muted small">{label}</span>
      <h3 className="fw-bold my-1">{value}</h3>
      <div className="d-flex justify-content-between align-items-center">
        <span className={\`small fw-bold \${trendColor}\`}>Trend: {trend}</span>
        {onRefresh && (
          <button className="btn btn-sm btn-outline-primary" onClick={onRefresh}>
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}

// 2. Composition with props.children
export function ModalWrapper({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <h5>{title}</h5>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}`,
    internalWorking: `- **Props are Frozen at Runtime**:
  • In development mode, React enforces immutability by calling \`Object.freeze(props)\`.
  • Any attempt to assign \`props.title = 'New'\` throws a \`TypeError\` in strict mode.
- **Component Render Triggers**:
  • Whenever a parent component re-renders, its child components will also re-render by default, even if their props have not changed, unless memoized via \`React.memo()\`.`,
    advantagesDisadvantages: `- **Advantages**:
  • Component composition creates scalable, clean, and easily maintainable architectures.
  • Immutable props eliminate unintentional side-effects and cross-component state contamination.
  • \`props.children\` provides flexible containment patterns.
- **Disadvantages**:
  • Deep component trees can lead to excessive prop drilling.
  • Overly granular components can complicate navigation and folder organization.`,
    importantDifferences: `- **Props vs State**:
  • Props: External data passed in by the parent; immutable within the component; used for configuration.
  • State: Internal data owned, managed, and mutated by the component itself; mutable via updater function.
- **Component Composition vs Inheritance**:
  • React strongly recommends composition (using \`children\` and prop injection) over class inheritance.`,
    commonTrickyQuestions: `- **Tricky Q1**: What happens if a component attempts to mutate \`props.title = 'Updated'\`?
  • **Answer**: In strict mode / development, React freezes props objects; mutating props throws a \`TypeError: Cannot assign to read only property\`. Props must remain strictly immutable.
- **Tricky Q2**: How does \`React.memo()\` optimize components that receive props?
  • **Answer**: \`React.memo\` performs a shallow comparison of current props versus previous props. If props are unchanged, React skips re-rendering the component and reuses the last rendered output.
- **Tricky Q3**: Why can inline objects or functions passed as props break \`React.memo\`?
  • **Answer**: In JavaScript, \`{} !== {}\` and \`(() => {}) !== (() => {})\`. Inline functions or objects receive a new memory reference on every parent render, causing shallow comparisons to fail and triggering unnecessary re-renders.`,
    interviewReadyAnswer: `- "Components are independent, reusable building blocks that consume immutable props to render user interfaces. Following the pure component principle, props are read-only and allow unidirectional data flow from parent to child. Patterns like component composition utilizing props.children solve layout challenges, while React.memo and useCallback optimize rendering performance across deep component hierarchies."`,
    quickRevisionPoints: `- Props are strictly immutable and passed down unidirectionally.
- Always destructure props and provide sensible default values.
- Use \`props.children\` for flexible container and layout composition.
- Prop drilling can be solved with React Context or state management tools.`
  },
  {
    topicId: 219,
    title: 'State and Events Notes',
    definition: `- **Official Definition**: **State** is a built-in object in React components that holds data or information that may change over the lifetime of the component. **Events** in React are interactions (e.g., clicks, changes, keypresses) handled through a cross-browser abstraction known as the **SyntheticEvent system**.
- **useState Hook**: The foundational React hook enabling functional components to manage local state.
- **SyntheticEvent**: A synthetic cross-browser wrapper around the browser's native DOM event, ensuring identical event attributes across all browsers.`,
    simpleExplanation: `- **The Component's Memory Analogy**:
  • If props are instructions passed to a worker by their boss, **state** is the worker's personal notepad where they keep track of their current task, notes, and progress.
  • Whenever the notes on the pad change (state update), the worker immediately re-evaluates what they are doing and re-paints their work area.`,
    whyNeeded: `- **Dynamic Interactivity**: Enables components to remember user input, open/closed modal states, active tabs, and live toggles.
- **Automatic UI Synchronization**: Modifying state automatically re-invokes the component render cycle, keeping the DOM in sync without manual element lookups.
- **Unified Event Handling**: Synthetic events normalize differences between Chrome, Safari, Firefox, and Edge.`,
    howItWorks: `- **1. State Initialization**: \`const [count, setCount] = useState(0);\`.
- **2. Event Binding**: Attaching handlers in camelCase JSX: \`<button onClick={handleClick}>\`.
- **3. State Mutation**: Calling \`setCount(newCount)\` queues a state transition in React Fiber.
- **4. Automatic Batching**: Multiple state updates occurring within the same tick or event handler are batched together into a single re-render.
- **5. Re-render**: Component executes again with the new state value.`,
    importantConcepts: `- **Functional State Updates**:
  • When new state depends on previous state, always pass an updater function: \`setCount(prev => prev + 1)\`.
  • Prevents stale state bugs caused by closure snapshots and batching.
- **Immutability of State**:
  • Never mutate state directly (e.g., \`user.name = 'Bob'\`).
  • Always produce a new object or array reference using spread or filter: \`setUser({ ...user, name: 'Bob' })\`.
- **Synthetic Events & Pooling**:
  • SyntheticEvent is a normalized wrapper.
  • In React 17+, event pooling was eliminated; event objects are no longer wiped out, so event properties can safely be accessed inside asynchronous callbacks.
- **Controlled vs Uncontrolled Components**:
  • **Controlled**: Form input value is driven directly by React state via \`value\` and \`onChange\`.
  • **Uncontrolled**: Form input maintains its own internal DOM state accessed via \`useRef\`.`,
    realWorldExamples: `- **Live Filter Input**: Controlled search bar filtering a list on every keystroke.
- **Accordion FAQ Widget**: Managing an \`activeAccordionId\` state to expand or collapse questions.
- **Multi-step Checkout Form**: Preserving form data in state as users navigate between shipping, billing, and review steps.`,
    javaCodeExamples: `// 1. Controlled Component with Functional State Updates
import React, { useState } from 'react';

export function CounterForm() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrement = () => {
    // Functional updater guarantees correct previous state
    setCount(prevCount => prevCount + Number(step));
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  return (
    <div className="p-4 border rounded">
      <h3>Current Count: {count}</h3>
      <div className="mb-3">
        <label className="form-label">Step Increment:</label>
        <input
          type="number"
          className="form-control"
          value={step}
          onChange={handleStepChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleIncrement}>
        Increment by {step}
      </button>
    </div>
  );
}`,
    internalWorking: `- **React 18 Automatic Batching**:
  • In React 18, all state updates—whether inside event handlers, promises, \`setTimeout\`, or native event callbacks—are automatically batched into a single render pass.
  • Developers can opt out of batching in rare edge cases using \`flushSync()\`.
- **Event Delegation at Root**:
  • In React 17+, synthetic event listeners are attached to the root DOM container (\`#root\`) rather than \`document\`, allowing multiple independent React root applications to coexist cleanly on the same page.`,
    advantagesDisadvantages: `- **Advantages**:
  • Declarative state updates eliminate brittle manual DOM synchronization.
  • Automatic batching maximizes frame rates and minimizes layout thrashing.
  • SyntheticEvent provides consistent cross-browser event handling.
- **Disadvantages**:
  • Treating state as immutable requires discipline with spread operators or helper libraries (Immer).
  • Closure staleness can trip up beginners who expect state updates to be immediate and synchronous.`,
    importantDifferences: `- **Controlled vs Uncontrolled Inputs**:
  • Controlled: State is the single source of truth (\`value={val}\` + \`onChange\`); immediate validation, easy formatting.
  • Uncontrolled: DOM holds the value; read on demand using \`ref\`; less boilerplate for legacy forms.
- **Direct Mutation vs Immutable State Update**:
  • Direct mutation: \`items.push(newItem)\` fails to change array reference, so React diffing skips re-rendering!
  • Immutable update: \`setItems([...items, newItem])\` creates a new array reference, triggering proper reconciliation.`,
    commonTrickyQuestions: `- **Tricky Q1**: Why is \`setCount(count + 1)\` called three times consecutively only incrementing the count by 1?
  • **Answer**: In that render cycle, \`count\` is a constant snapshot. Calling \`setCount(0 + 1)\` three times simply sets the target state to 1 three times. To increment by 3, use functional updates: \`setCount(c => c + 1)\`.
- **Tricky Q2**: Are state updates synchronous or asynchronous in React?
  • **Answer**: State updates are asynchronous and batched. Reading state immediately after calling \`setCount(count + 1)\` will return the old value because the component has not yet re-rendered.
- **Tricky Q3**: Where does React 18 attach synthetic event listeners in the DOM?
  • **Answer**: To the root DOM node where the React tree is mounted (\`createRoot(rootElement)\`), NOT to the global \`document\` object.`,
    interviewReadyAnswer: `- "State represents local component data that triggers reconciliation when modified. In functional React, useState provides state and its updater. State updates are batched asynchronously, necessitating functional updaters when computing next state from previous state. Events are managed by React's SyntheticEvent system, which normalizes native events and attaches root-level delegation listeners to optimize performance and prevent cross-browser inconsistencies."`,
    quickRevisionPoints: `- Always treat state as strictly immutable; never mutate state objects directly.
- Use functional updates \`setState(prev => ...)\` whenever next state depends on current state.
- React 18 automatically batches state updates across promises, timeouts, and native events.
- React synthetic events are delegated to the application root container.`
  },
  {
    topicId: 220,
    title: 'Hooks Notes',
    definition: `- **Official Definition**: **React Hooks** are functions that allow functional components to "hook into" React state and lifecycle features without writing class components. Introduced in React 16.8, hooks provide a unified, composable API for state, side-effects, refs, and memoization.
- **Core Built-in Hooks**: \`useState\`, \`useEffect\`, \`useContext\`, \`useRef\`, \`useMemo\`, \`useCallback\`, \`useReducer\`, \`useLayoutEffect\`, \`useId\`.
- **Custom Hooks**: JavaScript functions whose names begin with "use" that compose one or more built-in hooks to share stateful logic between components.`,
    simpleExplanation: `- **The Modular Toolkit Analogy**:
  • In older React classes, state, lifecycle methods, and refs were locked inside rigid class structures.
  • Hooks are like modular power tools that you can plug into any functional component on demand: plug in \`useState\` for memory, plug in \`useEffect\` for side-effects, and plug in \`useRef\` for direct element access.`,
    whyNeeded: `- **Eliminates Class Complexity**: Eliminates confusing \`this\` keyword binding, \`bind(this)\`, and verbose lifecycle methods (\`componentDidMount\`, \`componentDidUpdate\`, \`componentWillUnmount\`).
- **Reuse Stateful Logic**: Custom hooks allow sharing stateful behavior across completely unrelated components without Higher-Order Components (HOC) or render props.
- **Group Related Logic**: In classes, a single timer setup was split across three different lifecycle methods; \`useEffect\` unites setup and cleanup in one cohesive function.`,
    howItWorks: `- **Fiber Linked List of Hook Cells**:
  • React maintains an internal singly linked list of "hook cells" on each component's Fiber node.
  • Every time a hook runs during rendering, React advances its internal cursor to the next hook cell.
  • **The Rules of Hooks**:
    1. **Only call hooks at the top level**: Never call hooks inside loops, conditions, or nested functions. This ensures hook order remains identical across every render.
    2. **Only call hooks from React function components or custom hooks**.`,
    importantConcepts: `- **useEffect**:
  • Performs side-effects (data fetching, subscriptions, DOM mutations).
  • Dependency Array (\`[]\`):
    - No array: Runs after *every* render.
    - Empty array (\`[]\`): Runs once after initial mount.
    - \`[dep1, dep2]\`: Runs after mount and whenever any specified dependency changes reference.
  • Cleanup function: Returned function executes before re-running the effect and upon component unmount.
- **useRef**:
  • Returns a mutable object \`{ current: initialValue }\` that persists across renders.
  • Modifying \`.current\` does NOT trigger a re-render.
  • Commonly used to hold DOM references or store interval/timer IDs.
- **useMemo & useCallback**:
  • \`useMemo(() => computeExpensiveValue(a, b), [a, b])\`: Memoizes the *result* of a calculation.
  • \`useCallback(fn, deps)\`: Memoizes the *function instance* itself to preserve reference equality across renders.`,
    realWorldExamples: `- **Data Fetching Hook (\`useFetch\`)**: A custom hook handling loading, error, and data states with automatic abort on unmount.
- **Window Resize Listener**: Subscribing to window dimensions with \`useEffect\` and cleaning up with \`removeEventListener\`.
- **Focus Input on Mount**: Using \`useRef\` to automatically set focus to a login input upon page load.`,
    javaCodeExamples: `// 1. useEffect with Cleanup & Dependency Array
import React, { useState, useEffect, useRef } from 'react';

export function TimerWidget() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function executes on unmount or before effect re-runs
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="p-3 border rounded">
      <h4>Timer: {seconds}s</h4>
      <button className="btn btn-warning me-2" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
      <input ref={inputRef} placeholder="Note timestamp..." className="form-control d-inline-block w-auto" />
      <button className="btn btn-secondary ms-2" onClick={handleFocus}>Focus Input</button>
    </div>
  );
}`,
    internalWorking: `- **How React Tracks Hooks Internally**:
  • In the Fiber node, \`fiber.memoizedState\` points to the first hook object.
  • Each hook object contains: \`{ memoizedState, next, queue }\`.
  • React relies strictly on execution order to match each hook with its stored state cell. If an \`if\` condition skips a hook, the cursor misaligns, corrupting all subsequent state variables!`,
    advantagesDisadvantages: `- **Advantages**:
  • Cleaner, more readable code without class boilerplate or \`this\` confusion.
  • Effortless extraction of custom hooks encourages clean modularity.
  • Co-locates related subscription and cleanup logic in a single function.
- **Disadvantages**:
  • Violating the Rules of Hooks causes catastrophic runtime misalignment.
  • Dependency arrays require meticulous management to prevent stale closures or infinite re-render loops.`,
    importantDifferences: `- **useMemo vs useCallback**:
  • \`useMemo\`: Memoizes a calculated value; returns \`fn()\`.
  • \`useCallback\`: Memoizes the function definition itself; returns \`fn\`.
- **useRef vs useState**:
  • \`useState\`: State changes trigger a component re-render.
  • \`useRef\`: Updating \`.current\` does NOT trigger a re-render; persists across renders.`,
    commonTrickyQuestions: `- **Tricky Q1**: Why must Hooks never be called inside conditional statements (\`if\`)?
  • **Answer**: React relies on the exact invocation order of hooks to link them with their internal Fiber linked list cells. Calling a hook conditionally shifts the order, causing React to return the wrong state or throw an error.
- **Tricky Q2**: What causes an infinite loop in \`useEffect\`?
  • **Answer**: Updating a state variable inside \`useEffect\` that is also listed in that effect's dependency array (or mutating an object/array dependency without reference stability), causing an infinite render-effect-render cycle.
- **Tricky Q3**: What is a stale closure in React hooks?
  • **Answer**: When a callback or effect captures a state variable from an earlier render cycle because the variable was omitted from the dependency array, causing the closure to read outdated data.`,
    interviewReadyAnswer: `- "React Hooks allow functional components to manage state and lifecycle without classes. React tracks hooks via an internal linked list on each Fiber node, enforcing the rules of hooks: top-level invocation and consistent call order. Key hooks include useState for local state, useEffect for side-effects and cleanup, useRef for mutable non-rendering values and DOM nodes, and useMemo/useCallback for reference stability and performance optimization."`,
    quickRevisionPoints: `- Never call hooks inside loops, conditions, or nested functions (Rules of Hooks).
- Always return a cleanup function from \`useEffect\` when creating intervals or event listeners.
- \`useRef\` persists values across renders without causing re-renders.
- Use \`useCallback\` and \`useMemo\` to maintain reference equality for memoized children.`
  },
  {
    topicId: 221,
    title: 'React Router Notes',
    definition: `- **Official Definition**: **React Router** is the standard declarative, client-side routing library for React applications. It enables dynamic, client-side navigation without requesting full HTML documents from the server, maintaining browser history and rendering distinct component hierarchies based on the URL path.
- **Client-Side Routing**: The browser URL updates, and JavaScript intercepts navigation to re-render the appropriate view components locally without page refreshes.
- **Core Components (v6+)**: \`<BrowserRouter>\`, \`<Routes>\`, \`<Route>\`, \`<Link>\`, \`<NavLink>\`, \`<Outlet>\`, \`<Navigate>\`.
- **Core Hooks (v6+)**: \`useNavigate\`, \`useParams\`, \`useSearchParams\`, \`useLocation\`.`,
    simpleExplanation: `- **The Museum Directory Analogy**:
  • In traditional server routing, switching from the Egyptian wing to the Dinosaur hall means walking out the front door, leaving the building, and entering through a completely separate ticket gate (full browser reload).
  • In **React Router**, the museum building is already loaded; you simply walk through internal hallways to different display rooms based on the directory map (URL path). The roof, lighting, and entry lobby remain untouched.`,
    whyNeeded: `- **Single Page Application Experience**: Eliminates white flashes and latency of full browser reloads during navigation.
- **Deep Linking & Bookmarking**: Enables users to bookmark specific application views and share direct URLs with colleagues.
- **Nested Layouts**: Renders persistent outer layouts (sidebars, navbars) while swapping inner views dynamically via \`<Outlet />\`.
- **Protected Routes**: Restricts unauthorized users from accessing private dashboard or admin routes through authentication guards.`,
    howItWorks: `- **1. History API Interception**: \`BrowserRouter\` listens to browser \`popstate\` events and HTML5 History API (\`pushState\`, \`replaceState\`).
- **2. Route Matching**: React Router v6 scores route paths against the current \`window.location.pathname\` using a ranked matching algorithm (most specific route wins).
- **3. Component Tree Mounting**: Mounts the element corresponding to the matched route and injects route params and nested outlets.
- **4. Declarative Links**: \`<Link to="/path">\` prevents the native HTML \`<a>\` click event from triggering a server roundtrip, updating the URL via \`pushState\` instead.`,
    importantConcepts: `- **React Router v6 Architecture**:
  • \`<BrowserRouter>\`: Top-level wrapper providing routing context.
  • \`<Routes>\`: Replaced \`<Switch>\`; wraps route definitions and performs best-match path resolution.
  • \`<Route path="..." element={<Component />} />\`: Maps URL paths to React elements.
  • \`<Outlet />\`: Placeholder in a parent layout component where matched child routes are rendered.
  • \`<Navigate to="/login" replace />\`: Declarative redirect component.
- **Navigation Hooks**:
  • \`useNavigate()\`: Programmatic navigation (\`navigate('/dashboard')\`, \`navigate(-1)\`).
  • \`useParams()\`: Accesses dynamic URL parameters (e.g., \`/users/:id\` -> \`params.id\`).
  • \`useSearchParams()\`: Reads and mutates query parameters (e.g., \`?search=react&page=2\`).
  • \`useLocation()\`: Returns the current location object (\`pathname\`, \`search\`, \`hash\`, \`state\`).
- **Nested & Dynamic Routing**:
  • Parent route defines layout with \`<Outlet />\`; child routes inherit URL path segments.
  • Dynamic routes: \`<Route path="topics/:topicId" element={<TopicDetail />} />\`.
- **Protected Route Guard**:
  • Custom wrapper component verifying user authentication tokens before rendering protected elements or redirecting to \`/login\`.`,
    realWorldExamples: `- **Admin Dashboard Layout**: A persistent sidebar navigation with nested sub-routes for \`/analytics\`, \`/users\`, and \`/settings\` rendered inside an \`<Outlet />\`.
- **E-Commerce Catalog Filtering**: Using \`useSearchParams\` to sync search keywords, sorting, and pagination with the URL query string.
- **Authentication Gateway**: Redirecting unauthenticated users to \`/login?redirect=/checkout\` and redirecting back after successful login.`,
    javaCodeExamples: `// 1. React Router v6 Setup with Nested & Protected Routes
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, Navigate, useParams, useNavigate } from 'react-router-dom';

// Layout with persistent navigation and Outlet
function AppLayout() {
  return (
    <div>
      <nav className="navbar navbar-expand bg-light px-3">
        <Link className="navbar-brand" to="/">InterviewPocket</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/subjects">Subjects</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </div>
      </nav>
      <main className="p-4">
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

// Protected Route Guard
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Dynamic Parameter Route Component
function TopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Topic ID: {topicId}</h2>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

// Root Application Routing
export default function App() {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h3>Welcome to Home</h3>} />
          <Route path="subjects" element={<h3>Subjects Directory</h3>} />
          <Route path="topics/:topicId" element={<TopicDetail />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuth}>
                <h3>Private Student Dashboard</h3>
              </ProtectedRoute>
            }
          />
          {/* 404 Catch-All Route */}
          <Route path="*" element={<h3>404: Page Not Found</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`,
    internalWorking: `- **HTML5 History API vs Hash Routing**:
  • **BrowserRouter**: Uses \`window.history.pushState\` for clean URLs (e.g., \`/subjects/frontend\`). Requires web server (Nginx, Netlify, Vite) rewrite rules to route all 404s back to \`index.html\`.
  • **HashRouter**: Uses URL hash fragments (e.g., \`/#/subjects\`). Does not require server configuration, but less SEO-friendly.
- **v6 Ranked Matching Algorithm**:
  • In v5, routes were matched sequentially and required \`exact\`.
  • In v6, React Router evaluates all routes simultaneously, assigning points based on segment specificity (exact paths score higher than dynamic params \`:id\`, which score higher than splats \`*\`).`,
    advantagesDisadvantages: `- **Advantages**:
  • Instant, flicker-free client navigation enhances user retention and perceived performance.
  • Nested layouts with \`<Outlet />\` eliminate duplicate boilerplate across views.
  • First-class TypeScript support and ranked matching simplify complex path trees.
- **Disadvantages**:
  • Production web servers must be configured to serve \`index.html\` on fallback routes, or refreshing deep URLs triggers server 404s.
  • Initial bundle size is larger than server-rendered static multi-page apps.`,
    importantDifferences: `- **<Link> vs <a> tag**:
  • \`<Link>\`: Intercepts click, uses \`pushState\` to change URL without reloading the page or losing in-memory state.
  • \`<a>\`: Triggers full browser network request, reloads all scripts, stylesheets, and resets application state.
- **useParams vs useSearchParams**:
  • \`useParams\`: Extracts dynamic route path segments (\`/topics/:topicId\` -> \`params.topicId\`).
  • \`useSearchParams\`: Extracts and sets query string key-values (\`/search?query=react\` -> \`searchParams.get('query')\`).`,
    commonTrickyQuestions: `- **Tricky Q1**: Why does refreshing the page on a route like \`/topics/221\` return a 404 error on standard static servers?
  • **Answer**: In client-side routing, \`/topics/221\` is not a physical file on the server. The web server must be configured with a fallback rewrite rule (e.g., \`try_files $uri /index.html\`) so the server returns \`index.html\`, allowing React Router to parse the path in the browser.
- **Tricky Q2**: What is the difference between \`navigate('/login')\` and \`navigate('/login', { replace: true })\`?
  • **Answer**: Without replace, the new URL is pushed onto the browser history stack. With \`replace: true\`, it overwrites the current entry, preventing the user from clicking the browser "Back" button to return to a forbidden or intermediate state.
- **Tricky Q3**: How does \`<Outlet />\` work in nested routes?
  • **Answer**: \`<Outlet />\` acts as a dynamic placeholder inside a parent route element. When a child route matches, React Router mounts that child's component inside the parent's \`<Outlet />\`, preserving parent state and layouts.`,
    interviewReadyAnswer: `- "React Router is the standard client-side routing library for React SPAs. It intercepts navigation via the HTML5 History API to render component views without page reloads. In modern React Router v6, Routes and Route use ranked path matching, while nested layouts are composed cleanly using Outlet. Dynamic paths and query parameters are managed via hooks like useParams, useSearchParams, and useNavigate, with protected route wrappers providing authentication guards."`,
    quickRevisionPoints: `- Always use \`<Link>\` or \`<NavLink>\` instead of \`<a>\` tags to prevent full page reloads.
- Nested routes render inside the parent layout component via the \`<Outlet />\` placeholder.
- Use \`useParams()\` for path segments (\`:id\`) and \`useSearchParams()\` for query strings (\`?key=val\`).
- Ensure production servers redirect all 404 paths to \`index.html\` for client-side routing.`
  },
  {
    topicId: 222,
    title: 'API Integration Notes',
    definition: `- **Official Definition**: **API Integration** in React refers to the architectural process of communicating between client-side components and backend services (RESTful APIs, GraphQL) using HTTP protocols to fetch, create, update, and delete data asynchronously.
- **Fetch API**: Standard browser-native interface for making asynchronous HTTP network requests.
- **Axios**: Popular promise-based HTTP client providing automatic JSON parsing, request/response interceptors, and default configuration.
- **Data Lifecycle**: Managing the three foundational UI states: **Loading**, **Success (Data)**, and **Error**.`,
    simpleExplanation: `- **The Restaurant Waiter Analogy**:
  • The React frontend is the customer seated at the dining table.
  • The Spring Boot / MySQL backend is the kitchen.
  • The **API Client** (Fetch or Axios) is the waiter who carries the customer's order to the kitchen, waits for the meal to be prepared, and brings the warm food (or an apology if an ingredient ran out) back to the table.`,
    whyNeeded: `- **Dynamic Live Data**: Enables components to display live database records rather than static mock data.
- **Decoupled Architecture**: Allows the React frontend to evolve independently from Spring Boot, Node.js, or microservice backends.
- **Optimal User Experience**: Providing skeleton loaders, optimistic updates, and informative error banners keeps users engaged during latency.`,
    howItWorks: `- **1. Mount / Trigger**: Component mounts or a user initiates an action (e.g., clicking a button).
- **2. Loading State**: Component sets \`isLoading = true\` and renders a spinner or skeleton.
- **3. Network Request**: Asynchronous HTTP call is dispatched with headers, auth tokens, and payload.
- **4. Cancellation Handling**: An \`AbortController\` signals cancellation if the component unmounts before response arrives.
- **5. Resolution**: Upon HTTP 200 OK, response data is stored in state and \`isLoading = false\`. If failure occurs, error message is captured.`,
    importantConcepts: `- **Fetch vs Axios**:
  • \`fetch\`: Native browser API; does not reject on HTTP 404/500 (must manually inspect \`response.ok\`); requires \`response.json()\`.
  • \`axios\`: Automatic JSON transformation; rejects on HTTP error statuses; provides interceptors for auth tokens.
- **AbortController**:
  • Standard browser interface to cancel in-flight HTTP requests when components unmount or search queries change rapidly, preventing memory leaks and race conditions.
- **Race Conditions in Search**:
  • When a user types quickly, request 1 may return *after* request 2, overwriting fresher data with stale data unless cancelled with AbortController or ignored with cleanup flags.
- **Authentication Headers**:
  • Passing Bearer JWT tokens in the \`Authorization\` header: \`headers: { 'Authorization': \`Bearer \${token}\` }\`.`,
    realWorldExamples: `- **Product Catalog Page**: Fetching paginated inventory items from \`/api/products?page=1\` with retry logic.
- **Live Search Autocomplete**: Aborting pending search requests on every new keystroke using \`AbortController\`.
- **Admin Record Editing**: Sending \`PUT\` or \`PATCH\` requests with optimistic UI updates that roll back on failure.`,
    javaCodeExamples: `// 1. Production-Grade Fetch with AbortController & State Machine
import React, { useState, useEffect } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Create AbortController instance
    const controller = new AbortController();
    const { signal } = controller;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/users', { signal });
        if (!response.ok) {
          throw new Error(\`Server error: \${response.status} \${response.statusText}\`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch successfully aborted on unmount.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Cleanup: abort request if component unmounts or dependencies change
    return () => controller.abort();
  }, []);

  if (loading) return <div className="spinner-border text-primary" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <ul className="list-group">
      {users.map(u => (
        <li key={u.id} className="list-group-item">{u.name} - {u.email}</li>
      ))}
    </ul>
  );
}`,
    internalWorking: `- **Why \`fetch\` does not throw on 404 or 500**:
  • The browser's \`fetch()\` promise only rejects on physical network failures (DNS lookup failure, offline, connection refused).
  • An HTTP 404 Not Found or 500 Internal Server Error is considered a valid HTTP response, so developers MUST check \`if (!response.ok)\`.
- **CORS (Cross-Origin Resource Sharing)**:
  • When frontend on \`localhost:3000\` calls backend on \`localhost:8080\`, the browser sends an HTTP \`OPTIONS\` preflight request.
  • The backend must return \`Access-Control-Allow-Origin\` headers, or the browser blocks the frontend from reading the response.`,
    advantagesDisadvantages: `- **Advantages**:
  • Clean separation of presentation and business layers.
  • Fast, responsive Single Page Application experience with non-blocking network calls.
  • AbortController prevents stale data and memory leak warnings.
- **Disadvantages**:
  • Manual state handling (loading, error, data) requires boilerplate unless using libraries like TanStack Query (React Query) or SWR.
  • Must configure CORS headers properly on the backend.`,
    importantDifferences: `- **Fetch vs Axios**:
  • JSON: \`axios\` transforms JSON automatically; \`fetch\` requires \`await response.json()\`.
  • Errors: \`axios\` rejects promise on 4xx/5xx status; \`fetch\` resolves (requires \`response.ok\` check).
  • Interceptors: \`axios\` has built-in request/response interceptors; \`fetch\` requires custom wrapper functions.
- **Optimistic Updates vs Pessimistic Updates**:
  • Optimistic: UI updates immediately before backend response; rolls back if request fails (feels instantaneous).
  • Pessimistic: UI waits for successful backend confirmation before updating (safe, but slower user feedback).`,
    commonTrickyQuestions: `- **Tricky Q1**: Why does \`fetch('https://api.example.com/not-found')\` NOT trigger the \`catch\` block on HTTP 404?
  • **Answer**: Because a 404 is still a valid HTTP response received from the server. \`fetch\` only rejects on network failures. You must check \`if (!response.ok)\` and manually throw an error.
- **Tricky Q2**: How do you prevent race conditions when fetching search results on user typing?
  • **Answer**: Use an \`AbortController\` to abort the previous pending fetch request whenever a new keystroke initiates a new request, or compare a local request ID timestamp to ignore out-of-order responses.
- **Tricky Q3**: What is an HTTP preflight request and when does the browser send it?
  • **Answer**: The browser sends an \`OPTIONS\` request before the actual request when performing cross-origin requests with non-simple methods (PUT, DELETE, PATCH) or custom headers (like \`Authorization\`), to verify the server permits the operation.`,
    interviewReadyAnswer: `- "API integration connects React SPAs with backend services using asynchronous HTTP requests via Fetch or Axios. Production integration requires robust lifecycle state management covering loading, success, and error states. To prevent race conditions and memory leaks during unmounts, requests should be bound to an AbortController. In modern enterprise applications, specialized caching libraries like TanStack Query provide automated caching, background re-validation, and request deduplication."`,
    quickRevisionPoints: `- Always check \`if (!response.ok)\` when using the native \`fetch()\` API.
- Use \`AbortController\` in the cleanup function of \`useEffect\` to cancel in-flight requests on unmount.
- Manage three core UI states: Loading, Error, and Success.
- Configure CORS headers on the backend when frontend and backend run on different origins.`
  }
];

