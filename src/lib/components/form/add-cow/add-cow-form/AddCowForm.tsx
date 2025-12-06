import { Notification } from "@/lib/types/models/notification";
import { ModeledVoidComponent } from "@mvc-react/components";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { AddCowFormModel } from "./add-cow-form-model";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, cowTypes, fields } = modelView;
	const { name, type, tag, dob, location } = fields;
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);
	const [notification, setNotification] = useState<Notification<
		"submitting" | "failure"
	> | null>(null);

	return (
		<>
			<Form
				className="flex flex-col gap-4"
				onSubmit={e => {
					e.preventDefault();
					interact({
						type: "SUBMIT",
						input: {
							cowToBeAdded: {
								name: name.trim(),
								dob,
								type,
								tag: tag.trim(),
								location,
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
						placeholder="Name"
						required
						defaultValue={name}
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
						placeholder="Tag"
						defaultValue={tag}
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
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										dob: new Date(e.target.value),
									},
								},
							})
						}
					/>
					<br />
					<Form.Select
						required
						defaultValue={location.name}
						onChange={e =>
							interact({
								type: "UPDATE_FORM",
								input: {
									updatedFormFields: {
										...fields,
										location: {
											id: locationsMap.get(
												e.target.value,
											)!,
											name: e.target.value,
										},
									},
								},
							})
						}
					>
						{[
							...locations.map(location => (
								<option key={location.id}>
									{location.name}
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
							"Add Cow"
						)}
					</button>
				</div>
			</Form>
		</>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
