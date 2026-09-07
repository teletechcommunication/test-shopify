# GLAYZYR — Shopify CLI Master Build Prompt for Claude

## Role

You are a senior Shopify theme engineer, frontend architect, UI/UX designer, and animation engineer working directly inside the existing **GLAYZYR Shopify CLI theme repository**, connected to GitHub.

Your task is to implement a complete premium, responsive GLAYZYR ecommerce homepage while also building the individual sections as a **reusable Shopify section library** that can later be copied into other Shopify themes.

This is an implementation task, not a request for code snippets or a design explanation.

---

# 1. CRITICAL WORKING RULES

Before changing anything:

1. Inspect the existing repository.
2. Understand the current Shopify theme architecture.
3. Identify the current hero, header, footer, homepage template, sections, snippets, assets, CSS, JavaScript, and product-card implementation.
4. Check whether GSAP or another animation library already exists.
5. Reuse existing theme functionality where appropriate.
6. Do not create a separate React, Next.js, Vite, or standalone web application.
7. Work directly inside the Shopify CLI theme.
8. Do not blindly replace existing theme files.
9. Preserve working Shopify functionality.
10. Build the requested homepage from independent, reusable Shopify sections.

The final result must be production-quality Shopify theme code, not a static mockup.

---

# 2. PRIMARY GOAL

Build this homepage flow:

1. Existing Hero
2. Smart Glasses Intro / Story Section
3. Curved Loop Marquee
4. Two-Category Showcase
5. Large Promotional Banner
6. Center-Focused Depth Product Showcase
7. Three-Banner Promotional Area
8. Testimonials / Reviews
9. FAQ
10. Footer

The visual experience should feel like one continuous premium GLAYZYR story.

Design characteristics:

- Premium
- Modern
- Editorial
- Cinematic
- Minimal
- Product-focused
- Sophisticated
- Slightly futuristic
- High-end ecommerce

Avoid making it look like a generic Shopify theme.

---

# 3. REFERENCE DIRECTION

Use the supplied product-showcase reference as inspiration for visual hierarchy:

- Large featured product
- Smaller surrounding products
- Strong product focus
- Rounded cards
- Clean spacing
- Premium ecommerce composition

Do not copy the reference branding, exact products, text, or visual assets.

Create an original GLAYZYR implementation.

---

# 4. CONTENT STRATEGY

The page is currently a design skeleton.

Use realistic placeholder copy and placeholder images wherever final GLAYZYR content is unavailable.

Do not block implementation waiting for final content.

However, all product-related areas must use Shopify-native product/catalog data wherever possible.

Use:

- Shopify products
- Collections
- Product objects
- Product images
- Product title
- Product price
- Product URL
- Product description
- Shopify metafields for ratings/reviews when available

Do not hardcode fake production products when Shopify product data is available.

All important content should be editable through the Shopify Theme Editor.

---

# 5. EXISTING HERO

KEEP THE EXISTING HERO.

Do not redesign or replace it unless required for integration.

Remove these existing sections/content if present:

- Wearable Intelligence
- Hands-Free Vision
- All Day Design

Do not remove the hero itself.

The hero remains the first visual experience.

---

# 6. SMART GLASSES INTRO / STORY SECTION

Create a unique Smart Glasses introduction immediately below the hero.

## Desktop

Use a two-column layout:

- Left: story/content
- Right: large smart-glasses image

Example placeholder content:

Eyebrow:
"THE NEXT VIEW"

Heading:
"Meet the Future of Eyewear"

Description:
"Smart eyewear designed to blend intelligent technology with everyday style."

Optional CTA:
"Discover Smart Glasses →"

## Scroll interaction

Create a cinematic connection between the hero and this section.

As the user scrolls:

- The smart-glasses image should visually float/move from the hero area.
- It should transition naturally into the intro section.
- It should settle toward the right side.
- Movement must be smooth and controlled.
- Do not cause horizontal overflow.
- Do not interfere with normal scrolling.
- Do not make the animation excessive.

Use CSS/Vanilla JS or GSAP if already available/appropriate.

On mobile:

- Simplify the animation.
- Prioritize performance.
- Avoid complex cross-section positioning if it risks layout issues.

