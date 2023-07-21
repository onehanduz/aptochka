CREATE TABLE drugs(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    spot VARCHAR(10) NOT NULL,
    name VARCHAR(128) NOT NULL,
    company VARCHAR(128),
    price VARCHAR(16) NOT NULL,
    count VARCHAR(8),
    date_to DATE,
    given_price VARCHAR(16),
    companent VARCHAR(255)

);