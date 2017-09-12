var idfila = 0;
function formatRepo(repo) {
    if (repo.loading) return repo.text;
    var markup = '<div class="clearfix">' +
    '<div clas="col-sm-10">' +
    '<div class="clearfix">' +
    '<div class="col-sm-6">' + repo.nombre + '</div>' +
    '</div></div></div>';
    return markup;
}
function formatRepoSelection(repo) {

    return repo.nombre || repo.text;
}
function formatRepoUsuario(repo) {
    if (repo.loading) return repo.text;
    var markup = '<div >' + repo.nombre + '</div>';
    return markup;
}
function formatRepoSelectionUsuario(repo) {

    return repo.nombre || repo.text;
}


/***************************************/
configUsuario = {
    ajax: {
        url: base_url("Usuarios/Autocompletar"),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                b: params.term, //  texto a buscar              
                page: params.page
            };
        },
        processResults: function (data, page) {
         
            var arreglo = data;
            var modificado = arreglo.map(item => {
                return { id: item[2], nombre: item[0] };//modificamos IdNombreActivo por id
            });
            return {
                results: modificado,
            };
        },
        cache: true
    },
    selectOnClose: true,
    escapeMarkup: function (markup) { return markup; }, // convierte en HTML el resultado
    minimumInputLength: 1,
    templateResult: formatRepoUsuario, // formato de resultado
    templateSelection: formatRepoSelectionUsuario, // ejecutar al seleccionar           
  
}
config = {
    ajax: {
        url: base_url("inventario/AutocompletarNombre"),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                b: params.term, //  texto a buscar
                t: $("#IdTipoItem").val(),
                page: params.page
            };
        },
        processResults: function (data, page) {
            var arreglo = data.items;
            var modificado = arreglo.map(item => {
                return { id: item.IdNombreActivo, nombre: item.Nombre };//modificamos IdNombreActivo por id
            });
            return {
                results: modificado,
            };
        },
        cache: true
    },
    selectOnClose: true,
    escapeMarkup: function (markup) { return markup; }, // convierte en HTML el resultado
    minimumInputLength: 1,
    templateResult: formatRepo, // formato de resultado
    templateSelection: formatRepoSelection, // ejecutar al seleccionar           
}
config2 = {
    ajax: {
        url: base_url("inventario/AutocompletarMarca"),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                b: params.term, //  texto a buscar                        
                page: params.page
            };
        },
        processResults: function (data, page) {
            var arreglo = data.items;
            var modificado = arreglo.map(item => {
                return { id: item.IdMarcaActivo, nombre: item.Marca };//modificamos IdNombreActivo por id
            });
            return {
                results: modificado,
            };
        },
        cache: true
    },
    selectOnClose: true,
    escapeMarkup: function (markup) { return markup; }, // convierte en HTML el resultado
    minimumInputLength: 1,
    templateResult: formatRepo, // formato de resultado
    templateSelection: formatRepoSelection, // ejecutar al seleccionar           
}
config3 = {
    ajax: {
        url: base_url("inventario/AutocompletarModelo"),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                b: params.term, //  texto a buscar
                page: params.page
            };
        },
        processResults: function (data, page) {
            var arreglo = data.items;
            var modificado = arreglo.map(item => {
                return { id: item.IdModeloActivo, nombre: item.Modelo };//modificamos IdNombreActivo por id
            });
            return {
                results: modificado,
            };
        },
        cache: true
    },
    selectOnClose: true,
    escapeMarkup: function (markup) { return markup; }, // convierte en HTML el resultado
    minimumInputLength: 1,
    templateResult: formatRepo, // formato de resultado
    templateSelection: formatRepoSelection, // ejecutar al seleccionar           
}
/**********************************************/

