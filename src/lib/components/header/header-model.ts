import { ReadonlyModel } from "@mvc-react/mvc";

export interface HeaderModelView {
	headerTitle: string;
}

export type HeaderModel = ReadonlyModel<HeaderModelView>;
