import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import request from '../../utils/request';
import * as Actions from '../';
import * as Constants from '../../constants';

const ticketsStub = [
  { subject: 'ticket 1', description: 'diz 1', status: 'open' },
  { subject: 'ticket 2', description: 'diz 2', status: 'open' },
  { subject: 'ticket 3', description: 'diz 3', status: 'open' },
];

const domainForSearch = 'foo.com';
const profileStub = { user_metadata: { lastSearchedDomains: [domainForSearch] } };

test('Actions: showMessage', (t) => {
  let res = Actions.showMessage('foo');
  t.deepEqual(res, { type: Constants.SHOW_MESSAGE, message: { text: 'foo', type: Constants.MESSAGE_SUCCESS } }, 'defaults to a success message');
  res = Actions.showMessage('foo', Constants.MESSAGE_ERROR);
  t.deepEqual(res, { type: Constants.SHOW_MESSAGE, message: { text: 'foo', type: Constants.MESSAGE_ERROR } }, 'properly sets the message type');
  t.end();
});

test('Actions: fetchTickets', (t) => {
  const sandbox = sinon.sandbox.create();
  sandbox.stub(request, 'get').returns(Promise.resolve(ticketsStub));
  sandbox.stub(request, 'patch').returns(Promise.resolve(profileStub));
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const expectedActions = [
    { type: Constants.REQUEST_TICKETS },
    { type: Constants.PROFILE_UPDATE, profile: profileStub },
    { type: Constants.SET_DOMAIN, domain: domainForSearch },
    { type: Constants.RECEIVE_TICKETS, tickets: ticketsStub },
  ];

  const store = mockStore({ profile: { user_id: 1 } });
  store.dispatch(Actions.fetchTickets(domainForSearch)).then(() => {
    const actions = store.getActions();
    t.equal(expectedActions.length, actions.length, 'correct number of actions dispatched');
    expectedActions.forEach((action) => {
      const type = action.type;
      const actualAction = actions.find((act) => act.type == type);
      t.deepEqual(action, actualAction, 'expected action found');
    });
    sandbox.restore();
    t.end();
  });
});
