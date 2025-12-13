import { InitializedInteractiveModel, ModelInteraction } from "@mvc-react/mvc";
import { User } from "better-auth";

export interface AuthWidgetDropdownModelView {
	user: User;
}

export type AuthWidgetDropdownModelInteraction = ModelInteraction<"SIGN_OUT">;

export type AuthWidgetDropdownModel = InitializedInteractiveModel<
	AuthWidgetDropdownModelView,
	AuthWidgetDropdownModelInteraction
>;
