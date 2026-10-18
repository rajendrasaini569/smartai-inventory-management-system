# SmartAI Inventory — Full Stack Edition

## Stack
- Frontend: React 18, Vite, Tailwind CSS v4, Recharts
- Backend: Java 17, Spring Boot 3.4, Spring Data JPA
- Database: MySQL 8+

## 1. Configure MySQL
Start MySQL, then run `backend/schema.sql` in MySQL Workbench. Default database name is `smartai_inventory`.

If your MySQL username/password differ from `root` and blank password, set environment variables before running Spring Boot:
- Windows PowerShell: `$env:DB_USERNAME="root"` and `$env:DB_PASSWORD="your_password"`
- Optional URL: `$env:DB_URL="jdbc:mysql://localhost:3306/smartai_inventory?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"`

## 2. Run backend
Install JDK 17+ and Maven 3.9+. In VS Code, open a terminal in the `backend` folder:
```powershell
mvn spring-boot:run
```
API health check: `http://localhost:8080/api/health`
On first start, tables are created and sample products/suppliers/customers are inserted.

## 3. Run frontend
Open a second terminal in `smartai-inventory`:
```powershell
npm install
npm run dev
```
Open the URL Vite prints, usually `http://localhost:5173`. Frontend API URL defaults to `http://localhost:8080/api`. To override, copy `.env.example` to `.env` and update `VITE_API_BASE_URL`. Restart Vite after changing `.env`.

## Connected features
- Product list, create, edit and delete persisted in MySQL
- Sale transaction validates stock and decreases inventory atomically
- Purchase transaction increases inventory
- Suppliers and customers stored in MySQL
- Customer reminder preferences persisted by email
- Low-stock notification API endpoint
- Responsive dashboard and charts from database-loaded data

## API endpoints
- `GET /api/health`
- `GET/POST /api/products`, `PUT/DELETE /api/products/{id}`
- `GET/POST /api/suppliers`
- `GET /api/customers`
- `GET/POST /api/sales`
- `GET/POST /api/purchases`
- `GET/POST /api/reminders?email=...`
- `GET /api/notifications?email=...`

## Important notes
- This is a learning/demo application. It does not include production authentication/roles, payment processing, or an external email/SMS provider. Reminder preferences are saved, and low-stock notifications are available through the API, but scheduled email/SMS/push delivery requires a provider and scheduler.
- Configure database credentials securely; do not commit production passwords.
- For production, add authentication/authorization, stricter validation, migrations, logging, rate limiting and tests.
