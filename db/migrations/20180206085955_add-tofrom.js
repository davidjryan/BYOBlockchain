exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('wallets_transactions', function (table) {
      table.integer('wallets_id2').unsigned();
      table.foreign('wallets_id2').references('wallets.id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('wallets_transactions', function (table) {
      table.integer('wallets_id2').unsigned();
      table.foreign('wallets_id2').references('wallets.id');
    })
  ]);
};
