exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('wallets', function (table) {
      table.increments('id').primary();
      table.string('address');
      table.float('balance', 9, 2);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('transactions', function (table) {
      table.increments('id').primary();
      table.string('txHash');
      table.float('amount', 9, 2);
      table.integer('to').unsigned();
      table.foreign('to').references('wallets.id');
      table.integer('from').unsigned();
      table.foreign('from').references('wallets.id');
      table.timestamps(true, true);
    }),
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wallets'),
    knex.schema.dropTable('transactions')
  ])
};
