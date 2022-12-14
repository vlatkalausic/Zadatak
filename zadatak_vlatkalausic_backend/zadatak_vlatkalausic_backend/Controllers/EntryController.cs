using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using zadatak_vlatkalausic_backend.Models;
using zadatak_vlatkalausic_backend.Services;

namespace zadatak_vlatkalausic_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly IEntryService _entryService;
        public EntryController(IEntryService entryService)
        {
            _entryService = entryService;
        }
        [AllowAnonymous]
        [HttpPost("Entry")]
        public IActionResult Entry([FromBody] EntryModel entryModel)
        {
            if(entryModel != null)
            {
                var result = _entryService.NewEntry(entryModel);
                if(result == "Saved.")
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpGet("GetApprovedEntrys")]
        public List<EntryModel> GetApprovedEntrys()
        {
            return _entryService.GetEntrys(true);
        }

        [HttpGet("GetUnapprovedEntrys")]
        [Authorize(Roles = "Administrator")]
        public List<EntryModel> GetUnapprovedEntrys()
        {
            return _entryService.GetEntrys(false);
        }

        [HttpPost("DeleteEntry")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteEntry([FromBody] int id)
        {
            var result = _entryService.DeleteEntry(id);
            if (result == "Ok.")
            {
                return Ok("Rejected.");
            }
            return BadRequest();
        }
        [HttpPost("ApproveEntry")]
        [Authorize(Roles = "Administrator")]
        public IActionResult ApproveEntry([FromBody] int id)
        {
            var result = _entryService.Update(id);
            if (result == "Ok.")
            {
                return Ok("Approved.");
            }
            return BadRequest();
        }

    }
}
