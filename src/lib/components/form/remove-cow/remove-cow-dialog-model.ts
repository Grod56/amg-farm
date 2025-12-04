import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface RemoveCowDialogModelView {
	shown: boolean;
	cow: CowModel;
}

export type RemoveCowDialogModelInteraction =
	| ModelInteraction<"SUBMIT">
	| ModelInteraction<"CLOSE">
	| InputModelInteraction<"OPEN", { cowToBeRemoved: CowModel }>;

export type RemoveCowDialogModel = InitializedModel<
	InteractiveModel<RemoveCowDialogModelView, RemoveCowDialogModelInteraction>
>;
