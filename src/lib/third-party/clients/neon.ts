import { neon } from "@neondatabase/serverless";

const getNeonDB = () =>
	neon(`${process.env.DATABASE_URL}`, { fullResults: true });

export default getNeonDB;
