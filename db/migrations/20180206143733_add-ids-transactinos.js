exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('transactions', function (table) {
      table.integer('to').unsigned();
      table.foreign('to').references('wallets.id');
      table.integer('from').unsigned();
      table.foreign('from').references('wallets.id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('transactions', function (table) {
      table.integer('to').unsigned();
      table.foreign('to').references('wallets.id');
      table.integer('from').unsigned();
      table.foreign('from').references('wallets.id');
    })
  ]);
};

