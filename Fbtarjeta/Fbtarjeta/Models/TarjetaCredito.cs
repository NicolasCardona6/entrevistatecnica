using System.ComponentModel.DataAnnotations;

namespace Fbtarjeta.Models
{
    public class TarjetaCredito
    {
        public int id { get; set; }

        [Required]
        public string titular { get; set; }
        [Required]
        public string numerotarjeta { get; set; }
        [Required]
        public string fechaexpiracion { get; set; }
        [Required]
        public string cvv { get; set; }
    }
}
