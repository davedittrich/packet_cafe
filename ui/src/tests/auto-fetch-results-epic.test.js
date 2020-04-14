import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';
import { v4 as uuidv4 } from 'uuid';

import autoFetchResultsEpic from "epics/auto-fetch-results-epic"
import { startFetchResults, stopFetchResults } from "epics/auto-fetch-results-epic"

describe("autoFetchResultsEpic", () =>{
	
	it("starts and stops the refresh timer", (done) => {
		const sessionId = uuidv4();
		const interval = 10;

		const data = { 'sessionId': sessionId, 'interval': interval };
		const action$ = ActionsObservable.of(startFetchResults(data));
		autoFetchResultsEpic(action$).toPromise()
			.then((actionsOut) => {
				//console.log(actionsOut);
				expect(actionsOut.type).toBe(stopFetchResults.toString());

			})
			.catch((error) => {
				expect(false).to.equal(true);
			})
		done();
	});
})