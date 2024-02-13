// app/api/route.js

// Import necessary dependencies and modules
import { NextResponse } from "next/server"; // Import Next.js server response utility

// Handler function for handling HTTP GET request
export const GET = async (req) => {
    return NextResponse.json("welcome to commerce control pro", { status: 200 }); // Return a JSON response with a welcome message
};
