import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from "redux";
import {
	AbortSequenceAction,
	CurrentPlayModeAction,
	FormatAction, GetStateAction,
	requestFinished,
	RetainerDownAction,
	RetainerUpAction,
	retrievePlayModeDump,
	retrieveSetSpeedResponse, retrieveStateResponse,
	SequenceAction, SetPlayModeAction,
	SetSpeedsAction,
	SINGLE_TEST_ACTION,
	SingleTestAction, SwitchBackAction, SwitchForwardAction
} from "../actions/baddy-api-actions";
import BaddyAPI from "../baddy-api";

function* singleTest(action: SingleTestAction) {
	try {
		yield call(BaddyAPI.singleTest, action.motorSpeeds, action.fireShuttle);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* format(action: FormatAction) {
	try {
		yield call(BaddyAPI.format);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* getCurrentPlayMode(action: CurrentPlayModeAction) {
	try {
		const playModeDump = yield call(BaddyAPI.getCurrentPlayMode);
		yield put(retrievePlayModeDump(playModeDump));
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* retainerDown(action: RetainerDownAction) {
	try {
		yield call(BaddyAPI.retainerDown);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* retainerUp(action: RetainerUpAction) {
	try {
		yield call(BaddyAPI.retainerUp);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* setSequence(action: SequenceAction) {
	try {
		yield call(BaddyAPI.setSequence, action.strokes, action.shotFrequencies, action.loopMode);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* abortSequence(action: AbortSequenceAction) {
	try {
		yield call(BaddyAPI.abortSequence);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* setSpeeds(action: SetSpeedsAction) {
	try {
		const setSpeedsResponse = yield call(BaddyAPI.setSpeeds, action.playMode, action.speeds);
		yield put(retrieveSetSpeedResponse(setSpeedsResponse));
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* setPlayMode(action: SetPlayModeAction) {
	try {
		const playModeDump = yield call(BaddyAPI.setPlayMode, action.playMode);
		yield put(retrievePlayModeDump(playModeDump));
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* getState(action: GetStateAction) {
	try {
		const state = yield call(BaddyAPI.getState);
		yield put(retrieveStateResponse(state));
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* switchBack(action: SwitchBackAction) {
	try {
		yield call(BaddyAPI.switchBack);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* switchForward(action: SwitchForwardAction) {
	try {
		yield call(BaddyAPI.switchForward);
		yield put(requestFinished(action.uid, true));
	} catch (e) {
		yield put(requestFinished(action.uid, false, e.message));
	}
}

function* sagas() {
	yield takeLatest(SINGLE_TEST_ACTION, singleTest);
	yield takeLatest(SINGLE_TEST_ACTION, format);
	yield takeLatest(SINGLE_TEST_ACTION, getCurrentPlayMode);
	yield takeLatest(SINGLE_TEST_ACTION, retainerDown);
	yield takeLatest(SINGLE_TEST_ACTION, retainerUp);
	yield takeLatest(SINGLE_TEST_ACTION, setSequence);
	yield takeLatest(SINGLE_TEST_ACTION, abortSequence);
	yield takeLatest(SINGLE_TEST_ACTION, setSpeeds);
	yield takeLatest(SINGLE_TEST_ACTION, setPlayMode);
	yield takeLatest(SINGLE_TEST_ACTION, getState);
	yield takeLatest(SINGLE_TEST_ACTION, switchBack);
	yield takeLatest(SINGLE_TEST_ACTION, switchForward);
}

export default sagas;