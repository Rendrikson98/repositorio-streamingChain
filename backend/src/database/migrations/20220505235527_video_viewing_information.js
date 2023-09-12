/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("video_viewing_information",  function (table){
      table.increments("id").primary();
      table.integer("total_views");
      table.string("retention_rate");
      table.string("total_viewing_time");
      table.string("contract_address").notNullable();

      table.integer("id_video_info").unique().notNullable();

      table.foreign("id_video_info").references("id_video").inTable("video");

      table.integer("id_content_creator").notNullable();

      table.foreign("id_content_creator").references("id").inTable("content_creator");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("video_viewing_information");
};
