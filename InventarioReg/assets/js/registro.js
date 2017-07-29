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
/***************************************/
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
    retornarTablaItems();
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
    $('#tablaItemsingresados').modal('hide');
    res = r.result
    //console.log(res);
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
function operateFormatterRegistro(value, row, index) {
    return [
        '<button type="button" class="btn btn-default EditarRegistro" aria-label="Right Align">',
        '<i class="fa fa-pencil" aria-hidden="true"></i></button>',      
    ].join('');
}
window.operateEventsRegistro = {
    'click .EditarRegistro': function (e, value, row, index) {        
        EnviarDatosEdicion(row);
    },    
};
