export type STORAGE_TYPE = 'session' | 'local'

export default class PersistentStorage {

	private readonly type: STORAGE_TYPE;
	private storage: any;
	static _instance: PersistentStorage | null = null;

	constructor(t?: STORAGE_TYPE) {
		this.type = t ? t : 'session';
		this.storage = this.type === 'session' ? sessionStorage : localStorage;
	}

	public static get instance(): PersistentStorage {
		if (!this._instance) {
			this._instance = new PersistentStorage()
		}
		return this._instance
	}

	public setItem(key: string, data: any): void {
		this.storage.setItem(key, JSON.stringify(data));
	}

	public getItem(key: string): any {
		const data = this.storage.getItem(key);
		return data ? JSON.parse(data) : null
	}

	public removeItem(key: string): void {
		this.storage.removeItem(key);
	}

	clear(): void {
		this.storage.clear();
	}

}
