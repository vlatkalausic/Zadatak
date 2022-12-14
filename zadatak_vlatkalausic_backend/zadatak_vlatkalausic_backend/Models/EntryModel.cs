namespace zadatak_vlatkalausic_backend.Models
{
    public class EntryModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TimeHours { get; set; }
        public int TimeMinutes { get; set; }
        public int TimeSeconds { get; set; }

        public bool Approved { get; set; }

        public EntryModel()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
            Approved = false;
        }
    }
}
