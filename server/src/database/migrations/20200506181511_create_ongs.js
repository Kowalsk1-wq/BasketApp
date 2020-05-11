// ONGs' Table

exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.boolean('active').notNullable();
    table.string('picture').notNullable();
    table.string('deleteHash').notNullable();
    table.string('name').notNullable();
    table.string('represent').notNullable();
    table.string('cnpj').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phone').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
