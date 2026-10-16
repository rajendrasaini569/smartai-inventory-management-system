# SmartAI Inventory Management System — Frontend

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally
1. Extract the ZIP.
2. Open the `smartai-inventory` folder in VS Code.
3. Open the terminal in that folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Included screens
- Dashboard with KPI cards, charts, low-stock alerts, and recent sales
- Products: search, category/stock filters, add/edit/delete, CSV export
- Stock Management
- Categories
- Sales: add a sale and automatically decrease product stock
- Purchases: add a purchase and automatically increase product stock
- Suppliers: add suppliers
- Customers
- Customer Hub: customer/seller value proposition, daily/weekly/monthly reminder preferences, low-stock alerts and notification preview
- AI Forecasting: rule-based demo recommendations
- Reports with charts and CSV export
- Settings

## Important demo notes
- This is a frontend-only project using sample data.
- React state changes reset when the page is refreshed.
- AI recommendations are illustrative, rule-based demo insights, not a trained AI model.
- Customer reminder settings and notification cards are frontend demos only; no real email, SMS, push notification, or scheduled reminder is sent.
- No login security, database, real payment, or backend API is connected yet.
- Later, connect a backend and database for persistent data.

## Tech stack
React + Vite + Tailwind CSS v4 + Recharts + Lucide React

## New concept: SmartAI Connect
- **Customer benefits:** optional daily/weekly/monthly reminders, low-stock item alerts, faster repeat purchases, and relevant opt-in offers.
- **Seller benefits:** repeat-customer engagement, clearer demand signals, stock planning, reduced overstock/waste, and customer loyalty.
- **Centralized experience:** customer-facing preferences and seller-facing inventory insights live in the same demo workspace.
- **For production:** add customer accounts, purchase-history consent, backend scheduling, notification provider, unsubscribe controls, and database persistence. Do not send notifications without customer opt-in.
