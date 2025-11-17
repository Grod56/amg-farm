import { InputModelInteraction } from "@mvc-react/mvc";
import {
	RepositoryModel,
	RepositoryModelInteraction,
} from "../../utilities/repositories/repository-model";
import { CowModel } from "./cow-model";
import { AddCowFormModelView } from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";

export interface CattleRepositoryModelView {
	cattleModels: CowModel[];
	locations: string[];
}

export type CattleRepositoryModelInteraction =
	| RepositoryModelInteraction
	| InputModelInteraction<"Add_Cow", { form: AddCowFormModelView }>;

export type CattleRepositoryModel = RepositoryModel<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
>;
