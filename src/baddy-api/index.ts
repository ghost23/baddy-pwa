enum API_ENDPOINTS {
	CONFIG = "config",
	FORMAT = "format_file_system",
	PLAY_MODE_DUMP = "playmodedump",
	RETAINER_DOWN = "retainer_down",
	RETAINER_UP = "retainer_up",
	SEQUENCE = "sequence",
	SET_SPEED = "set_speed",
	SET_PLAY_MODE = "set_play_mode",
	STATE = "status",
	SWITCH_BACKWARD = "switch_backward",
	SWITCH_FORWARD = "switch_forward"
}

type ENDPOINT_TO_PARAMS_MAP = {
	[API_ENDPOINTS.CONFIG]: CONFIG_PARAMS;
	[API_ENDPOINTS.FORMAT]: FORMAT_PARAMS;
	[API_ENDPOINTS.PLAY_MODE_DUMP]: PLAY_MODE_DUMP_PARAMS;
	[API_ENDPOINTS.RETAINER_DOWN]: RETAINER_DOWN_PARAMS;
	[API_ENDPOINTS.RETAINER_UP]: RETAINER_UP_PARAMS;
	[API_ENDPOINTS.SEQUENCE]: SEQUENCE_PARAMS;
	[API_ENDPOINTS.SET_SPEED]: SET_SPEED_PARAMS;
	[API_ENDPOINTS.SET_PLAY_MODE]: SET_PLAY_MODE_PARAMS;
	[API_ENDPOINTS.STATE]: STATE_PARAMS;
	[API_ENDPOINTS.SWITCH_BACKWARD]: SWITCH_BACKWARD_PARAMS;
	[API_ENDPOINTS.SWITCH_FORWARD]: SWITCH_FORWARD_PARAMS;
}

export enum STROKES {
	NONE,
	FRONT_LEFT,
	FRONT_CENTER,
	FRONT_RIGHT,
	MIDDLE_LEFT,
	MIDDLE_CENTER,
	MIDDLE_RIGHT,
	BACK_LEFT,
	BACK_CENTER,
	BACK_RIGHT
}
export enum SHOT_FREQUENCY {
	HALF_SECOND,
	ONE_SECOND,
	ONE_AND_A_HALF_SECONDS,
	TWO_SECONDS,
	THREE_SECONDS,
	FOUR_SECONDS
}
export enum LOOP_MODE {
	NO_LOOP,
	ORDERED_LOOP,
	RANDOM_LOOP
}
export enum PLAY_MODE {
	FLOOR,
	TRIPOD,
	TWO_BADDIES
}

export interface CONFIG_PARAMS {
	Type: "" | "FIRE";
	/**
	 * first number = left motor, second number = right motor, values between 830 and 1350
	 */
	TestSpeeds: [number, number];
}
export type FORMAT_PARAMS = undefined;
export type PLAY_MODE_DUMP_PARAMS = undefined;
export type RETAINER_DOWN_PARAMS = undefined;
export type RETAINER_UP_PARAMS = undefined;
export type SEQUENCE_PARAMS = {
	Type: "SEQ";
	Strokes: STROKES[];
	Speeds: SHOT_FREQUENCY[];
	LoopMode: LOOP_MODE
} | {
	Type: "ABT"
};
export interface SET_SPEED_PARAMS {
	PlayMode: PLAY_MODE;
	/**
	 * 18 motor speed values in the range of 830 to 1350, in this order:
	 DROP_LEFT_SHOT_LEFT_MOTOR,DROP_LEFT_SHOT_RIGHT_MOTOR,
	 DROP_CENTER_SHOT_LEFT_MOTOR,DROP_CENTER_SHOT_RIGHT_MOTOR,
	 DROP_RIGHT_SHOT_LEFT_MOTOR,DROP_RIGHT_SHOT_RIGHT_MOTOR,

	 DRIVE_LEFT_SHOT_LEFT_MOTOR,DRIVE_LEFT_SHOT_RIGHT_MOTOR,
	 DRIVE_CENTER_SHOT_LEFT_MOTOR,DRIVE_CENTER_SHOT_RIGHT_MOTOR,
	 DRIVE_RIGHT_SHOT_LEFT_MOTOR,DRIVE_RIGHT_SHOT_RIGHT_MOTOR,

	 CLEAR_LEFT_SHOT_LEFT_MOTOR,CLEAR_LEFT_SHOT_RIGHT_MOTOR,
	 CLEAR_CENTER_SHOT_LEFT_MOTOR,CLEAR_CENTER_SHOT_RIGHT_MOTOR,
	 CLEAR_RIGHT_SHOT_LEFT_MOTOR,CLEAR_RIGHT_SHOT_RIGHT_MOTOR
	 */
	Speeds: [
		number, number, number, number, number, number,
		number, number, number, number, number, number,
		number, number, number, number, number, number
	];
}
export interface SET_PLAY_MODE_PARAMS {
	PlayMode: PLAY_MODE;
}
export type STATE_PARAMS = undefined;
export type SWITCH_BACKWARD_PARAMS = undefined;
export type SWITCH_FORWARD_PARAMS = undefined;

