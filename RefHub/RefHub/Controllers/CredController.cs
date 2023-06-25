using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RefHub.Models;
using System.Data;
using System.Data.SqlClient;

namespace RefHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CredController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            string query = @"
                SELECT * FROM dbo.Creden
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RefCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{userid}/{password}")]
        public JsonResult GetByUserIdAndPassword(string userid, string password)
        {
            string query = @"
                SELECT * FROM dbo.Creden WHERE UserId = @UserId AND Password = @Password
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RefCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", userid);
                    myCommand.Parameters.AddWithValue("@Password", password);
                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Cred cd)
        {
            string query = @"
                            INSERT INTO dbo.Creden (Userid, Password, RetypePassword)
                            VALUES (@Userid, @Password, @RetypePassword)
                            ";

            string sqlDataSource = _configuration.GetConnectionString("RefCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Userid", cd.Userid);
                    myCommand.Parameters.AddWithValue("@Password", cd.Password);
                    myCommand.Parameters.AddWithValue("@RetypePassword", cd.RetypePassword);

                    myCommand.ExecuteNonQuery();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
    }
}
