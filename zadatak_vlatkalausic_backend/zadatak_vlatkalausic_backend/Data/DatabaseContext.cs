using Microsoft.EntityFrameworkCore;
using zadatak_vlatkalausic_backend.Models;

namespace zadatak_vlatkalausic_backend.Data
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Entry> Entrys { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id=1,
                    Username = "admin",
                    Password = "password",
                    Role = "Administrator"
                }
            );
        }
    }
}
