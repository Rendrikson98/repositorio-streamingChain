/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("platform", function(table){
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("password").notNullable();
        table.string("wallet_address").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("platform");
};
