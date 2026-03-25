# Full-Stack To-Do App — Django + React + MySQL

## Requirements
- Python 3.10+
- Node.js 18+
- XAMPP (MySQL running)

---

## STEP 1 — Create the Database

1. Open XAMPP Control Panel → Start **MySQL**
2. Go to http://localhost/phpmyadmin
3. Click **New** on the left sidebar
4. Name it `todo_db` → click **Create**

---

## STEP 2 — Backend Setup (Django)

Open a terminal inside the `backend/` folder:

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate it (Windows)
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py makemigrations
python manage.py migrate

# 5. Start the server
python manage.py runserver
```

Django runs at: http://127.0.0.1:8000

> If you get a password error, open backend/backend/settings.py
> and make sure PASSWORD is an empty string: 'PASSWORD': ''

---

## STEP 3 — Frontend Setup (React)

Open a NEW terminal inside the `frontend/` folder:

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

React runs at: http://localhost:5173

---

## API Endpoints (for Postman testing)

| Method | URL                        | Action        |
|--------|----------------------------|---------------|
| GET    | /api/tasks/                | List all      |
| POST   | /api/tasks/                | Create task   |
| GET    | /api/tasks/{id}/           | Get one       |
| PUT    | /api/tasks/{id}/           | Update task   |
| DELETE | /api/tasks/{id}/           | Delete task   |

Sample POST body:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "medium"
}
```
