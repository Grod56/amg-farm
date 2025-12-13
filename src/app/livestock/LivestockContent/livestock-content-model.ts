import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { InitializedModel, ReadonlyModel } from "@mvc-react/mvc";
import { LivestockNotificationType } from "../Livestock";
import { NotifierModel } from "@/lib/types/models/notifier";

export interface LivestockContentModelView {
	cattleRepository: InitializedModel<CattleRepositoryModel>;
	notifier: NotifierModel<LivestockNotificationType>;
}

export type LivestockContentModel = ReadonlyModel<LivestockContentModelView>;
