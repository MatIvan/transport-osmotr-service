//@ts-check
'use strict'

const XL = require('excel4node'); //  https://www.npmjs.com/package/excel4node
const OPT = require('./page-options');

/**
 * @typedef {import('../db/repository/report-repo').ReportData} ReportData
 * @typedef {import('./types').ReportOptions} ReportOptions
 * @typedef {import('./types').Model} Model
 * @typedef {import('./types').Column} Column
 */

module.exports = {
    create
}

/** @type {Column[]} */
const colunms = [
    {
        caption: '№№',
        width: 5,
        type: 'number',
        style: OPT.cell(),
        value: (row, data) => { return row },
    },
    {
        caption: 'Дата ТО',
        width: 12,
        type: 'date',
        style: OPT.cell(),
        value: (row, data) => { return new Date(data.date) },
    },
    {
        caption: 'Эксперт',
        width: 19,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.staff },
    },
    {
        caption: 'Вид проверки',
        width: 12,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.test_type },
    },
    {
        caption: 'Рег.знак',
        width: 12,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.plate },
    },
    {
        caption: 'Тип ТС',
        width: 7,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.ats_type },
    },
    {
        caption: 'Марки, модель',
        width: 19,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.marka },
    },
    {
        caption: 'Год выпуска',
        width: 8,
        type: 'number',
        style: OPT.cell(),
        value: (row, data) => { return data.release_year },
    },
    {
        caption: 'Владелец ТС',
        width: 19,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.owner },
    },
    {
        caption: 'Срок действия',
        width: 12,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.period },
    },
    {
        caption: 'Сумма',
        width: 10,
        type: 'number',
        style: OPT.cell(),
        value: (row, data) => { return data.cost },
    },
    {
        caption: 'Способ оплаты',
        width: 10,
        type: 'string',
        style: OPT.cell(),
        value: (row, data) => { return data.cost_type },
    },
];

/**
 * @param {ReportOptions} opt
 * @param {(err: string| null, path: string | null)=>void} callback
 */
function create(opt, callback) {
    let newWb = new XL.Workbook(OPT.workbook(opt));

    /** @type {Model} */
    let model = {
        options: opt,
        wb: newWb,
        ws: newWb.addWorksheet('REPORT', OPT.worksheet(opt)),
        row: 1,
    }

    prepareColumns(model);
    fillTable(model, 'Банк');
    fillTable(model, 'Касса');
    write(model, callback);
}

/**
 * @param {Model} model
 */
function prepareColumns(model) {
    colunms.forEach((val, index) => {
        const col = index + 1;
        model.ws.column(col).setWidth(val.width);
        model.ws.cell(model.row, col).string(val.caption);
    });

    model.ws.row(model.row).setHeight(24);
    const style = model.wb.createStyle(OPT.headCell());
    model.ws.cell(model.row, 1, model.row, colunms.length).style(style);
    model.row++;
}

/**
 * @param {Model} model
 * @param {string} costType
 */
function fillTable(model, costType) {
    // name
    model.ws.row(model.row).setHeight(24);
    const styleName = model.wb.createStyle(OPT.subjectCell());
    model.ws.cell(model.row, 1).string(costType).style(styleName);
    model.row++;

    // table
    const arr = model.options.data.filter((data) => {
        return data.cost_type === costType;
    })
    let summ = 0;
    arr.forEach((data, rowIndex) => {
        row(model, data, rowIndex);
        summ += data.cost;
    });

    // summ
    model.ws.row(model.row).setHeight(24);
    const styleSumm = model.wb.createStyle(OPT.subjectCell());
    model.ws.cell(model.row, 1).string('Итого оплата');
    model.ws.cell(model.row, 3).string(costType);
    model.ws.cell(model.row, 4).number(summ);
    model.ws.cell(model.row, 1, model.row, 4).style(styleSumm);
    model.row++;
}

/**
 * @param {Model} model
 * @param {ReportData} data
 * @param {number} rowIndex
 */
function row(model, data, rowIndex) {
    colunms.forEach((val, index) => {
        const col = index + 1;
        model.ws.cell(model.row, col)[val.type](val.value(rowIndex + 1, data));
    });

    model.ws.row(model.row).setHeight(24);
    const style = model.wb.createStyle(OPT.cell());
    model.ws.cell(model.row, 1, model.row, colunms.length).style(style);
    model.row++;
}

/**
 * @param {Model} model
 * @param {(err: string| null, path: string | null)=>void} callback
 */
function write(model, callback) {
    const { fileName } = model.options;
    model.wb.write(fileName, function (err, stats) {
        if (err) {
            return callback('Write file error!', null);
        }
        callback(null, fileName);
    });
}
