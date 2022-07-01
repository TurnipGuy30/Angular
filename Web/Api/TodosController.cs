using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Web.Entities;
using Web.Models;


using error = Web.Constants.Error;

namespace Web.Api
{
    [ApiController]
    public class TodosController : ControllerBase
    {

        //----------------------------
        //      Properties
        //----------------------------

        private readonly DBContext _ctx;




        //----------------------------
        //      Constructor
        //----------------------------

        public TodosController(DBContext ctx)
        {
            _ctx = ctx;
        }

        //----------------------------
        //      Action Methods
        //----------------------------


        // TODO: change to model
        [HttpPost("api/todos")]
        public async Task<IActionResult> AddItem(TodoModel model)
        {
            try
            {
                var entity = new Todo { Name = model.Name };
                await _ctx.Todos.AddAsync(entity);
                _ctx.SaveChanges();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }
        }

        [HttpGet("api/todos")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                var toDos = await _ctx.Todos.ToListAsync();
                return Ok(toDos);
            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }
        }

        [HttpGet("api/todos/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                //var toDoItem = _ctx.ToDos.Find(id);
                var toDoItem = await _ctx.Todos.SingleOrDefaultAsync(t => t.Id == id);
                return Ok(toDoItem);
            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }

        }

        // This case requires the compelete enitity to be edited.
        [HttpPut("api/todos/{id}")]
        public async Task<IActionResult> Put(int id, TodoModel model)
        {
            try
            {
                if (id != model.Id)
                {
                    return BadRequest();
                }

                var entity = new Todo();
                entity.Id = model.Id;
                entity.Name = model.Name;

                _ctx.Entry(entity).State = EntityState.Modified;
                await _ctx.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }
        }

        // this case allows us to change a single field of the entity 
        [HttpPut("api/todos/{id}/update-status")]
        public async Task<IActionResult> UpdateStatus(int id, TodoStatusModel model)
        {
            try
            {
                var entity = await _ctx.Todos.FindAsync(id);
                entity.IsDone = model.IsDone;

                await _ctx.SaveChangesAsync();

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }
        }

        [HttpDelete("api/todos/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var entity = await _ctx.Todos.FindAsync(id);

                if (entity == null)
                {
                    return NotFound();
                }

                _ctx.Todos.Remove(entity);

                await _ctx.SaveChangesAsync();

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(error.GenericMessage);
            }
        }





    }
}
