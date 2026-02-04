using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace spellbook_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ClassSpels_ClassName",
                table: "ClassSpels",
                column: "ClassName");

            migrationBuilder.CreateIndex(
                name: "IX_ClassSpels_ClassName_Rating",
                table: "ClassSpels",
                columns: new[] { "ClassName", "Rating" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClassSpels_ClassName",
                table: "ClassSpels");

            migrationBuilder.DropIndex(
                name: "IX_ClassSpels_ClassName_Rating",
                table: "ClassSpels");
        }
    }
}
