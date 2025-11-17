import { generateRegister } from "@/lib/utilities/server-actions";
import BlobStream from "blob-stream";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
	const pdfStream = BlobStream();
	await generateRegister(pdfStream);
	const blob = pdfStream.toBlob();
	const timeGenerated = new Date(Date.now());
	const fileName = `farm_register_${timeGenerated.toLocaleString()}.pdf`;
	const pdfFile = new File([blob], fileName, {
		lastModified: timeGenerated.getTime(),
	});
	return new Response(pdfFile, {
		status: 201,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${fileName}"`,
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Pragma: "no-cache",
			Expires: "0",
		},
	});
}
