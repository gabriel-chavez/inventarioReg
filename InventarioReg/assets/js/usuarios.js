function retornarTablaUsuarios() {       
   // $("#comentartarea").attr("disabled", true);
    retornarAjax(base_url("usuarios/retornarUsuarios"));
}
function mostrarTablaUsuarios(r) {
    $('#agregarUsuario').modal('hide');
    res = r.result
   
    $("#listausuarios").bootstrapTable('destroy');
    $("#listausuarios").bootstrapTable({
        data: res,        
        striped: true,
        pagination: true,
        pageSize: "10",
        search: true,
        searchOnEnterKey: true,        
        showColumns: true,
        columns: [
             {
                 field: 'Nombre',
                 width: '20%',
                 title: 'Nombre',
                 align: 'left',
                 sortable: true,
             },
            {
                field: 'Usuario',
                width: '10%',
                title: 'Usuario',
                align: 'left',
                sortable: true,               
            },
            {
                field: 'Email',
                width: '20%',
                title: 'Email',
                align: 'left',
                sortable: true,
            },
            {
                field: 'Cargo',
                width: '10%',
                title: 'Cargo',
                align: 'left',
                sortable: true,
            },
            {
                field: 'Tipo',
                width: '10%',
                title: 'Tipo',
                align: 'center',
                sortable: true,
                formatter: formatoTipo,
            },
            {
                field: 'Roles',
                width: '20%',
                title: "Opciones",
                formatter: formatoOpciones,
            },
            {
                field: '',
                width: '20%',
                title: "Encargado",
                
                formatter: formatoEncargado,
            },
            {
                field: '',
                width: '20%',
                title: "Area",
                
                formatter: formatoArea,
            },
            {
                title: 'Acciones',
                align: 'center',
                width: '20%',
                events: operateEventsUsuario,
                formatter: operateFormatterUsuario,
            }]
    });
    $("#listausuarios").bootstrapTable('resetView');
}
window.operateEventsUsuario = {
    'click .editarUsuario': function (e, value, row, index) {
        console.log(row)
        mostrarModalEditarUsuario(row);
    },
    'click .eliminarUsuario': function (e, value, row, index) {        
    }
};

function operateFormatterUsuario(value, row, index) {
    return [        
        '<button type="button" class="btn btn-default editarUsuario" aria-label="Right Align">',
        '<i class="fa fa-pencil" aria-hidden="true"></i></button>',
        '<button type="button" class="btn btn-default eliminarUsuario" aria-label="Right Align">',
        '<i class="fa fa-trash" aria-hidden="true"></i></button>',

    ].join('');
}
function formatoOpciones(value, row, index) {
    var menu = JSON.parse(value);
    var opcion = "";    
    if (menu != null)
    {
        var tam = Object.keys(menu).length;      
        $.each(menu, function (index, value) {
            opcion += " " + opciones(value);
            if(index<tam-1)
                opcion += ", ";
        })
    }
    return opcion;
}
function formatoArea(value, row, index) {
    
    if (row.responsable.length > 0)
        return (row.responsable[0].areas.Area);
    else
        return "-";    
}
function formatoEncargado(value, row, index) {

    if (row.responsable.length > 0)
        return ((row.responsable[0].Encargado==1)?"Encargado":"");
    else
        return "-";
}
function opciones(op)
{
    
    switch(op)
    {
        case "11":
            return "Enlaces de comunicacion";
            break;
        case "21":
            return "Tareas";
            break;
        case "31":
            return "Inbox (cambios ingenieria)";
            break;
        case "32":
            return "Reportes (cambios ingenieria)";
            break;
    }
}
function formatoTipo(value, row, index) {
    switch (value) {
        case 1:
            return "Admin";
        case 2:
            return "Usuario";
    }   
}
$("#usuariobuscar").autocomplete({
    minLength: 2,
    source: function (request, response) {

       // $(".cargandosol").css({ "display": "block" });
        $(".usuariobuscarid").val("");
        encuentrausuario(0);
        $.ajax({
            url: base_url("Usuarios/autocompletar"),
            dataType: "json",
            data: {
                b: request.term
            },
            success: function (data) {
                response(data);
              //  $(".cargandosol").css({ "display": "none" });
            }
        });
    },
    select: function (event, ui) {
        encuentrausuario(1);
        datos = ui.item;

        $("#usuariobuscar").val(ui.item[0]);
        $("#Usuario").val(ui.item[2]);
        $("#Email").val(ui.item[3]+"@bancosol.com.bo");
        $("#Cargo").val(ui.item[1]);
        //$("#usuariobuscarid").val(ui.item[2]);
        return false;
    }
}).autocomplete("instance")._renderItem = function (ul, item) {

        return $("<li>")
          .append("<a><div>" + item[0] + " </div><div class='mailage'>" + item[2] + " - " + item[1] + "</div></a>")
          .appendTo(ul);
};
function encuentrausuario(encuentra) {
    if (encuentra == 0) {
        $('#icono-busqueda').removeClass("glyphicon-ok");
        $('#icono-busqueda').addClass("glyphicon-user");
        $('#icono-busqueda-color').removeClass("coloriconook");
        
        $("#Usuario").val("");
        $("#Email").val("");
        $("#Cargo").val("");
    }
    if (encuentra == 1) {
        $('#icono-busqueda').removeClass("glyphicon-user");
        $('#icono-busqueda').addClass("glyphicon-ok");
        $('#icono-busqueda-color').addClass("coloriconook");
    }
}
function mostrarModalEditarUsuario(row) {
    $("#agregarUsuario").modal("show");
    $('#idUsuario').val(row.idUsuario);
    $("#usuariobuscar").val(row.Nombre);
    $("#Usuario").val(row.Usuario);
    $("#Email").val(row.Email);
    $("#Cargo").val(row.Cargo);    
    $('#Tipo').selectpicker('val', row.Tipo);        
    $('#menus').selectpicker('val', JSON.parse(row.Roles));
    /***********************************/
    var area = "0";
    var encargado = "10";
    var idResponsable = "0";
    if (row.responsable.length > 0)
    {
        area = (row.responsable[0].IdArea);
        encargado = (row.responsable[0].Encargado)
        idResponsable = (row.responsable[0].IdResponsable)
    }       
    $('#Area').selectpicker('val', area);
    $('#Encargado').selectpicker('val', encargado);
    $('#IdResponsable').val(idResponsable);
}
function borrardatosModalUsuario() {    
    $('#idUsuario').val("0");
    $("#usuariobuscar").val("");
    $("#Usuario").val("");
    $("#Email").val("");
    $("#Cargo").val("");   
    $('#menus').selectpicker('val', null);
    $('#Area').selectpicker('val', "0");
    $('#Encargado').selectpicker('val', "10");
    $('#IdResponsable').val("0");
}
$(document).on("click", "#btnnuevousuario", function () {    
    borrardatosModalUsuario();
})