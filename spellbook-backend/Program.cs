using Microsoft.EntityFrameworkCore;
using spellbook_backend.Data;
using System;

var builder = WebApplication.CreateBuilder(args);


// Add support for Controllers (API endpoints)
builder.Services.AddControllers();

//--- CORS Configuration ---
//Essential for allowing Frontend applications to communicate with this Backemd
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin() //it will be replaced with the specific domains (in production)
        .AllowAnyMethod() //GET, POST, PUT, DELETE
        .AllowAnyHeader());
});

//-- Database Configuration ---
//Retrieve connection string from appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// "Fast Fail": Throw an error immediately if the connection string is missing.
if(string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connextion string 'DefaultConnection' not found in configuration");
}

// Register the DbContext with PostgreSQL provider
builder.Services.AddDbContext<SpellbookContext>(options =>
    options.UseNpgsql(connectionString));

//--- Documentation (OpenAPI/Swagger)--
//Registers the OpenAPI generator services.
builder.Services.AddOpenApi();

//HTTP REQUEST PIPELINE. How the application responds to incoming HTTP Requests.

var app = builder.Build();

// Configure the pipeline for Development enviroment
if (app.Environment.IsDevelopment())
{
    //Exposes the generated OpenAPI JSON specification
    app.MapOpenApi();
}

//Redirects HTTP requests to HTTPS.
//Can be commented out for local testing
app.UseHttpsRedirection();

//Enable CORS policy defined above.
app.UseCors("AllowAll");

//Enables Authorization middleware (checks if user has permission).
app.UseAuthorization();

//Maps the controller classes to route endpoints (e.g. api/spells)
app.MapControllers();

//Starts the application.
app.Run();
