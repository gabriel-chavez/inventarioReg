function mostrarTablaPermisos()
{
    retornarAjaxParametros(base_url("ajustes/ListarPermisos"), "");
}
function tablaPermisosOficinas(e) {
    console.log(e);
    $("#tablaPermisos").bootstrapTable('destroy');
    $("#tablaPermisos").bootstrapTable({

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
                 visible: false
             },
             {
                 field: 'codRegional',
                 width: '2%',
                 title: 'Regional',
                 align: 'center',
             },
              {
                  field: 'nombre',
                  width: '5%',
                  title: 'Oficina',
                  align: 'center',
                  
              },
            {
                field: 'areas',
                width: '5%',
                title: 'Areas',
                align: 'center',
                
            },                       
            /*{
                title: '',
                align: 'center',
                width: '1%',
                events: operateEventsAsignacion,
                formatter: operateFormatterAsignacionItem,
            }*/]
    });
}

$(".oficinasPermiso").on("change", function () {
    retornarAjaxParametros(base_url("ajustes/ListarAreas"), "");
})