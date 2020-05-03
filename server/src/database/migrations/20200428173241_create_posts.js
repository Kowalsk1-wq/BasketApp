// Posts' Table

exports.up = function(knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments();
    table.string('image').notNullable();
    table.string('small').notNullable();
    table.decimal('aspectRatio').notNullable();
    table.string('description').notNullable();
    table.string('deleteHash').notNullable();

    table.string('authorId').notNullable(); // O User que registrou o Post

    table.foreign('authorId').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
