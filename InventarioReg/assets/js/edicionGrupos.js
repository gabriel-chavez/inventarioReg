function actionFormatterEdicionGrupos(value, row, index) {
    return [
        '<button type="button" class="btn btn-default editarAsignacionGrupo" aria-label="Right Align">',
        '<i class="fa fa-pencil" aria-hidden="true"></i></button>',
        '<button type="button" class="btn btn-default eliminarAsignacionGrupo" aria-label="Right Align">',
        '<i class="fa fa-times" aria-hidden="true"></i></button>',
    ].join('');
}

window.actionEventsEdicionGrupos = {
    'click .editarAsignacionGrupo': function (e, value, row, index) {
        console.log(row[1])
        $("#idAsignacion").val(row[0])        
        $("#UsuarioGrupo").val(row[1]).trigger('change');
        $("#UsuarioGrupo").empty().append('<option>' + row[1] + '</option>').val(row[1]).trigger('change');
        $("#grupoEquipo").val(row[2])
        $("#observacion").val(row[4])
      
        $("#edicionasignacionmodal").modal("show")
    },
    'click .eliminarAsignacionGrupo': function (e, value, row, index) {
        var json = {
            idAsignacion: row[0]
        }
        swal({
            title: "Esta seguro?",
            text: "El registro sera eliminado",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false
        },
        function () {
            swal("Eliminado!", "Su registro fue eliminado.", "success");
            retornarAjaxParametros(base_url("asignacion/EliminarAsignacion"), json);
        });
       
    },   
};
$("#guardarEdicion").on("click", function () {
   
    json = {
        idAsignacion: $("#idAsignacion").val(),
        grupoEquipo : $("#grupoEquipo").val(),
        UsuarioGrupo: ($("#UsuarioGrupo").select2('data').length > 0) ? $("#UsuarioGrupo").select2('data')[0]['nombre'] || $("#UsuarioGrupo").select2('data')[0]['text'] : "",
        observacion : $("#observacion").val(),
    }
    
    retornarAjaxParametros(base_url("asignacion/editarDatos"), json);
   
})