$(document).ready(function () {
    // retornarTablaItems();
    //retornarTabla3AsignacionAgencia();
})
function retornarTablaItems()
{
    retornarAjaxParametros(base_url("inventario/retornarInventario"), "");
    $("#idNombreActivo").val('').trigger('change');
    $("#IdMarcaActivo").val('').trigger('change');
    $("#IdModeloActivo").val('').trigger('change');
    $("#Serie").val("");
    $("#Codigo").val("");
    $("#Descripcion").val("");
    $("#IdItem").val("0");
}
function mostrarTablaItems(r)
{    
    res = r.result    
    $("#tablaItemsingresados").bootstrapTable('destroy');
    $("#tablaItemsingresados").bootstrapTable({

        data: res,
        striped: false,
        pagination: true,
        pageSize: "10",
        search: false,        
        filter: true,
        showColumns: false,

        columns: [
             {
                 field: 'NombreActivo.Nombre',
                 width: '2%',
                 title: 'Item',
                 align: 'center',
                 sortable: true,
             },
              {
                  field: 'MarcaActivo.Marca',
                  width: '5%',
                  title: 'Marca',
                  align: 'center',
                  sortable: true,
              },
            {
                field: 'ModeloActivo.Modelo',
                width: '5%',
                title: 'Modelo',
                align: 'center',
                sortable: true,               
            },
            {
                field: 'Serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
            },
            {
                field: 'Codigo',
                width: '10%',
                title: "Codigo",
                align: 'center',
            },   
            {
                field: 'TipoItem.TipoItem1',
                width: '10%',
                title: "Tipo",
                align: 'center',              
            },
            {
                field: 'Descripcion',
                width: '10%',
                title: "Descripcion",
                align: 'center',
            },
            {
                field: 'Oficinas.Nombre',
                width: '10%',
                title: "Oficina",
                align: 'center',
            },
             {
                 field: 'FechaRegistro',
                 width: '10%',
                 title: "Registro",
                 align: 'center',
                 sortable: true,
                 formatter: formato_fecha_corta,
             },
            {
                title: 'Opciones',
                align: 'center',
                width: '2%',
                events: operateEventsRegistro,
                formatter: operateFormatterRegistro,
            }]
    });
    $("#tareasIngenieria").bootstrapTable('resetView');
}
function EnviarDatosEdicion(e)
{
    $('body,html').animate({ scrollTop: 0 }, 100);
    console.log(e);
    /***********Limpiar*************/
    $("#idNombreActivo").val('').trigger('change');
    $("#IdMarcaActivo").val('').trigger('change');
    $("#IdModeloActivo").val('').trigger('change');
    $("#IdItem").val("0");
    /*******************************/
    $("#IdTipoItem").val(e.IdTipoItem);
    $("#Serie").val(e.Serie);
    if (e.NombreActivo != null)
        $("#idNombreActivo").empty().append('<option value="' + e.NombreActivo.IdNombreActivo + '">' + e.NombreActivo.Nombre + '</option>').val(e.NombreActivo.IdNombreActivo).trigger('change');
    if (e.MarcaActivo != null)
        $("#IdMarcaActivo").empty().append('<option value="' + e.MarcaActivo.IdMarcaActivo + '">' + e.MarcaActivo.Marca + '</option>').val(e.MarcaActivo.IdMarcaActivo).trigger('change');
    if ( e.ModeloActivo != null)
        $("#IdModeloActivo").empty().append('<option value="' + e.ModeloActivo.IdModeloActivo + '">' + e.ModeloActivo.Modelo + '</option>').val(e.ModeloActivo.IdModeloActivo).trigger('change');

    $("#Codigo").val(e.Codigo);
    $("#Descripcion").val(e.Descripcion);
    $("#IdItem").val(e.IdItem);
}
function EnviarDatosEdicionTabla2(e) {
    $('body,html').animate({ scrollTop: 0 }, 100);
   
    /***********Limpiar*************/
    $("#idNombreActivo").val('').trigger('change');
    $("#IdMarcaActivo").val('').trigger('change');
    $("#IdModeloActivo").val('').trigger('change');
    $("#IdItem").val("0");
    /*******************************/
    $("#IdTipoItem").val(e.IdTipoItem);
    $("#Serie").val(e.Serie);
    //if (e.NombreActivo != null)
    $("#idNombreActivo").empty().append('<option value="' + e.idNombreActivo + '">' + e.Nombre + '</option>').val(e.idNombreActivo).trigger('change');
    //if (e.MarcaActivo != null)
        $("#IdMarcaActivo").empty().append('<option value="' + e.IdMarcaActivo + '">' + e.Marca + '</option>').val(e.IdMarcaActivo).trigger('change');
    //if (e.ModeloActivo != null)
        $("#IdModeloActivo").empty().append('<option value="' + e.IdModeloActivo + '">' + e.Modelo + '</option>').val(e.IdModeloActivo).trigger('change');

    $("#Codigo").val(e.Codigo);
    $("#Descripcion").val(e.Descripcion);
    $("#IdItem").val(e.IdItem);
}

