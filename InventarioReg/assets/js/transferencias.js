function actionFormatterTransferencia(value, row, index) {
    return [
        '<button type="button" class="btn btn-default agregarTranferencia" aria-label="Right Align">',
        '<i class="fa fa-arrow-down" aria-hidden="true"></i></button>',
    ].join('');
}
function actionFormatterTransferenciaRetornar(value, row, index) {
    return [
        '<button type="button" class="btn btn-default retornarTranferencia" aria-label="Right Align">',
        '<i class="fa fa-arrow-up" aria-hidden="true"></i></button>',
    ].join('');
}
window.actionEventsTransferencia = {
    'click .agregarTranferencia': function (e, value, row, index) {
        console.log("sdsd")
        $("#tablaEquiposOficina").bootstrapTable('removeByUniqueId', row.id)
        $("#tablaTransferencia").bootstrapTable('prepend', row);
    },
    'click .retornarTranferencia': function (e, value, row, index) {
        console.log("sdsd")
        $("#tablaTransferencia").bootstrapTable('removeByUniqueId', row.id)
        $("#tablaEquiposOficina").bootstrapTable('prepend', row);
    },
};
