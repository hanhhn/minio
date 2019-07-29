using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Storage.Models;

namespace Storage.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Upload(IFormFile file)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:3000/");

            if (file == null)
            {
                ViewBag.Result = "File upload is invalid!";
            }

            try
            {
                using (var content = new MultipartFormDataContent())
                {
                    var bytes = new byte[file.Length + 1];
                    var fs = file.OpenReadStream();
                    fs.Read(bytes, 0, bytes.Length);
                    var fileContent = new ByteArrayContent(bytes);
                    fileContent.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment") { FileName = file.FileName };
                    content.Add(fileContent);
                    var requestUri = "http://localhost:3000/api/files/upload";
                    var result = await httpClient.PostAsync(requestUri, content);
                    result.EnsureSuccessStatusCode();
                    var jsonResult = result.Content.ReadAsStringAsync().Result;

                    ViewBag.Result = jsonResult;
                }
            }
            catch (HttpRequestException ex)
            {
                ViewBag.Result = ex.Message;
            }

            return View("Index");
        }

        [HttpGet]
        public async Task<ActionResult> Get(string bucket, string file)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:3000/");

            try
            {
                var requestUri = $"http://localhost:3000/api/files/get/{bucket}/{file}";
                var result = await httpClient.GetAsync(requestUri);
                result.EnsureSuccessStatusCode();
                if (result.Content.Headers.ContentType.MediaType == "application/json")
                {
                    ViewBag.Result = result.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    var stream = result.Content.ReadAsStreamAsync().Result;
                    return File(stream, result.Content.Headers.ContentType.MediaType, file);
                }
            }
            catch (HttpRequestException ex)
            {
                ViewBag.Result = ex.Message;
            }

            return View("Index");
        }
    }
}
