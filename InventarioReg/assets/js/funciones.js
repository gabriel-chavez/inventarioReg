$(document).ready(function () {
    $.fn.select2.defaults.set("theme", "bootstrap");
    $.fn.select2.defaults.set("width", "auto");
})
// Javascript to enable link to tab
var hash = document.location.hash;
var prefix = "tab_";
if (hash) {
    $('.nav-tabs a[href="' + hash.replace(prefix, "") + '"]').tab('show');
}


// Change hash for page-reload
$('.nav-tabs a').on('shown.bs.tab', function (e) {
    window.location.hash = e.target.hash.replace("#", "#" + prefix);
});
function limpiarModalver(modal) {
    dd = $("#modalverenlaces", modal).find("dd").toArray();
    $.each(dd, function (index, value) {
        $(value).html("");
    })
}
function datosModal(x) {
   
    var result = JSON.parse(x.result)
    var modal = "#modal_verEnlace" + result.enlacesTipo.tipo
    limpiarModalver(result);
    //console.log(modal)
    console.log(result)
    $("#nroOficina",modal).html(result.oficinas.nroOficina);
    $("#nombreOficina", modal).html(result.oficinas.nombre_oficina);
    $("#tipoOficina", modal).html(result.oficinas.tipoOficina.tipo);
    $("#departamento", modal).html(result.oficinas.ciudades.departamentos.departamento);
    $("#ciudad", modal).html(result.oficinas.ciudades.ciudad);
    $("#direccion", modal).html(result.oficinas.direccion);

    var enlace = (result.enlace === 1) ? "Primario" : "Secundario";
    var contratos = "";
    if (result.contratos > 0) {
        $.each(result.contratos, function (index, value) {
            contratos += rvalue.contrato + ",";
        })
    }
    $("#enlace", modal).html(enlace)
    $("#proveedor", modal).html(result.proveedores.proveedor);
    $("#contrato", modal).html(contratos);
    $("#tecnologia", modal).html(result.enlacesTecnologia.tecnologia);
    $("#velocidad", modal).html(result.velocidad);
    $("#mensualidad", modal).html(result.mensualidad);
    /*SERVICIO*/

    if (result.enlacesServicios.length > 0) {
        $("#servicionombre", modal).html(result.enlacesServicios[0].servicio);
        $("#dirservicio", modal).html(result.enlacesServicios[0].direccion);
    }
    /*INTERNET*/
    
    if (result.enlacesInternet.length > 0) {
        $("#planInternet", modal).html(result.enlacesInternet[0].planinternet);
        
    }
    $("#observaciones", modal).html(result.observaciones);
    $(modal).modal("show");
}
function editarDatosModal (x) {

    var result = JSON.parse(x.result)
    var modal = "#modalEnlace" + result.enlacesTipo.tipo
    limpiarModalver(modal);
    //console.log(modal)
    console.log(result)
    $("#enlaceID", modal).val(result.enlaceID);
    $("#oficinaID", modal).val(result.oficinaID);
    $("#proveedorID", modal).val(result.proveedorID);
    $("#enlace", modal).val(result.enlace);
    $("#enlaceTecnologiaID", modal).val(result.enlacesTecnologia.enlaceTecnologiaID);
    $("#velocidad", modal).val(result.velocidad);
    $("#mensualidad", modal).val(result.mensualidad);
    
    /*SERVICIO*/

    if (result.enlacesServicios.length > 0) {
        $("#_servicio", modal).val(result.enlacesServicios[0].servicio);
        $("#_direccion", modal).val(result.enlacesServicios[0].direccion);
        $("#enlaceServicioID", modal).val(result.enlacesServicios[0].enlaceServicioID);        
    }
    /*INTERNET*/

    if (result.enlacesInternet.length > 0) {
        $("#_planinternet", modal).val(result.enlacesInternet[0].planinternet);
        $("#enlacesInternetID", modal).val(result.enlacesInternet[0].enlacesInternetID);
        
    }
    $("#observaciones", modal).val(result.observaciones);
    $(modal).modal("show");
}

function retornarAjax(url)
{
    /*****RETORNAR AJAX****************/   
    var content = $(this).closest("#contenido");  //#contenido es el contenedor de la pagina      
    // Creamos un div que bloqueara todo el contenedor
    var block = $('<div class="block-loading" />');
    content.prepend(block);
    // En caso de que haya habido un mensaje de alerta
    $(".alert", content).remove();

    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: url,
        success: function (r) {

            block.remove();
            // Mostrar mensaje
            
            if (r.message != null) {

                if (r.message.length > 0) {
                    var css = "";
                    if (r.response) css = "alert-success";
                    else css = "alert-danger";

                    var message = '<div class="alert ' + css + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + r.message + '</div>';
                    content.prepend(message);
                }
            }

            // Ejecutar funciones
            if (r.function != null) {

                //  setTimeout(func, 0);
                var fname = r.function
                eval(fname + '(r)');

            }
            // Redireccionar
            if (r.href != null) {
                if (r.href == 'self') window.location.reload(true);
                else window.location.href = r.href;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            block.remove();
            content.prepend('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + errorThrown + ' | <b>' + textStatus + '</b></div>');
        }
    });
}
function retornarAjaxParametros(url,dataJson) {
    /*****RETORNAR AJAX****************/
    // var content = $(this).closest("#contenido");
    var content = $("#contenido");
    //console.log(content);
    // Creamos un div que bloqueara todo el contenedor
    var block = $('<div class="block-loading" />');
    content.prepend(block);
    // En caso de que haya habido un mensaje de alerta
    $(".alert", content).remove();
    if (typeof NProgress != 'undefined')      
        NProgress.start();
         
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: url,
        data: dataJson,
        success: function (r) {

            block.remove();
            // Mostrar mensaje
            if (typeof NProgress != 'undefined')
                NProgress.done();
            if (r.message != null) {

                if (r.message.length > 0) {
                    var css = "";
                    if (r.response) css = "alert-success";
                    else css = "alert-danger";

                    var message = '<div class="alert ' + css + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + r.message + '</div>';
                    
                    content.prepend(message);
                }
            }

            // Ejecutar funciones
            if (r.function != null) {
                var fname = r.function
                eval(fname + '(r)'); //ejecutar funciones con parametros

            }
            // Redireccionar
            if (r.href != null) {
                if (r.href == 'self') window.location.reload(true);
                else window.location.href = r.href;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            block.remove();
            content.prepend('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + errorThrown + ' | <b>' + textStatus + '</b></div>');
        }
    });
}
function formato_fecha_corta(value, row, index) {
    var fecha = ""
    //console.log(value)
    if ((value == "0000-00-00 00:00:00") || (value == "") || (value == null))
        fecha = "sin fecha de registro"
    else
        fecha = moment(value, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY")
    return [fecha]
}
function base_url(complemento) {
    complemento = (complemento) ? complemento : '';
    var baseurl = $('#baseurl').val();
    return baseurl + complemento;
}

 $('textarea[maxlength]').keyup(function(){          
        var limit = parseInt($(this).attr('maxlength'));  
        var text = $(this).val();  
        var chars = text.length;  
        if(chars > limit){  
            var new_text = text.substr(0, limit);  
            $(this).val(new_text);  
        }  
 });
 function retrasarBoton(id) {
     setTimeout(function () {
         $(id).attr("disabled", false);
     }, 2000);
 }