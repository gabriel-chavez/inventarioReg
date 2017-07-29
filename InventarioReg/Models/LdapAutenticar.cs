using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Text;

namespace Proyecto.Models
{
    class LdapAutenticar
    {               
        public string _path { get; set; }
        public bool autendicado { get; set; }
        public string mensaje { get; set; }

        public LdapAutenticar(string path=null)
        {
            _path = path;
        }
        public LdapAutenticar IsAuthenticated(string usr, string pwd)
        {
            
            autendicado = false;
            try
            {
                DirectoryEntry entry = new DirectoryEntry(_path, usr, pwd);
                object nativeObject = entry.NativeObject;
                autendicado = true;
            }
            catch (DirectoryServicesCOMException cex)
            {
                mensaje = cex.Message;
            }
            catch (Exception ex)
            {                
                mensaje = ex.Message;
            }
            return this;
        }
    }
}
