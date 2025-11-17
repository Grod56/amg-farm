import { ReadonlyModel } from "@mvc-react/mvc";

export interface CowModelView {
	id: string;
	name: string;
	type: string;
	tag: string;
	dob: Date;
	locationName: string;
}

export type CowModel = ReadonlyModel<CowModelView>;
