<div align="center">

# Dilshan Trading

**Polythene bags, made simple.**

A clean, animated, one-page website for a polythene PP bag supplier based in
Khandwa, Madhya Pradesh.

[Products](#-what-we-supply) · [Delivery](#-where-we-deliver) · [Contact](#-get-in-touch)

</div>

---

## ✨ What this is

A small, self-contained marketing site for **Dilshan Trading** — a seller and
manufacturer of polythene PP bags operating out of Khandwa, Madhya Pradesh.

The site does four simple things, and it does them well:

1. **Introduces the business** in one clear screen.
2. **Shows the three bag sizes** on offer, each linking directly to WhatsApp.
3. **Lists the delivery towns** across Madhya Pradesh and beyond.
4. **Gets the visitor on a call or a chat** as quickly as possible.

No build tools. No frameworks. No dependencies to install. Three files, and
you're live.

---

## 🎨 The design

The theme is deliberately **quiet and confident** — it looks like a real local
business, not a template.

### Two colors, that's it

| Role | Name | Value |
| :--- | :--- | :--- |
| Background | **White** | `#ffffff` |
| Accent | **Coral** | `#ff7355` |

Everything else is a variation on those two:

| Role | Name | Value |
| :--- | :--- | :--- |
| Accent deep (hover, emphasis) | Coral deep | `#e84b2c` |
| Accent soft (borders, chips) | Coral soft | `#ffe7de` |
| Accent tint (hover fills) | Coral tint | `#fff3ee` |
| Main text | Ink | `#1d1a17` |
| Body text | Ink 2 | `#3d3833` |
| Muted text | Muted | `#7a726a` |
| Faint text | Faint | `#aaa29a` |

No gradients. No shadows-as-decoration. No extra hues. Just **white and coral**,
carried through every element on the page.

### Type

- **Quicksand** — headings. Rounded, geometric, friendly.
- **Nunito** — body text. Warm, readable, human.

Together they give the site its "cute but professional" personality. Not
childish. Not corporate. Just approachable.

### Shapes

Everything is **soft and rounded**:

- Buttons are full pills.
- Cards use 32px corners.
- The mobile menu floats as a rounded panel.
- The contact section is one large coral block with 40px corners.

Nothing is sharp. Nothing feels like a default bootstrap component.

---

## 🎬 Motion

The site is animated — but gently. Every motion has a reason.

| Where | What happens |
| :--- | :--- |
| **Hero headline** | Words rise one at a time from below a clip mask |
| **Wavy underline** | Draws itself under the word *"simple."* on load |
| **Nav links** | A repeating coral wave sweeps in on hover |
| **Buttons** | Lift 2px with a soft shadow bloom |
| **Cards** | Lift 6px, tint to coral, and rotate their number badge |
| **Delivery chips** | Bounce up on hover and fill with coral |
| **Counters** | Count from `0` up to their target when scrolled into view |
| **Section reveals** | Fade up 22px with a soft ease |
| **Back-to-top** | Fades in after 460px and lifts on hover |

Everything uses the same easing family:

```css
--ease:        cubic-bezier(0.22, 1, 0.36, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);