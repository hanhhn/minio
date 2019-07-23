using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace Navi.Min.Api.Configurations
{
    public static class CorsConfigExtension
    {
        public static IApplicationBuilder DefaultCorsConfig(this IApplicationBuilder appBuilder, IConfiguration configuration)
        {
            var allowOrigins = configuration.GetSection("Cors:AllowOrigins").Get<string[]>();
            var allowMethods = configuration.GetSection("Cors:AllowMethods").Get<string[]>();

            appBuilder.UseCors(builder =>
                builder
                    .WithOrigins(allowOrigins)
                    .WithMethods(allowMethods)
                    .AllowAnyHeader()
                    .WithExposedHeaders("Authorization")
                    .AllowCredentials());

            return appBuilder;
        }
    }
}
