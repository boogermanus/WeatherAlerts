using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace capstone.Models
{
    public class ApplicationUserZone
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string ZoneId { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Visable {get;set;}
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