Respect `prefers-reduced-motion`.

If technically impossible to reuse the exact hero image safely, recreate the visual effect using the same asset rather than breaking the hero.

---

# 7. CURVED LOOP MARQUEE

Place this between the Smart Glasses section and the category section.

Create a curved scrolling text marquee inspired by the React Bits `CurvedLoop` concept.

The original concept uses:

- SVG text path
- Continuous movement
- Adjustable speed
- Adjustable curve
- Direction
- Optional pointer dragging
- Responsive behavior

## Shopify implementation

This is a Shopify Liquid theme.

Do NOT import a React component directly into Liquid.

Instead implement the behavior using:

- SVG
- CSS
- Vanilla JavaScript
- `requestAnimationFrame`

Use GSAP only if it is already part of the theme or genuinely improves the implementation.

Example text:

"SEE THE FUTURE ✦ LIVE THE FUTURE ✦ WEAR THE FUTURE ✦ GLAYZYR ✦"

Requirements:

- Adjustable speed
- Adjustable curve amount
- Direction
- Optional interactive dragging
- Smooth looping
- Responsive SVG
- No horizontal overflow
- Reduced-motion support
- Theme Editor settings

The section must be independently reusable.

---

# 8. CATEGORY SECTION

Create a premium two-category section.

There are ONLY two categories:

1. AI Smart Glasses
2. Normal Glasses

## Desktop

Two large columns:

50% / 50%

### Left — AI Smart Glasses

Use a cinematic scroll interaction.

As the user scrolls into the section:

- AI glasses image floats into position.
- Image settles naturally inside the left card.
- Use subtle transform/opacity/scale.
- Keep animation premium and controlled.

Content:

Eyebrow:
"INTELLIGENCE IN VIEW"

Heading:
"AI Smart Glasses"

Description:
"Intelligence, built into your everyday view."

CTA:
"Explore AI Glasses →"

### Right — Normal Glasses

Use the available normal-glasses image if one exists.

Otherwise use a clean placeholder image.

Content:

Eyebrow:
"TIMELESS DESIGN"

Heading:
"Normal Glasses"

Description:
"Timeless frames, designed for everyday style."

CTA:
"Explore Glasses →"

Both cards must be clickable.

Category destinations must be configurable in Theme Editor.

---

# 9. LARGE PROMOTIONAL BANNER

Below the category section, add one large full-width promotional banner.

Target desktop visual height:

Approximately 60% viewport height.

Do not use a rigid fixed height that causes mobile problems.

Use responsive sizing such as `clamp()`, `min-height`, or an appropriate aspect-ratio strategy.

Content:

Eyebrow:
"SEE DIFFERENT"

Heading:
"Experience eyewear designed for what's next."

Supporting text:
"Placeholder promotional copy for the future GLAYZYR collection."

CTA:
"Discover More →"

The section must support:

- Desktop image
- Mobile image
- Image focal point
- Heading
- Text
- CTA
- Link
- Overlay
- Theme Editor settings

---

# 10. PRODUCT SHOWCASE — CENTER-FOCUSED DEPTH CAROUSEL

This is one of the most important sections.

Do NOT build a normal product grid.

Do NOT use a one-sided depth carousel.

The MAIN PRODUCT must remain visually centered.

Desired desktop composition:

    DEPTH  DEPTH  DEPTH   MAIN PRODUCT   DEPTH  DEPTH  DEPTH

The center product is the visual hero.

The surrounding cards create depth.

## Large desktop

Show approximately:

- 3 depth cards on the left
- 1 main product in the center
- 3 depth cards on the right

The exact number can gracefully reduce at smaller widths.

Visual hierarchy:

CENTER:
- Largest
- Sharpest
- Highest opacity
- Highest z-index
- Most product information

SIDE CARDS:
- Smaller
- Further back in 3D space
- Reduced opacity
- Subtle blur
- Subtle tint
- Perspective rotation
- Progressive depth
- Partial visibility where appropriate

---

# 11. DEPTH CAROUSEL DATA

Use a Shopify collection selected from Theme Editor.

Do not hardcode GLAYZYR product handles.

The section should work with ANY Shopify store.

Target approximately 7 products:

- 1 center
- 3 left
- 3 right

