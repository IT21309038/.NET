using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RefHub.Models;
using System.Data;
using System.Data.SqlClient;

namespace RefHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get() 
        {
            string query = @"
                            select * from dbo.UserData
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RefCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource)) 
            {
                myCon.Open();
                using(SqlCommand myCommand =new SqlCommand(query,myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("{Userid}")]
        public JsonResult Get(string Userid)
        {
            string query = @"
        SELECT * FROM dbo.UserData
        WHERE Userid = @Userid
    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RefCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Userid", Userid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }



        [HttpPost]
        public JsonResult Post(User ur)
        {
            string query = @"
        INSERT INTO dbo.UserData (Userid, UserName, UserAddress, UserAge, UserGender, UserPhoneNo)
        VALUES (@Userid, @UserName, @UserAddress, @UserAge, @UserGender, @UserPhoneNo)
    ";

            string sqlDataSource = _configuration.GetConnectionString("RefCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Userid", ur.Userid);
                    myCommand.Parameters.AddWithValue("@UserName", ur.UserName);
                    myCommand.Parameters.AddWithValue("@UserAddress", ur.UserAddress);
                    myCommand.Parameters.AddWithValue("@UserAge", ur.UserAge);
                    myCommand.Parameters.AddWithValue("@UserGender", ur.UserGender);
                    myCommand.Parameters.AddWithValue("@UserPhoneNo", ur.UserPhoneNo);

                    myCommand.ExecuteNonQuery();
                    myCon.Close() ;
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(User ur)
        {
            string query = @"
                            UPDATE dbo.UserData
                            SET UserName = @UserName,
                                UserAddress = @UserAddress,
                                UserAge = @UserAge,
                                UserGender = @UserGender,
                                UserPhoneNo = @UserPhoneNo
                            WHERE Userid = @Userid
               ";

            string sqlDataSource = _configuration.GetConnectionString("RefCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Userid", ur.Userid);
                    myCommand.Parameters.AddWithValue("@UserName", ur.UserName);
                    myCommand.Parameters.AddWithValue("@UserAddress", ur.UserAddress);
                    myCommand.Parameters.AddWithValue("@UserAge", ur.UserAge);
                    myCommand.Parameters.AddWithValue("@UserGender", ur.UserGender);
                    myCommand.Parameters.AddWithValue("@UserPhoneNo", ur.UserPhoneNo);

                    myCommand.ExecuteNonQuery();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string query = @"
                            DELETE FROM dbo.UserData WHERE Userid = @Userid
               ";

            string sqlDataSource = _configuration.GetConnectionString("RefCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Userid", id);
                    myCommand.ExecuteNonQuery();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
