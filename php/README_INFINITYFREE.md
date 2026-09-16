# 🚀 InfinityFree MySQL & PHP Setup Guide

This folder contains all the files required to run your website's database and backend on **InfinityFree** (Free Web Hosting with MySQL + PHP).

---

## 📁 File Overview

1. **`database.sql`** -> Database schema with `bookings` and `contact_messages` tables.
2. **`config.php`** -> Database connection credentials & PDO configuration.
3. **`booking.php`** -> API endpoint to handle booking form submissions.

---

## 🛠️ Step-by-Step InfinityFree Deployment Instructions

### Step 1: Create a MySQL Database on InfinityFree
1. Log in to your **InfinityFree Control Panel (vPanel)**.
2. Go to **Database** -> **MySQL Databases**.
3. Enter a database name (e.g., `portfolio`) and click **Create Database**.
4. Note down your credentials:
   - **MySQL Hostname** (e.g., `sql100.infinityfree.com`)
   - **MySQL Username** (e.g., `epiz_12345678`)
   - **MySQL Password** (Your InfinityFree account password)
   - **MySQL Database Name** (e.g., `epiz_12345678_portfolio`)

---

### Step 2: Import `database.sql` via phpMyAdmin
1. In InfinityFree vPanel, click **phpMyAdmin** next to your database.
2. Select your database from the left sidebar.
3. Click on the **Import** tab at the top.
4. Click **Choose File** and upload `/php/database.sql`.
5. Click **Go** at the bottom to create the `bookings` table.

---

### Step 3: Configure `config.php`
Open `php/config.php` and update lines 18-21 with your actual InfinityFree MySQL details:

```php
define('DB_HOST', 'sqlXXX.infinityfree.com'); // Your MySQL Hostname
define('DB_USER', 'epiz_XXXXXX');            // Your MySQL Username
define('DB_PASS', 'YOUR_INFINITYFREE_PASS'); // Your Account Password
define('DB_NAME', 'epiz_XXXXXX_portfolio');  // Your Database Name
```

---

### Step 4: Upload to InfinityFree (`htdocs`)
1. In InfinityFree, open **File Manager** or use an FTP client (FileZilla).
2. Open the `htdocs` directory.
3. Upload the built static files (`dist/` or project files) into `htdocs/`.
4. Upload the `php/` directory directly into `htdocs/php/`.

---

### 🟢 Verification
Once uploaded, navigating or sending a booking through the form on your website will submit directly into your **InfinityFree MySQL database** (`bookings` table).
