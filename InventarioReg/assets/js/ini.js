$(document).ready(function () {
    $("body").on('click', 'button', function () {
      
        // Si el boton no tiene el atributo ajax no hacemos nada
       var btn = $(this);
        if ($(this).data('ajax') == undefined)
        {
            if ($(this).data('getajax') == undefined) return
        }

        // El metodo .data identifica la entrada y la castea al valor más correcto
        //if ($(this).data('ajax') != true) return;
        if ($(this).data('ajax') == true)
        {           
            var form = $(this).closest("form");
            var buttons = $("button", form);
            var button = $(this);
            var url = form.attr('action');
         
            if (button.data('confirm') != undefined) {
                if (button.data('confirm') == '') {
                    if (!confirm('¿Esta seguro de realizar esta acción?')) return false;
                } else {
                    if (!confirm(button.data('confirm'))) return false;
                }
            }
            if (button.data('delete') != undefined) {
                if (button.data('delete') == true) {
                    url = button.data('url');
                }
            } else {
                if (form.valid != undefined)
                {
                    if (!form.valid()) {

                        return false;
                    }
                }
                
            }
            // Creamos un div que bloqueara todo el formulario
            var block = $('<div class="block-loading" />');
            form.prepend(block);

            // En caso de que haya habido un mensaje de alerta
            $(".alert", form).remove();

            // Para los formularios que tengan CKupdate
            if (form.hasClass('CKupdate')) CKupdate();

            if (typeof NProgress != 'undefined')
                NProgress.start();
            form.ajaxSubmit({
                dataType: 'JSON',
                type: 'POST',
                url: url,
                success: function (r) {
                    if (typeof NProgress != 'undefined')
                        NProgress.done();
                    block.remove();
                    if (r.response) {
                        if (!button.data('reset') != undefined) {
                            if (button.data('reset')) form.reset();
                        }
                        else {
                            form.find('input:file').val('');
                        }
                    }

                    // Mostrar mensaje

                    if (r.message != null) {

                        if (r.message.length > 0) {
                            var css = "";
                            if (r.response) css = "alert-success";
                            else css = "alert-danger";

                            var message = '<div class="alert ' + css + ' alert-dismissable fade in"><button type="button" class="close" data-dismiss="alert" aria-label="Close" aria-hidden="true">&times;</button>' + r.message + '</div>';
                          
                            if (btn.data('mensaje') == undefined) {
                                form.prepend(message);
                            } else {                                
                                $(btn.data('mensaje')).html(message)
                            }
                            
                        }
                    }

                    // Ejecutar funciones
                    if (r.function != null) {
                        setTimeout(r.function, 0);
                    }
                    // Redireccionar
                    if (r.href != null) {
                        if (r.href == 'self') window.location.reload(true);
                        else window.location.href = r.href;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    block.remove();
                    form.prepend('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + errorThrown + ' | <b>' + textStatus + '</b></div>');
                }
            });
        }
        
        /*****RETORNAR AJAX****************/
        if ($(this).data('getajax') == true) {
          
            var content = $(this).closest("#contenido");          
            var url = $(this).data('action');          
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
                            if ($(this).data('mensajediv') == undefined) {
                                content.prepend(message);
                            } else {
                                console.log($(this).data('mensajediv'))
                            }
                            
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
        
        
        
        return false;
    })
})

jQuery.fn.reset = function () {
    $("input:password,input:file,input:text,textarea", $(this)).val('');
    $("input[type=number]", $(this)).val("")
    $("input:checkbox:checked", $(this)).click();
    $("select").each(function () {
        $(this).val($("option:first", $(this)).val());
    })
};
