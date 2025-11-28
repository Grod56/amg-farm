import { ModeledVoidComponent } from "@mvc-react/components";
import {
	NotificationToastModel,
	ToastNotificationType,
} from "./notification-toast-model";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

type Variant = "success" | "danger" | "primary" | "info";
const NotificationToast = function ({ model }) {
	const { modelView, interact } = model;
	const { notifier, notificationMap, shown } = modelView;
	const { notification } = notifier.modelView;
	const variantMap = new Map<ToastNotificationType | undefined, Variant>([
		["success", "success"],
		["failure", "danger"],
		["info", "info"],
		[undefined, "primary"],
	]);

	return (
		<ToastContainer
			position={"bottom-center"}
			className="p-4 position-fixed"
			style={{ zIndex: 10 }}
		>
			<Toast
				bg={
					notification
						? variantMap.get(notificationMap.get(notification.type))
						: undefined
				}
				show={shown}
				onClose={() =>
					interact({
						type: "Close",
						input: { currentModelView: modelView },
					})
				}
				delay={5000}
				autohide
			>
				<Toast.Body className="text-center">
					<span className="text-amber-50 text-base">
						{notification?.text}
					</span>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
} as ModeledVoidComponent<NotificationToastModel>;

export default NotificationToast;
