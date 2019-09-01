import {
	LOOP_MODE,
	PLAY_MODE,
	PLAY_MODE_DUMP_RESPONSE,
	SET_SPEED_RESPONSE,
	SHOT_FREQUENCY,
	STATE_RESPONSE,
	STROKES
} from "../baddy-api";
import {Action} from "redux";
import uid from "uid";

export const SINGLE_TEST_ACTION = "SINGLE_TEST_ACTION";
export const FORMAT_ACTION = "FORMAT_ACTION";
export const CURRENT_PLAY_MODE_ACTION = "CURRENT_PLAY_MODE_ACTION";
export const RETAINER_DOWN_ACTION = "RETAINER_DOWN_ACTION";
export const RETAINER_UP_ACTION = "RETAINER_UP_ACTION";
export const SEQUENCE_ACTION = "SEQUENCE_ACTION";
export const ABORT_SEQUENCE_ACTION = "ABORT_SEQUENCE_ACTION";
export const SET_SPEEDS_ACTION = "SET_SPEEDS_ACTION";
export const SET_PLAY_MODE_ACTION = "SET_PLAY_MODE_ACTION";
export const GET_STATE_ACTION = "GET_STATE_ACTION";
export const SWITCH_BACK_ACTION = "SWITCH_BACK_ACTION";
export const SWITCH_FORWARD_ACTION = "SWITCH_FORWARD_ACTION";

export const REQUEST_FINISHED_ACTION = "REQUEST_FINISHED_ACTION";

export const RETRIEVE_PLAY_MODE_DUMP_ACTION = "RETRIEVE_PLAY_MODE_DUMP_ACTION";
export const RETRIEVE_SET_SPEED_RESPONSE_ACTION = "RETRIEVE_SET_SPEED_RESPONSE_ACTION";
export const RETRIEVE_STATE_RESPONSE_ACTION = "RETRIEVE_STATE_RESPONSE_ACTION";

export interface UIDAction extends Action {
	uid: string;
}

export interface SingleTestAction extends UIDAction {
	type: "SINGLE_TEST_ACTION";
	motorSpeeds: [number, number];
	fireShuttle: boolean;
}

export interface FormatAction extends UIDAction {
	type: "FORMAT_ACTION";
}

export interface CurrentPlayModeAction extends UIDAction {
	type: "CURRENT_PLAY_MODE_ACTION";
}

export interface RetainerDownAction extends UIDAction {
	type: "RETAINER_DOWN_ACTION";
}

export interface RetainerUpAction extends UIDAction {
	type: "RETAINER_UP_ACTION";
}

export interface SequenceAction extends UIDAction {
	type: "SEQUENCE_ACTION";
	strokes: STROKES[];
	shotFrequencies: SHOT_FREQUENCY[];
	loopMode: LOOP_MODE;
}

export interface AbortSequenceAction extends UIDAction {
	type: "ABORT_SEQUENCE_ACTION";
}

export interface SetSpeedsAction extends UIDAction {
	type: "SET_SPEEDS_ACTION";
	playMode: PLAY_MODE;
	speeds: [
		number, number, number, number, number, number,
		number, number, number, number, number, number,
		number, number, number, number, number, number
	];
}

export interface SetPlayModeAction extends UIDAction {
	type: "SET_PLAY_MODE_ACTION";
	playMode: PLAY_MODE;
}

export interface GetStateAction extends UIDAction {
	type: "GET_STATE_ACTION";
}

export interface SwitchBackAction extends UIDAction {
	type: "SWITCH_BACK_ACTION";
}

export interface SwitchForwardAction extends UIDAction {
	type: "SWITCH_FORWARD_ACTION";
}

export interface RequestFinishedAction extends UIDAction {
	type: "REQUEST_FINISHED_ACTION";
	success: boolean;
	errorMessage: string | null;
}

export interface RetrievePlayModeDumpAction extends Action {
	type: "RETRIEVE_PLAY_MODE_DUMP_ACTION";
	playModeDump: PLAY_MODE_DUMP_RESPONSE;
}

export interface RetrieveSetSpeedResponseAction extends Action {
	type: "RETRIEVE_SET_SPEED_RESPONSE_ACTION";
	setSpeedResponse: SET_SPEED_RESPONSE;
}

export interface RetrieveStateResponseAction extends Action {
	type: "RETRIEVE_STATE_RESPONSE_ACTION";
	state: STATE_RESPONSE;
}

export function singleTest(motorSpeeds: [number, number], fireShuttle: boolean = false): SingleTestAction {
	return { type: SINGLE_TEST_ACTION, motorSpeeds, fireShuttle, uid: uid(8) };
}

export function format(): FormatAction {
	return { type: FORMAT_ACTION, uid: uid(8) }
}

export function getCurrentPlayMode(): CurrentPlayModeAction {
	return { type: CURRENT_PLAY_MODE_ACTION, uid: uid(8) };
}

export function retainerDown(): RetainerDownAction {
	return { type: RETAINER_DOWN_ACTION, uid: uid(8) };
}

export function retainerUp(): RetainerUpAction {
	return { type: RETAINER_UP_ACTION, uid: uid(8) };
}

export function setSequence(strokes: STROKES[], shotFrequencies: SHOT_FREQUENCY[], loopMode: LOOP_MODE): SequenceAction {
	return { type: SEQUENCE_ACTION, strokes, shotFrequencies, loopMode, uid: uid(8) };
}

export function abortSequence(): AbortSequenceAction {
	return { type: ABORT_SEQUENCE_ACTION, uid: uid(8) };
}

export function setSpeeds(playMode: PLAY_MODE, speeds: [
	number, number, number, number, number, number,
	number, number, number, number, number, number,
	number, number, number, number, number, number
]): SetSpeedsAction {
	return { type: SET_SPEEDS_ACTION, playMode, speeds, uid: uid(8) };
}

export function setPlayMode(playMode: PLAY_MODE): SetPlayModeAction {
	return { type: SET_PLAY_MODE_ACTION, playMode, uid: uid(8) };
}

export function getState(): GetStateAction {
	return { type: GET_STATE_ACTION, uid: uid(8) };
}

export function switchBack(): SwitchBackAction {
	return { type: SWITCH_BACK_ACTION, uid: uid(8) };
}

export function switchForward(): SwitchForwardAction {
	return { type: SWITCH_FORWARD_ACTION, uid: uid(8) };
}

export function requestFinished(uid: string, success: boolean, errorMessage: string|null = null): RequestFinishedAction {
	return { type: "REQUEST_FINISHED_ACTION", uid, success, errorMessage };
}

export function retrievePlayModeDump(playModeDump: PLAY_MODE_DUMP_RESPONSE): RetrievePlayModeDumpAction {
	return { type: "RETRIEVE_PLAY_MODE_DUMP_ACTION", playModeDump };
}

export function retrieveSetSpeedResponse(setSpeedResponse: SET_SPEED_RESPONSE): RetrieveSetSpeedResponseAction {
	return { type: "RETRIEVE_SET_SPEED_RESPONSE_ACTION", setSpeedResponse };
}

export function retrieveStateResponse(state: STATE_RESPONSE): RetrieveStateResponseAction {
	return { type: "RETRIEVE_STATE_RESPONSE_ACTION", state };
}