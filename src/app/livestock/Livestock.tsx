"use client";

import AddCowDialog from "@/lib/components/form/add-cow/AddCowDialog";
import EditCowDialog from "@/lib/components/form/edit-cow/EditCowDialog";
import RemoveCowDialog from "@/lib/components/form/remove-cow/RemoveCowDialog";
import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import { ToastNotificationType } from "@/lib/components/notification-toast/notification-toast-model";
import NotificationToast from "@/lib/components/notification-toast/NotificationToast";
import { addCowDialogVIInterface } from "@/lib/implementations/models/add-cow-dialog";
import { editCowDialogVIInterface } from "@/lib/implementations/models/edit-cow-dialog";
import { livestockTableVIInterface } from "@/lib/implementations/models/livestock-table";
import { notificationToastVIInterface } from "@/lib/implementations/models/notification-toast";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { removeCowDialogVIInterface } from "@/lib/implementations/models/remove-cow-dialog";
import { cattleRepositoryViewInteractionInterface } from "@/lib/implementations/repositories/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { useStatefulRepository } from "@/lib/utilities/repositories/use-repository";
import {
	useInitializedStatefulInteractiveModel,
	useNewStatefulInteractiveModel,
} from "@mvc-react/stateful";
import Spinner from "react-bootstrap/Spinner";
import "./livestock.css";

export type LivestockNotificationType = "success" | "pending" | "failure";

const Livestock = function () {
	const cattleRepository = useStatefulRepository({
		modelView: null,
		viewInteractionInterface: cattleRepositoryViewInteractionInterface,
	});
	const { modelView: repositoryModelView } = cattleRepository;
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<LivestockNotificationType>(),
		{ notification: null },
	);
	const { notification } = notifier.modelView;
	const notificationToast = useInitializedStatefulInteractiveModel(
		notificationToastVIInterface(notifier),
		{
			notification,
			typeToToastTypeMap: new Map<
				LivestockNotificationType,
				ToastNotificationType
			>([
				["success", "success"],
				["failure", "failure"],
			]),
			open: false,
			wasDisplayed: false,
		},
	);
	const submitSuccessCallback = () => {
		livestockTable.interact({ type: "RESET_SELECTED_COW" });
	};
	const addCowCallback = () => {
		if (!(repositoryModelView && livestockTable.modelView))
			throw new Error("Cannot add cow when repository is uninitialized");
		addCowDialog.interact({
			type: "OPEN",
			input: {
				initialFormModelView: {
					locations: repositoryModelView.allLocations,
					cowTypes: repositoryModelView.cowTypes,
					fields: {
						name: "",
						type: repositoryModelView.cowTypes[0].type,
						tag: "",
						dob: new Date(),
						location:
							livestockTable.modelView.selectedLocation ??
							repositoryModelView.allLocations[0],
					},
				},
			},
		});
	};
	const removeCowCallback = (cow: CowModel) => {
		removeCowDialog.interact({
			type: "OPEN",
			input: {
				cowToBeRemoved: cow,
			},
		});
	};
	const editCowCallback = (cow: CowModel) => {
		if (!(repositoryModelView && livestockTable.modelView))
			throw new Error("Cannot add cow when repository is uninitialized");
		editCowDialogInteract({
			type: "OPEN",
			input: {
				cowToBeEdited: cow,
				locations: repositoryModelView.allLocations,
				cowTypes: repositoryModelView.cowTypes,
			},
		});
	};
	const livestockTable = useInitializedStatefulInteractiveModel(
		livestockTableVIInterface(
			addCowCallback,
			editCowCallback,
			removeCowCallback,
		),
		{
			cattle: [],
			locations: [],
			notification: null,
		},
	);
	const addCowDialog = useNewStatefulInteractiveModel(
		addCowDialogVIInterface({
			cattleRepository,
			pendingCallback() {
				notifier.interact({
					type: "NOTIFY",
					input: { notification: { type: "pending" } },
				});
			},
			successCallback(cow) {
				notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.name} successfully added`,
							type: "success",
						},
					},
				});
				submitSuccessCallback();
			},
			failureCallback() {
				notifier.interact({
					type: "CLEAR",
				});
			},
		}),
	);
	const {
		modelView: editCowDialogModelView,
		interact: editCowDialogInteract,
	} = useNewStatefulInteractiveModel(
		editCowDialogVIInterface({
			cattleRepository,
			pendingCallback() {
				notifier.interact({
					type: "NOTIFY",
					input: { notification: { type: "pending" } },
				});
			},
			successCallback(cow) {
				notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.modelView.name} successfully updated`,
							type: "success",
						},
					},
				});
				submitSuccessCallback();
			},
			failureCallback() {
				notifier.interact({
					type: "CLEAR",
				});
			},
		}),
	);
	const removeCowDialog = useNewStatefulInteractiveModel(
		removeCowDialogVIInterface(
			cattleRepository,
			() => {
				notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							type: "pending",
						},
					},
				});
			},
			cow => {
				removeCowDialog.interact({ type: "CLOSE" });
				notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.modelView.name} successfully removed`,
							type: "success",
						},
					},
				});
				submitSuccessCallback();
			},
			error => {
				notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							type: "failure",
							text: `Failed to remove cow: ${error}`,
						},
					},
				});
			},
		),
	);

	return (
		<>
			{/* Crazy h-0 to make everything fit together for some reason */}
			<div className="page-background grow w-full h-0 px-3 p-8 md:pl-12! md:pr-12!">
				<div className="bg w-full h-full rounded-3xl shadow gap-8 bg-white grow flex flex-col py-8 px-4 md:w-9/10 md:min-h-80 md:mx-auto md:pl-12! md:pr-12!">
					<div className="flex gap-4 items-center">
						<span className="text-4xl">Livestock</span>
						<Spinner
							hidden={notification?.type != "pending"}
							animation="border"
							color="gray"
							className="size-6!"
						/>
					</div>
					{repositoryModelView ? (
						<LivestockTable
							model={{
								...livestockTable,
								modelView: {
									...livestockTable.modelView,
									cattle: repositoryModelView.cattle,
									locations:
										repositoryModelView.activeLocations,
									notification,
								},
							}}
						/>
					) : (
						<Spinner
							animation="border"
							color="black"
							className="size-16! mx-auto my-auto"
						/>
					)}
				</div>
			</div>
			{addCowDialog.modelView && (
				<AddCowDialog
					model={{
						...addCowDialog,
						modelView: addCowDialog.modelView,
					}}
				/>
			)}
			{editCowDialogModelView && (
				<EditCowDialog
					model={{
						modelView: { ...editCowDialogModelView },
						interact: editCowDialogInteract,
					}}
				/>
			)}
			{removeCowDialog.modelView && (
				<RemoveCowDialog
					model={{
						...removeCowDialog,
						modelView: removeCowDialog.modelView,
					}}
				/>
			)}
			<NotificationToast
				model={{
					...notificationToast,
					modelView: { ...notificationToast.modelView, notification },
				}}
			/>
		</>
	);
};

export default Livestock;
