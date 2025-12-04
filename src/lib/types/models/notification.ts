export interface Notification<T> {
	type: T;
	text?: string;
	cleared?: boolean;
}
