# KezadLayout Backend Application
This application is a Node.js-based backend service for managing KezadLayout entries. It uses Sequelize as an ORM to interact with the database and UUIDs to uniquely identify each KezadLayout entry.

## Features

- **Create a KezadLayout entry**: Each KezadLayout entry contains a unique ScreenName and an ActiveLayout.
- **Retrieve KezadLayout entries**: You can list all KezadLayout entries or get a specific entry by its ScreenName.
- **Update KezadLayout entries**: Update the ActiveLayout for a specific ScreenName.
- **Delete KezadLayout entries**: Delete a KezadLayout entry from the system.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building APIs.
- **Sequelize**: ORM for database management.
- **UUID**: For generating unique identifiers for each KezadLayout entry.
- **Postman**: For testing the API.
- **MySQL or PostgreSQL**: Database systems (can be configured in Sequelize).

## Prerequisites

- Node.js installed on your machine.
- A MySQL/PostgreSQL database setup and configured with Sequelize.
- A `.env` file with the following variables configured:

   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_DIALECT=mysql_or_postgres
   ```

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/kezadlayout-backend-app.git
    cd kezadlayout-backend-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:5001`.

## API Endpoints

### 1. Create a KezadLayout Entry

- **Endpoint**: `POST /kezadlayout`
- **Body**:
   - `ScreenName` (Text): The unique screen name.
   - `ActiveLayout` (Text): The active layout for the screen.
- **Response**: Returns the created KezadLayout entry.

Example using Postman:

1. Set method to `POST`.
2. Use `raw` JSON in the body:
    ```json
    {
       "ScreenName": "WaveScreen",
       "ActiveLayout": "Layout1"
    }
    ```

### 2. Retrieve All KezadLayout Entries

- **Endpoint**: `GET /kezadlayout`
- **Response**: Returns a list of all KezadLayout entries.

### 3. Retrieve a Specific KezadLayout Entry

- **Endpoint**: `GET /kezadlayout/:screenName`
- **Parameters**: `screenName` (Text) - The screen name of the KezadLayout entry.
- **Response**: Returns the details of the specified KezadLayout entry.

### 4. Update a KezadLayout Entry

- **Endpoint**: `PUT /kezadlayout/:screenName`
- **Parameters**: `screenName` (Text) - The screen name of the KezadLayout entry.
- **Body**:
   - `ActiveLayout` (Text): The updated active layout.
- **Response**: Returns the updated KezadLayout entry.

Example using Postman:

1. Set method to `PUT`.
2. Use `raw` JSON in the body:
    ```json
    {
       "ActiveLayout": "UpdatedLayout"
    }
    ```

### 5. Delete a KezadLayout Entry

- **Endpoint**: `DELETE /kezadlayout/:screenName`
- **Parameters**: `screenName` (Text) - The screen name of the KezadLayout entry.
- **Response**: Deletes the specified KezadLayout entry.

## Error Handling

- **Unique ScreenName Constraint**: If a ScreenName already exists in the database, the server will return a `400 Bad Request` with an error message.

## Directory Structure

```bash
.
├── db.js                  # Sequelize ORM setup
├── server.js              # Main application server
├── models/                # Sequelize models (e.g., KezadLayout model)
├── migrations/            # Sequelize migration files
├── seeders/               # Sequelize seed files
├── README.md              # Documentation for the app
└── .env                   # Environment configuration file
```

## Testing

You can test the API using tools like Postman or curl. Make sure to use `raw` JSON for the `POST` and `PUT` requests.

---

## Important Notes:

- **Do not manually delete or modify entries in the database**. Entries are managed automatically by the system.