If fewer products are available:

- Gracefully use the available products.
- Never render broken cards.
- Never reference undefined products.
- Keep the center-focused composition.

Support:

- Product image
- Product title
- Product URL
- Price
- Description
- Rating
- Review count
- Add to Cart
- Wishlist/favorite if already supported by the theme

---

# 12. PRODUCT RATINGS

Every product card must show its rating.

Preferred compact format:

`★ 4.8 (124)`

or:

`★★★★★ 4.8`
`124 reviews`

Use small premium star icons.

Ratings must:

- Be clearly visible
- Align consistently
- Not overpower product imagery
- Work in center cards
- Work in depth cards
- Remain readable on mobile

If the store does not currently expose review data:

- Create a clean fallback using Shopify metafields or configurable placeholder data.
- Do not automatically install a review app.
- Make the implementation easy to connect to real review data later.

---

# 13. CENTER PRODUCT CARD

The center product must display:

- Large product image
- Product title
- Short description
- Rating
- Review count
- Price
- Add to Cart button
- Optional View Product button

Example:

GLAYZYR VISION X

★ 4.8 (124)

₹12,999

[ Add to Cart ]

Use actual Shopify product values when available.

---

# 14. DEPTH PRODUCT CARDS

Side cards should prioritize visual hierarchy.

Show:

- Product image
- Product title
- Rating
- Price

Secondary information should be subtle.

As cards move farther away from center:

- Reduce scale
- Increase depth
- Reduce opacity
- Increase blur slightly
- Add subtle tint
- Rotate subtly in perspective

Do not make distant cards unreadable.

---

# 15. DEPTH CAROUSEL INTERACTIONS

Use the supplied React Bits DepthCarousel concept as behavioral inspiration.

The original concept includes:

- GSAP transitions
- Depth
- Spread
- Tilt
- Perspective
- Visible cards
- Blur/falloff
- Autoplay
- Loop
- Controls
- Indicators
- Drag
- Wheel
- Keyboard navigation

For Shopify:

Do NOT introduce React just for this component.

Prefer:

Vanilla JavaScript + GSAP.

If GSAP already exists, reuse it.

If GSAP does not exist, add it only if genuinely necessary and load it efficiently.

Required interactions:

- Previous
- Next
- Mouse drag
- Touch swipe
- Keyboard ArrowLeft
- Keyboard ArrowRight
- Optional autoplay
- Loop
- Indicators where useful
- Pause autoplay on hover
- Pause autoplay while focused
- Reduced-motion support

The carousel must remain usable if advanced animation is unavailable.

Provide a graceful fallback.

---

# 16. PRODUCT SHOWCASE HEADING

Use:

Eyebrow:
"THE COLLECTION"

Heading:
"Explore the Collection"

Supporting text:
"Discover eyewear designed to move with you."

Optional link:

"View All Products →"

The section must feel cinematic and editorial rather than like a standard Shopify product grid.

---

# 17. THREE-BANNER PROMOTIONAL AREA

Immediately below the product showcase, create three promotional banners.

## Top banner

One full-width banner.

Desktop target:
Approximately 60% viewport-height visual presence.

## Lower banners

Immediately below the top banner:

Two equal columns:

50% / 50%

There should be NO unnecessary gap between these two lower banners.

Concept:

┌─────────────────────────────────────────────┐
│                                             │
│                 LARGE BANNER                │
│               ~60% visual height            │
│                                             │
└─────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────┐
│                      │                      │
│      BANNER TWO      │     BANNER THREE     │
│                      │                      │
└──────────────────────┴──────────────────────┘

The lower banners must:

- Have equal height
- Touch each other with no gap
- Maintain consistent image cropping
- Be responsive

Each banner supports:

- Image
- Mobile image
- Eyebrow
- Heading
- Description
- CTA
- Link
- Focal point
- Overlay settings

Mobile:

- Stack vertically
- Do not retain 50/50 layout
- Use appropriate spacing
- Prevent distortion

---

# 18. TESTIMONIAL / REVIEW SECTION

Create an iconic, attractive testimonial/review section.

Do NOT make it a generic review strip.

Create a premium editorial composition.

Possible visual structure:

