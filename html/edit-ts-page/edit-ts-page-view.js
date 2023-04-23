//@ts-check
'use strict';

const { fillList, markAsBad, bindUpperValue, setChangeHandler, markAsWarn } = require('../elementsUtil');
const ELEM = require('./elements');
const VALIDATOR = require('./edit-ts-validator');

/**
 * @typedef {import('../../src/db/repository/types-repo').Ats_Type} Ats_Type
 * @typedef {import('../../src/db/repository/types-repo').Ts_Category} Ts_Category
 * @typedef {import('../../src/db/repository/types-repo').Engine_Type} Engine_Type
 * @typedef {import('../../src/db/repository/types-repo').Owner_Type} Owner_Type
 * @typedef {import('../../src/db/repository/types-repo').Ts_Doc_Type} Ts_Doc_Type
 * @typedef {import('../../src/db/repository/ts-repo').Ts} Ts
 * @typedef {import('../../src/db/repository/doc-repo').Doc} Doc
 * @typedef {import('../../src/db/repository/owner-repo').Owner} Owner
 */

/**
 * @typedef {(value: string) => void} OnStringHandler
 * @typedef {(value: boolean) => void} OnBooleanHandler
 * @typedef {(value: number) => void} OnNumberHandler
 */

/**
 * @type Ats_Type[]
 */
var atsTypeList = [];

/**
 * @type Ts_Doc_Type[]
 */
var tsDocTypeList = [];

/**
 * @param {Ts} ts 
 */
function refreshAll(ts) {
    ELEM.ui.caption.innerText = !!ts ? 'Редактировать транспортное средство' : 'Открыто для добавления ТС';

    //doc
    ELEM.doc.type.value = String(ts.doc.ts_doc_type_id);
    ELEM.doc.series.value = ts.doc.series;
    ELEM.doc.number.value = ts.doc.number;
    ELEM.doc.issuer.value = ts.doc.issuer;
    ELEM.doc.date.value = ts.doc.date;
    const docType = tsDocTypeList.find(docType => docType.id === ts.doc.ts_doc_type_id)?.name;
    ELEM.doc.full.innerText = docType + ' '
        + ts.doc.series + ' '
        + ts.doc.number + ', '
        + ts.doc.issuer + ', '
        + ts.doc.date

    //owner
    ELEM.owner.first_name.value = ts.owner.first_name;
    ELEM.owner.second_name.value = ts.owner.second_name;
    ELEM.owner.midle_name.value = ts.owner.midle_name;
    ELEM.owner.type.value = String(ts.owner.owner_type_id);

    //ts
    ELEM.ts.plate.value = ts.plate;
    markAsBad(ELEM.ts.plate, !VALIDATOR.plate(ts));

    ELEM.ts.no_grz.checked = ts.no_grz;
    ELEM.ts.brand.value = ts.brand;
    ELEM.ts.model.value = ts.model;
    ELEM.ts.brandModel.innerText = ts.brand + ' ' + ts.model;
    ELEM.ts.year.value = String(ts.year);
    ELEM.ts.vin.value = ts.vin;
    ELEM.ts.no_vin.checked = ts.no_vin;
    ELEM.ts.chassis.value = ts.chassis;
    ELEM.ts.body.value = ts.body;

    ELEM.ts.ts_category.value = String(ts.ts_category_id);
    markAsBad(ELEM.ts.ts_category, !VALIDATOR.category(ts));
    const atsTypeArray = atsTypeList.filter(atsType => atsType.ts_category_id === ts.ts_category_id);
    fillList(ELEM.ts.ats_type, atsTypeArray);
    ELEM.ts.ats_type.value = String(ts.ats_type_id);
    markAsBad(ELEM.ts.ats_type, !VALIDATOR.atsType(ts));

    ELEM.ts.engine_type.value = String(ts.engine_type_id);
    ELEM.ts.odometer.value = String(ts.odometer);
    markAsBad(ELEM.ts.year, !VALIDATOR.year(ts));
    markAsWarn(ELEM.ts.vin, !VALIDATOR.vin(ts));
}

