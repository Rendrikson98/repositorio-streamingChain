/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('content_creator', function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.string("wallet_address");
      table.string("channel_name").notNullable();
      table.string("status_account").notNullable();
      table.timestamp("created_at").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('content_creator')
};