- Large quotation mark/icon
- Large featured testimonial
- Customer name
- Rating
- Optional avatar
- Optional role/location
- Secondary testimonial cards
- Elegant typography
- Subtle motion

Example:

"GLAYZYR completely changed how I think about everyday eyewear."

★★★★★

— Alex Morgan

Create 3–5 placeholder testimonials.

Make testimonials editable through Theme Editor blocks.

Each block supports:

- Quote
- Name
- Rating
- Image/avatar
- Role/location

If using a slider:

- Keyboard accessible
- Touch friendly
- Reduced motion compatible

---

# 19. FAQ

Create a premium FAQ accordion.

Placeholder questions:

- What makes GLAYZYR different?
- Do GLAYZYR smart glasses require a phone?
- How do I choose the right frame?
- How long does shipping take?
- Can I return my glasses?
- Do you offer warranty support?

Requirements:

- Smooth accordion
- Keyboard accessible
- Proper `aria-expanded`
- Semantic buttons
- Clear focus state
- Mobile friendly
- Theme Editor blocks

Support either one-open-at-a-time or multi-open behavior through a sensible design decision.

---

# 20. FOOTER

Keep the existing Shopify footer if it already works.

Do not unnecessarily rebuild it.

Only adjust styling or structure if required for visual consistency.

Preserve:

- Navigation
- Shop links
- Customer support
- Social links
- Newsletter
- Copyright
- Policy links

Do not break Shopify policy functionality.

---

# 21. REUSABLE / PORTABLE SECTION ARCHITECTURE — CRITICAL

The sections are not only for GLAYZYR.

They are intended to become a reusable premium Shopify section library.

Build once → reuse in other Shopify themes.

Every major section must be:

- Independent
- Portable
- Responsive
- Theme Editor configurable
- Product/collection configurable
- Accessible
- Performance optimized
- Multiple-instance safe

Sections must NOT depend heavily on GLAYZYR-specific global CSS or JavaScript.

---

# 22. SECTION FILE STRUCTURE

Prefer an architecture such as:

sections/
  glayzyr-smart-glasses-intro.liquid
  glayzyr-curved-loop.liquid
  glayzyr-categories.liquid
  glayzyr-feature-banner.liquid
  glayzyr-depth-product-showcase.liquid
  glayzyr-promo-banners.liquid
  glayzyr-testimonials.liquid
  glayzyr-faq.liquid

snippets/
  glayzyr-product-card.liquid
  glayzyr-rating.liquid

assets/
  glayzyr-curved-loop.js
  glayzyr-depth-carousel.js
  glayzyr-sections.css

Adapt the exact structure to the existing repository if it has a better architecture.

Do not duplicate existing theme functionality unnecessarily.

---

# 23. SECTION INDEPENDENCE

Each section must have:

- Unique wrapper
- Scoped CSS
- Scoped JavaScript
- No accidental global styles
- No conflicting IDs
- No dependency on unrelated custom sections

Avoid generic global selectors such as:

`.card`
`.button`
`.container`
`.section`
`img`
`h2`

Prefer namespaced selectors such as:

`.glayzyr-depth-product-showcase`
`.glayzyr-depth-product-showcase__card`

Use data attributes for JS hooks:

`data-section-id`
`data-carousel`
`data-product-card`
`data-faq-item`

JavaScript should use the section root as its scope.

---

# 24. MULTIPLE SECTION INSTANCES

Every section must support multiple instances on the same page.

For example:

- Product Showcase #1
- Product Showcase #2

must work independently.

One section must never control another section.

This is especially important for:

- Carousels
- Depth carousel
- FAQ
- Testimonials
- Curved marquee
- Scroll animations

Avoid global singleton state.

---

# 25. SHOPIFY THEME EDITOR

Every section must have a complete `{% schema %}`.

Where relevant, expose:

- Heading
- Description
- Images
- Mobile image
- Image focal point
- Product picker
- Collection picker
- Product count
- Buttons
- Links
- Colors
- Background
- Alignment
- Spacing
- Border radius
- Animation enable/disable
- Animation intensity
- Autoplay
- Autoplay speed

Do not expose unnecessary technical settings.

Use sensible defaults.

The page must look good before any configuration.

---

# 26. SHOPIFY EDITOR EVENTS