function prepareElements() {
    bindUpperValue(ELEM.ts.plate);
    bindUpperValue(ELEM.ts.brand);
    bindUpperValue(ELEM.ts.model);
    bindUpperValue(ELEM.ts.vin);
    bindUpperValue(ELEM.ts.chassis);
    bindUpperValue(ELEM.ts.body);

    bindUpperValue(ELEM.owner.first_name);
    bindUpperValue(ELEM.owner.second_name);
    bindUpperValue(ELEM.owner.midle_name);

    setChangeHandler(ELEM.ts.plate, () => { HANDLER.onPlate(ELEM.ts.plate.value) });
    setChangeHandler(ELEM.ts.brand, () => { HANDLER.onBrand(ELEM.ts.brand.value) });
    setChangeHandler(ELEM.ts.model, () => { HANDLER.onModel(ELEM.ts.model.value) });
    setChangeHandler(ELEM.ts.year, () => { HANDLER.onYear(Number(ELEM.ts.year.value)) });
    setChangeHandler(ELEM.ts.vin, () => { HANDLER.onVin(ELEM.ts.vin.value) });
    setChangeHandler(ELEM.ts.chassis, () => { HANDLER.onChassis(ELEM.ts.chassis.value) });
    setChangeHandler(ELEM.ts.body, () => { HANDLER.onBody(ELEM.ts.body.value) });
    setChangeHandler(ELEM.ts.ts_category, () => { HANDLER.onTsCategory(Number(ELEM.ts.ts_category.value)) });
    setChangeHandler(ELEM.ts.ats_type, () => { HANDLER.onAtsType(Number(ELEM.ts.ats_type.value)) });
    setChangeHandler(ELEM.ts.engine_type, () => { HANDLER.onEngineType(Number(ELEM.ts.engine_type.value)) });
    setChangeHandler(ELEM.ts.odometer, () => { HANDLER.onOdometer(Number(ELEM.ts.odometer.value)) });

    setChangeHandler(ELEM.owner.type, () => { HANDLER.onOwnerType(Number(ELEM.owner.type.value)) });
    setChangeHandler(ELEM.owner.first_name, () => { HANDLER.onFirstName(ELEM.owner.first_name.value) });
    setChangeHandler(ELEM.owner.second_name, () => { HANDLER.onSecondName(ELEM.owner.second_name.value) });
    setChangeHandler(ELEM.owner.midle_name, () => { HANDLER.onMidleName(ELEM.owner.midle_name.value) });

    setChangeHandler(ELEM.doc.type, () => { HANDLER.onDocType(Number(ELEM.doc.type.value)) });
    setChangeHandler(ELEM.doc.series, () => { HANDLER.onDocSeries(ELEM.doc.series.value) });
    setChangeHandler(ELEM.doc.number, () => { HANDLER.onDocNumber(ELEM.doc.number.value) });
    setChangeHandler(ELEM.doc.issuer, () => { HANDLER.onDocIssuer(ELEM.doc.issuer.value) });
    setChangeHandler(ELEM.doc.date, () => { HANDLER.onDocDate(ELEM.doc.date.value) });

    ELEM.ts.no_grz.onclick = () => { HANDLER.onNoGrz(ELEM.ts.no_grz.checked) };
    ELEM.ts.no_vin.onclick = () => { HANDLER.onNoVin(ELEM.ts.no_vin.checked) };
    ELEM.ts.btnBodyCopyVin.onclick = () => { HANDLER.onBody(ELEM.ts.vin.value) };
}

