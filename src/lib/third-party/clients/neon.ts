import { neon } from "@neondatabase/serverless";

const getNeonDB = () => neon(`${process.env.DATABASE_URL}`);

export default getNeonDB;
