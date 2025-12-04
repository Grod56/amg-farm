import { getProtectedResource } from "@/lib/utilities/server-actions/auth";
import Livestock from "./Livestock";

export default async function Page() {
	return getProtectedResource(() => <Livestock />, "livestock");
}
