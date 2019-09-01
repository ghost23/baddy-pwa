import {Action} from "redux";
import {PLAY_MODE, SET_SPEED_RESPONSE, STATE_RESPONSE} from "../baddy-api";
import {
	RETRIEVE_PLAY_MODE_DUMP_ACTION,
	RETRIEVE_SET_SPEED_RESPONSE_ACTION,
	RETRIEVE_STATE_RESPONSE_ACTION,
	RetrievePlayModeDumpAction,
	RetrieveSetSpeedResponseAction,
	RetrieveStateResponseAction
} from "../actions/baddy-api-actions";

interface BaddyDataState {
	speedsPerPlayMode: Map<PLAY_MODE, [
		number, number, number, number, number, number,
		number, number, number, number, number, number,
		number, number, number, number, number, number
	]>;
	state: STATE_RESPONSE;
	lastSetSpeedResponse: SET_SPEED_RESPONSE | null;
}

const DEFAULT_STATE: BaddyDataState = {
	speedsPerPlayMode: new Map(
		[
			[PLAY_MODE.FLOOR, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
			[PLAY_MODE.TRIPOD, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
			[PLAY_MODE.TWO_BADDIES, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
		]
	),
	state: {
		Battery: 0,
		Firmware_version: "unknown",
		Running: false,
		Stats: [0,0,0,0,0,0,0,0,0]
	},
	lastSetSpeedResponse: null
};

export function baddyData(state: BaddyDataState = DEFAULT_STATE, action: Action): BaddyDataState {
	switch (action.type) {
		case RETRIEVE_PLAY_MODE_DUMP_ACTION: {
			const typedAction = action as RetrievePlayModeDumpAction;
			const newMap = new Map(state.speedsPerPlayMode);
			newMap.set(typedAction.playModeDump.PlayMode, typedAction.playModeDump.CurrentSpeeds);
			return {
				state: state.state,
				lastSetSpeedResponse: state.lastSetSpeedResponse,
				speedsPerPlayMode: newMap
			};
		}
		case RETRIEVE_SET_SPEED_RESPONSE_ACTION: {
			const typedAction = action as RetrieveSetSpeedResponseAction;
			return {
				state: state.state,
				lastSetSpeedResponse: typedAction.setSpeedResponse,
				speedsPerPlayMode: state.speedsPerPlayMode
			};
		}
		case RETRIEVE_STATE_RESPONSE_ACTION: {
			const typedAction = action as RetrieveStateResponseAction;
			return {
				state: typedAction.state,
				lastSetSpeedResponse: state.lastSetSpeedResponse,
				speedsPerPlayMode: state.speedsPerPlayMode
			};
		}
		default: return state;
	}
}