const HANDLER = {
    /** @type OnStringHandler */
    onPlate: (val) => { },
    /** @type OnBooleanHandler */
    onNoGrz: (val) => { },
    /** @type OnStringHandler */
    onBrand: (val) => { },
    /** @type OnStringHandler */
    onModel: (val) => { },
    /** @type OnNumberHandler */
    onYear: (val) => { },
    /** @type OnStringHandler */
    onVin: (val) => { },
    /** @type OnBooleanHandler */
    onNoVin: (val) => { },
    /** @type OnStringHandler */
    onChassis: (val) => { },
    /** @type OnStringHandler */
    onBody: (val) => { },
    /** @type OnNumberHandler */
    onTsCategory: (val) => { },
    /** @type OnNumberHandler */
    onAtsType: (val) => { },
    /** @type OnNumberHandler */
    onEngineType: (val) => { },
    /** @type OnNumberHandler */
    onOdometer: (val) => { },
    /** @type OnNumberHandler */
    onOwnerType: (val) => { },
    /** @type OnStringHandler */
    onFirstName: (val) => { },
    /** @type OnStringHandler */
    onSecondName: (val) => { },
    /** @type OnStringHandler */
    onMidleName: (val) => { },
    /** @type OnNumberHandler */
    onDocType: (val) => { },
    /** @type OnStringHandler */
    onDocSeries: (val) => { },
    /** @type OnStringHandler */
    onDocNumber: (val) => { },
    /** @type OnStringHandler */
    onDocIssuer: (val) => { },
    /** @type OnStringHandler */
    onDocDate: (val) => { },
}

module.exports = {
    prepareElements: prepareElements,
    refreshAll: refreshAll,

    setAtsTypeList: (/** @type {Ats_Type[]} */ newAtsTypeList) => { atsTypeList = newAtsTypeList },
    setTsCategoryList: (/** @type {Ts_Category[]} */ newTsCategoryList) => { fillList(ELEM.ts.ts_category, newTsCategoryList); },
    setTsEngineType: (/** @type {Engine_Type[]} */ newTsEngineTypeList) => { fillList(ELEM.ts.engine_type, newTsEngineTypeList); },
    setOwnerTpeList: (/** @type {Owner_Type[]} */ newOwnerTpeList) => { fillList(ELEM.owner.type, newOwnerTpeList); },
    setDocTypeList: (/** @type {Ts_Doc_Type[]} */ newTsDocTypeArray) => {
        tsDocTypeList = newTsDocTypeArray;
        fillList(ELEM.doc.type, tsDocTypeList);
    },

    onPlate: (/** @type {OnStringHandler} */ handler) => HANDLER.onPlate = handler,
    onNoGrz: (/** @type {OnBooleanHandler} */ handler) => HANDLER.onNoGrz = handler,
    onBrand: (/** @type {OnStringHandler} */ handler) => HANDLER.onBrand = handler,
    onModel: (/** @type {OnStringHandler} */ handler) => HANDLER.onModel = handler,
    onYear: (/** @type {OnNumberHandler} */ handler) => HANDLER.onYear = handler,
    onVin: (/** @type {OnStringHandler} */ handler) => HANDLER.onVin = handler,
    onNoVin: (/** @type {OnBooleanHandler} */ handler) => HANDLER.onNoVin = handler,
    onChassis: (/** @type {OnStringHandler} */ handler) => HANDLER.onChassis = handler,
    onBody: (/** @type {OnStringHandler} */ handler) => HANDLER.onBody = handler,
    onTsCategory: (/** @type {OnNumberHandler} */ handler) => HANDLER.onTsCategory = handler,
    onAtsType: (/** @type {OnNumberHandler} */ handler) => HANDLER.onAtsType = handler,
    onEngineType: (/** @type {OnNumberHandler} */ handler) => HANDLER.onEngineType = handler,
    onOdometer: (/** @type {OnNumberHandler} */ handler) => HANDLER.onOdometer = handler,

    onOwnerType: (/** @type {OnNumberHandler} */ handler) => HANDLER.onOwnerType = handler,
    onFirstName: (/** @type {OnStringHandler} */ handler) => HANDLER.onFirstName = handler,
    onSecondName: (/** @type {OnStringHandler} */ handler) => HANDLER.onSecondName = handler,
    onMidleName: (/** @type {OnStringHandler} */ handler) => HANDLER.onMidleName = handler,

    onDocType: (/** @type {OnNumberHandler} */ handler) => HANDLER.onDocType = handler,
    onDocSeries: (/** @type {OnStringHandler} */ handler) => HANDLER.onDocSeries = handler,
    onDocNumber: (/** @type {OnStringHandler} */ handler) => HANDLER.onDocNumber = handler,
    onDocIssuer: (/** @type {OnStringHandler} */ handler) => HANDLER.onDocIssuer = handler,
    onDocDate: (/** @type {OnStringHandler} */ handler) => HANDLER.onDocDate = handler,
}
