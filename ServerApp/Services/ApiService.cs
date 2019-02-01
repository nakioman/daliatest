using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ServerApp.Models.Api;

namespace ServerApp.Services
{
    public class ApiService : IApiService, IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly HttpClientHandler _httpClientHandler;

        public ApiService(IConfiguration configuration)
        {
            _httpClientHandler = DO_NOT_USE_IN_PROD_DisableCertificate();
            _httpClient = GetHttpClient(configuration);
        }

        public async Task<AvailabilityWeek> GetWeeklyAvailabilityAsync(DateTime startOfWeek, CancellationToken cancellationToken)
        {
            var url = $"GetWeeklyAvailability/{startOfWeek:yyyyMMdd}";
            var result = await _httpClient.GetAsync(url, cancellationToken);
            if (result.IsSuccessStatusCode)
            {
                var response = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<AvailabilityWeek>(response);
            }

            throw new HttpRequestException(result.ReasonPhrase);
        }

        public async Task TakeSlot(TakeSlot slot, CancellationToken cancellationToken)
        {
            const string url = "TakeSlot";
            var message = JsonConvert.SerializeObject(slot);
            var messageBytes = Encoding.UTF8.GetBytes(message);
            var content = new ByteArrayContent(messageBytes);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var result = await _httpClient.PostAsync(url, content, cancellationToken);
            if (!result.IsSuccessStatusCode)
            {
                throw new HttpRequestException(result.ReasonPhrase);
            }
        }

        /// <summary>
        /// Warning: This is to avoid the issue regarding bad certificate from the API endpoint,
        /// should never be used in Production!!!!!
        /// </summary>
        /// <returns></returns>
        private static HttpClientHandler DO_NOT_USE_IN_PROD_DisableCertificate()
        {
            return new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (s, certificate, chain, sslPolicyErrors) => true
            };
        }

        private HttpClient GetHttpClient(IConfiguration configuration)
        {
            var httpClient = new HttpClient(_httpClientHandler);
            var password = $"{configuration["Api:Username"]}:{configuration["Api:Password"]}";
            var passwordBytes = Encoding.ASCII.GetBytes(password);
            var authorization = Convert.ToBase64String(passwordBytes);
            httpClient.BaseAddress = new Uri(configuration["Api:BaseUrl"]);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authorization);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");

            return httpClient;
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
            _httpClientHandler?.Dispose();
        }
    }
}