function operateFormatterRegistro(value, row, index) {
    return [
        '<button type="button" class="btn btn-default EditarRegistro" aria-label="Right Align">',
        '<i class="fa fa-pencil" aria-hidden="true"></i></button>',      
    ].join('');
}
function operateFormatterRegistroTabla2(value, row, index) {
    return [
        '<button type="button" class="btn btn-default EditarRegistroTabla2" aria-label="Right Align">',
        '<i class="fa fa-pencil" aria-hidden="true"></i></button>',
    ].join('');
}
function operateFormatterRegistroTabla3(value, row, index) {
    if (row.tipo == 0)
    {
        return [
        '<button type="button" class="btn btn-default verRegistroGrupoAsignado" aria-label="Right Align">',
        '<i class="fa fa-search  " aria-hidden="true"></i></button>',
        ].join('');
    }
    else
    {
        return [
        '<button type="button" class="btn btn-default verRegistroEquipoAsignado" aria-label="Right Align">',
        '<i class="fa fa-search" aria-hidden="true"></i></button>',
        ].join('');
    }

}
function operateFormatterGrupoEquipo(value, row, index) {
    if (row.tipo)
    {
        return [
        '<i class="fa fa-cube" aria-hidden="true"></i>',
        ].join('');
    }
    else
    {
        return [
        '<i class="fa fa-cubes" aria-hidden="true"></i>',
        ].join('');
    }
    
}
window.operateEventsRegistro = {
    'click .EditarRegistro': function (e, value, row, index) {        
        EnviarDatosEdicion(row);
    },
    'click .EditarRegistroTabla2': function (e, value, row, index) {
        EnviarDatosEdicionTabla2(row);
       
        //eliminar registro de la tabla       
        $('#tablaItemsAgregados').bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
    },
    'click .verRegistroGrupoAsignado': function (e, value, row, index) {
        retornarDetalleItems(row.id)        
        //$('#detalleItem').modal('show');
    },
    'click .verRegistroEquipoAsignado': function (e, value, row, index) {
        retornarDetalleEquipo(row.id)
       //$('#detalleItem').modal('show');
   },
};
$(document).on("change", "#IdOficina", function () {
    agregarAreas()
})
function retornarDetalleItems(id)
{
    var json = {
        IdAsignacion: id,
    }
    retornarAjaxParametros(base_url("inventario/retornarDetalleItems"), json);    
}
function retornarDetalleEquipo(id) {
    var json = {
        IdItem: id,
    }
    retornarAjaxParametros(base_url("inventario/retornarDetalleEquipo"), json);
}
function mostrarDetalleModal(e)
{
    
    if (e.result.length > 0)
    {
        if (e.result[0].Asignacion != null)
        {
        
            vm2.nombreGrupoDetalle = e.result[0].Asignacion.NombreGrupo;
            vm2.usuarioDetalle = e.result[0].Asignacion.NombreUsuario;
            vm2.observacionDetalle = e.result[0].Observacion;           
        }
        mostrarTablaItemsDetalle(e.result);
    }
    else
    {
        vm2.nombreGrupoDetalle = "";
        vm2.usuarioDetalle = "";
        vm2.observacionDetalle = "";
        $("#tablaItemsDetalle").bootstrapTable('removeAll');
    }
    $('#detalleItem').modal('show');
}
function mostrarTablaItemsDetalle(e)
{
    $("#tablaItemsDetalle").bootstrapTable('destroy');
    $("#tablaItemsDetalle").bootstrapTable({
        data: e,
        striped: false,
        pagination: true,
        search: false,
        filter: true,
        showColumns: false,
        rowStyle: rowStyle,
        columns: [
             {
                 field: 'NombreActivo.Nombre',
                 width: '1%',
                 title: 'Equipo',
                 align: 'center',
             },
             {
                 field: 'MarcaActivo.Marca',
                 width: '2%',
                 title: 'Marca',
                 align: 'center',
                 sortable: true,
             },
             {
                 field: 'ModeloActivo.Modelo',
                 width: '5%',
                 title: 'Modelo',
                 align: 'center',
                 sortable: true,
             },
            {
                field: 'Serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
                sortable: true,
            },
            {
                field: 'Codigo',
                width: '5%',
                title: 'Codigo',
                align: 'center',
                sortable: true,
            },
            {
                field: 'TipoItem.TipoItem1',
                width: '5%',
                title: 'Tipo',
                align: 'center',
                sortable: true,
            },
            {
                field: 'Descripcion',
                width: '5%',
                title: 'Descripcion',
                align: 'center',
                sortable: true,
            },
            {
                field: 'Oficinas.Nombre',
                width: '5%',
                title: 'Oficina',
                align: 'center',
                sortable: true,
            },
             {
                 field: 'Areas.Area',
                 width: '5%',
                 title: 'Area',
                 align: 'center',
                 sortable: true,
             }]
    });
}
function agregarAreas()
{
    var json = {
        idoficina: $("#IdOficina").val()
    }
    retornarAjaxParametros(base_url("inventario/retornarAreas"), json);
}
function cargarAreas(e) {

    var result = e.result;
    var modificado = result.map(item => {
        return { id: item.Areas.IdArea, text: item.Areas.Area };//modificamos cada objeto de array
    });
    $("#IdArea").empty();
    $("#IdArea").select2({
        data: modificado,
        selectOnClose: true,
    })  
}
function mostrarTablaAgregados()
{    
    $("#tablaItemsAgregados").bootstrapTable('destroy');
    $("#tablaItemsAgregados").bootstrapTable({
        
        striped: false,
        pagination: true,
        pageSize: "10",
        search: false,        
        filter: true,
        showColumns: false,

        columns: [
            {
                field: 'id',
                title: 'id',
                visible: false
            },
             {
                 field: 'idNombreActivo',                 
                 title: 'idNombreActivo',
                 visible:false
             },
             {
                 field: 'Nombre',
                 width: '2%',
                 title: 'Item',
                 align: 'center',
                 sortable: true,
             },
             {
                 field: 'IdMarcaActivo',                 
                 title: 'IdMarcaActivo',
                 visible:false
             },
             {
                 field: 'Marca',
                 width: '5%',
                 title: 'Marca',
                 align: 'center',
                 sortable: true,
             },
             {
                 field: 'IdModeloActivo',
                 title: 'IdModeloActivo',
                 visible: false
             },
            {
                field: 'Modelo',
                width: '5%',
                title: 'Modelo',
                align: 'center',
                sortable: true,               
            },
            {
                field: 'Serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
            },          
            {
                field: 'Descripcion',
                width: '10%',
                title: "Descripcion",
                align: 'center',
            },
            {
                field: 'IdTipoItem',
                title: 'IdTipoItem',
                visible: false
            },
             {
                 field: 'IdOficina',
                 title: 'IdOficina',
                 visible: false
             },
             {
                 field: 'IdArea',
                 title: 'IdArea',
                 visible: false
             },
             {
                 field: 'Codigo',
                 title: 'Codigo',
                 visible: false
             },
            {
                title: 'Opciones',
                align: 'center',
                width: '2%',
                events: operateEventsRegistro,
                formatter: operateFormatterRegistroTabla2,
            }]
    }); 
    $("#tablaItemsAgregados").bootstrapTable('resetView');
}
function mostrarTablaAgregadosAgencia(r) {
    console.log(r);
   
    $("#tablaItemsAgenciaAgregados").bootstrapTable('destroy');
    $("#tablaItemsAgenciaAgregados").bootstrapTable({
        data:r.result,
        striped: false,
        pagination: true,
        
        search: false,
        filter: true,
        showColumns: false,
        rowStyle: rowStyle,
        columns: [
             {
                 field: 'tipo',
                 width: '1%',
                 title: '',
                 align: 'center',
                 formatter: operateFormatterGrupoEquipo,
                 visible: true,
             },
             {
                 field: 'nombre',
                 width: '2%',
                 title: 'Nombre',
                 align: 'center',
                 sortable: true,
             },             
             {
                 field: 'equipos',
                 width: '5%',
                 title: 'Equipos',
                 align: 'center',
                 sortable: true,
             },             
            {
                field: 'area',
                width: '5%',
                title: 'Area',
                align: 'center',
                sortable: true,
            },
             
             {
                 field: 'id',
                 title: 'id',
                 visible: false,
             },
            {
                title: '',
                align: 'center',
                width: '2%',
                events: operateEventsRegistro,
                formatter: operateFormatterRegistroTabla3,
            }]
    });
  //  $("#tablaItemsAgenciaAgregados").bootstrapTable('resetView');
}
function rowStyle(row, index)
{
    if (row.tipo==0) {
        return {
            classes: "success",
        };
    }
    else {
        return {};
    }
}
function agregarRegistrosTabla2() {    
    var rows = [];
    //console.log($("#IdModeloActivo").select2('data'));
    var nombreActivo=$("#idNombreActivo").select2('data')[0]['nombre'] || $("#idNombreActivo").select2('data')[0]['text'];
    if(nombreActivo.length>0)
    {
        if ($("#IdArea").val() > 0) {
            idfila++;
            rows.push({
                id: idfila,
                idNombreActivo: $("#idNombreActivo").select2('data')[0]['id'],
                Nombre: $("#idNombreActivo").select2('data')[0]['nombre'] || $("#idNombreActivo").select2('data')[0]['text'],
                IdMarcaActivo: $("#IdMarcaActivo").select2('data')[0]['id'],
                Marca: $("#IdMarcaActivo").select2('data')[0]['nombre'] || $("#IdMarcaActivo").select2('data')[0]['text'],
                IdModeloActivo: $("#IdModeloActivo").select2('data')[0]['id'],
                Modelo: $("#IdModeloActivo").select2('data')[0]['nombre'] || $("#IdModeloActivo").select2('data')[0]['text'],
                Serie: $("#Serie").val(),
                Descripcion: $("#Descripcion").val(),
                IdTipoItem: $("#IdTipoItem").val(),
                IdOficina: $("#IdOficina").val(),
                IdArea: $("#IdArea").val(),
                Codigo: $("#Codigo").val(),
            })
            // console.log(rows);
            $("#tablaItemsAgregados").bootstrapTable('append', rows);
        }
        else {
            swal("Error!", "No se selecciono el Area", "error")
        }
    }
    else
    {
        swal("Error!", "No se selecciono el equipo", "error")
    }
    
}
$(document).on("click", "#agregarREgistrosTabla2", function () {   
    agregarRegistrosTabla2();
    /****LIMPIAR*****/
    $("#idNombreActivo").val('').trigger('change');
    $("#IdMarcaActivo").val('').trigger('change');
    $("#IdModeloActivo").val('').trigger('change');
    $("#Serie").val("");
    $("#Codigo").val("");
    $("#Descripcion").val("");
    $("#IdItem").val("0");
    /****************/
})
function limpiarTabla2()
{
    var grupoEquipo = $("#grupoEquipo").val("");
    var nombreUsuario = $("#UsuarioGrupo").val('').trigger('change');
    var observacion = $("#observacion").val("");
    $("#tablaItemsAgregados").bootstrapTable('removeAll');
}
$(document).on("click", "#GuardarRegistros", function () {
    var tabla = $("#tablaItemsAgregados").bootstrapTable('getData');
    var grupoEquipo = $("#grupoEquipo").val();
    var nombreUsuario=($("#UsuarioGrupo").select2('data').length>0)?$("#UsuarioGrupo").select2('data')[0]['nombre']:"";
    var observacion = $("#observacion").val();    
    if (tabla.length == 0)
    {
        swal("Error!", "No se tienen datos para guardar", "error")
    }
    else
    {
        tabla = JSON.stringify(tabla);
        json = {
            tabla: tabla,
            nombreGrupo: $.trim(grupoEquipo),
            nombreUsuario: nombreUsuario,
            observacion: $.trim(observacion),
            idOficina:$("#IdOficina").val(),
            idArea: $("#IdArea").val(),
        }
        retornarAjaxParametros(base_url("inventario/GuardarRegistros"), json);
        limpiarTabla2();
    }
    
})
function retornarTabla3AsignacionAgencia()
{
    json = {
        IdOficina: $("#IdOficina").select2('data')[0]['id'],
    }    
    retornarAjaxParametros(base_url("inventario/retornarEquiposAgencia"), json);
}
$(document).on("change", "#IdOficina", function () {
    retornarTabla3AsignacionAgencia();
    agregarNombreOficinaBloques();
})
function agregarNombreOficinaBloques()
{
    var NombreOficina = $("#IdOficina").select2('data')[0]['nombre'] || $("#IdOficina").select2('data')[0]['text'];
    $(".nombreAgenciaRegistro").html(NombreOficina);
    console.log(NombreOficina);
}
