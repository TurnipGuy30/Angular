using Microsoft.EntityFrameworkCore;
using Web.Entities;

namespace Web
{
    public class DBContext: DbContext
    {
        //----------------------------
        //      Properties
        //----------------------------

        public DbSet<Todo> Todos { get; set; }


        //----------------------------
        //      Constructor 
        //----------------------------

        public DBContext(DbContextOptions<DBContext> options):base(options)
        {
                
        }

        //----------------------------
        //      Methods
        //----------------------------



    }
}
