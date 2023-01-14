CREATE TABLE ts_category (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE ats_type (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'ts_category_id' INTEGER  NOT NULL,
	'name' TEXT NOT NULL
);

CREATE TABLE engine_type (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE ts (
	'id' INTEGER  PRIMARY KEY,
	'plate' TEXT NOT NULL,
	'no_grz' INTEGER DEFAULT FALSE,
	'brand' TEXT NOT NULL,
	'model' TEXT NOT NULL,
	'year' INTEGER NOT NULL,
	'vin' TEXT,
	'chassis' TEXT,
	'body' TEXT,
	'ts_category_id' INTEGER NOT NULL,
	'ats_type_id' INTEGER NOT NULL,
	'engine_type_id' INTEGER NOT NULL,
	'odometer' INTEGER NOT NULL,
	'owner_id' INTEGER NOT NULL,
	'ts_doc_id' INTEGER NOT NULL
);

CREATE TABLE owner_type (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE owner (
	'id' INTEGER PRIMARY KEY,
	'first_name' TEXT,
	'second_name' TEXT NOT NULL,
	'midle_name' TEXT,
	'owner_type_id' INTEGER NOT NULL
);

CREATE TABLE ts_doc_type (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE ts_doc (
	'id' INTEGER PRIMARY KEY,
	'ts_doc_type_id' INTEGER NOT NULL,
	'series' TEXT NOT NULL,
	'number' TEXT,
	'issuer' TEXT,
	'date' TEXT --"YYYY-MM-DD"
);
