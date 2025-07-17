"use server";

import { CattleRecord } from "@/lib/content/cattle/cattle-api";
import neon from "@/lib/third-party/clients/neon";

export async function retrieveRecords() {
	const records = await neon()`SELECT * FROM "Cattle"`;
	return records as CattleRecord[];
}
