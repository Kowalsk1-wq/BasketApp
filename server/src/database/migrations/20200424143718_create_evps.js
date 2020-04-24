// EnvPoints' Table

exports.up = function(knex) {
  return knex.schema.createTable('envpoints', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('type').notNullable();
    table.string('latitude').notNullable();
    table.string('longitude').notNullable();
    table.decimal('value').notNullable();

    table.string('user_id').notNullable(); // O User que registrou este EvP

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('envpoints');
};
