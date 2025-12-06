import { AddCowFormTools } from "@/lib/implementations/models/add-cow-form";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";
import { AddCowFormModelView } from "./add-cow-form/add-cow-form-model";

export interface AddCowDialogModelView {
	shown: boolean;
	initialFormModelView: AddCowFormModelView;
	formTools: AddCowFormTools;
}

export type AddCowDialogModelInteraction =
	| ModelInteraction<"CLOSE">
	| InputModelInteraction<
			"OPEN",
			{
				initialFormModelView: AddCowFormModelView;
				formTools: AddCowFormTools;
			}
	  >;

export type AddCowDialogModel = InitializedModel<
	InteractiveModel<AddCowDialogModelView, AddCowDialogModelInteraction>
>;
