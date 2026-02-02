# Disaster Relief Management System

A Database Management System Project with Full MERN Stack Integration

## Overview

The Disaster Relief Management System is a full-stack web application designed to streamline relief operations during natural disasters. It enables real-time management of disasters, affected zones, available resources, aid requests, volunteer assignments, and distribution tracking — all with a connected MongoDB database and a transparent audit log system.

This project demonstrates database design principles, backend CRUD operations, frontend integration, and system auditing, making it a complete DBMS mini-project suitable for academic submission and live demo presentation.

## Core DBMS Concepts Implemented

| Concept                | Explanation                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Database Schema Design | Properly normalized MongoDB schema with relations between disasters, resources, zones, volunteers, and requests. |
| Entity Relationships   | 1:N and N:1 relationships modeled using ObjectId references.                                                     |
| CRUD Operations        | Create, Read, Update, Delete — implemented for all entities through RESTful APIs.                                |
| Referential Integrity  | Achieved using Mongoose populate() to link collections and fetch relational data.                                |
| Audit Logging          | Tracks all database operations (Add, Update, Delete) for transparency and accountability.                        |
| Query Optimization     | Indexing through MongoDB references for efficient lookups.                                                       |
| Data Abstraction       | Separation between backend (Node.js API) and frontend (React UI).                                                |
| Scalability            | Uses NoSQL flexibility to handle large datasets and real-time updates.                                           |

## System Architecture

Frontend (React.js) ->Backend API(Node.js + Express)->
Database Layer (MongoDB + Mongoose ODM)

Each layer communicates via HTTP (REST APIs) and JSON, ensuring a clean separation of concerns.

## Tech Stack

| Layer                  | Technology Used               |
| ---------------------- | ----------------------------- |
| Frontend               | React.js, Bootstrap, Axios    |
| Backend                | Node.js, Express.js           |
| Database               | MongoDB with Mongoose ORM     |
| Version Control        | Git & GitHub                  |
| Environment Management | dotenv                        |
| Logging & Auditing     | Custom AuditLog Model         |
| Styling                | React-Bootstrap, Lucide Icons |

## Database Schema

### 1. Disaster

| Field    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| type     | String | Type of disaster (Flood, Earthquake, etc.) |
| location | String | Disaster location                          |
| severity | String | Intensity or scale                         |
| date     | Date   | Date of occurrence                         |

### 2. Zone

| Field       | Type   | Description                       |
| ----------- | ------ | --------------------------------- |
| name        | String | Name of affected zone             |
| description | String | Additional details about the zone |

### 3. Resource

| Field       | Type                 | Description                               |
| ----------- | -------------------- | ----------------------------------------- |
| name        | String               | Resource name (Food Packets, Tents, etc.) |
| quantity    | Number               | Available quantity                        |
| unit        | String               | Unit (kg, liters, boxes)                  |
| zone_id     | ObjectId (ref: Zone) | Linked zone                               |
| category    | String               | Resource type (Food, Medical, etc.)       |
| description | String               | Details about the resource                |

### 4. Volunteer

| Field        | Type                 | Description                         |
| ------------ | -------------------- | ----------------------------------- |
| name         | String               | Volunteer's name                    |
| skills       | [String]             | Multivalued attribute — skills list |
| availability | Boolean              | Availability status                 |
| zone         | ObjectId (ref: Zone) | Assigned zone                       |

### 5. Request

| Field          | Type                                | Description                      |
| -------------- | ----------------------------------- | -------------------------------- |
| disaster       | ObjectId (ref: Disaster)            | Associated disaster              |
| zone           | ObjectId (ref: Zone)                | Requesting zone                  |
| resource       | ObjectId (ref: Resource)            | Requested resource               |
| quantity       | Number                              | Quantity needed                  |
| status         | Enum (Pending, Fulfilled, Rejected) | Current request status           |
| remarks        | String                              | Optional comments                |
| requested_date | Date                                | Auto-generated request timestamp |

