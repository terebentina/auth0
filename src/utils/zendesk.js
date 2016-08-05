const zd = require('node-zendesk');

const client = zd.createClient({
  username: process.env.ZENDESK_USERNAME,
  token: process.env.ZENDESK_TOKEN,
  remoteUri: 'https://terebentina.zendesk.com/api/v2',
  disableGlobalState: true,
});

module.exports = {
  searchTickets(str) {
    return new Promise((resolve, reject) => {
      const query = `status<solved+type:ticket+requester:${str}`;

      client.search.query(query, (err, req, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        resolve(result);
      });
    });
  },
};
