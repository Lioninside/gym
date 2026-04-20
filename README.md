# Gymapps

Personal gym toolset. Functional, minimal, no fluff.
Built by [Clemens / Lioninside](https://lioninside.com/myprojects/workout-timer-gym-tools-einfache-tools-fuers-training-ohne-app/).

---

## Apps

### Check-in (`checkin.html`)
Tracks training sessions with start/stop timing and optional Google Sheets logging.

- Select training type: Weights or Cardio
- Live timer with pause/resume, recovers after reload
- Auto-stops at 2h (warning at 1:45)
- Summary screen: editable start/end times, mood, last food, comment
- Saves to Google Sheets via Apps Script; falls back to localStorage queue if offline
- **Requires:** set `SHEET_URL` in the script to your Apps Script web app URL

### Timer (`timer.html`)
Countdown timer for sets and holds.

- Duration 0:30–5:00, default 2:45
- Presets: 1:00 · 1:30 · 2:00 · 2:45 · 3:00 · 4:00
- Two identical buttons (A / B) — press to start or restart
- Counts past zero into negative time
- Duration locked while running

### Core Interval (`core_interval.html`)
Guided 3-lap core circuit.

Default program:
1. Ab Wheel Rollout — 40s
2. Leg Curl — 30s
3. Hang from Bar — 30s *(mid-beep at halfway)*
4. Bench Dip — 30s

- 5s count-in before lap 1
- 8s rest between every exercise and between laps
- No rest after the final exercise
- Edit mode: rename exercises, change durations, reorder — saved to localStorage

### Reaction (`reaction.html`)
Random beep trigger for jump training.

- Beeps at random intervals between min and max
- Default: 2–5 seconds
- Adjustable min/max before starting
- Counts total beeps

---

## Setup

No build step. Static HTML files — open directly in a browser or serve from any web server.

```
gymapps/
  index.html          ← start here
  timer.html
  core_interval.html
  reaction.html
  checkin.html
  shared.css
  shared.js
```

### Google Sheets (Check-in only)

1. Create a Google Apps Script web app that accepts POST requests with a JSON body (and GET for session lookup)
2. Set up a Sheet with columns: `rowId`, `date`, `weekday`, `start`, `end`, `duration`, `type`, `mood`, `last_food`, `comment`, `status`, `heartbeat_elapsed`, `created_at`, `updated_at`
3. Deploy the script as a web app (anyone, or your account)
4. In `checkin.html`, replace `'YOUR_APPS_SCRIPT_URL'` with the deployed URL

The app works offline without the URL — sessions are queued in localStorage and retried on next open.

---

## Design

- Mobile-first, max 480px wide
- Fonts: [Syne](https://fonts.google.com/specimen/Syne) (headings/buttons) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (timers/numbers)
- No icons, no scroll, fits Note 9 in portrait
- Wake lock keeps screen on during active use
