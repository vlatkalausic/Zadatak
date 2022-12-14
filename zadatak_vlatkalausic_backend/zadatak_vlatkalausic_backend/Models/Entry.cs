using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace zadatak_vlatkalausic_backend.Models
{
    public class Entry
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TimeInSeconds { get; set; }
     
        public bool Approved { get; set; }

        public Entry()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Approved = false;
        }
    }
}