### 6. DistributionRecord

| Field                | Type                      | Description                     |
| -------------------- | ------------------------- | ------------------------------- |
| request              | ObjectId (ref: Request)   | Request fulfilled               |
| volunteer            | ObjectId (ref: Volunteer) | Volunteer handling the delivery |
| resource             | ObjectId (ref: Resource)  | Resource distributed            |
| zone                 | ObjectId (ref: Zone)      | Target zone                     |
| quantity_distributed | Number                    | Actual quantity distributed     |
| date                 | Date                      | Date of distribution            |

### 7. AuditLog

| Field          | Type     | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| action         | String   | Action performed (ADD_RESOURCE, UPDATE_ZONE, etc.) |
| collectionName | String   | Collection affected                                |
| recordId       | ObjectId | Record affected                                    |
| oldData        | Object   | Previous state (before update/delete)              |
| newData        | Object   | New state (after create/update)                    |
| performedBy    | String   | Who performed it (default: Admin)                  |
| timestamp      | Date     | Time of action                                     |

## Entity Relationships (ER Summary)

- Zone ↔ Volunteer → One Zone has many Volunteers
- Zone ↔ Resource → One Zone has many Resources
- Disaster ↔ Request → One Disaster can generate multiple Requests
- Request ↔ DistributionRecord → Each Request may lead to one or more Distributions
- Volunteer ↔ DistributionRecord → One Volunteer may handle many Distributions

## Features

### Frontend (React)

- Interactive dashboards using React Bootstrap
- CRUD interfaces for Disasters, Zones, Volunteers, Resources, and Requests
- Dynamic data fetching using Axios
- Real-time updates after every operation
- Integrated Audit Log viewer

### Backend (Express + MongoDB)

- RESTful API routes for each entity
- MongoDB connection with Mongoose models
- Full CRUD support with relational integrity
- Audit logs for every database modification
- Modular and clean route separation

### Database Layer

- Mongoose schema modeling
- References (ref) for cross-collection relationships
- Timestamp tracking for all entities
- Multi-valued attributes (skills in Volunteers)

## CRUD Operations Overview

| Operation | HTTP Method | Description      | Example Endpoint   |
| --------- | ----------- | ---------------- | ------------------ |
| Create    | POST        | Add a new record | /api/resources     |
| Read      | GET         | Fetch data       | /api/requests      |
| Update    | PUT         | Modify a record  | /api/zones/:id     |
| Delete    | DELETE      | Remove a record  | /api/disasters/:id |

## Logic Flow Explanation

1. **Frontend Trigger** – User performs an action (e.g., adds a new resource)
2. **API Request** – React sends a REST API call (POST/PUT/DELETE) via Axios
3. **Backend Handling** – Express route receives request and processes it via Mongoose
4. **Database Operation** – MongoDB performs CRUD operation and returns success/failure
5. **Audit Logging** – Backend automatically records the action in the AuditLog collection
6. **Frontend Update** – UI re-fetches updated data and displays results dynamically

## How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/disaster-relief-management.git
cd disaster-relief-management
2. Setup Backend
bash
cd backend
npm install
Create a .env file:

env
MONGO_URI=mongodb://localhost:27017/disasterDB
PORT=5000
Run the backend:

bash
npm start
3. Setup Frontend
bash
cd ../frontend
npm install
npm start
Frontend will open at: http://localhost:3000

Dependencies
Backend Dependencies
json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "body-parser": "^1.20.2"
}
Frontend Dependencies
json
{
  "react": "^18.2.0",
  "axios": "^1.3.0",
  "react-bootstrap": "^2.7.0",
  "lucide-react": "^0.200.0"
}
## Future Enhancements
    Role-based access (Admin/Volunteer login)
     Cloud-based MongoDB (Atlas)


Contributors
Mihika Manish
Project: Disaster Relief Management System (DBMS Mini Project)
```
