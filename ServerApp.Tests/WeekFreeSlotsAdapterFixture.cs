using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ServerApp.Models.Api;
using ServerApp.Services;
using Xunit;

namespace ServerApp.Tests
{
    public class WeekFreeSlotsAdapterFixture
    {
        [Theory, MemberData(nameof(CanGetFreeSlotsData))]
        public async Task CanGetFreeSlots(string jsonApi, DateTime date, string resultJson)
        {
            //Arrange
            var apiServiceMock = new Mock<IApiService>();
            apiServiceMock.Setup(api => api.GetWeeklyAvailabilityAsync(It.IsAny<DateTime>(), It.IsAny<CancellationToken>())).ReturnsAsync(() =>
            {
                var json = File.ReadAllText(jsonApi);
                return JsonConvert.DeserializeObject<AvailabilityWeek>(json);
            });
            var adapter = new WeekFreeSlotsAdapter(apiServiceMock.Object);
            var expectedResult = await File.ReadAllTextAsync(resultJson);

            //Test
            var result = await adapter.GetWeekFreeSlotsAsync(date, CancellationToken.None);
            var actualText = JsonConvert.SerializeObject(result);

            //Assert
            var expectedJson = JObject.Parse(expectedResult);
            var actualJson = JObject.Parse(actualText);
            Assert.True(JToken.DeepEquals(expectedJson, actualJson));;
        }

        public static IEnumerable<object[]> CanGetFreeSlotsData => new[]
        {
            new object[] {"JsonTests\\20190121_Api.json", new DateTime(2019, 01, 23), "JsonTests\\20190121_Result.json"},
            new object[] {"JsonTests\\20190128_Api.json", new DateTime(2019, 01, 31), "JsonTests\\20190128_Result.json"},
            new object[] {"JsonTests\\20190204_Api.json", new DateTime(2019, 02, 05), "JsonTests\\20190204_Result.json"},
        };
    }
}