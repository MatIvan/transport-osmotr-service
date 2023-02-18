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
	'no_grz' INTEGER DEFAULT TRUE,
	'brand' TEXT NOT NULL,
	'model' TEXT NOT NULL,
	'year' INTEGER NOT NULL,
	'vin' TEXT,
	'no_vin' INTEGER DEFAULT TRUE,
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

CREATE TABLE gto (
	'id' INTEGER PRIMARY KEY,
	'ts_id' INTEGER NOT NULL,
	'date' TEXT, --"YYYY-MM-DD"
	'place_id' INTEGER NOT NULL,
	'staff_id' INTEGER NOT NULL,
	'test_type_id' INTEGER NOT NULL,
	'result_id' INTEGER NOT NULL,
	'process_id' INTEGER NOT NULL,
	'period_id' INTEGER NOT NULL,
	'stop_date' TEXT, --"YYYY-MM-DD"
	'cost' INTEGER NOT NULL, --количество копеек
	'cost_type_id' INTEGER NOT NULL
);

CREATE TABLE place (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL,
	'address' TEXT NOT NULL,
	'oto_number' TEXT NOT NULL 
);

CREATE TABLE staff (
	'id' INTEGER PRIMARY KEY,
	'full_name' TEXT NOT NULL,
	'code' TEXT NOT NULL,
	'place_id' INTEGER NOT NULL,
	'active' INTEGER DEFAULT TRUE
);

CREATE TABLE test_type (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE result (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE process (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);

CREATE TABLE period (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL,
	'months' INTEGER NOT NULL 
);

CREATE TABLE cost_type (
	'id' INTEGER PRIMARY KEY,
	'name' TEXT NOT NULL
);
