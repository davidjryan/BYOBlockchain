exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('wallets').del()
    .then(() => knex('wallets').del())
    .then(() => {
      return Promise.all([
        knex('wallets').insert([{
            address: "0xb794f5ea0ba39494ce839613fffba74279579268",
            balance: 100
          },
          {
            address: "0x281055afc982d96fab65b3a49cac8b878184cb16",
            balance: 100
          },
          {
            address: "0x6f46cf5569aefa1acc1009290c8e043747172d89",
            balance: 100
          },
          {
            address: "0x90e63c3d53e0ea496845b7a03ec7548b70014a91",
            balance: 100
          },
          {
            address: "0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e",
            balance: 100
          },
          {
            address: "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
            balance: 100
          },
          {
            address: "0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
            balance: 100
          },
          {
            address: "0xe853c56864a2ebe4576a807d26fdc4a0ada51919",
            balance: 100
          },
          {
            address: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
            balance: 100
          },
          {
            address: "0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea",
            balance: 100
          },
          {
            address: "0xf27daff52c38b2c373ad2b9392652ddf433303c4",
            balance: 100
          },
          {
            address: "0x3d2e397f94e415d7773e72e44d5b5338a99e77d9",
            balance: 100
          },
          {
            address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
            balance: 100
          },
          {
            address: "0xb8487eed31cf5c559bf3f4edd166b949553d0d11",
            balance: 100
          },
          {
            address: "0xdc870798b30f74a17c4a6dfc6fa33f5ff5cf5770",
            balance: 100
          },
          {
            address: "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2",
            balance: 100
          },
          {
            address: "0x6f52730dba7b02beefcaf0d6998c9ae901ea04f9",
            balance: 100
          },
          {
            address: "0x5ffc99b5b23c5ab8f463f6090342879c286a29be",
            balance: 100
          },
          {
            address: "0xf1ce0a98efbfa3f8ebec2399847b7d88294a634e",
            balance: 100
          },
          {
            address: "0x51f9c432a4e59ac86282d6adab4c2eb8919160eb",
            balance: 100
          },
          {
            address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
            balance: 100
          },
          {
            address: "0xfca70e67b3f93f679992cd36323eeb5a5370c8e4",
            balance: 100
          },
          {
            address: "0xf0160428a8552ac9bb7e050d90eeade4ddd52843",
            balance: 100
          },
          {
            address: "0x07ee55aa48bb72dcc6e9d78256648910de513eca",
            balance: 100
          },
          {
            address: "0x900d0881a2e85a8e4076412ad1cefbe2d39c566c",
            balance: 100
          }], 'id')
          .then(project => {
            return knex('transactions').insert([
              { amount: 5,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 10,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 20,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 13,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 12,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 30,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 31,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 8,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 1,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 6,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 90,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 30,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 24,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 21,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 19,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 1,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 2,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 8,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 9,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 10,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 4,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 7,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 6,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 3,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 8,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
              { 
                amount: 9,
                address: "baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6" 
              },
            ])
 
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

