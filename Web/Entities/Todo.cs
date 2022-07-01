using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Entities
{
    [Table("Todo")]
    public class Todo
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        public bool IsDone { get; set; }

    }
}