Interactive sections must support Shopify Theme Editor lifecycle events.

Handle appropriately:

- `shopify:section:load`
- `shopify:section:unload`
- `shopify:section:select`
- `shopify:section:deselect`

Do not rely only on `DOMContentLoaded`.

Sections dynamically inserted/reloaded by the Theme Editor must initialize correctly.

Clean up:

- Event listeners
- GSAP timelines
- Intervals
- Animation frames
- Observers

when sections are unloaded.

---

# 27. PORTABLE CSS

Scope CSS to each section.

Use CSS variables where useful:

- `--section-padding`
- `--section-gap`
- `--card-radius`
- `--heading-size`
- `--animation-duration`

Do not overwrite the host theme's global styles.

Do not globally redefine:

- body
- html
- img
- h1
- h2
- button
- a

unless absolutely necessary and safely scoped.

---

# 28. PORTABLE JAVASCRIPT

JavaScript must initialize per section.

Do not assume there is only one section instance.

Use a pattern equivalent to:

```js
document.querySelectorAll('[data-glayzyr-section]').forEach((section) => {
  // initialize this section
});
```

Use data attributes for behavior.

Avoid unnecessary document-wide queries.

Avoid global mutable state.

Prevent duplicate initialization.

---

# 29. RESPONSIVE DESIGN — CRITICAL

Do not simply shrink desktop layouts.

Design mobile-first.

Test:

320px
360px
375px
390px
414px
430px
768px
1024px
1280px
1440px
1920px

## Desktop

- Full cinematic layouts
- Two-column sections
- Center product + side depth cards
- Three-banner structure

## Tablet

- Reduce card sizes
- Reduce depth
- Reduce animation intensity
- Maintain visual hierarchy

## Mobile

- No horizontal scrolling
- No clipped content
- No overlapping controls
- Touch-friendly controls
- Readable typography
- Correct image aspect ratios

---

# 30. MOBILE DEPTH CAROUSEL

Do NOT attempt to display all seven cards fully on a narrow screen.

Instead:

- Keep main product centered.
- Show 1–2 partial depth cards per side where space allows.
- Reduce perspective.
- Reduce depth.
- Reduce rotation.
- Enable swipe.
- Ensure controls remain accessible.

If necessary, simplify the visual composition while preserving the concept.

---

# 31. RESPONSIVE CATEGORY SECTION

Desktop:

50/50 two-column.

Mobile:

Single-column stacked cards.

Both category cards must remain visually strong.

---

# 32. RESPONSIVE BANNERS

Large banner:

Use responsive sizing.

Do not force a fixed 60vh height on mobile if it damages usability.

Three-banner section:

Desktop:
- 1 full-width banner
- 2 equal lower banners

Mobile:
- 3 stacked banners

---

# 33. IMAGE HANDLING

Do not hardcode production external image URLs.

Use Shopify image settings and Shopify image filters.

Prefer:

- `image_url`
- `image_tag`
- responsive `srcset`
- appropriate `sizes`

Support:

- Desktop image
- Mobile image
- Alt text
- Focal point
- Lazy loading

Above-the-fold hero imagery may use eager loading where appropriate.

Below-the-fold images should generally use lazy loading.

Do not distort products.

Use `object-fit` appropriately.

---

# 34. PRODUCT PORTABILITY

Do not hardcode GLAYZYR product handles.

Use:

- Collection picker
- Product picker
- Product list

The sections must work with products from another Shopify store without code changes.

---

# 35. BRAND PORTABILITY

Do not hardcode GLAYZYR colors throughout CSS.

Use CSS variables and/or section settings.

Examples:

- `--section-background`
- `--section-text`
- `--section-accent`
- `--section-button-background`
- `--section-button-text`

GLAYZYR can have sensible defaults, but another brand should be able to restyle the section.

---

# 36. TYPOGRAPHY PORTABILITY

Respect the host Shopify theme's typography.

Do not globally import a font.

Do not override the entire theme's typography.

Use inherited/theme typography variables where available.

If a section absolutely requires a custom font, keep it isolated and optional.

---

# 37. SPACING PORTABILITY

Do not assume the host theme uses the same spacing system.

Each section must define sensible internal spacing.

