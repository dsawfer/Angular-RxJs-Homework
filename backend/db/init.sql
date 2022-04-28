CREATE DATABASE products;
\c products;

CREATE SCHEMA products;

CREATE TABLE IF NOT EXISTS product_entity (
id BIGSERIAL PRIMARY KEY,
title VARCHAR,
price INTEGER,
image VARCHAR
);