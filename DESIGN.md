# Gymapps — Design Reference

## Colors

| Token       | Value     | Usage                        |
|-------------|-----------|------------------------------|
| `--bg`      | `#0f0f14` | Page background              |
| `--surface` | `#1a1a22` | Cards, inputs, buttons       |
| `--border`  | `#2e2e3c` | Borders, dividers            |
| `--text`    | `#f2f2f5` | Primary text                 |
| `--muted`   | `#8888a0` | Labels, secondary text       |
| `--green`   | `#198754` | Success, check-in actions    |
| `--blue`    | `#0d6efd` | Primary actions              |
| `--red`     | `#dc3545` | Danger, discard              |
| `--amber`   | `#ffc107` | Warnings, overtime state     |
| `--violet`  | `#6c63f5` | Core interval accent         |
| `--pink`    | `#e91e8c` | Core interval primary        |

## Typography

Two typefaces: **Inter** (all UI text, inherits from `body`) and **DM Mono** (numbers, times, code — applied explicitly where needed).

### UI scale

| Name    | Size      | Usage                              |
|---------|-----------|------------------------------------|
| title   | `2rem`    | Page title (index)                 |
| heading | `1.6rem`  | Section headings, phase names      |
| sub     | `1.3rem`  | Sub-headings, exercise names       |
| large   | `1.1rem`  | Nav items, prominent labels        |
| body    | `1rem`    | Buttons, body text (base: `17px`)  |
| small   | `0.88rem` | Secondary text, hints              |
| label   | `0.8rem`  | Uppercase labels, metadata         |
| micro   | `0.7rem`  | Badges, tiny captions              |

### Display scale (DM Mono, timers only)

`6rem` · `5rem` · `2.8rem` · `2.4rem` · `2.2rem`

## Spacing

Base unit: `8px`. Common values: `4 6 8 10 12 14 16 20 24px`.

## Components

### Buttons

Full-width by default, `10px` radius, `14px` vertical padding.

| Class           | Color             |
|-----------------|-------------------|
| `.btn-primary`  | Blue              |
| `.btn-success`  | Green             |
| `.btn-danger`   | Red               |
| `.btn-warning`  | Amber             |
| `.btn-secondary`| Surface + border  |
| `.btn-pink`     | `#c2185b` (core interval only) |
| `.btn-sm`       | Smaller variant, auto width |

### Labels

`.label` — `0.8rem`, `600`, uppercase, `0.06em` letter-spacing, `--muted` color.

### Inputs

`input[type=text]`, `input[type=time]`, `textarea` — styled via `shared.css`. Focus state: `--blue` border.

### Range sliders

`6px` track, `22px` thumb. Reaction page overrides to `34px` thumb for larger touch targets.

## Layout

- All pages: `height: 100dvh`, flex column, `16px` padding, `overflow: hidden`
- Max content width: `480px`, centered
- Viewport: `100dvh` (dynamic — accounts for mobile browser chrome)

## Pages

| File                 | Description                        |
|----------------------|------------------------------------|
| `index.html`         | Home / navigation                  |
| `checkin.html`       | Gym session tracker + Sheets sync  |
| `timer.html`         | Dual A/B countdown timers          |
| `core_interval.html` | Guided 3-lap core circuit          |
| `reaction.html`      | Random beep interval trainer       |

Shared utilities: `shared.css` (tokens, components), `shared.js` (WakeLock, LiveTimer, beep, formatTime, todayKey).
