exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wallets_transactions')
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wallets_transactions')
  ]);
};
