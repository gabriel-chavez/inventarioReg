var iniciofecha = moment().subtract(0, 'year').startOf('year')
var finfecha = moment().subtract(0, 'year').endOf('year')
$(document).ready(function () {
    /**Iniciando datetime**/
    moment.locale("es");
    $('#fechacierre').datetimepicker({
        format: 'DD/MM/YYYY'
    });
})
function retornarTablaTareasIngenieriaReportes() {
    ini = iniciofecha.format('YYYY-MM-DD');
    fin = finfecha.format('YYYY-MM-DD');
    area = $("#areaReportes").val();
    estado = $("#idestadoReportes").val();
    var dataJson = {
        fechaIni: ini,
        fechaFin: fin,
        _idarea: area,
        _idestado: estado,
    };
    console.log(area)
    retornarAjaxParametros(base_url("CambiosIngenieria/retornarTareasIngReporte"), dataJson);
}
function retornarTablaTareasIngenieria() {
    ini = iniciofecha.format('YYYY-MM-DD');
    fin = finfecha.format('YYYY-MM-DD');    
    var dataJson = {
        fechaIni: ini,
        fechaFin: fin,        
    };
    $("#comentartarea").attr("disabled", true);
    retornarAjaxParametros(base_url("CambiosIngenieria/retornarTareasIng"), dataJson);
}

function mostrarTablaTareasIngReportes(r) {    
    res = r.result
    
    console.log(res)
    
    $("#tareasIngenieriaReportes").bootstrapTable('destroy');
    $("#tareasIngenieriaReportes").bootstrapTable({

        data: res,

        striped: true,
        pagination: true,
        pageSize: "10",
        search: true,
        searchOnEnterKey: true,
        filter: true,
        showColumns: true,

        columns: [
             {
                 field: 'secuencia',
                 width: '2%',
                 title: 'Secuencia',
                 align: 'center',
                 sortable: true,
             },
              {
                  field: 'areas.Area',
                  width: '5%',
                  title: 'Area',
                  align: 'center',
                  sortable: true,
              },
            {
                field: 'fecha',
                width: '5%',
                title: 'Fecha',
                align: 'center',
                sortable: true,
                formatter: formato_fecha_corta,
            },
            {
                field: 'TareaAccion',
                width: '5%',
                title: 'Tarea o Accion a realizar',
                align: 'center',
            },
            {
                field: 'TipoTareaIng.TipoTarea',
                width: '10%',
                title: "Tipo",
            },
            {
                field: 'AutorizadorTarea.responsable.usuariosSistema.Nombre',
                width: '10%',
                title: "Autorizador",
            },
            {
                field: 'EstadoTareasIng.EstadoTareaIng',
                width: '10%',
                title: "Estado",
                align: 'center',
                formatter: operateEstado,
            },
            {
                title: 'Acciones',
                align: 'center',
                width: '10%',
                events: operateEventsing,
                formatter: operateFormatteringReportes,
            }]
    });
    $("#tareasIngenieriaReportes").bootstrapTable('resetView');
}
function mostrarTablaTareasIng(r) {
    $('#agregartarea').modal('hide');

    res = r.result
    //res = flatTareas(res);
    console.log(res)
   // datosselect = restornardatosSelect(res)
    //console.log(datosselect);
    $("#tareasIngenieria").bootstrapTable('destroy');
    $("#tareasIngenieria").bootstrapTable({

        data: res,
        
        striped: true,
        pagination: true,
        pageSize: "10",
        search: true,
        searchOnEnterKey: true,
        filter: true,
        showColumns: true,

        columns: [
             {
                 field: 'secuencia',
                 width: '2%',
                 title: 'Secuencia',
                 align: 'center',
                 sortable: true,
             },
              {
                  field: 'areas.Area',
                  width: '5%',
                  title: 'Area',
                  align: 'center',
                  sortable: true,                  
              },
            {
                field: 'fecha',
                width: '5%',
                title: 'Fecha',
                align: 'center',
                sortable: true,
                formatter: formato_fecha_corta,
            },
            {
                field: 'TareaAccion',
                width: '5%',
                title: 'Tarea o Accion a realizar',
                align: 'center',                               
            },
            {
                field: 'TipoTareaIng.TipoTarea',
                width: '10%',
                title: "Tipo",               
            },
            {
                field: 'AutorizadorTarea.responsable.usuariosSistema.Nombre',
                width: '10%',
                title: "Autorizador",
            },
            {
                field: 'EstadoTareasIng.EstadoTareaIng',
                width: '10%',
                title: "Estado",
                align: 'center',
                formatter: operateEstado,
            },            
            {
                title: 'Acciones',
                align: 'center',
                width: '10%',
                events: operateEventsing,
                formatter: operateFormattering,
            }]
    });
    $("#tareasIngenieria").bootstrapTable('resetView');
}
window.operateEventsing = {
    
    'click .crudtarea': function (e, value, row, index) {

        window.location = base_url("cambiosingenieria/crud/" + row.IdTareaIng);
    }
};


