const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://etherscan.io/accounts')
  .evaluate(() => {
    const allAddresses = document.querySelectorAll('td a');

    const addressInfo = [];

    for (let i = 0; i < allAddresses.length; i++) {
      const address = allAddresses[i].innerText;

      addressInfo.push({ address });
    }
    
    return addressInfo;
  })
  .end()
  .then((result) => {
    const output = JSON.stringify(result, null, 2);
    fs.writeFile('./wallet-data.json', output, 'utf8', (error) => {
      if (error) {
        /* eslint-disable no-console */
        return console.log(error);
      }
    });
  })
  .catch((error) => {
  /* eslint-disable no-console */
    console.error(error);
  });
