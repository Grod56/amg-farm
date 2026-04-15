"use server";

import { Location } from "../types/miscellaneous";
import neon from "@/lib/third-party/clients/neon";

export async function retrieveLocations() {
	const locations = await neon()`SELECT * FROM "Location"`;
	return locations.rows.map(
		record =>
			({
				id: record.id,
				name: record.name,
			}) as Location,
	);
}

export async function addLocation(location: Omit<Location, "id">) {
	const { name } = location;
	return (await neon()`INSERT INTO "Location"("name") VALUES (${name})`).rows;
}

export async function editLocation(updatedLocation: Location) {
	const { id, name } = updatedLocation;
	return (
		await neon()`UPDATE "Location" SET "name" = ${name} WHERE "id" = ${id}`
	).rows;
}

export async function deleteLocation(location: Pick<Location, "id">) {
	const { id } = location;
	return (await neon()`DELETE FROM "Location" WHERE "id" = ${id}`).rows;
}