Where useful, expose:

- Desktop top spacing
- Desktop bottom spacing
- Mobile top spacing
- Mobile bottom spacing

Do not rely on neighboring sections for correct spacing.

---

# 38. ANIMATION PRINCIPLES

Animations should feel:

- Cinematic
- Smooth
- Premium
- Controlled

Use:

- Transform
- Opacity
- Scale
- Subtle blur
- Perspective
- Parallax

Avoid:

- Excessive bounce
- Flashing
- Constant motion
- Distracting effects
- Animations that interfere with shopping

Always support:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced motion should disable or simplify non-essential animations.

---

# 39. DEPENDENCY MANAGEMENT

Before adding any dependency:

1. Check if it already exists.
2. Reuse it if possible.
3. Avoid React for isolated components in a Liquid theme.
4. Avoid unnecessary npm packages.
5. Avoid duplicate GSAP versions.

Curved marquee:

Prefer SVG + CSS + Vanilla JS.

Depth carousel:

Prefer Vanilla JS + GSAP.

If GSAP is not needed for a particular animation, do not use it.

---

# 40. PERFORMANCE

Performance matters.

Optimize:

- Image loading
- JavaScript execution
- DOM size
- Animation performance
- Asset loading

Use:

- Responsive Shopify images
- Lazy loading
- `requestAnimationFrame` only where appropriate
- Efficient event listeners
- IntersectionObserver for scroll-triggered initialization where useful

Do not run heavy animation continuously when the section is not visible.

Avoid unnecessary global listeners.

Avoid loading large libraries unnecessarily.

---

# 41. ACCESSIBILITY

Ensure:

- Semantic HTML
- Correct heading hierarchy
- Meaningful alt text
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Correct ARIA attributes
- Sufficient contrast
- Reduced-motion support

Carousel:

- Keyboard navigation
- Accessible controls
- Correct labels
- Logical focus behavior

FAQ:

- Semantic buttons
- `aria-expanded`
- Accessible panel relationships

Images:

- Correct alt text
- Decorative images may use empty alt where appropriate

---

# 42. SHOPIFY FUNCTIONALITY MUST NOT BREAK

Preserve existing:

- Cart
- Add to Cart
- Product links
- Variants
- Header
- Mobile menu
- Search
- Wishlist if present
- Existing apps
- Existing integrations
- Footer
- Shopify policies
- Existing theme settings

If styling conflicts with existing functionality:

Preserve functionality first, then adapt styling.

---

# 43. CODE QUALITY

Use:

- Clear naming
- Small reusable functions
- Minimal duplication
- Comments only where useful
- Defensive null checks
- Graceful fallbacks

Do not produce giant monolithic Liquid files if the logic can be separated into sections/snippets/assets.

Do not duplicate product-card markup unnecessarily.

---

# 44. PRODUCT CARD REUSE

Create a reusable product-card snippet where appropriate.

The product-card should be flexible enough to support:

- Standard product card
- Center product
- Depth product
- Rating
- Price
- Add to Cart
- Wishlist

Do not force one rigid markup structure if the different contexts genuinely require different presentation.

Use snippet parameters/variables where useful.

---

# 45. REVIEW / RATING ARCHITECTURE

Create a reusable rating snippet.

Example conceptual structure:

```liquid
{% render 'glayzyr-rating',
  product: product,
  show_count: true
%}
```

The implementation should:

1. Use real review/rating metafields if available.
2. Gracefully fall back to placeholder values when no rating data exists.
3. Keep the data source easy to replace later.

Do not install a review app automatically.

---

# 46. SECTION PORTABILITY TEST

Before considering a section complete, test it conceptually as if it were copied into another Shopify theme.

Ask:

"Would this section still work?"

If NO:

- Remove unnecessary dependencies.
- Isolate CSS.
- Isolate JS.
- Add schema settings.
- Add fallbacks.
- Remove hardcoded handles.
- Remove hardcoded images.
- Remove global assumptions.

---

# 47. HOMEPAGE VISUAL STORY

The final homepage should communicate:

