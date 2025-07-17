import {
	RepositoryModel,
	RepositoryModelInteraction,
} from "../../utilities/repositories/repository-model";
import { CattleModel } from "./cattle-model";

export interface CattleRepositoryModelView {
	cattleModels: CattleModel[];
	locations: string[];
}

export type CattleRepositoryModelInteraction = RepositoryModelInteraction;

export type CattleRepositoryModel = RepositoryModel<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
>;
