/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("video", function (table){
      table.increments("id_video").primary();
      table.string("name").notNullable();
      table.string("description");
      table.string("file_address").notNullable().unique();
      table.timestamp("created_at");

      table.integer("id_content_creator_video").notNullable();

      table.foreign("id_content_creator_video").references("id").inTable("content_creator");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("video");
};
