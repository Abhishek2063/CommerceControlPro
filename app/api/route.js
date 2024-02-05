// app/api/route.js

// Import necessary dependencies and modules
import { NextResponse } from "next/server";

export const GET = async (req) => {
    return NextResponse.json("welcome to commerce control pro", { status: 200 });
};