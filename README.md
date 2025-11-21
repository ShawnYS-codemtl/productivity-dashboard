# productivity-dashboard
A dashboard that includes a to-do list, pomodoro timer, habit tracker, calendar, event scheduling and local-storage persistence.

![Dashboard](./assets/productivity-dashboard.png)


Tech focus: HTML/CSS/JS DOM manipulation LocalStorage Modular JS (ES modules)

## Todo List Module
### An interactive task manager that allows users to add, edit, delete, mark complete, reorder, and filter tasks. Features persistent storage with LocalStorage, inline editing, drag-and-drop reordering, and a responsive, clean UI.

- Dynamic DOM manipulation: add, edit, delete, complete tasks

- State management with an array of todo objects

- Persistence using LocalStorage

- Keyboard interactions: add tasks via Enter, inline edit with Enter/blur

- Filtering: All / Active / Completed tasks

- Drag-and-drop to reorder tasks, keeping state in sync

- Responsive layout using Flexbox for numbers, checkboxes, text, and delete buttons

- Clean, modular code avoiding innerHTML, ensuring maintainability

## Pomodoro Timer Module

### A customizable Pomodoro timer with focus and break modes, featuring a circular progress ring, editable durations, and sound alerts. Designed to help users manage time efficiently while providing a clean, interactive interface.

- Built a countdown timer using JavaScript setInterval and modular functions.

- Learned to pause, reset, and switch modes dynamically.

- Implemented mode-based durations (Pomodoro, Short Break, Long Break).

- Linked SVG circular progress ring to timer state using stroke-dasharray and stroke-dashoffset.

- Applied dynamic gradients for different modes and learned how to switch SVG gradients via JS.

- Added user interactivity:

    - Double-click to edit timer duration inline.

    - Click buttons to switch modes.

- Enhanced UX with visual and audio cues:

    - Smooth ring animation reflects remaining time.

    - Sound alert triggers when timer reaches 0.

- Learned to handle DOM manipulation, events, and accessibility with aria-live and focus handling.

- Practiced state management for timer variables (duration, timeLeft, intervalId) and UI synchronization.

## Habit Tracker Module

### A recurring habit tracker that helps users build consistency by tracking daily completion and streaks. Features include automatic daily resets, progress visualization, editable habits, and persistent storage, providing a more advanced state management experience than a standard to-do list.

- Implemented daily completion tracking for recurring habits.

- Learned to manage streaks and visual indicators for user progress over time.

- Built a daily reset system that updates habit states while preserving streaks.

- Practiced handling more complex item state (name + completedToday + streak/history).

- Gained experience with dynamic UI updates for recurring tasks, separate from one-off tasks.

- Reinforced data persistence strategies for recurring data, including selectively resetting parts of stored objects.

## Calendar / Event Scheduler Module
### A dynamic monthly calendar that displays events, allows adding, editing, and deleting events, and provides an interactive mini-popup view for daily events.

- DOM Manipulation & Dynamic Rendering – created calendar grid, weekday headers, and dynamically positioned elements for event dots and popups.

- Event Handling – managed multiple click events on calendar cells, buttons, and popups, including stopping propagation for nested elements.

- Date Handling & Filtering – parsed and normalized dates to handle timezones correctly, filtered events for “upcoming only,” and sorted events chronologically.

- Form Management – implemented add/edit forms with prefilled data, reset functionality, and inline validation.

- Mini Popup UI – designed a dynamic, position-aware popup that lists daily events and links to event details.

- Draggable UI Elements – implemented draggable event form to improve usability on smaller screens.

- Visual Cues & Indicators – added event dots on calendar days, highlighted the current day, and used active states for selected dates.

- LocalStorage Persistence – stored events and reflected changes in the UI consistently.

## Additional Insights:

- Learned to handle conflicts between absolute positioning, transforms, and draggable elements.

- Improved user experience with responsive popups and subtle visual indicators.

## Setup & Run as Desktop App (Electron)
1. Install Node.js
2. Clone the repository

     - git clone https://github.com/ShawnYS-codemtl/productivity-dashboard.git

     - cd your-dashboard-repo

3. Install dependencies

   - npm install

4. Run the app

   - npm start
