//@ts-check
'use strict'

const XL = require('excel4node'); //  https://www.npmjs.com/package/excel4node
/**
 * @typedef {import('../db/repository/report-repo').ReportData} ReportData
 * @typedef {import('../../html/date-util').DatePeriod} DatePeriod
 */

/**
 * @typedef {any} Workbook
 * @typedef {any} Worksheet
 */
/**
 * @typedef {Object} Model
 * @property {Workbook} wb
 * @property {Worksheet} ws
 * @property {number} row
 */

module.exports = {
    create
}

/**
 * @param {DatePeriod} period
 * @param {ReportData[]} data
 */
function create(period, data) {
    let newWb = new XL.Workbook();

    /** @type {Model} */
    let model = {
        wb: newWb,
        ws: newWb.addWorksheet('REPORT'),
        row: 1
    }

    fillTable(model, data);

    write(model, 'report.xlsx');
}

/**
 * @param {Model} model
 * @param {ReportData[]} data
 */
function fillTable(model, data) {
    data.forEach((data, index) => row(model, data, index));
}

/**
 * @param {Model} model
 * @param {ReportData} data
 * @param {number} index
 */
function row(model, data, index) {
    let col = 1;
    model.ws.cell(model.row, col++).number(index + 1);
    model.ws.cell(model.row, col++).string(data.date);
    model.ws.cell(model.row, col++).string(data.staff);
    model.ws.cell(model.row, col++).string(data.test_type);
    model.ws.cell(model.row, col++).string(data.plate);
    model.ws.cell(model.row, col++).string(data.ats_type);
    model.ws.cell(model.row, col++).string(data.marka);
    model.ws.cell(model.row, col++).number(data.release_year);
    model.ws.cell(model.row, col++).string(data.owner);
    model.ws.cell(model.row, col++).string(data.period);
    model.ws.cell(model.row, col++).number(data.cost);
    model.ws.cell(model.row, col++).string(data.cost_type);
    model.row++;
}

/**
 * @param {Model} model
 * @param {string} fileName
 */
function write(model, fileName) {
    model.wb.write(fileName, function (err, stats) {
        if (err) {
        }
    });
}



// Create a reusable style
// var style = wb.createStyle({
//     font: {
//         color: '#FF0800',
//         size: 12,
//     },
//     numberFormat: '$#,##0.00; ($#,##0.00); -',
// });

// Set value of cell A1 to 100 as a number type styled with paramaters of style
// ws.cell(1, 1)
//     .formula('A1 + B1')   .bool(true)
//     .style(style);
