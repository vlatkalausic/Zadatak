using zadatak_vlatkalausic_backend.Data;
using zadatak_vlatkalausic_backend.Models;

namespace zadatak_vlatkalausic_backend.Services
{
    public class EntryService: IEntryService
    {
        private readonly DatabaseContext _databaseContext;
        public EntryService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public string NewEntry(EntryModel entryModel)
        {
            try
            {
                int seconds = entryModel.TimeHours* 3600 + entryModel.TimeMinutes*60 + entryModel.TimeSeconds;
                Entry entry = new Entry
                {
                    FirstName = entryModel.FirstName,
                    LastName = entryModel.LastName,
                    Approved = entryModel.Approved,
                    TimeInSeconds = seconds
                };

                _databaseContext.Entrys.Add(entry);
                _databaseContext.SaveChanges();

                return "Saved.";
            }
            catch (Exception _)
            {
                return "Not saved.";
            }

        }

        public List<EntryModel> GetEntrys(bool appr)
        {   List<Entry> entrys=new List<Entry>();
            if (appr) { 
                 entrys= _databaseContext.Entrys.Where(o => o.Approved.Equals(appr)).OrderBy(o=> o.TimeInSeconds).ToList();
            }
            else
            {
                entrys = _databaseContext.Entrys.Where(o => o.Approved.Equals(appr)).OrderByDescending(o => o.Id).ToList();
            }
            List<EntryModel> allEntryModels= new List<EntryModel>();
            foreach (var e in entrys)
            {
                EntryModel entryModel = new EntryModel();
                entryModel.Id = e.Id;
                entryModel.FirstName = e.FirstName;
                entryModel.LastName = e.LastName;
                entryModel.Approved = e.Approved;

                int seconds = e.TimeInSeconds;
                int h= seconds/3600;
                seconds -= h*3600;
                int min= seconds/60;
                int sec = seconds - min * 60;

                entryModel.TimeHours = h;
                entryModel.TimeMinutes = min;
                entryModel.TimeSeconds = sec;

                allEntryModels.Add(entryModel);
            }
            return allEntryModels;
        }

        public string DeleteEntry(int id)
        {
            try
            {
                var del = _databaseContext.Entrys.Where(o => o.Id == id).FirstOrDefault();

                    if(del != null) { 
                    _databaseContext.Entrys.Remove(del);
                    _databaseContext.SaveChanges();

                }
            }
            catch (Exception _)
            {
                return "Not deleted.";
            }
            return "Ok.";
        }

        public string Update(int id)
        {
            try
            {
                var update = _databaseContext.Entrys.Where(o => o.Id == id).FirstOrDefault();

                if (update != null)
                {
                    update.Approved = true;
                    _databaseContext.Entrys.Update(update);
                    _databaseContext.SaveChanges();

                }
            }
            catch (Exception _)
            {
                return "Not updated.";
            }
            return "Ok.";
        }
    }
}
