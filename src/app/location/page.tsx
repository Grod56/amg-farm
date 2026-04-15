import { getProtectedResource } from "@/lib/server-actions/auth";
import Location from "./Location";

export default async function Page() {
	return await getProtectedResource(() => <Location />, "location");
}
