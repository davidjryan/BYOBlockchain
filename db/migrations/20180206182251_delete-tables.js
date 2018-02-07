exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('wallets')
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wallets'),
    knex.schema.dropTable('transactions')
  ]);
};
