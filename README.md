# Client Lead Management System (Mini CRM)

A full-stack Mini CRM application designed to help businesses manage incoming leads from their website. This system allows capturing leads via a public form and provides a secure admin dashboard to track, update, and manage those leads.

## 🚀 Features

*   **Public Lead Form:** A customer-facing form to capture Name, Email, and Messages.
*   **Admin Dashboard:** A centralized view to see all incoming leads.
*   **Status Tracking:** Update lead status (New, Contacted, Converted, Lost) with a simple dropdown.
*   **Notes Management:** View messages and notes associated with each lead.
*   **Visual Statistics:** Quick overview of total leads, new leads, and conversions.
*   **Responsive Design:** Modern, glassmorphism-inspired UI that works on desktop and mobile.

## 🛠️ Tech Stack

*   **Frontend:** React (Vite), Axios, Lucide React (Icons), CSS3 (Glassmorphism).
*   **Backend:** Node.js, Express.js.
*   **Database:** MySQL with Sequelize ORM.

## 📦 Prerequisites

*   Node.js (v14+ recommended)
*   MySQL Server installed and running locally.

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/LSRINIKETHREDDY/FUTURE_FS_02.git
    cd FUTURE_FS_02
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` directory with your MySQL credentials:
        ```env
        PORT=5000
        DB_HOST=localhost
        DB_USER=root
        DB_PASS=your_password  # Replace with your MySQL password
        DB_NAME=minicrm
        DB_PORT=3306
        ```
    *   Start the backend server (this will automatically create the database and tables):
        ```bash
        npm run dev
        ```

3.  **Frontend Setup**
    *   Open a new terminal.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the Application**
    *   **Public Form:** `http://localhost:5173/`
    *   **Admin Dashboard:** `http://localhost:5173/admin`

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/leads` | Fetch all leads. |
| `POST` | `/api/leads` | Create a new lead (Public Form). |
| `PUT` | `/api/leads/:id` | Update lead status or notes. |
| `DELETE` | `/api/leads/:id` | Delete a lead. |

## 🛡️ Project Structure

```
FUTURE_FS_02/
├── backend/            # Express Server & API/
│   ├── config/         # Database configuration
│   ├── models/         # Sequelize Models
│   ├── routes/         # API Routes
│   └── server.js       # Entry point
│
└── frontend/           # React Application/
    ├── src/
    │   ├── components/ # Reusable components (LeadCard)
    │   ├── pages/      # Page views (Dashboard, PublicForm)
    │   └── App.jsx     # Routing
```