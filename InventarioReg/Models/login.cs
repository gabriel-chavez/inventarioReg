using InventarioReg.Models;
using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemainventario.Models
{
    public class login
    {
        public ResponseModel Acceder(string usuario, string pass)
        {
            var rm = new ResponseModel();
            var ldap = new LdapAutenticar(@"LDAP://10.9.0.12:389/DC=bsol,DC=com,DC=bo");
            var usr = @"bsol\" + usuario;
            ldap = ldap.IsAuthenticated(usr, pass);
           
            if(true)
           //if (ldap.autendicado)   
            {
                rm.SetResponse(true, "Correcto, cargando...");
                var usuariosistema = new Usuarios();
                rm.result = usuariosistema.Obtener(usuario);
            }
            else
            {
                rm.SetResponse(false, ldap.mensaje);
            }
            return rm;
        }
        
    }
}