var iniciofecha = moment().subtract(0, 'year').startOf('year')
var finfecha = moment().subtract(0, 'year').endOf('year')
$(document).ready(function () {      
    /**Iniciando datetime**/
    moment.locale("es");
    $('#fechacierre').datetimepicker({        
        format: 'DD/MM/YYYY'
    });    
})
function comentarTarea()
{
    if ($("#comentariotxt").val() != "")
    {
        var dataJson = {
            idTarea: $("#idtarea").val(),
            comentario: $("#comentariotxt").val(),
        };
        $("#comentartarea").attr("disabled", true);
        retornarAjaxParametros(base_url("tareas/agregarComentario"), dataJson);
        
    }
    else
    {
        swal("Atencion!", "No ingreso ningun comentario!", "warning")
    }
}
function finalizarTarea()
{
    swal({
        title: "Finalizar tarea",
        text: "Esta finalizando la tarea, desea continuar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true
    },
    function () {
        retornarAjax(base_url("Tareas/FinalizarTarea"))
        retrasarBoton("#finalizartarea")
    });
}
$(document).on("click", "#finalizartarea", function () {
    finalizarTarea()
})
$(document).on("click", "#comentartarea", function () {        
    comentarTarea()
})
function flatTareas(r)
{
    $.each(r, function (index, value) {
       // console.log(value)
        r[index].areaArea = value.areas.Area;
        r[index].prioridadesPrioridad = value.prioridades.Prioridad;
        r[index].tipoTareasTipoTarea = value.tipoTareas.TipoTarea;
        r[index].estadoTareaEstadoTarea1 = value.estadoTarea.EstadoTarea1;        
    })
   return r;
}
function restornardatosSelect(res) {
    var area = new Array()
    var prioridad = new Array()
    var tipotarea = new Array()
    var estadoactual = new Array()
    var datos = new Array()
    $.each(res, function (index, value) {
        area.push(value.areaArea.trim())
        prioridad.push(value.prioridadesPrioridad.trim())
        tipotarea.push(value.tipoTareasTipoTarea.trim())
        estadoactual.push(value.estadoTareaEstadoTarea1.trim())
    })
    area.sort();
    prioridad.sort();
    tipotarea.sort();
    estadoactual.sort();
    datos.push(area.unique());
    datos.push(prioridad.unique());
    datos.push(tipotarea.unique());
    datos.push(estadoactual.unique());
    return (datos);
}
Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});
function mostrarTablaTareas(r)
{
    $('#agregartarea').modal('hide');
    
    res = r.result
    res=flatTareas(res);
    console.log(res)
    datosselect = restornardatosSelect(res)
    console.log(datosselect);
    $("#tareasAsignadas").bootstrapTable('destroy');
    $("#tareasAsignadas").bootstrapTable({

        data: res,
       // flat:true,
        striped: true,
        pagination: true,
        pageSize: "10",      
        search: true,        
        searchOnEnterKey: true,
        filter: true,
        showColumns: true,

        columns: [
             {
                 field: 'Nro',
                 width: '3%',
                 title: 'Nro',
                 align: 'center',
                 sortable: true,
                
             },
            {
                field: 'areaArea',
                width: '10%',
                title: 'Area',
                align: 'center',
                sortable: true,
                filter: {
                    type: "select",
                    data: datosselect[0],
                },
            },
            {
                field: 'prioridadesPrioridad',
                width: '5%',
                title: 'Prioridad',
                align: 'center',
                sortable: true,
                filter: {
                    type: "select",
                    data: datosselect[1],
                },
                formatter: labelprioridad,               
            },
            {
                field: 'tipoTareasTipoTarea',
                width: '5%',
                title: "Tipo de tarea",                
                filter: {
                    type: "select",
                    data: datosselect[2],
                },
               
            },
            {
                field: 'TareaAsignada',
                width: '30%',
                title: "Tarea asignada",
                align: 'center',
            },
            {
                field: 'Acciones',
                title: "Acciones previstas <br> para su atencion",
                width: '5%',
                align: 'center',
                //filter: {
                //    type: "select",
                //    data: datosselect[0]
                //},
                //sortable: true,

            },
            {
                field: 'FechaAsignacion',
                title: "<div>Fecha de</div><div> asignacion</div>",
                width: '7%',
                align: 'center',
                sortable: true,
                formatter: formato_fecha_corta,
               // filter: { type: "input" },


            },
            {
                field: 'FechaComprometida',
                title: "Fecha <br>comprometida <br>de cierre",
                width: '7%',
                align: 'center',
                sortable: true,
                formatter: formato_fecha_corta,
                //filter: { type: "input" },

            },
            {
                field: "HorasDiariasAsignadas",
                title: "Horas <br>diarias <br>asignadas",
                width: '7%',
                sortable: true,               
                align: 'center',
                
            },
            {
                field: "tareaResponsable",
                width: '10%',
                title: "Responsable <br> de la tarea",
                sortable: true,
                filter: { type: "input" },
                //filter: {
                //    type: "select",
                //    data: datosselect[2]
                //},
             //   visible: false,
                formatter: responsabletarea,
                align: 'center',

            },
            {
                field: "estadoTareaEstadoTarea1",
                width: '10%',
                title: "Estado actual",
                sortable: true,
                formatter: labelestado,
                filter: {
                    type: "select",
                    data: datosselect[3],
                },
                align: 'center',
            },
            {
                field: "FechaCierre",
                width: '10%',
                title: "Fecha de <br>cierre (real)",
                sortable: true,
                formatter: formato_fecha_corta,
                visible: false,
                align: 'center',
            },
            {
                field: "Eficiencia",
                width: '10%',
                title: "Eficiencia",
                sortable: true,
                //formatter: formato_fecha_corta,
                visible: false,
                align: 'center',

            },
            {
                title: 'Acciones',
                align: 'center',
                width: '10%',
                events: operateEvents,
                formatter: operateFormatter,
            }]
    });  
    $("#tareasAsignadas").bootstrapTable('resetView');
}
window.operateEvents = {
    'click .editarTarea': function (e, value, row, index) {
        console.log(row)
        if (row.IdEstadoTarea!=2)
        {
            mostrarModalEditar(row);
            $("#tarticulo").bootstrapTable('hideLoading');
        }
        else
        {
            swal("Atencion!", "Este registro no puede ser editado", "warning")
        }
        
    },
    'click .verTarea': function (e, value, row, index) {
        
        window.location = base_url("tareas/ver/" + row.IdTarea);
    }
};
function operateFormatter(value, row, index) {
    var ret = '<button type="button" class="btn btn-default verTarea" aria-label="Right Align">' +
        '<i class="fa fa-external-link" aria-hidden="true"></i></button>';
    if ($("#tipo").val() == 1)
        ret += '<button type="button" class="btn btn-default editarTarea" aria-label="Right Align">' +
        '<i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>';               
    return ret;
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
        ret = '<span class="label label-info text-uppercase">'+value+'</span>';
    if (value == "Finalizado")
        ret = '<span class="label label-success text-uppercase">' + value +'</span>';
    if (value == "Demorado")
        ret = '<span class="label label-warning text-uppercase">' + value +'</span>';
    return (ret);
}
function responsabletarea(value, row, index) {
    var ret = "";
    $.each(value, function (index, val) {
       // console.log(val.responsable.usuariosSistema);
        ret += val.responsable.usuariosSistema.Nombre;
        ret += "<br>";
    });
    //console.log(value)
    return (ret);
}
$(document).on("click", "#btnnuevatarea", function () {
    borrardatosModal();
})
function borrardatosModal()
{    
    $('#IdArea').selectpicker('val', "");
    $("#IdPrioridad").selectpicker('val', "");
    $("#IdTipoTarea").selectpicker('val', "");
    $("#FechaComprometida").val("");
    $("#Acciones").val("");
    $("#TareaAsignada").val("")
    $("#IdTarea").val(0)
    $("#Nro").val(0)
}
function mostrarModalEditar(row)
{    
    $("#agregartarea").modal("show");
    $('#IdArea').selectpicker('val', row.IdArea);
    $("#IdPrioridad").selectpicker('val',row.IdPrioridad);
    $("#IdTipoTarea").selectpicker('val',row.IdTipoTarea);
    $("#FechaComprometida").val(formato_fecha_corta(row.FechaComprometida, null, null));
    $("#Acciones").val(row.Acciones);
    $("#TareaAsignada").val(row.TareaAsignada)
    $("#IdTarea").val(row.IdTarea)
    $("#Nro").val(row.Nro)
}
function agregarcom(e)
{
    var res = e.result;
    var fechahora = moment(res.horafecha, "YYYY-MM-DD HH:mm:ss");
    var dia = fechahora.format("DD");
    var mes = fechahora.month();
    var anio = fechahora.year();
    var meses = Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
    var com ='<li style="display:none" class="newelem">'+
        '<img src="' + base_url("/assets/images/img.png")+'" class="avatar" alt="Avatar"/>'+ 
            '<div class="message_date">'+
                '<h3 class="date text-info">'+dia+'</h3>'+
                '<p class="month">'+meses[mes]+'</p>'+
                '<p class="year">'+anio+'</p>'+
            '</div>'+
            '<div class="message_wrapper">'+
                '<h4 class="heading">'
                    + res.usuario+
                    '<span> '+fechahora.format("HH:mm:ss") +'</span>'+
                '</h4>'+
                '<blockquote class="message">'+                                                 
                        res.comentario+
                '</blockquote>'+
                '<br />'+                
            '</div>'+
        '</li>';
    $("#mensajesusuario").append(com)
    $(".newelem").show("slow");
    $("#comentariotxt").val("");
    retrasarBoton("#comentartarea")        
}


function retornarTablaTareas()
{
    ini = iniciofecha.format('YYYY-MM-DD');
    fin = finfecha.format('YYYY-MM-DD');
    are = $("#area").val();
    var dataJson = {
        fechaIni:ini,
        fechaFin: fin,
        area:are
    };
    $("#comentartarea").attr("disabled", true);
    retornarAjaxParametros(base_url("tareas/retornarTareas"), dataJson);
}
$(document).on("change", "#area", function () {
    retornarTablaTareas()
})