HERO
↓
INTRODUCE SMART GLASSES
↓
CURVED BRAND STATEMENT
↓
CHOOSE YOUR CATEGORY
AI SMART GLASSES | NORMAL GLASSES
↓
CINEMATIC PROMOTIONAL BANNER
↓
PRODUCT DISCOVERY
CENTER PRODUCT + DEPTH PRODUCTS ON BOTH SIDES
↓
PROMOTIONAL STORY
LARGE BANNER
↓
TWO SUPPORTING BANNERS
↓
SOCIAL PROOF
TESTIMONIALS / REVIEWS
↓
QUESTIONS
FAQ
↓
FOOTER

It should feel like one continuous premium experience.

---

# 48. IMPORTANT PRODUCT SHOWCASE VISUAL

The product showcase must communicate depth.

Concept:

          DEPTH
            ↓

  [P3] [P2] [P1] [ MAIN ] [P1] [P2] [P3]

            ↑
       PRODUCT HERO

The main product is always the focus.

Side products create depth and discovery.

On smaller screens, gracefully simplify the number of visible side cards without breaking the concept.

---

# 49. FINAL IMPLEMENTATION CHECKLIST

After implementation, verify:

## Structure

- Hero preserved
- Unwanted old sections removed
- Smart Glasses Intro added
- Curved marquee added
- Category section added
- Large banner added
- Depth product showcase added
- Three-banner area added
- Testimonials added
- FAQ added
- Footer preserved

## Product showcase

- Main product centered
- Depth cards on both sides
- Three depth cards per side on large desktop where space permits
- Ratings visible
- Prices visible
- Product links work
- Add to Cart works
- Collection is configurable
- Fewer products handled gracefully

## Interaction

- Curved marquee works
- Scroll animations work
- Depth animation works
- Previous/next works
- Drag works
- Swipe works
- Keyboard navigation works
- Autoplay works if enabled
- Autoplay pauses appropriately
- Reduced motion works

## Responsive

- 320px
- 360px
- 375px
- 390px
- 414px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Verify:

- No horizontal overflow
- No clipping
- No overlapping
- No broken images
- No unreadable text
- No inaccessible controls

## Shopify

- No Liquid errors
- No JavaScript console errors
- Theme Editor works
- Section settings work
- Multiple section instances work
- Section reload works
- Section unload cleanup works
- Cart works
- Product links work
- Existing integrations remain functional

## Reusability

Every custom section must be:

- Portable
- Independent
- Responsive
- Theme Editor configurable
- Multiple-instance safe
- CSS scoped
- JS scoped
- Product/collection configurable
- Free of hardcoded production content
- Safe to move to another Shopify theme

---

# 50. DEVELOPMENT APPROACH

Do not implement everything blindly in one giant change.

Use this workflow:

### Phase 1 — Audit

Inspect the repository and existing theme architecture.

### Phase 2 — Architecture

Determine:

- Which existing files can be reused
- Which new sections are required
- Which snippets are reusable
- Which assets are required
- Whether GSAP already exists

### Phase 3 — Build

Implement sections individually.

### Phase 4 — Integrate

Add them to the homepage in the required order.

### Phase 5 — Responsive

Test and correct desktop, tablet, and mobile layouts.

### Phase 6 — Interaction

Test:

- Scroll
- Marquee
- Depth carousel
- Swipe
- Drag
- Keyboard
- FAQ

### Phase 7 — Theme Editor

Verify all sections can be configured through Shopify Theme Editor.

### Phase 8 — Cleanup

Remove:

- Duplicate CSS
- Duplicate JS
- Unused code
- Console logs
- Temporary debugging code
- Broken references

### Phase 9 — Final QA

Check the entire homepage for:

- Visual quality
- Functionality
- Responsiveness
- Accessibility
- Performance
- Shopify compatibility
- Reusability

---

# 51. FINAL RULE

Do not think of this only as:

"Build one GLAYZYR homepage."

Think of it as:

"Build a premium reusable Shopify section library, with GLAYZYR as the first theme using it."

Build the reusable architecture first.

Then compose the GLAYZYR homepage from those reusable sections.

Do not wait for final images or copy.

Use clean placeholders now so the real content can be inserted later through Shopify Theme Editor.

Do not ask for every missing asset before starting.

Inspect the repository, make the implementation, test it, and leave the theme in a clean, working state.
