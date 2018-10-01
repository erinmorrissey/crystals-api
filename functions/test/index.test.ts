import * as test from 'firebase-functions-test';
import { expect } from 'chai';
import * as Mocha from 'mocha';
import * as Sinon from 'sinon';
import * as admin from 'firebase-admin';



// Since I'm initializing firebase-functions-test in offline mode (not calling a test DB),
// And since index.ts calls admin.initializeApp at the top of the file,
// we need to stub it out BEFORE requiring index.ts. This is because the
// functions will be executed as a part of the require process.
// Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
const adminInitStub = Sinon.stub(admin, 'initializeApp');

// Now we can import index.ts and save the exports inside function namespaces.
import { healthCheck } from '../src/index';


describe('Testing 123...', () => {

  after(() => {
    // restore admin.initializeApp() to its original method.
    adminInitStub.restore();
  });

  it('works', () => {
      expect(1).to.equal(1);
      
  });
});  