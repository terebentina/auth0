const zd = require('node-zendesk');

const client = zd.createClient({
  username: process.env.ZENDESK_USERNAME,
  token: process.env.ZENDESK_TOKEN,
  remoteUri: 'https://terebentina.zendesk.com/api/v2',
  disableGlobalState: true,
});

const domainRE = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

module.exports = {
  searchTickets(domain) {
    return new Promise((resolve, reject) => {
      // @todo this is just some quick&dirty validation. We should do better in a real app
      if (!domainRE.test(domain)) {
        reject('Invalid domain entered');
      }

      const query = `type:ticket requester:*@${domain}`;

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
