const { getDiv, getInput, getSelector, getDate } = require('../elementsUtil');

module.exports = {
    init: () => {
        return {
            ui: {
                caption: getDiv('gtoedit-caption'),
                subcaption: getDiv('gtoedit-subcaption'),
                btnEditCancel: getDiv('btnEditCancel'),
                btnEditSave: getDiv('btnEditSave'),
            },

            edit: {
                date: getDate('gto.date'),
                place_id: getSelector('gto.place_id'),
                staff_id: getSelector('gto.staff_id'),
                test_type_id: getSelector('gto.test_type_id'),
                result_id: getSelector('gto.result_id'),
                process_id: getSelector('gto.process_id'),
                period_id: getSelector('gto.period_id'),
                stop_date: getDate('gto.stop_date'),
                cost: getInput('gto.cost'),
                cost_type_id: getSelector('gto.cost_type_id'),
            }
        }
    },
    HTML: `
        <div class="modality-window ver-panel main-box edit-win">
        <div id="gtoedit-caption" class="caption">Редактировать ГТО</div>
        <div id="gtoedit-subcaption" class="subcaption">NUMBER</div>
        <div class="body-box grow">
        
            <!-- Данные для проведения ГТО -->
            <div class="block">
                <div class="block-child block-child-data">
                    <div class="form-box">
                        <div class="form-row">
                            <i>Дата ГТО:</i>
                            <input type="date" id="gto.date">
                        </div>
                        <div class="form-row">
                            <i>СТО:</i>
                            <select id="gto.place_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Тех. эксперт:</i>
                            <select id="gto.staff_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Вид проверки:</i>
                            <select id="gto.test_type_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Решение:</i>
                            <select id="gto.result_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Управление осмотром:</i>
                            <select id="gto.process_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Срок действия ДК:</i>
                            <select id="gto.period_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <i>Дата окончания ДК:</i>
                            <input type="date" id="gto.stop_date">
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- Оплата -->
            <div class="block">
                <div class="block-child block-child-cost">
                    <div class="form-box">
                        <div class="form-row">
                            <i>Стоимость:</i>
                            <input type="number" id="gto.cost" step="0.01"/>
                        </div>
                        <div class="form-row">
                            <i>Оплата:</i>
                            <select id="gto.cost_type_id">
                                <option value=-1>-</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <div class="ui-panel">
            <div id="btnEditCancel" class="button"> Отмена </div>
            <div id="btnEditSave" class="button"> Сохранить </div>
        </div>
        
        </div>
    `
}