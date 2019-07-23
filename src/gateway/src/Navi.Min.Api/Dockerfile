FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Navi.Min.Api/Navi.Min.Api.csproj", "Navi.Min.Api/"]
RUN dotnet restore "Navi.Min.Api/Navi.Min.Api.csproj"
COPY . .
WORKDIR "/src/Navi.Min.Api"
RUN dotnet build "Navi.Min.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Navi.Min.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Navi.Min.Api.dll"]