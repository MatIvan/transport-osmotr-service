//@ts-check
'use strict'

module.exports = {
    workbook,
    worksheet,
    cell,
    headCell,
    subjectCell,
    cellCost,
    subjectCellCost
}

const RUB_FORMAT = '# ##0,00"р.";-# ##0,00"р."';

/**
 * @typedef {import('./types').ReportOptions} ReportOptions
 */

/**
 * @param {ReportOptions} opt
 */
function workbook(opt) {
    return {
        defaultFont: {
            size: 10
        },
        dateFormat: 'dd.mm.yyyy',
        author: 'TOS'
    }
}

/**
 * @param {ReportOptions} opt
 */
function worksheet(opt) {
    return {
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
        }
    }
}

function cell() {
    return {
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'top', //['bottom', 'center', 'distributed', 'justify', 'top'],
        },
        border: { // §18.8.4 border (Border)
            left: {
                style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                color: '#000000' // HTML style hex value
            },
            right: {
                style: 'thin',
                color: '#000000'
            },
            top: {
                style: 'thin',
                color: '#000000'
            },
            bottom: {
                style: 'thin',
                color: '#000000'
            }
        },
    }
}

function cellCost(){
    return {
        ...cell(),
        numberFormat: RUB_FORMAT,
    }
}

function headCell() {
    return {
        font: {
            bold: true
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'top',
        },
        border: {
            left: {
                style: 'thin',
                color: '#000000'
            },
            right: {
                style: 'thin',
                color: '#000000'
            },
            top: {
                style: 'thin',
                color: '#000000'
            },
            bottom: {
                style: 'thin',
                color: '#000000'
            }
        },
    }
}

function subjectCell(){
    return {
        font: {
            bold: true,
        },
        alignment: {
            wrapText: false,
            horizontal: 'left',
            vertical: 'bottom',
        },
    }
}

function subjectCellCost(){
    return {
        ...subjectCell(),
        numberFormat: RUB_FORMAT,
    }
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
