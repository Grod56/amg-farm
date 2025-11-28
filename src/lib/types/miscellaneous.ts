export interface Location {
	id: string;
	name: string;
}

export interface Notification<T> {
	type: T;
	text?: string;
}
