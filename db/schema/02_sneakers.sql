-- Drop and recreates sneakers table

DROP TABLE IF EXISTS sneakers CASCADE;
CREATE TABLE sneakers (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  brand TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  size SMALLINT NOT NULL DEFAULT 0,
  model_year INTEGER NOT NULL DEFAULT 0,
  thumbnail_photo_url TEXT NOT NULL,
  main_photo_url TEXT NOT NULL,

  date_posted DATE NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,

  sold BOOLEAN NOT NULL DEFAULT FALSE
);
