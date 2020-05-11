// Requests' Table

exports.up = function(knex) {
  return knex.schema.createTable('requests', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('items').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('requests');
};
