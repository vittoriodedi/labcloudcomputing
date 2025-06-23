This repository contains my final project for the “Cloud Computing Lab” course.

## Overview

In the assignment is required to containerize a WebGL application. The project demonstrates the deployment of a Unity WebGL app with secure authentication, database persistence, and a reverse proxy, all orchestrated via Docker Compose.

## Contents

- `app/` – Contains the Unity WebGL application, including:
    - `index.html` – Main entry point for the WebGL app.
    - `Build/` – Unity build files.
    - `TemplateData/` – Unity template data.

- `auth_portal_app/` – Node.js/Express authentication portal:
    - `public/index.html` – Login page.
    - `server.js` – Express server handling authentication and session logic.
    - `package.json` – Node.js dependencies.
    - `Dockerfile` – Containerization instructions for the auth portal.

- `secrets/` – Secure storage for sensitive data:
    - `db_root_password.txt` – MySQL root password (managed via Docker secrets).

- `nginx-reverse-proxy.conf` – Nginx configuration for reverse proxy and route protection.
- `docker-compose.yml` – Orchestrates all services and volumes.
- `.env` – Environment variables for service configuration.
- `README.md` – Project documentation.

## Project Description

The infrastructure is composed of four main services:

- **WebGL Application** – Served via Apache in a dedicated container.
- **MySQL Database** – Stores user credentials and application data.
- **Nginx Reverse Proxy** – Routes and protects access to the application, exposing only necessary ports.
- **Authentication Portal** – Node.js/Express service for user login and session management.

Key features include:

- **Persistent storage** for all containers using Docker volumes.
- **Environment variables** for flexible configuration.
- **Docker secrets** for secure management of sensitive data (e.g., database root password).
- **Minimal port exposure**: only the reverse proxy is accessible externally.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vittoriodedi/labcloudcomputing
   cd labcloudcomputing
   ```

2. **Configure environment variables**
   Edit `.env` to set the database name, user, and user password.

3. **Set the MySQL root password**
   Place your desired password in `secrets/db_root_password.txt`.

4. **Start all services (for the first time)**
   ```bash
   docker-compose up --build
   ```
   or 
   **Start all services in background (from the second time)**
    ```bash
   docker-compose up -d
   ```  

5. **Access the application**
   - Authentication portal: [http://localhost/auth/](http://localhost/auth/)
   - Protected WebGL App: [http://localhost/app/](http://localhost/app/)

8. **Test Login**
  A test user is created at startup:
    - **Username:** `testuser`
    - **Password:** `testpassword`

7. **Stop all services**
   ```bash
   docker-compose down
   ```