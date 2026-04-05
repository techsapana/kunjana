import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const parsePayload = async (request: Request): Promise<ContactPayload> => {
  const parsed = (await request.json()) as Partial<ContactPayload>;

  return {
    name: (parsed.name ?? "").trim(),
    email: (parsed.email ?? "").trim(),
    phone: (parsed.phone ?? "").trim(),
    subject: (parsed.subject ?? "").trim(),
    message: (parsed.message ?? "").trim(),
  };
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export async function POST(request: Request) {
  try {
    const payload = await parsePayload(request);

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.subject ||
      !payload.message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