export interface PLAY_MODE_DUMP_RESPONSE {
	PlayMode: PLAY_MODE;
	/**
	 * 18 motor speed values in the range of 830 to 1350, in this order:
	 DROP_LEFT_SHOT_LEFT_MOTOR,DROP_LEFT_SHOT_RIGHT_MOTOR,
	 DROP_CENTER_SHOT_LEFT_MOTOR,DROP_CENTER_SHOT_RIGHT_MOTOR,
	 DROP_RIGHT_SHOT_LEFT_MOTOR,DROP_RIGHT_SHOT_RIGHT_MOTOR,

	 DRIVE_LEFT_SHOT_LEFT_MOTOR,DRIVE_LEFT_SHOT_RIGHT_MOTOR,
	 DRIVE_CENTER_SHOT_LEFT_MOTOR,DRIVE_CENTER_SHOT_RIGHT_MOTOR,
	 DRIVE_RIGHT_SHOT_LEFT_MOTOR,DRIVE_RIGHT_SHOT_RIGHT_MOTOR,

	 CLEAR_LEFT_SHOT_LEFT_MOTOR,CLEAR_LEFT_SHOT_RIGHT_MOTOR,
	 CLEAR_CENTER_SHOT_LEFT_MOTOR,CLEAR_CENTER_SHOT_RIGHT_MOTOR,
	 CLEAR_RIGHT_SHOT_LEFT_MOTOR,CLEAR_RIGHT_SHOT_RIGHT_MOTOR
	 */
	CurrentSpeeds: [
		number, number, number, number, number, number,
		number, number, number, number, number, number,
		number, number, number, number, number, number
	];
}
export interface STATE_RESPONSE {
	Running: boolean;
	Battery: number;
	Firmware_version: string;
	Connect_mode: "AP" | "HotSpot" | "";
	/**
	 * shot counter for each shooting position, from FRONT_LEFT to BACK_RIGHT
	 */
	Stats: [number, number, number, number, number, number, number, number, number];
}
export interface SET_SPEED_RESPONSE {
	action: "set_speed",
	status: "success" | "error",
	msg: string
}
export type SET_PLAY_MODE_RESPONSE = PLAY_MODE_DUMP_RESPONSE;

export default class BaddyAPI {

	private static baseUrl = "http://127.0.0.1/";

	private static requestServer<E extends API_ENDPOINTS>(url: E, data: ENDPOINT_TO_PARAMS_MAP[E]) {
		const dataString = data ? `?data=${encodeURIComponent(JSON.stringify(data))}` : '';
		return fetch(`${BaddyAPI.baseUrl}${url}${dataString}`, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
		}).then(response => response.json());
	}

	public static singleTest(motorSpeeds: [number, number], fireShuttle: boolean = false): Promise<void> {
		return BaddyAPI.requestServer(
			API_ENDPOINTS.CONFIG,
			{
				Type: fireShuttle ? "FIRE" : "",
				TestSpeeds: motorSpeeds
			}
		);
	}

	public static format(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.FORMAT, undefined);
	}

	public static getCurrentPlayMode(): Promise<PLAY_MODE_DUMP_RESPONSE> {
		return BaddyAPI.requestServer(API_ENDPOINTS.PLAY_MODE_DUMP, undefined);
	}

	public static retainerDown(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.RETAINER_DOWN, undefined);
	}

	public static retainerUp(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.RETAINER_UP, undefined);
	}

	public static setSequence(strokes: STROKES[], shotFrequencies: SHOT_FREQUENCY[], loopMode: LOOP_MODE): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SEQUENCE, {
			Type: "SEQ",
			Strokes: strokes,
			Speeds: shotFrequencies,
			LoopMode: loopMode
		});
	}

	public static abortSequence(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SEQUENCE, { Type: "ABT" });
	}

	public static setSpeeds(playMode: PLAY_MODE, speeds: [
		number, number, number, number, number, number,
		number, number, number, number, number, number,
		number, number, number, number, number, number
	]): Promise<SET_SPEED_RESPONSE> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SET_SPEED, { PlayMode: playMode, Speeds: speeds });
	}

	public static setPlayMode(playMode: PLAY_MODE): Promise<SET_PLAY_MODE_RESPONSE> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SET_PLAY_MODE, { PlayMode: playMode });
	}

	public static getState(): Promise<STATE_RESPONSE> {
		return BaddyAPI.requestServer(API_ENDPOINTS.STATE, undefined);
	}

	public static switchBack(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SWITCH_BACKWARD, undefined);
	}

	public static switchForward(): Promise<void> {
		return BaddyAPI.requestServer(API_ENDPOINTS.SWITCH_FORWARD, undefined);
	}
}
