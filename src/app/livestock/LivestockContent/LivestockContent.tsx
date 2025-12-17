import { ModeledVoidComponent } from "@mvc-react/components";
import { LivestockContentModel } from "./livestock-content-model";
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
import { removeCowDialogVIInterface } from "@/lib/implementations/models/remove-cow-dialog";
import { CowModel } from "@/lib/types/models/cow";
import {
	useInitializedStatefulInteractiveModel,
	useNewStatefulInteractiveModel,
} from "@mvc-react/stateful";
import { LivestockNotificationType } from "../Livestock";
import { useLayoutEffect } from "react";
import equals from "fast-deep-equal";
import { Location } from "@/lib/types/miscellaneous";

const LivestockContent = function ({ model }) {
	const { cattleRepository, notifier } = model.modelView;
	const { modelView: repositoryModelView } = cattleRepository;
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
	const submitSuccessCallback = async () => {
		await livestockTable.interact({ type: "RESET_SELECTED_COW" });
	};
	const addCowDialog = useNewStatefulInteractiveModel(
		addCowDialogVIInterface({
			cattleRepository,
			async pendingCallback() {
				await notifier.interact({
					type: "NOTIFY",
					input: { notification: { type: "pending" } },
				});
			},
			async successCallback(cow) {
				await notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.name} successfully added`,
							type: "success",
						},
					},
				});
				await submitSuccessCallback();
			},
			async failureCallback() {
				await notifier.interact({
					type: "CLEAR",
				});
			},
		}),
	);
	const editCowDialog = useNewStatefulInteractiveModel(
		editCowDialogVIInterface({
			cattleRepository,
			async pendingCallback() {
				await notifier.interact({
					type: "NOTIFY",
					input: { notification: { type: "pending" } },
				});
			},
			async successCallback(cow) {
				await notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.modelView.name} successfully updated`,
							type: "success",
						},
					},
				});
				await submitSuccessCallback();
			},
			async failureCallback() {
				await notifier.interact({
					type: "CLEAR",
				});
			},
		}),
	);
	const removeCowDialog = useNewStatefulInteractiveModel(
		removeCowDialogVIInterface(
			cattleRepository,
			async () => {
				await notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							type: "pending",
						},
					},
				});
			},
			async cow => {
				await removeCowDialog.interact({ type: "CLOSE" });
				await notifier.interact({
					type: "NOTIFY",
					input: {
						notification: {
							text: `${cow.modelView.name} successfully removed`,
							type: "success",
						},
					},
				});
				await submitSuccessCallback();
			},
			async error => {
				await notifier.interact({
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
	const addCowCallback = async () => {
		await addCowDialog.interact({
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
	const editCowCallback = async (cow: CowModel) => {
		await editCowDialog.interact({
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
			tableContent: {
				cattle: repositoryModelView.cattle,
				locations: repositoryModelView.activeLocations,
			},
			selectedLocation: repositoryModelView.activeLocations[0],
			notification,
		},
	);

	useLayoutEffect(() => {
		if (!equals(notification, livestockTable.modelView.notification)) {
			livestockTable.interact({
				type: "UPDATE_NOTIFICATION",
				input: { notification },
			});
		}
		if (!equals(notification, notificationToast.modelView.notification)) {
			notificationToast.interact({
				type: "UPDATE_NOTIFICATION",
				input: { notification },
			});
		}
	}, [notification, livestockTable, notificationToast]);

	useLayoutEffect(() => {
		const updatedTableContent: {
			cattle: CowModel[];
			locations: Location[];
		} = {
			cattle: repositoryModelView.cattle,
			locations: repositoryModelView.activeLocations,
		};
		if (
			!equals(updatedTableContent, livestockTable.modelView.tableContent)
		) {
			livestockTable.interact({
				type: "UPDATE_CONTENT",
				input: {
					tableContent: {
						cattle: repositoryModelView.cattle,
						locations: repositoryModelView.activeLocations,
					},
				},
			});
		}
	}, [
		livestockTable,
		repositoryModelView.activeLocations,
		repositoryModelView.cattle,
	]);

	return (
		<>
			<LivestockTable model={livestockTable} />
			{addCowDialog.modelView && (
				<AddCowDialog
					model={{
						...addCowDialog,
						modelView: addCowDialog.modelView,
					}}
				/>
			)}
			{editCowDialog.modelView && (
				<EditCowDialog
					model={{
						...editCowDialog,
						modelView: editCowDialog.modelView,
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
			<NotificationToast model={{ ...notificationToast }} />
		</>
	);
} as ModeledVoidComponent<LivestockContentModel>;

export default LivestockContent;
