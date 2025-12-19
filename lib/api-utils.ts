import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiResponse["meta"]
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      ...(meta && { meta }),
    },
    { status: 200 }
  );
}

export function errorResponse(
  error: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return errorResponse("Unauthorized. Authentication required.", 401);
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return errorResponse("Forbidden. Insufficient permissions.", 403);
}

export function notFoundResponse(resource: string = "Resource"): NextResponse<ApiResponse> {
  return errorResponse(`${resource} not found.`, 404);
}

export function validationErrorResponse(zodError: any): NextResponse<ApiResponse> {
  // Handle both Zod v3 and v4 error formats
  const errors = Array.isArray(zodError.issues) 
    ? zodError.issues 
    : Array.isArray(zodError.errors) 
      ? zodError.errors 
      : [];
      
  const errorMessage = errors[0]?.message || 'Validation failed';
  
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      data: { 
        errors: errors.map((e: any) => ({
          path: e.path?.join('.') || '',
          message: e.message,
          code: e.code
        }))
      },
    },
    { status: 422 }
  );
}

export function serverErrorResponse(): NextResponse<ApiResponse> {
  return errorResponse("Internal server error", 500);
}

