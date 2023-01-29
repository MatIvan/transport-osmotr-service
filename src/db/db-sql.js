module.exports = {
    beginTransaction: "BEGIN TRANSACTION;",
    rollback: "ROLLBACK;",
    commit: "COMMIT;",
    pragma: "PRAGMA foreign_keys=OFF;",
    sqliteMaster:"select name from sqlite_master where type='table'",
    selectAllCars: "SELECT id, uid, marka FROM 'car';",
    selectAllTsCategory: "SELECT id, name FROM ts_category;",
    selectAtsTypeByCategory: "SELECT id, ts_category_id, name FROM ats_type WHERE ts_category_id = ?;",
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
}