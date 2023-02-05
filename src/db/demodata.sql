INSERT INTO ts_category (id, name) VALUES 
(10, "Мотоцикл"),
(20, "Легковой автомобиль"),
(30, "Грузовой автомобиль"),
(40, "Автобус"),
(50, "Прицеп");

INSERT INTO ats_type (ts_category_id, name) VALUES
-- 10, "Мотоцикл"
(10, "A/L3"),
(10, "A/L4"),
(10, "A/L5"),
-- 20, "Легковой автомобиль"
(20, "B/M1"),
(20, "B/N1"),
-- 30, "Грузовой автомобиль"
(30, "C/N2"),
(30, "C/N3"),
-- 40, "Автобус"
(40, "D/M2"),
(40, "D/M3"),
-- 50, "Прицеп"
(50, "E/O1"),
(50, "E/O2"),
(50, "E/O3"),
(50, "E/O4");

INSERT INTO engine_type (name) VALUES
("Бензиновый на бензине"),
("Бензиновый на бензине/газ"),
("Электромобиль");

INSERT INTO owner_type (name) VALUES
("Физическое лицо"),
("Юридическое лицо");

INSERT INTO ts_doc_type (name) VALUES
("ПТС"),
("СРТС"),
("ЭПТС");

INSERT INTO test_type (name) VALUES
("Выдача дубликата талона ГТО"),
("Изменение реквизитов"),
("Первичная"),
("Повторная");

INSERT INTO result (name) VALUES
("Исправно"),
("Не исправно");

INSERT INTO process (name) VALUES
("Не проводился"),
("Отправлено на ЛТК"),
("Осмотр завершен"),
("Осмотр не завершен");

INSERT INTO period (name, months) VALUES
("Брак", 0),
("3 месяца", 3),
("6 месяцев", 6),
("12 месяцев", 12),
("24 месяца", 24),
("36 месяцев", 36);

INSERT INTO cost_type (name) VALUES
("Касса"),
("Банк");
