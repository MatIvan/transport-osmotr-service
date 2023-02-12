module.exports = {
    beginTransaction: "BEGIN TRANSACTION;",
    rollback: "ROLLBACK;",
    commit: "COMMIT;",
    pragma: "PRAGMA foreign_keys=OFF;",
    sqliteMaster: "select name from sqlite_master where type='table'",
    selectAllCars: "SELECT id, uid, marka FROM 'car';",
    selectAllTsCategory: "SELECT id, name FROM ts_category;",
    selectAllAtsType: "SELECT id, ts_category_id, name FROM ats_type;",
    selectTsById: `SELECT * FROM ts WHERE id = ?;`,
    selectAllEngineType: "SELECT id, name FROM engine_type;",
    selectAllOwnerType: "SELECT id, name FROM owner_type;",
    selectAllDocType: "SELECT id, name FROM ts_doc_type;",
    sqlInsertOwner: `
        INSERT INTO owner (first_name,second_name, midle_name,owner_type_id)
        VALUES (?, ?, ?, ?);`,
    sqlInsertDoc: `
        INSERT INTO ts_doc ('ts_doc_type_id','series','number','issuer','date')
        VALUES (?, ?, ?, ?, ?);`,
    sqlInsertTs: `
        INSERT  into ts (
            'plate',
            'no_grz',
            'brand',
            'model',
            'year',
            'vin',
            'no_vin',
            'chassis',
            'body',
            'ts_category_id',
            'ats_type_id',
            'engine_type_id',
            'odometer',
            'owner_id',
            'ts_doc_id')
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
    selectOwnerById: `SELECT * FROM owner WHERE id = ?;`,
    selectDocById: `SELECT * FROM ts_doc WHERE id = ?;`,
    sqlUpdateOwner: `
        UPDATE owner
        SET first_name = ?,
            second_name = ?,
            midle_name = ?,
            owner_type_id = ?
        WHERE id  = ?;`,
    sqlUpdateDoc: `
        UPDATE ts_doc
        SET ts_doc_type_id = ?,
            series = ?,
            number = ?,
            issuer = ?,
            date = ?
        WHERE id = ?;`,
    sqlUpdateTs: `
        UPDATE ts
        SET plate = ?,
            no_grz = ?,
            brand = ?,
            model = ?,
            year = ?,
            vin = ?,
            no_vin = ?,
            chassis = ?,
            body = ?,
            ts_category_id = ?,
            ats_type_id = ?,
            engine_type_id = ?,
            odometer = ?,
            owner_id = ?,
            ts_doc_id = ?
        WHERE id = ?;`,
    selectAllPlace: `SELECT id, name, address, oto_number FROM place;`,
    sqlUpdatePlace: `
        UPDATE place
        SET name = ?,
            address = ?,
            oto_number = ?
        WHERE id  = ?;`,
    sqlInsertPlace: `
        INSERT INTO place (name, address, oto_number)
        VALUES (?, ?, ?);`,
    selectAllStaff: `SELECT id, full_name, code, place_id, active FROM staff;`,
    sqlUpdateStaff: `
        UPDATE staff
        SET full_name = ?,
            code = ?,
            place_id = ?,
            active = ?
        WHERE id  = ?;`,
    sqlInsertStaff: `
        INSERT INTO staff (full_name, code, place_id, active)
        VALUES (?, ?, ?, ?);`,
    selectGtoByTs: `SELECT * FROM gto WHERE ts_id = ?`,
    sqlUpdateGto: `
        UPDATE gto
        SET date = ?,
            place_id = ?,
            staff_id = ?,
            test_type_id = ?,
            result_id = ?,
            process_id = ?,
            period_id = ?,
            stop_date = ?,
            cost = ?,
            cost_type_id = ?
        WHERE id  = ?;`,
    sqlInsertGto: `
        INSERT INTO gto (
            ts_id,
            date,
            place_id,
            staff_id,
            test_type_id,
            result_id,
            process_id,
            period_id,
            stop_date,
            cost,
            cost_type_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    selectGtoTestType: "SELECT id, name FROM test_type;",
    selectGtoResult: "SELECT id, name FROM result;",
    selectGtoProcess: "SELECT id, name FROM process;",
    selectGtoPeriod: "SELECT id, name, months FROM period;",
    selectGtoCostType: "SELECT id, name FROM cost_type;",
}
