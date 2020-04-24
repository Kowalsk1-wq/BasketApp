// Products' Table

exports.up = function(knex) {
  return knex.schema.createTable('products', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('picture').notNullable();
    table.decimal('value', null).notNullable();

    table.string('user_id').notNullable(); // O User que registrou este EvP

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
