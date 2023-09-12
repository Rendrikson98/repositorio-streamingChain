/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("info_used_gas", function(table){
      table.increments("id").primary();
      table.string("max_gas_used_update");
      table.string("max_gas_used_payment");
      table.string("max_spend_after_first_payment");
      table.string("max_gas_used_contract_creation");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("info_used_gas");
};
