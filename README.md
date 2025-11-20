# productivity-dashboard
A dashboard that includes a to-do list, pomodoro timer, habit tracker, and local-storage persistence. 

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
