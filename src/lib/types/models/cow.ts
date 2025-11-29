import { Location } from "@/lib/types/miscellaneous";
import { ReadonlyModel } from "@mvc-react/mvc";

export type CowType = "Bull" | "Ox" | "Steer" | "Cow" | "Heifer";

export interface CowModelView {
	id: string;
	name: string;
	type: string;
	tag: string;
	dob: Date;
	location: Location;
}

export type CowModel = ReadonlyModel<CowModelView>;
