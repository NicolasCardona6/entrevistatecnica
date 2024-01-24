using Fbtarjeta;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Configuraci�n de la aplicaci�n
var configuration = builder.Configuration;

// ... (resto del c�digo)

builder.Services.AddDbContext<AplicationDBContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DevConnection")));

builder.Services.AddCors(options => options.AddPolicy("AllowWebApp",

builder => builder.AllowAnyOrigin()

.AllowAnyHeader()

.AllowAnyMethod()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebApp"); 

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
