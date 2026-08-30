---
name: Industrial Luxe
colors:
  surface: '#0b141c'
  surface-dim: '#0b141c'
  surface-bright: '#313a43'
  surface-container-lowest: '#060f17'
  surface-container-low: '#131d24'
  surface-container: '#172129'
  surface-container-high: '#212b33'
  surface-container-highest: '#2c363e'
  on-surface: '#dae4ef'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#dae4ef'
  inverse-on-surface: '#28313a'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#1a1a1a'
  on-primary-container: '#848282'
  inverse-primary: '#5f5e5e'
  secondary: '#e4c27d'
  on-secondary: '#402d00'
  secondary-container: '#5d450c'
  on-secondary-container: '#d5b471'
  tertiary: '#cec6b0'
  on-tertiary: '#353021'
  tertiary-container: '#1e1a0c'
  on-tertiary-container: '#89826f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#e4c27d'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5a4309'
  tertiary-fixed: '#ebe2cb'
  tertiary-fixed-dim: '#cec6b0'
  on-tertiary-fixed: '#1f1b0d'
  on-tertiary-fixed-variant: '#4c4736'
  background: '#0b141c'
  on-background: '#dae4ef'
  surface-variant: '#2c363e'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.2em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  button-text:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 60px
  section-padding-lg: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system establishes a premium "Industrial-Luxury" aesthetic, merging the rugged durability of metal engineering with the refined elegance of high-end lifestyle products. The personality is **Confident, Precise, and Minimalist**, designed to evoke trust through technical mastery and desire through sophisticated presentation.

The visual style is **Corporate / Modern with High-Contrast accents**. It utilizes a "photography-led" approach, where generous whitespace and dark-to-light transitions allow high-resolution product imagery to act as the primary narrative driver. The interface feels intentional and engineered, mirroring the precision of foldable metal gear.

**Key Stylistic Principles:**
- **Cinematic Contrast:** Alternating between deep Charcoal Black hero sections and airy Ivory/Beige content areas to create a rhythmic scrolling experience.
- **Precision Detailing:** 1px borders and generous letter-spacing reflect the brand’s focus on "Precision in Every Detail."
- **Professional Tone:** Copy should be succinct and authoritative, using short, impactful statements.

## Colors

The palette is anchored by high-contrast neutrals and a signature metallic accent.

- **Charcoal Black (#1A1A1A):** Used for primary backgrounds in hero sections, headers, and all primary body text on light backgrounds. It represents strength and stability.
- **Champagne Gold (#C6A664):** The exclusive accent color. Reserved for Call to Action (CTA) buttons, price points, icons, and critical highlights. This provides the "luxury" contrast against the industrial base.
- **Ivory White (#F5F5F5):** The primary background for content-heavy sections. It provides a clean, modern canvas that makes product colors pop.
- **Steel Gray (#7D8791):** Utilized for secondary information, dividers, and subtle 1px borders. It serves as the bridge between the dark and light tones.
- **Sand Beige (#E8DFC8):** An alternate background color for cards or secondary content blocks to add warmth and environmental context (outdoor/nature).

## Typography

The typography system pairs the geometric, confident weight of **Montserrat** for headings with the high legibility and technical neutrality of **Inter** for body copy.

- **Headings:** Use Montserrat for all brand-level communication. Larger sizes should have slightly tighter letter-spacing, while uppercase labels require generous tracking (0.2em) to maintain a premium feel.
- **Body:** Inter is used for all descriptive text, specifications, and UI elements. It ensures clarity in data-heavy industrial specs.
- **Price Points:** Render prices in Montserrat SemiBold to align them with the brand's premium stature.
- **Hierarchy:** Maintain a clear distinction between the "Industrial" labels (uppercase Montserrat) and "Informational" body (Inter).

## Layout & Spacing

The layout follows a **fluid grid system** with fixed maximum widths for desktop to maintain optimal line lengths and visual balance.

- **Rhythm:** A base-8 spacing scale is used. Generous vertical padding (`section-padding-lg`) is encouraged between major blocks to create a sense of "Gallery" luxury.
- **Grid:** Use a 12-column grid for desktop and a 2-column or single-column stack for mobile.
- **Mobile-First:** Prioritize verticality. On mobile, margins are reduced to 20px, but internal component padding remains breathable to accommodate touch targets for professional users in the field.
- **Content Reflow:** Product grids should transition from 4 columns (desktop) to 2 columns (tablet) to 1 column (mobile), ensuring product photography remains the focal point at all sizes.

## Elevation & Depth

This design system uses a **Tonal Layering** approach combined with **Ambient Shadows** to create a sophisticated, tactile feel.

- **Layering:** Components on light backgrounds (`Ivory White`) use a stacked approach. The background is the base, and cards sit slightly above it.
- **Shadows:** Use extremely soft, diffused shadows with low opacity (e.g., `box-shadow: 0 10px 30px rgba(0,0,0,0.05)`). This avoids a "heavy" look while providing enough depth to signify interactivity.
- **Borders:** A 1px `Steel Gray` border is the primary method for defining card boundaries and input fields, reinforcing the "precision engineered" concept.
- **Interactivity:** On hover, cards may increase their shadow slightly or exhibit a subtle 1px internal border in Champagne Gold.

## Shapes

The shape language is **Refined Geometric**. While the brand is industrial, pure sharp corners are avoided to maintain a "B2C Luxury" feel.

- **Standard Radius:** 8px (0.5rem) is the default for buttons, cards, and input fields.
- **Large Radius:** 16px (1rem) for larger containers or imagery blocks to soften the overall interface.
- **Icons:** Icons should feature consistent stroke weights (1.5px or 2px) with slightly rounded terminals to match the font characteristics of Montserrat.

## Components

### Buttons
- **Primary:** Solid `Champagne Gold` fill with `Charcoal Black` text. All-caps Montserrat. No shadow, or a very tight 2px shadow.
- **Secondary/Ghost:** 1px `Champagne Gold` border with Gold text. Used for less urgent actions or against dark backgrounds.
- **Tertiary:** Underlined text link in Montserrat with an arrow icon for "Learn More" or "View Specs."

### Cards
- Background: `Ivory White` or `Sand Beige`.
- Border: 1px `Steel Gray`.
- Corner Radius: 8px to 12px.
- Imagery: Should fill the top 60% of the card, using a neutral studio background.

### Input Fields
- 1px `Steel Gray` border.
- `Inter` body text.
- Focus State: Border transitions to `Champagne Gold`.

### Chips & Status Labels
- Small, uppercase Montserrat.
- Backgrounds should be low-saturation (Steel Gray) to avoid distracting from the Gold CTAs.

### Product Detail Components
- **Spec Lists:** Use clear `Steel Gray` dividers between rows.
- **Price Display:** Larger font size in `Champagne Gold`.
- **Foldable Indicators:** Specific icons for "Storage Height" and "Folded Depth" to emphasize the technical nature of the gear.