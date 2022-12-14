using zadatak_vlatkalausic_backend.Models;

namespace zadatak_vlatkalausic_backend.Services
{
    public interface IUserService
    {
        public string Generate(User user);
        public User? Authenticate(UserLogin userLogin);
    }
}
