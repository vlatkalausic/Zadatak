using zadatak_vlatkalausic_backend.Models;

namespace zadatak_vlatkalausic_backend.Services
{
    public interface IEntryService
    {
        public string NewEntry(EntryModel entryModel);
        public List<EntryModel> GetEntrys(bool appr);
        public string DeleteEntry(int id);
        public string Update(int id);
    }
}
