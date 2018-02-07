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
      table.string('address');
      table.float('amount', 9, 2);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('wallets_transactions', function (table) {
      table.integer('wallets_id').unsigned();
      table.foreign('wallets_id').references('wallets.id');
      table.integer('transactions_id').unsigned();
      table.foreign('transactions_id').references('transactions.id');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wallets'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('wallets_transactions')
  ])
};