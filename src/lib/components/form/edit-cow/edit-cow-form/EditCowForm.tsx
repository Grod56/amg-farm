import { ModeledVoidComponent } from "@mvc-react/components";
import { EditCowFormModel } from "./edit-cow-form-model";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Notification } from "@/lib/types/models/notification";
import Spinner from "react-bootstrap/Spinner";

const EditCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { fields, locations, cowTypes, cowToBeEdited } = modelView;
	const { id, name, type, tag, dob, location } = cowToBeEdited.modelView;
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());

	const [notification, setNotification] = useState<Notification<
		"submitting" | "failure"
	> | null>(null);

	return (
		<Form
			className="flex flex-col gap-4"
			onSubmit={e => {
				e.preventDefault();
				const {
					name: updatedName,
					type: updatedType,
					tag: updatedTag,
					dob: updatedDob,
					location: updatedLocation,
				} = fields;
				interact({
					type: "SUBMIT",
					input: {
						updatedCow: {
							modelView: {
								id,
								name: updatedName.trim(),
								dob: updatedDob,
								type: updatedType,
								tag: updatedTag.trim(),
								location: updatedLocation,
							},
						},
						pendingCallback() {
							setNotification({ type: "submitting" });
						},
						failureCallback(error) {
							setNotification({
								type: "failure",
								text: `${String(error)}`,
							});
						},
					},
				});
			}}
		>
			<div className="flex flex-col">
				<Form.Control
					type="text"
					defaultValue={name}
					placeholder="Name"
					required
					onChange={e =>
						interact({
							type: "UPDATE_FORM",
							input: {
								updatedFormFields: {
									...fields,
									name: e.target.value,
								},
							},
						})
					}
				/>
				<br />
				<Form.Select
					defaultValue={type}
					required
					onChange={e =>
						interact({
							type: "UPDATE_FORM",
							input: {
								updatedFormFields: {
									...fields,
									type: e.target.value,
								},
							},
						})
					}
				>
					{[
						...cowTypes.map((cowType, index) => (
							<option key={index}>{cowType.type}</option>
						)),
					]}
				</Form.Select>
				<br />
				<Form.Control
					type="text"
					defaultValue={tag}
					placeholder="Tag"
					onChange={e =>
						interact({
							type: "UPDATE_FORM",
							input: {
								updatedFormFields: {
									...fields,
									tag: e.target.value,
								},
							},
						})
					}
				/>
				<br />
				<Form.Control
					type="date"
					placeholder="Date of Birth"
					required
					defaultValue={Intl.DateTimeFormat("sv-SE").format(dob)} // TODO: eww...
					max={maxDate}
					onChange={event =>
						interact({
							type: "UPDATE_FORM",
							input: {
								updatedFormFields: {
									...fields,
									dob: new Date(event.target.value),
								},
							},
						})
					}
				/>
				<br />
				<Form.Select
					name="locations"
					id="edit-form-location-selector"
					defaultValue={location.name}
					required
					onChange={event =>
						interact({
							type: "UPDATE_FORM",
							input: {
								updatedFormFields: {
									...fields,
									location: {
										id: locationsMap.get(
											event.target.value,
										)!,
										name: event.target.value,
									},
								},
							},
						})
					}
				>
					{[
						...locationsMap
							.entries()
							.map(([location_name, location_id]) => (
								<option key={location_id} value={location_name}>
									{location_name}
								</option>
							)),
					]}
				</Form.Select>
			</div>
			{notification?.type == "failure" && (
				<span className="text-red-800 text-center">
					{notification.text}
				</span>
			)}
			<div className="flex gap-2 justify-end">
				<button
					className="flex w-1/3 p-2 items-center justify-center gap-2 rounded-lg! text-white bg-gray-700 disabled:bg-gray-400 hover:bg-gray-800"
					type="submit"
					disabled={notification?.type == "submitting"}
				>
					{notification?.type == "submitting" ? (
						<Spinner
							animation="border"
							color="white"
							className="size-6!"
						/>
					) : (
						"Update Cow"
					)}
				</button>
			</div>
		</Form>
	);
} as ModeledVoidComponent<EditCowFormModel>;

export default EditCowForm;
