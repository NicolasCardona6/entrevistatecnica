using Fbtarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace Fbtarjeta
{
    public class AplicationDBContext: DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options): base(options)
        {

        }
    }
}
