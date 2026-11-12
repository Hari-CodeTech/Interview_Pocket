// Module 2: Modern CSS3 Layouts & Systems (Topics 204 to 208)
module.exports = [
  {
    topicId: 204,
    title: 'CSS Introduction Notes',
    definition: `- **Official Definition**: **CSS** (Cascading Style Sheets) is a stylesheet language used to describe the presentation, visual styling, formatting, and responsive adaptation of a document written in HTML or XML.
- **The Cascade**: An algorithmic algorithm that resolves conflicts when multiple style rules apply to the same HTML element, determined by importance, origin, specificity, and source order.
- **Inheritance**: The mechanism by which certain CSS properties applied to a parent element are automatically passed down to its descendant elements (e.g. \`color\`, \`font-family\`).`,
    simpleExplanation: `- **The Wardrobe & Interior Design Analogy**:
  • If HTML creates the bare rooms of an apartment, **CSS** is the interior designer.
  • CSS determines wall colors, flooring materials, window curtains, lighting ambiance, furniture sizing, and how rooms reorganize themselves when viewed on mobile screens.`,
    whyNeeded: `- **Separation of Concerns**: Decouples document structure (HTML) from visual presentation (CSS), allowing sitewide design changes by modifying a single stylesheet file.
- **Responsive Web Design**: Powers adaptive fluid layouts across diverse screen viewports via CSS media queries and container queries.
- **Bandwidth & Cache Efficiency**: External stylesheets are cached by browsers after the initial download, drastically reducing page load latency across subpages.`,
    howItWorks: `- **1. DOM & CSSOM Construction**: While parsing HTML into the DOM, the browser simultaneously parses CSS rules into the **CSS Object Model (CSSOM)**.
- **2. Render Tree Generation**: The browser combines DOM and CSSOM trees into a **Render Tree**, omitting invisible nodes (\`<head>\`, \`display: none\`).
- **3. Layout (Reflow)**: Computes the exact physical geometry, coordinates, and pixel dimensions for each visible node.
- **4. Paint (Repaint)**: Fills in pixels on screen layers (colors, borders, shadows, text).
- **5. Compositing**: Flattens layers into the final screen frame sent to the GPU.`,
    importantConcepts: `- **Three Methods of Applying CSS**:
  • External: \`<link rel="stylesheet" href="style.css">\` (industry standard, cacheable).
  • Internal: \`<style>\` tags inside the HTML \`<head>\`.
  • Inline: \`style=""\` attribute directly on elements (highest specificity, difficult to maintain).
- **CSS Rule Anatomy**: \`selector { property: value; }\` (e.g. \`h1 { color: #0062ff; }\`).
- **CSS Specificity Calculation**: Expressed as a tuple \`(Inline, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements)\`:
  • Inline styles: \`(1, 0, 0, 0)\`
  • ID selectors: \`(0, 1, 0, 0)\`
  • Classes, attributes, pseudo-classes (\`.btn\`, \`[type="text"]\`, \`:hover\`): \`(0, 0, 1, 0)\`
  • Element types and pseudo-elements (\`div\`, \`p\`, \`::before\`): \`(0, 0, 0, 1)\`
  • \`!important\` overrides all standard specificity calculations.`,
    realWorldExamples: `- **Dark Mode Theme Switching**: Utilizing CSS Custom Properties (Variables) like \`--bg-color\` and \`--text-color\` updated dynamically at the \`:root\` level via JavaScript.
- **Responsive Typography**: Employing modern CSS \`clamp(1rem, 2.5vw, 2.5rem)\` for fluid font scaling across desktop and mobile screens.`,
    javaCodeExamples: `/* Global CSS Variables & Specificity Demonstration */
:root {
  --primary-color: #0062ff;
  --text-dark: #1e293b;
  --spacing-md: 1.5rem;
}

/* Element Selector: Specificity (0, 0, 0, 1) */
p {
  color: var(--text-dark);
  line-height: 1.6;
}

/* Class Selector: Specificity (0, 0, 1, 0) */
.highlight-text {
  color: var(--primary-color);
  font-weight: 600;
}

/* Combined ID and Class: Specificity (0, 1, 1, 0) */
#hero-section .highlight-text {
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}`,
    internalWorking: `- **Critical Rendering Path (CRP)**:
  • CSS is render-blocking: Browsers pause page rendering until all external stylesheets in \`<head>\` are completely downloaded and parsed into the CSSOM.
  • Unoptimized, deeply nested CSS selectors increase CSSOM construction time and slow first contentful paint (FCP).`,
    advantagesDisadvantages: `- **Advantages**:
  • Drastic reduction in duplicate code across large applications.
  • Hardware-accelerated animations using GPU-friendly properties (\`transform\`, \`opacity\`).
- **Disadvantages / Trade-offs**:
  • Global namespace collisions where class names conflict across multiple components without CSS Modules or BEM conventions.
  • Specificity wars caused by uncontrolled overuse of \`!important\`.`,
    importantDifferences: `- **Inline vs Internal vs External CSS**:
  • External: Best practice, separate .css file, cached by browser across all pages.
  • Internal: <style> in HTML head, applied to single page only, not cached across pages.
  • Inline: style attribute on element, highest specificity, breaks separation of concerns.
- **Inherited vs Non-Inherited Properties**:
  • Inherited: \`color\`, \`font-family\`, \`line-height\`, \`text-align\`, \`visibility\`.
  • Non-Inherited: \`margin\`, \`padding\`, \`border\`, \`width\`, \`height\`, \`background\`, \`display\`.`,
    commonTrickyQuestions: `- **Q: What does the 'C' in CSS stand for and how does it resolve conflicts?**
  • 'Cascading'. Conflicts resolve by evaluating: 1. Origin & Importance (!important, author, user, user-agent); 2. Specificity (Inline > ID > Class > Element); 3. Source Order (last rule declared wins).
- **Q: How does the browser calculate specificity between #id and 100 .classes?**
  • An ID selector (0, 1, 0, 0) ALWAYS beats any number of classes (0, 0, 100, 0). Specificity does not overflow across columns in modern standard browsers.
- **Q: Why are transform and opacity preferred for animations over top and left?**
  • \`transform\` and \`opacity\` run on the GPU Compositor thread without triggering expensive Layout (reflow) or Paint stages, delivering silky smooth 60fps animations.`,
    interviewReadyAnswer: `CSS is the stylesheet language responsible for web presentation and responsive layout. When an HTML document is parsed, the browser builds the CSSOM and merges it with the DOM to produce the Render Tree. Conflicts in styling are resolved through the Cascade based on importance, origin, specificity (inline, ID, class, element), and source order. Optimizing CSS delivery is critical because external stylesheets are render-blocking resources.`,
    quickRevisionPoints: `- CSS is render-blocking; the browser halts rendering until CSSOM is ready.
- Specificity tuple order: (Inline, IDs, Classes/Attributes/Pseudos, Elements).
- !important overrides normal specificity and should be used with extreme caution.
- Transform and opacity bypass layout and paint for high-performance animations.
- CSS Variables (--name) provide dynamic, cascade-aware values.`
  },
  {
    topicId: 205,
    title: 'CSS Selectors Notes',
    definition: `- **Official Definition**: A **CSS Selector** is a declarative pattern matching expression used to target specific HTML elements within the DOM tree for styling and behavioral rules.
- **Compound Selector**: A sequence of simple selectors not separated by combinators (e.g. \`a.btn.primary\`).
- **Combinator**: A character that defines the structural relationship between selectors (descendant space, child \`>\`, adjacent sibling \`+\`, general sibling \`~\`).`,
    simpleExplanation: `- **The Search Filter Analogy**:
  • Think of CSS Selectors as a search engine query:
  • "Find all employees in Engineering" -> \`.engineering .employee\` (descendant).
  • "Find only direct managers of teams" -> \`.team > .manager\` (direct child).
  • "Find the assistant sitting right next to the CEO" -> \`.ceo + .assistant\` (adjacent sibling).`,
    whyNeeded: `- **Precision Targeting**: Enables surgical application of styling without modifying or cluttering HTML markup with excessive utility classes.
- **State-Based Interactivity**: Pseudo-classes (\`:hover\`, \`:focus-visible\`, \`:checked\`, \`:disabled\`) allow rich dynamic styling without writing JavaScript listeners.
- **DOM Independence**: Semantic selectors let you redesign entire interfaces purely by adjusting CSS target patterns.`,
    howItWorks: `- **1. Right-to-Left Evaluation**: Browsers parse CSS selectors from **right to left** (the key selector). In \`div.sidebar ul li a\`, the browser first finds all \`<a>\` elements, then filters by parent \`<li>\`, \`<ul>\`, and \`div.sidebar\`.
- **2. Matching & Filter Phase**: Evaluates combinators and pseudo-classes against the live DOM state.
- **3. Specificity Assignment**: Calculates the combined specificity score for matching elements.`,
    importantConcepts: `- **Types of CSS Selectors**:
  • Universal: \`*\` (matches all elements).
  • Type (Tag): \`h1\`, \`p\`, \`section\`.
  • Class: \`.btn\`, \`.card\`.
  • ID: \`#header\`, \`#nav\`.
  • Attribute: \`[target]\`, \`[type="checkbox"]\`, \`[href^="https"]\` (starts with), \`[src$=".png"]\` (ends with), \`[class*="icon-"]\` (contains).
- **CSS Combinators**:
  • Descendant (\`A B\`): Any descendant of A at any nesting depth.
  • Child (\`A > B\`): Immediate direct child of A only.
  • Adjacent Sibling (\`A + B\`): Sibling B immediately preceded by A.
  • General Sibling (\`A ~ B\`): Sibling B preceded by A anywhere in the same parent.
- **Pseudo-Classes vs Pseudo-Elements**:
  • **Pseudo-Class (\`:\`)**: Targets elements based on temporary state or DOM position (\`:hover\`, \`:focus\`, \`:nth-child(2n)\`, \`:first-child\`, \`:not(.active)\`, \`:has()\`).
  • **Pseudo-Element (\`::\`)**: Creates virtual sub-elements that don't exist in HTML (\`::before\`, \`::after\`, \`::placeholder\`, \`::selection\`).`,
    realWorldExamples: `- **Accessible Form Controls**: Highlighting focused inputs with \`:focus-visible\` to ensure keyboard navigation visibility while avoiding focus rings on mouse clicks.
- **Parent Selector with \`:has()\`**: Styling a card component only if it contains a featured badge: \`.card:has(.featured-badge) { border: 2px solid gold; }\`.`,
    javaCodeExamples: `/* Attribute Selectors */
a[href^="https://"]::after {
  content: " ↗"; /* Adds external link indicator */
  font-size: 0.8em;
}

/* Structural Pseudo-classes */
ul.interview-list li:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Combinators Example */
.article-content > h2 + p {
  font-size: 1.15rem; /* Lead paragraph immediately following h2 */
  font-weight: 500;
}

/* Modern Parent Selector :has() */
.form-group:has(input:invalid) label {
  color: #dc2626; /* Color label red if input is invalid */
}`,
    internalWorking: `- **Selector Performance Mechanics**:
  • Deeply nested selectors (\`body div.container main article section p a\`) force the browser engine to traverse up ancestors repeatedly.
  • Modern engines optimize class and ID lookups into internal hash maps, making single-class selectors (\`.btn-primary\`) the fastest target patterns.`,
    advantagesDisadvantages: `- **Advantages**:
  • Ultra-clean HTML markup free of inline presentation hooks.
  • Powerful modern selectors like \`:has()\` (parent selector) and \`:is()\` / \`:where()\` reduce stylesheet verbosity.
- **Disadvantages / Trade-offs**:
  • Complex chained selectors are brittle and break easily when DOM hierarchy shifts during redesigns.`,
    importantDifferences: `- **:nth-child() vs :nth-of-type()**:
  • \`:nth-child(n)\`: Counts every sibling element regardless of tag type. If the 2nd sibling is a \`<div>\`, \`p:nth-child(2)\` matches NOTHING!
  • \`:nth-of-type(n)\`: Filters siblings by the specific tag type first, then counts. \`p:nth-of-type(2)\` reliably targets the second \`<p>\`.
- **:where() vs :is()**:
  • \`:is(.header, .nav) a\`: Specificity adopts the highest specificity inside its argument list.
  • \`:where(.header, .nav) a\`: Specificity is ALWAYS ZERO \`(0, 0, 0, 0)\`, making it ideal for utility resets.`,
    commonTrickyQuestions: `- **Q: Why do browsers parse CSS selectors from right to left?**
  • Efficiency. If parsed left-to-right, the browser must traverse down millions of DOM subtree branches only to find dead ends. Right-to-left starts with the specific element candidate and quickly checks if its ancestors match.
- **Q: What is required for ::before and ::after to render on screen?**
  • The \`content\` property! Without \`content: ""\` (even an empty string), pseudo-elements will not generate boxes in the render tree.
- **Q: Can pseudo-elements like ::before be applied to <img> or <input>?**
  • No! \`::before\` and \`::after\` generate children inside an element. Void elements (like \`<img>\`, \`<input>\`, \`<hr>\`) have no content and cannot contain child pseudo-elements.`,
    interviewReadyAnswer: `CSS Selectors are matching patterns that identify DOM nodes for styling. Categorized into universal, type, class, ID, and attribute selectors, they can be composed using combinators (descendant, child, adjacent, and general sibling). Browsers evaluate selectors right-to-left starting with the key selector. Pseudo-classes target dynamic state (:hover, :focus, :has()), while pseudo-elements (::before, ::after) generate virtual visual boxes in the render tree.`,
    quickRevisionPoints: `- Selectors evaluate right-to-left in browser rendering engines.
- Pseudo-classes (single colon :) match state; Pseudo-elements (double colon ::) generate virtual nodes.
- ::before and ::after require content: "" to render.
- :nth-child counts all siblings; :nth-of-type counts only matching tag siblings.
- :has() is the native CSS parent selector.`
  },
  {
    topicId: 206,
    title: 'CSS Box Model Notes',
    definition: `- **Official Definition**: The **CSS Box Model** is the foundational layout architecture governing how every HTML element is represented as a rectangular box comprising four concentric layers: **Content**, **Padding**, **Border**, and **Margin**.
- **Box-Sizing**: The CSS property determining whether an element's declared \`width\` and \`height\` apply only to the inner Content box (\`content-box\`) or encompass Content, Padding, and Border together (\`border-box\`).`,
    simpleExplanation: `- **The Framed Painting Analogy**:
  • **Content**: The artwork painting itself (width and height).
  • **Padding**: The blank white cardboard matting surrounding the artwork.
  • **Border**: The wooden or metal picture frame enclosing the artwork and padding.
  • **Margin**: The empty wall space separating this framed picture from neighboring frames.`,
    whyNeeded: `- **Predictable Dimension Calculations**: Without understanding box-sizing, adding padding or borders inflates element dimensions, breaking multi-column grid layouts.
- **Whitespace & Spacing Control**: Provides distinct architectural separation between internal spacing (\`padding\`) and external push spacing (\`margin\`).
- **Debugging Layout Bugs**: Over 80% of accidental horizontal scrollbars and unexpected line wraps stem from box model misunderstandings.`,
    howItWorks: `- **Concentric Layer Geometry (Inside-Out)**:
  • **1. Content Box**: Where text, images, and child elements render.
  • **2. Padding Area**: Transparent buffer space surrounding content; adopts element background color/image.
  • **3. Border Area**: The outline perimeter surrounding padding; can have style, width, and color.
  • **4. Margin Area**: Transparent exterior buffer space pushing against neighboring boxes.`,
    importantConcepts: `- **box-sizing: content-box (Default standard)**:
  • Total Rendered Width = \`width\` + \`padding-left\` + \`padding-right\` + \`border-left-width\` + \`border-right-width\`.
  • If \`width: 200px\`, \`padding: 20px\`, \`border: 5px\`, total physical width is **250px**!
- **box-sizing: border-box (Modern Industry Standard)**:
  • Total Rendered Width = declared \`width\`!
  • Padding and borders are absorbed inside the declared width. The content area automatically shrinks to accommodate them.
- **Global Box-Sizing Reset**:
  \`*, *::before, *::after { box-sizing: border-box; }\`
- **Margin Collapsing**:
  • Vertical margins of adjacent block-level elements collapse into a single margin equal to the maximum of the two margins (e.g. margin-bottom: 30px followed by margin-top: 20px yields 30px gap, NOT 50px!).`,
    realWorldExamples: `- **Two-Column 50% Layout**: Under \`border-box\`, two \`div\` elements with \`width: 50%\`, \`padding: 20px\`, and \`border: 1px\` sit side-by-side seamlessly. Under \`content-box\`, the second div immediately wraps to the next line.`,
    javaCodeExamples: `/* Modern Universally Recommended Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Demonstration Card Component */
.pricing-card {
  width: 320px;            /* Exact total rendered width! */
  padding: 24px;           /* Pushes inward */
  border: 2px solid #0062ff; /* 2px frame inward */
  margin: 16px auto;       /* Pushes exterior neighbors */
  background-color: #ffffff;
  border-radius: 12px;
}`,
    internalWorking: `- **Margin Collapsing Rules**:
  • Only occurs on **vertical** margins (top and bottom) of **block-level** elements in normal flow.
  • Does NOT occur on: Horizontal margins, flex items, grid items, elements with \`position: absolute\`, or floated elements.
  • Parent-Child Collapse: If a parent has no padding, border, or inline content, the child's top margin collapses with the parent's top margin! Prevent by adding \`padding-top: 1px\` or \`overflow: auto\` to the parent.`,
    advantagesDisadvantages: `- **Advantages of border-box**:
  • Math is effortless: \`width: 100%\` remains 100% even after adding padding and borders.
  • Eliminates accidental viewport overflow and horizontal scrollbars.
- **Disadvantages / Trade-offs**:
  • Legacy codebase migration requires testing if components depended on default \`content-box\` sizing.`,
    importantDifferences: `- **Padding vs Margin**:
  • Padding: Space INSIDE the border; clicks register on padding; background color shows on padding.
  • Margin: Space OUTSIDE the border; completely transparent; does not receive click events.
- **Border vs Outline**:
  • Border: Occupies physical space in the box model geometry; affects layout calculations.
  • Outline: Drawn outside the border; does NOT occupy space; does not trigger reflow (ideal for focus rings).`,
    commonTrickyQuestions: `- **Q: Why does my element with width: 100% and padding: 20px cause a horizontal scrollbar?**
  • Because the default box-sizing is \`content-box\`. The total width becomes \`100% + 40px\`, exceeding the viewport width. Fix with \`box-sizing: border-box\`.
- **Q: Do vertical margins collapse on flex items or grid items?**
  • No! Margin collapsing is strictly limited to block-level elements in normal block formatting context. Flex items and grid items never collapse margins.
- **Q: How does negative margin work?**
  • Negative margins pull elements closer or overlap them! Negative \`margin-left\` pulls the element left; negative \`margin-top\` pulls it up; negative \`margin-bottom\` pulls subsequent sibling elements up over itself.`,
    interviewReadyAnswer: `The CSS Box Model is the structural framework defining every rendered element as a rectangular box with Content, Padding, Border, and Margin. Under the default content-box model, declared width applies only to content, causing padding and borders to expand total rendered dimensions. The modern standard practice is box-sizing: border-box, which locks total element width to the declared value. Furthermore, vertical margins of adjacent block elements collapse to the largest margin value.`,
    quickRevisionPoints: `- Four box model layers: Content -> Padding -> Border -> Margin.
- content-box adds padding and borders to declared width (total = width + padding + border).
- border-box absorbs padding and border within declared width (total = width).
- Vertical margins collapse on block elements in normal flow; flex/grid items do not collapse.
- Outline does not consume box model space; border does.`
  },
  {
    topicId: 207,
    title: 'CSS Flexbox Notes',
    definition: `- **Official Definition**: **CSS Flexible Box Layout** (Flexbox) is a one-dimensional layout model designed for distributing space among items along a single axis (row or column) with powerful alignment, ordering, and dynamic resizing capabilities.
- **Flex Container**: The parent element established by declaring \`display: flex\` or \`display: inline-flex\`.
- **Flex Items**: The direct children of a flex container governed by flexbox layout algorithms.`,
    simpleExplanation: `- **The Subway Train Seating Analogy**:
  • The train car is the **Flex Container**.
  • The passengers are the **Flex Items**.
  • If seats are empty, passengers can stretch out (\`flex-grow\`).
  • If the train gets overcrowded, passengers tuck their elbows in (\`flex-shrink\`).
  • The conductor can arrange passengers in a horizontal row or vertical line (\`flex-direction\`), centered or spaced evenly (\`justify-content\`).`,
    whyNeeded: `- **Eliminates Fragile Floats**: Replaces historic CSS float hacks and clearfix workarounds with a clean declarative model.
- **Effortless Centering**: Solves the notorious "vertical centering in CSS" problem with just two lines: \`justify-content: center; align-items: center;\`.
- **Fluid Adaptation**: Allows navigation bars, card rows, and toolbars to gracefully expand or shrink across varying viewport sizes.`,
    howItWorks: `- **The Two Axes**:
  • **Main Axis**: The primary direction determined by \`flex-direction\` (\`row\` [horizontal, default], \`column\` [vertical], \`row-reverse\`, \`column-reverse\`).
  • **Cross Axis**: The perpendicular axis running 90 degrees to the main axis.
- **Container Properties (Manage Flow & Spacing)**:
  • \`flex-direction\`, \`flex-wrap\`, \`justify-content\` (main axis alignment), \`align-items\` (cross axis alignment), \`gap\`.
- **Item Properties (Manage Individual Behavior)**:
  • \`flex-grow\`, \`flex-shrink\`, \`flex-basis\`, \`align-self\`, \`order\`.`,
    importantConcepts: `- **justify-content (Main Axis Alignment)**:
  • \`flex-start\`, \`flex-end\`, \`center\`, \`space-between\` (first/last flush to edges), \`space-around\`, \`space-evenly\` (identical spacing throughout).
- **align-items (Cross Axis Alignment)**:
  • \`stretch\` (default: items expand to fill container height), \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`.
- **The \`flex\` Shorthand**:
  • \`flex: [flex-grow] [flex-shrink] [flex-basis]\`
  • Common presets:
    - \`flex: 1 1 0%\` (or \`flex: 1\`): Items grow and shrink equally, starting from 0 basis (equal width columns).
    - \`flex: 0 0 auto\`: Item refuses to grow or shrink, maintaining its natural content size.
- **gap property**: Native spacing between flex items without requiring margin hacks on children.`,
    realWorldExamples: `- **Responsive Navbar**: Logo on the left, navigation links in the center, login button pushed to the far right using \`margin-left: auto\` on the button container.
- **Card Header & Action Buttons**: Aligning title and action icons on opposite sides of a card header using \`justify-content: space-between; align-items: center;\`.`,
    javaCodeExamples: `/* Perfect Centering Utility */
.center-box {
  display: flex;
  justify-content: center; /* Main axis */
  align-items: center;     /* Cross axis */
  min-height: 100vh;
}

/* Responsive Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
}

/* Equal-Width Responsive Card Grid with Flex Wrap */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card-item {
  flex: 1 1 300px; /* Grow, shrink, base width 300px */
}`,
    internalWorking: `- **Flex Factor Distribution Algorithm**:
  • The browser first calculates free available space: \`Available Space = Container Width - Sum(Item Flex Bases)\`.
  • If free space is positive, it distributes space proportionally based on each item's \`flex-grow\` weight.
  • If free space is negative (overflow), items shrink proportionally based on their \`flex-shrink * flex-basis\` product.`,
    advantagesDisadvantages: `- **Advantages**:
  • Unequaled flexibility for 1-dimensional layouts.
  • Dynamic source-independent visual reordering via the \`order\` property.
- **Disadvantages / Trade-offs**:
  • Inefficient for 2-dimensional grid layouts where rows and columns must align simultaneously (CSS Grid is designed for this).
  • Accessibility warning: Changing \`order\` or \`flex-direction: row-reverse\` alters visual order without changing DOM tab focus order!`,
    importantDifferences: `- **Flexbox vs CSS Grid**:
  • Flexbox: 1-Dimensional (works on rows OR columns). Best for components, navbars, and content-first layouts.
  • CSS Grid: 2-Dimensional (controls rows AND columns simultaneously). Best for overall page layouts and strict grids.
- **flex-basis: 0 vs flex-basis: auto**:
  • \`flex-basis: 0\`: Ignores content size; space is distributed purely based on grow ratio, creating perfectly equal widths.
  • \`flex-basis: auto\`: Considers natural content size first; larger content receives more initial space.`,
    commonTrickyQuestions: `- **Q: Why does flex-basis: 0 create equal column widths, but flex-basis: auto does not?**
  • With \`auto\`, the browser subtracts content widths before distributing remaining space, so an item with longer text ends up wider. With \`0\`, all container width is treated as free space and divided strictly by \`flex-grow\`.
- **Q: What does margin: auto do inside a flex container?**
  • Magic! \`margin-left: auto\` absorbs all remaining free space on the left, pushing the item all the way to the far right edge of the container.
- **Q: Why don't flex items shrink below their content size even when flex-shrink: 1?**
  • Because the default \`min-width\` on flex items is \`auto\` (not 0). To allow flex items to shrink below their text or image width, you must explicitly set \`min-width: 0\`.`,
    interviewReadyAnswer: `CSS Flexbox is a one-dimensional layout system that manages element alignment, direction, and proportional space distribution along a main axis and cross axis. Configured on the container via display: flex, properties like justify-content and align-items govern axis alignment. Flex items dynamically scale via the flex shorthand (grow, shrink, basis), enabling fluid responsive component architectures such as navbars and adaptable card grids.`,
    quickRevisionPoints: `- Flexbox is 1-dimensional (row or column).
- justify-content aligns along main axis; align-items aligns along cross axis.
- flex: 1 shorthand means flex: 1 1 0% (equal expansion).
- min-width: 0 is required on flex items to prevent text overflow from blocking shrink.
- margin: auto inside flex absorbs available space in that direction.`
  },
  {
    topicId: 208,
    title: 'CSS Grid Notes',
    definition: `- **Official Definition**: **CSS Grid Layout** is a two-dimensional layout system for the web that enables developers to structure user interfaces into rows and columns simultaneously using declarative grid tracks, lines, and areas.
- **Grid Container**: The parent element established by \`display: grid\` or \`display: inline-grid\`.
- **Grid Track**: The generic term for the space between two adjacent grid lines—either a column track or a row track.
- **fr Unit**: A fractional unit representing a fraction of the available free space within the grid container.`,
    simpleExplanation: `- **The Newspaper Layout Analogy**:
  • A printed newspaper has columns and rows: headline across 4 columns, article in 2 columns, sidebar on the right, photo spanning 2 rows.
  • **CSS Grid** gives you that exact newspaper editor capability in code, letting you place elements anywhere on a 2D coordinate matrix without nested container wrappers.`,
    whyNeeded: `- **True 2D Layouts**: Allows items to align across both horizontal rows and vertical columns simultaneously, which Flexbox cannot do.
- **Eliminates Wrapper Div Soup**: Components can be placed across lines and areas without requiring extra wrapper \`<div>\` elements.
- **Responsive Without Media Queries**: Features like \`repeat(auto-fit, minmax(250px, 1fr))\` create fully responsive grids that adapt dynamically to any viewport width with zero media queries.`,
    howItWorks: `- **1. Grid Coordinate Definition**: Container defines tracks via \`grid-template-columns\` and \`grid-template-rows\`.
- **2. Line Numbering**: Grid lines are numbered starting from 1 (positive index from left/top) and -1 (negative index from right/bottom).
- **3. Item Placement**: Items are placed onto the grid using line numbers (\`grid-column: 1 / 3\`), spans (\`grid-column: span 2\`), or named areas (\`grid-template-areas\`).`,
    importantConcepts: `- **The Fractional Unit (\`fr\`)**:
  • \`grid-template-columns: 1fr 2fr 1fr;\` divides container into 4 equal shares (25%, 50%, 25%).
- **Repeat & Minmax Functions**:
  • \`repeat(3, 1fr)\` creates 3 equal columns.
  • \`minmax(200px, 1fr)\` ensures tracks never shrink below 200px but can expand to fill free space.
- **auto-fit vs auto-fill**:
  • \`repeat(auto-fit, minmax(280px, 1fr))\`: Automatically fits as many columns as possible; stretches existing items to fill the row if space remains.
  • \`repeat(auto-fill, minmax(280px, 1fr))\`: Preserves empty column tracks rather than stretching existing items.
- **grid-template-areas**:
  • Declarative visual layout mapping using named ASCII strings:
    \`"header header"\`
    \`"sidebar main"\`
    \`"footer footer"\``,
    realWorldExamples: `- **Dashboard App Layout**: Using \`grid-template-areas\` to define header, collapsible sidebar, multi-widget main workspace, and status footer.
- **Photo Gallery Wall**: Asymmetric gallery where featured photos span 2 rows and 2 columns (\`grid-area: span 2 / span 2\`) alongside single-cell thumbnails.`,
    javaCodeExamples: `/* Responsive Grid without Media Queries */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Holy Grail Layout using Named Areas */
.app-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main    { grid-area: main; }
.site-footer  { grid-area: footer; }`,
    internalWorking: `- **Grid Track Sizing Algorithm**:
  • The browser resolves fixed tracks (px, rem), then minmax bounds, and finally distributes residual space to \`fr\` tracks.
  • Subgrid (\`grid-template-columns: subgrid\`): Allows child elements to inherit and align to the parent grid's tracks rather than establishing an isolated nested grid.`,
    advantagesDisadvantages: `- **Advantages**:
  • Native 2-dimensional power unmatched by any other CSS specification.
  • \`grid-template-areas\` provides self-documenting visual layout syntax in code.
- **Disadvantages / Trade-offs**:
  • Slightly steeper learning curve than Flexbox.
  • Overkill for simple 1D alignment tasks like navbars or button groups.`,
    importantDifferences: `- **auto-fill vs auto-fit**:
  • auto-fill: Creates as many tracks as fit, leaving empty tracks unfilled if there aren't enough items.
  • auto-fit: Collapses empty tracks to 0px, expanding the existing items to occupy full available width.
- **Grid vs Flexbox**:
  • Grid: 2D, layout-first (container defines the layout, items drop in).
  • Flexbox: 1D, content-first (items dictate their own size and push neighbors).`,
    commonTrickyQuestions: `- **Q: How does grid-column: 1 / -1 work?**
  • It spans an item across the entire width of the grid, from the first column line (1) to the very last column line (-1), regardless of how many columns exist!
- **Q: What is the magic formula for responsive grid with zero media queries?**
  • \`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\` Automatically wraps and sizes cards based on screen width.
- **Q: Can CSS Grid and Flexbox be used together?**
  • Absolutely! Best practice is using CSS Grid for the high-level 2D page architecture, and Flexbox for 1D component internals (e.g. inside cards, navbars, and button bars).`,
    interviewReadyAnswer: `CSS Grid is a two-dimensional layout system that structures interfaces into rows and columns simultaneously. Defined by display: grid, containers establish tracks using absolute values, fractional units (fr), and minmax constraints. Items are positioned via numbered grid lines, span counts, or named template areas. Combined with auto-fit and minmax, CSS Grid enables sophisticated, fully responsive multi-column layouts without requiring media queries.`,
    quickRevisionPoints: `- CSS Grid is 2-dimensional (controls rows and columns together).
- fr unit divides available free space proportionally.
- repeat(auto-fit, minmax(250px, 1fr)) creates responsive grids with zero media queries.
- grid-column: 1 / -1 spans an item across all column tracks from start to finish.
- Use Grid for outer page layout; use Flexbox for inner component elements.`
  }
];

