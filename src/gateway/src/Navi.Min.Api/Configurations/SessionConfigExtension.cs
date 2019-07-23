using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Navi.Min.Api.Configurations
{
    public static class SessionConfigExtension
    {
        public static IServiceCollection DefaultSessionConfig(this IServiceCollection services, IConfiguration configuration)
        {
            var sessionTimeOut = configuration.GetValue<int>("SessionTimeOut");

            if (sessionTimeOut == 0)
            {
                sessionTimeOut = 30;
            }

            string cookieName = configuration.GetValue<string>("CookieName") ?? "cookie-name";

            services.AddSession(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.Name = cookieName;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.IdleTimeout = TimeSpan.FromMinutes(sessionTimeOut);
            });

            return services;
        }
    }
}
