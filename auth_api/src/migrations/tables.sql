CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    usersToken (
        token_id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );