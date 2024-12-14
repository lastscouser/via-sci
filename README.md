# Omics Data Retrieval and Analysis System

This project enables users to retrieve specific gene expression data, analyze it, detect anomalies, and visualize results using dynamic charts.

## **Features**
- Backend API for data retrieval, analysis, and anomaly detection.
- Frontend for data submission, result visualization, and dynamic chart selection.
- Dockerized services for easy deployment.

---

## **Prerequisites**
1. Install **Docker** and **Docker Compose**.
   - [Docker Installation Guide](https://docs.docker.com/get-docker/)
   - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

---

## **Setup and Run**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/lastscouser/via-sci.git
cd via-sci
```

### **Step 2: Configure Docker**
Ensure the following structure in your project:
```
.
├── api/                # Backend folder
├── ui/                 # Frontend folder
├── docker-compose.yml  # Docker Compose file
├── nginx.conf          # Nginx configuration for reverse proxy
```

### **Step 3: Build and Run the Services**
Run the following command to build and start the services:
```bash
docker-compose up --build
```

- **Backend**: Runs at `http://x.xyz.com` (Replace `x.xyz.com` with your server configuration or `http://localhost:3001` for local testing).
- **Frontend**: Runs at `http://y.xyz.com` (Replace `y.xyz.com` with your server configuration or `http://localhost:3000` for local testing).

---

## **Backend (API)**
The backend is built with Node.js, Express, and SQLite. It exposes the following API endpoints:

### **Endpoints**
| Endpoint                     | Method | Description                                           |
|------------------------------|--------|-------------------------------------------------------|
| `/api/genes`                 | POST   | Retrieve gene expression data for given gene IDs.    |
| `/api/genes/analysis/:geneID`| GET    | Analyze a specific gene's expression values.         |
| `/api/genes/anomalies/:geneID`| GET   | Detect outliers in a specific gene's expression data.|

### **Manual Run (Without Docker)**
1. Navigate to the backend directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend:
   ```bash
   npm run dev
   ```
4. The API will be available at `http://localhost:3001`.

---

## **Frontend (UI)**
The frontend is built with React.js, Vite, and Ant Design.

### **Features**
- Dynamic chart selection: Box Plot, Scatter Plot with Box, and Strip Plot.
- Display analysis and anomaly detection results.
- User-friendly interface with Ant Design components.

### **Manual Run (Without Docker)**
1. Navigate to the frontend directory:
   ```bash
   cd ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. The application will be available at `http://localhost:3000`.

---

## **Accessing the Application**
1. Open the frontend at [http://localhost:3000](http://localhost:3000).
2. Submit gene IDs to fetch data.
3. View analysis, detect anomalies, and visualize results with dynamic charts.

---

## **Stopping Services**
To stop the running containers, execute:
```bash
docker-compose down
```

---

## **Troubleshooting**
- **Frontend Not Updating**: Rebuild the frontend container:
  ```bash
  docker-compose build frontend
  ```
- **Outdated Backend Changes**: Rebuild the backend container:
  ```bash
  docker-compose build api
  ```
- **Logs**:
  - Backend: `docker logs <backend-container-name>`
  - Frontend: `docker logs <frontend-container-name>`

---

## **Adding /etc/hosts Entries**
To access the backend and frontend using custom domain names, configure your `/etc/hosts` file as follows:

### **Step 1: Open the /etc/hosts File**
- **On Linux/macOS**:
  ```bash
  sudo nano /etc/hosts
  ```
- **On Windows**:
  Open `C:\\Windows\\System32\\drivers\\etc\\hosts` in a text editor with administrative privileges.

### **Step 2: Add the Following Entries**
```plaintext
127.0.0.1   x.xyz.com
127.0.0.1   y.xyz.com
```

- Replace `127.0.0.1` with your server's IP address if you're not running locally.
- Replace `x.xyz.com` and `y.xyz.com` with your configured domain names.

### **Step 3: Save and Exit**
- Save the changes and exit the editor.

### **Step 4: Verify Configuration**
Run the following commands to ensure the domains resolve correctly:
```bash
ping x.xyz.com
ping y.xyz.com
```

If successful, the domains should resolve to the configured IP address.

---

## **License**
This project is licensed under the MIT License.

---
