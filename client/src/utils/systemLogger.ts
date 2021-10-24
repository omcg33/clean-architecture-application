import {Action}         from 'redux';
// import Browser        from "@tutu-utils/browser-detect";

import { getWindow }    from '../libs/browserActions';

interface ILog {
	info: any;
	_time: number;
}

class SystemLogger {
	private actions: Array<any> = [];
	private logs: Array<ILog> = [];
	private opts: any;

	static _instances: any = {};


	static getInstance(id: string) {
		return SystemLogger._instances[id];
	}


	static __DEFAULTS = (<any>Object).freeze({
		maxActions: 30,
		maxLogs: 50,
		onlyTypes: true,
	});


	constructor(id: string, opts = {}) {
		SystemLogger._instances[id] = this;
		this.opts = {...SystemLogger.__DEFAULTS, ...opts};
	}



	getReport() {
		// if (!Browser.check())
		// 	return {};
		if (typeof window === 'undefined')
			return {};

		return {
			url: getWindow().location.href,
			userAgent: getWindow().navigator.userAgent,
			logs: JSON.stringify(this.getLogs(), null, 4)
		};
	}


	addLog(title: string, params: any = null) {
		this.logs.push({
			info: {
				[title]: params
			},
			// _time: Browser.check() ? performance.now() : Date.now()
			_time: typeof window !== 'undefined' ? performance.now() : Date.now()
		});

		if (this.logs.length > this.opts.maxLogs) {
			this.logs.shift();
		}
	}

	getLogs() {
		let prevValue: number;

		return this.logs.map((log: ILog) => {
			let diffTime = 0;

			if (log._time) {
				if (prevValue) {
					diffTime = log._time - prevValue;
				}

				prevValue = log._time;
			}

			return {
				...log.info,
				diffTime: +diffTime.toFixed(2)
			};
		});
	}


	addAction(act: Action<any>) {
		const action = JSON.parse(JSON.stringify(act));

		if (JSON.stringify(action).length > 100 && action.payload) {
			action.payload = 'too large..';
			this.actions.push(action);
		} else {
			this.actions.push(action);
		}

		if (this.actions.length > this.opts.maxActions) {
			this.actions.shift();
		}

		this.addLog('ACTION', action.type);
	}


	getActions(onlyTypes = this.opts.onlyTypes) {
		if (onlyTypes) {
			return this.actions.map(action => action.type);
		}

		return this.actions;
	}

}

export default SystemLogger;
