import { ModeledVoidComponent } from "@mvc-react/components";
import {
	NotificationToastModel,
	ToastNotificationType,
} from "./notification-toast-model";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useCallback, useEffect } from "react";

type Variant = "success" | "danger" | "primary" | "info";
const NotificationToast = function ({ model }) {
	const { modelView, interact } = model;
	const { notification, typeToToastTypeMap, open, wasDisplayed } = modelView;

	const getToastBg = useCallback(() => {
		const variantMap = new Map<ToastNotificationType | undefined, Variant>([
			["success", "success"],
			["failure", "danger"],
			["info", "info"],
			[undefined, "primary"],
		]);
		return notification
			? variantMap.get(typeToToastTypeMap.get(notification.type))
			: undefined;
	}, [notification, typeToToastTypeMap]);

	useEffect(() => {
		if (
			!(notification?.cleared || wasDisplayed || open) &&
			notification?.text
		) {
			interact({
				type: "OPEN",
			});
		}
	}, [
		notification,
		interact,
		wasDisplayed,
		typeToToastTypeMap,
		open,
		modelView,
	]);

	return (
		notification?.text && (
			<ToastContainer
				position={"bottom-center"}
				className="p-4 position-fixed"
				style={{ zIndex: 10 }}
			>
				<Toast
					bg={getToastBg()}
					show={open}
					onClose={() =>
						interact({
							type: "CLOSE",
						})
					}
					onExited={() => {
						interact({
							type: "CLEAR_NOTIFICATION",
						});
					}}
					delay={5000}
					autohide
				>
					<Toast.Body className="text-center">
						<span className="text-amber-50 text-base">
							{notification.text}
						</span>
					</Toast.Body>
				</Toast>
			</ToastContainer>
		)
	);
} as ModeledVoidComponent<NotificationToastModel>;

export default NotificationToast;
