function formatRepoAsignacion(repo) {
    if (repo.loading) return repo.text;
    var markup = '<div class="clearfix">' +
    '<div clas="col-sm-10">' +
    '<div class="clearfix">' + repo.grupo +
    '<div class="col-sm-6">' + repo.nombre + '</div>' +
    '</div></div></div>';
    return markup;
}
function formatRepoSelectionAsignacion(repo) {
    if (repo.nombre == null)
        return repo.text;
    else
        return repo.nombre + " - " + repo.grupo || repo.text;
}
configAsignacion = {
    ajax: {
        url: base_url("asignacion/retornarUsuariosGrupos"),
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
                return { id: item.IdAsignacion, nombre: item.NombreUsuario, grupo: item.NombreGrupo };//modificamos IdNombreActivo por id
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
    templateResult: formatRepoAsignacion, // formato de resultado
    templateSelection: formatRepoSelectionAsignacion, // ejecutar al seleccionar           
}
function mostrarTablaAsignacionOficina(e)
{
    console.log(e);
    $("#tablaAsignacionGrupos").bootstrapTable('destroy');
    $("#tablaAsignacionGrupos").bootstrapTable({

        data: e.result,
        striped: true,
        pagination: true,
        pageSize: "10",
        search: true,
        filter: true,
        showColumns: true,
        uniqueId: 'id',
        columns: [
            {
                field: 'id',
                width: '2%',
                title: 'id',
                visible:false
            },
            {
                field: 'grupo',
                width: '2%',
                title: "Grupo",
                align: 'center',
            },
            {
                field: 'usuario',
                width: '5%',
                title: "Usuario",
                align: 'center',
            },
             {
                 field: 'item',
                 width: '2%',
                 title: 'Equipo',
                 align: 'center',
             },
              {
                  field: 'marca',
                  width: '5%',
                  title: 'Marca',
                  align: 'center',
                  visible:false,
              },
            {
                field: 'modelo',
                width: '5%',
                title: 'Modelo',
                align: 'center',
                visible: false,
            },
            {
                field: 'serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
            },
            {
                field: 'codigo',
                width: '2%',
                title: "Codigo",
                align: 'center',
            },
            {
                field: 'tipo',
                width: '10%',
                title: "Tipo",
                align: 'center',
                visible: false,
            },
            {
                field: 'descripcion',
                width: '10%',
                title: "Descripcion",
                align: 'center',
                visible: false,
            },
            {
                field: 'oficinas',
                width: '10%',
                title: "Oficina",
                align: 'center',
                visible: false,
            },            
            {
                title: '',
                align: 'center',
                width: '1%',
                events: operateEventsAsignacion,
                formatter: operateFormatterAsignacionGrupo,
            }]
    });    
}
function retornarItemsAsignados() {
    retornarAjaxParametros(base_url("asignacion/ItemsAsignadosOficina"), "");
}
function mostrarTablaNoAsignacionOficina(e) {
    console.log(e);
    $("#tablaNoAsignados").bootstrapTable('destroy');
    $("#tablaNoAsignados").bootstrapTable({

        data: e.result,
        striped: true,
        pagination: true,
        pageSize: "10",
        search: true,
        filter: true,
        showColumns: true,
        uniqueId: 'id',
        columns: [
            
             {
                 field: 'id',
                 width: '2%',
                 title: 'id',
                 visible:false
             },
             {
                 field: 'item',
                 width: '2%',
                 title: 'Equipo',
                 align: 'center',
             },
              {
                  field: 'marca',
                  width: '5%',
                  title: 'Marca',
                  align: 'center',
                  visible: false,
              },
            {
                field: 'modelo',
                width: '5%',
                title: 'Modelo',
                align: 'center',
                visible: false,
            },
            {
                field: 'serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
            },
            {
                field: 'codigo',
                width: '2%',
                title: "Codigo",
                align: 'center',
            },
            {
                field: 'tipo',
                width: '10%',
                title: "Tipo",
                align: 'center',
                visible: false,
            },
            {
                field: 'descripcion',
                width: '10%',
                title: "Descripcion",
                align: 'center',
                visible: false,
            },
            {
                field: 'oficinas',
                width: '10%',
                title: "Oficina",
                align: 'center',
                visible: false,
            },
            {
                title: '',
                align: 'center',
                width: '1%',
                events: operateEventsAsignacion,
                formatter: operateFormatterAsignacionItem,
            }]
    });
}
function mostrarTablaPasaAsigar()
{
    
    $("#tablaItemsParaAsignar").bootstrapTable('destroy');
    $("#tablaItemsParaAsignar").bootstrapTable({

     
        striped: true,
        pagination: true,
        pageSize: "10",        
        filter: true,      
        uniqueId: 'id',
        columns: [

             {
                 field: 'id',
                 width: '2%',
                 title: 'id',
                 visible: false
             },
             {
                 field: 'item',
                 width: '2%',
                 title: 'Equipo',
                 align: 'center',
             },
              {
                  field: 'marca',
                  width: '5%',
                  title: 'Marca',
                  align: 'center',
                 
              },
            {
                field: 'modelo',
                width: '5%',
                title: 'Modelo',
                align: 'center',
                
            },
            {
                field: 'serie',
                width: '5%',
                title: 'Serie',
                align: 'center',
            },
            {
                field: 'codigo',
                width: '2%',
                title: "Codigo",
                align: 'center',
            },
            {
                field: 'tipo',
                width: '10%',
                title: "Tipo",
                align: 'center',
                
            },
            {
                field: 'descripcion',
                width: '10%',
                title: "Descripcion",
                align: 'center',
                
            },
            {
                field: 'oficinas',
                width: '10%',
                title: "Oficina",
                align: 'center',
                
            },
            {
                title: '',
                align: 'center',
                width: '1%',
                events: operateEventsAsignacion,
                formatter: operateFormatterAsignacionItemNuevo,
            }]
    });
}
function retornarItemsNoAsignados() {
    retornarAjaxParametros(base_url("asignacion/ItemsNoAsignadosOficina"), "");
}
window.operateEventsAsignacion= {
    'click .EditarRegistro': function (e, value, row, index) {
        EnviarDatosEdicion(row);
    },
    'click .agregarAsignacion':function(e,value,row,index){
        asignarItemTabla(row)
    }, 
    'click .quitarAsignacion': function (e, value, row, index) {
        desasignar(row)
    }, 
    'click .devolverItem': function (e, value, row, index) {
        devolverItem(row)
    },
};
function operateFormatterAsignacionGrupo(value, row, index) {
    return [
        '<button type="button" class="btn btn-default quitarAsignacion" aria-label="Right Align">',
        '<i class="fa fa-minus-circle" aria-hidden="true"></i></button>',
    ].join('');
}
function operateFormatterAsignacionItem(value, row, index) {
    return [
        '<button type="button" class="btn btn-default agregarAsignacion" aria-label="Right Align">',
        '<i class="fa fa-plus-circle" aria-hidden="true"></i></button>',
    ].join('');
}
function operateFormatterAsignacionItemNuevo(value, row, index) {
    return [
        '<button type="button" class="btn btn-default devolverItem" aria-label="Right Align">',
        '<i class="fa fa-minus-circle" aria-hidden="true"></i></button>',
    ].join('');
}
function desasignar(row)
{
    console.log(row.id)
    var obj =
    {
        idItem:row.id
    }
    console.log(obj);
    retornarAjaxParametros(base_url("asignacion/desasignarItem"), obj);
    $("#tablaAsignacionGrupos").bootstrapTable('removeByUniqueId', row.id)
    $("#tablaNoAsignados").bootstrapTable('prepend', row);
    //console.log("quitar")
}
function asignarItemTabla(row)
{
    $("#tablaNoAsignados").bootstrapTable('removeByUniqueId', row.id)
    $("#tablaItemsParaAsignar").bootstrapTable('append', row);
}
function devolverItem(row) {
    $("#tablaItemsParaAsignar").bootstrapTable('removeByUniqueId', row.id)
    $("#tablaNoAsignados").bootstrapTable('prepend', row);
}
$(document).on("click", "#guardarCambios", function () {    
    var datostabla=$("#tablaItemsParaAsignar").bootstrapTable('getData');
    datostabla=JSON.stringify(datostabla);
    var obj =
    {
        usuarioGrupo: $("#usuarioGrupo").val(),
        tabla: datostabla,
    }
    console.log(obj);
    retornarAjaxParametros(base_url("asignacion/asignarItems"), obj);
})