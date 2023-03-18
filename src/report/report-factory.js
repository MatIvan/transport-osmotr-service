//@ts-check
'use strict'

const XL = require('excel4node'); //  https://www.npmjs.com/package/excel4node
/**
 * @typedef {import('../db/repository/report-repo').ReportData} ReportData
 * @typedef {import('../../html/date-util').DatePeriod} DatePeriod
 * @typedef {import('../db/repository/place-repo').Place} Place
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

/**
 * @typedef {Object} ReportOptions
 * @param {string} fileName
 * @param {Place} place
 * @param {DatePeriod} period
 * @param {ReportData[]} data
 */

module.exports = {
    create
}

/**
 * @param {ReportOptions} opt
 * @param {(err: string| null, path: string | null)=>void} callback
 */
function create(opt, callback) {
    let newWb = new XL.Workbook({
        defaultFont: {
            size: 10
        },
        dateFormat: 'dd.mm.yyyy',
        author: 'TOS'
    });

    const wsOptions = {
        'margins': { // Accepts a Double in Inches
            'bottom': 0.8,
            'footer': 0.39,
            'header': 0.39,
            'left': 0.39,
            'right': 0.39,
            'top': 0.8
        },
        'pageSetup': {
            'blackAndWhite': true,
            'orientation': 'landscape', // One of 'default', 'portrait', 'landscape'
        },
        // Set Header and Footer strings and options.
        // https://poi.apache.org/apidocs/dev/org/apache/poi/xssf/usermodel/extensions/XSSFHeaderFooter.html
        'headerFooter': {
            'oddHeader': getHeader(opt),
            'oddFooter': '&C &P of &N',
            'differentFirst': false,
            'differentOddEven': false,
            'scaleWithDoc': true
        },
    }

    /** @type {Model} */
    let model = {
        wb: newWb,
        ws: newWb.addWorksheet('REPORT', wsOptions),
        row: 1
    }

    fillTable(model, opt);

    write(model, opt, callback);
}
/**
 * @param {ReportOptions} opt
 * @returns string
 */
function getHeader(opt) {
    const { place, period } = opt;
    return `&C&B Реестр оплаты проведенных осмотров транспортных средств: ${period.from} - ${period.to}
Оператор технического осмотра: ${place.name} № в реестре ОТО ${place.oto_number}`;
}

/**
 * @param {Model} model
 * @param {ReportOptions} opt
 */
function fillTable(model, opt) {
    opt.data.forEach((data, index) => row(model, data, index));
}

/**
 * @param {Model} model
 * @param {ReportData} data
 * @param {number} index
 */
function row(model, data, index) {
    let col = 1;
    model.ws.cell(model.row, col++).number(index + 1);
    model.ws.cell(model.row, col++).date(new Date(data.date));
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
 * @param {ReportOptions} opt
 * @param {(err: string| null, path: string | null)=>void} callback
 */
function write(model, opt, callback) {
    const { fileName } = opt;
    model.wb.write(fileName, function (err, stats) {
        if (err) {
            return callback('Write file error!', null);
        }
        callback(null, fileName);
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
