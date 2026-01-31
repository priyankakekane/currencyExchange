# 💸 Currency Exchange Dashboard

A robust, React-based internal tool for managing and authorizing currency exchange transactions. This dashboard provides a secure, three-step flow: Quote Generation, Review/Confirmation, and Real-time Status Tracking.

## 🚀 Features

- **Real-time Quotes:** Fetches live exchange rates with a 30-second expiry timer.
- **State Management:** Built with the React Context API and `useReducer` for predictable state transitions (Redux-lite pattern).
- **Polling Engine:** Automatically tracks transaction status from `Processing` to `Settled` using a custom interval hook.
- **Responsive UI:** Optimized for desktop and tablet use by staff in the field.

## 🛠️ Tech Stack

- **Frontend:** React (Hooks, Context, useReducer)
- **Styling:** CSS-in-JS (Standard Styles Object pattern)
- **API:** Mock API layer with simulated latency and status updates
- **Deployment:** GitHub Pages

---

## 🏗️ Getting Started

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 2. Installation

```bash
# Clone the repository
git clone repo

# Navigate into the project
cd project-name

# Install dependencies
npm install

# Run Locally
npm start
```
