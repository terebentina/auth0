const app = require('express')();
const wt = require('webtask-tools');
const zd = require('node-zendesk');

const domainRE = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

app.get('/', (req, res) => {
  // @todo this is just some quick&dirty validation. We should do better in a real app
  const domains = req.webtaskContext.data.domain.trim().split(/\s+/);
  const valid = domains.reduce((prevValid, domain) => prevValid && domainRE.test(domain), true);
  if (!valid) {
    return res.status(400).json({ statusCode: 400, message: 'Invalid domain(s) requested' });
  }

  const zdConfig = {
    username: req.webtaskContext.secrets.ZENDESK_USERNAME,
    token: req.webtaskContext.secrets.ZENDESK_TOKEN,
    remoteUri: 'https://terebentina.zendesk.com/api/v2',
    disableGlobalState: true,
  };

  const zdClient = zd.createClient(zdConfig);

  var query = domains.map((domain) => `requester:*@${domain}`).join(' ');
  query = `type:ticket ${query}`;
  console.log('query', query);

  zdClient.search.query(query, (err, code, result) => {
    if (err) {
      return res.status(400).json({ statusCode: 400, message: err });
    }

    res.json(result);
  });
});

module.exports = wt.fromExpress(app).auth0({
  loginError(error, ctx, req, res, baseUrl) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ statusCode: 401, message: 'unauthorized' }));
    // res.status(401).json();
  },
});
