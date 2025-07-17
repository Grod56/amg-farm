import { ReadonlyModel } from "@mvc-react/mvc";

export interface CattleModelView {
	id: string;
	name: string;
	type: string;
	tag: string;
	dob: Date;
	location: string;
}

export type CattleModel = ReadonlyModel<CattleModelView>;
