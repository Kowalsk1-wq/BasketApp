// Users' Table

exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.boolean('active').notNullable();
    table.string('picture').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phone').notNullable();
    table.string('bio').notNullable();
    table.string('gender', 1).notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('fbLink');
    table.string('twLink');
    table.string('igLink');
    table.integer('coins').notNullable();
    table.integer('followers').notNullable();
    table.integer('following').notNullable();
    table.integer('envpoints').notNullable();
    table.integer('achievements').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