function operateFormattering(value, row, index) {
    var ret = '<button type="button" class="btn btn-default crudtarea" aria-label="Right Align">' +
        '<i class="fa fa-external-link" aria-hidden="true"></i></button>';  
    return ret;
}
function operateFormatteringReportes(value, row, index) {
    var ret = '<button type="button" class="btn btn-default crudtarea" aria-label="Right Align">' +
        '<i class="fa fa-external-link" aria-hidden="true"></i></button>';
    ret += '<a href="ExportarAPDF/' + row.IdTareaIng+'" target="_blank"class="btn btn-default " aria-label="Right Align">' +
        '<i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>';
    return ret;
}
function operateEstado(value, row, index) {
    if (value.trim() == "Enviado")
        ret = '<span class="label label-primary text-uppercase">'+value+'</span>';
    if (value.trim() == "Aprobado")
        ret = '<span class="label label-success text-uppercase">' + value + '</span>';
    if (value.trim() == "Observado")
        ret = '<span class="label label-warning text-uppercase">' + value + '</span>';
    if (value.trim() == "Finalizado")
        ret = '<span class="label label-info text-uppercase">'+value+'</span>';
    if (value.trim() == "Anulado")
        ret = '<span class="label label-default text-uppercase">' + value + '</span>';
    return (ret);    
}

function labelprioridad(value, row, index) {
    if (value == "Alta")
        ret = '<span class="label label-danger">ALTA</span>';
    if (value == "Media")
        ret = '<span class="label label-warning">MEDIA</span>';
    if (value == "Baja")
        ret = '<span class="label label-info">BAJA</span>';
    return (ret);
}
function labelestado(value, row, index) {
    if (value == "Ejecución")
        ret = '<span class="label label-info text-uppercase">' + value + '</span>';
    if (value == "Finalizado")
        ret = '<span class="label label-success text-uppercase">' + value + '</span>';
    if (value == "Demorado")
        ret = '<span class="label label-warning text-uppercase">' + value + '</span>';
    return (ret);
}
function comentarTareaIng() {
    if ($("#comentariotxtIng").val() != "") {
        console.log($("#IdTareaIng").val());
        var dataJson = {
            IdTareaIng: $("#IdTareaIng").val(),
            comentario: $("#comentariotxtIng").val(),
        };
        $("#comentartareaIng").attr("disabled", true);
        retornarAjaxParametros(base_url("CambiosIngenieria/agregarComentario"), dataJson);

    }
    else {
        swal("Atencion!", "No ingreso ningun comentario!", "warning")
    }
}

$(document).on("click", "#comentartareaIng", function () {
    comentarTareaIng()
})
$(document).on("click", "#finalizartareaing", function () {
    var dataJson = {
        idTareaIng: $("#IdTareaIng").val(),
        resultado:$("#resultado").val()
    };
    $("#finalizartareaing").attr("disabled", true);
    retornarAjaxParametros(base_url("CambiosIngenieria/finalizar"), dataJson);
    retrasarBoton("#finalizartareaing");

})
$(document).on("click", "#aprobartareaing", function () {
    var dataJson = {
        idTareaIng: $("#IdTareaIng").val(),
    };
    $("#aprobartareaing").attr("disabled", true);
    retornarAjaxParametros(base_url("CambiosIngenieria/aprobar"), dataJson);
    retrasarBoton("#aprobartareaing")
})
$(document).on("click", "#observartareaing", function () {
    var dataJson = {
        idTareaIng: $("#IdTareaIng").val(),
    };
    $("#observartareaing").attr("disabled", true);
    retornarAjaxParametros(base_url("CambiosIngenieria/observar"), dataJson);
    retrasarBoton("#observartareaing")
})
function agregarcomIng(e) {
    var res = e.result;
    var fechahora = moment(res.horafecha, "YYYY-MM-DD HH:mm:ss");
    var dia = fechahora.format("DD");
    var mes = fechahora.month();
    var anio = fechahora.year();
    var meses = Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
    var com = '<li style="display:none" class="newelem">' +
        '<img src="' + base_url("/assets/images/img.png") + '" class="avatar" alt="Avatar"/>' +
            '<div class="message_date">' +
                '<h3 class="date text-info">' + dia + '</h3>' +
                '<p class="month">' + meses[mes] + '</p>' +
                '<p class="year">' + anio + '</p>' +
            '</div>' +
            '<div class="message_wrapper">' +
                '<h4 class="heading">'
                    + res.usuario +
                    '<span> ' + fechahora.format("HH:mm:ss") + '</span>' +
                '</h4>' +
                '<blockquote class="message">' +
                        res.comentario +
                '</blockquote>' +
                '<br />' +
            '</div>' +
        '</li>';
    $("#mensajesusuario").append(com)
    $(".newelem").show("slow");
    $("#comentariotxtIng").val("");
    retrasarBoton("#comentartareaIng")
}
$(document).on("change", "#areaReportes", function () {
    retornarTablaTareasIngenieriaReportes();
})
$(document).on("change", "#idestadoReportes", function () {
    retornarTablaTareasIngenieriaReportes();
})