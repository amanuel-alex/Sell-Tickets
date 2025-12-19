import { NextRequest } from "next/server";
import { dbExtended } from "@/lib/db-extended";
import { errorResponse, successResponse, notFoundResponse } from "@/lib/api-utils";

// POST /api/v1/transactions/[id]/confirm - Confirm payment (public endpoint for payment gateways)
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const transaction = dbExtended.getTransactionById(id);
    if (!transaction) {
      return notFoundResponse("Transaction");
    }

    if (transaction.status !== "pending") {
      return errorResponse(
        `Transaction is already ${transaction.status}`,
        400
      );
    }

    // Update transaction to completed
    const updatedTransaction = dbExtended.updateTransaction(id, {
      status: "completed",
    });

    if (!updatedTransaction) {
      return notFoundResponse("Transaction");
    }

    return successResponse(
      {
        id: updatedTransaction.id,
        status: updatedTransaction.status,
        amount: updatedTransaction.amount,
        message: "Payment confirmed successfully",
      },
      "Payment confirmed"
    );
  } catch (error) {
    console.error("Confirm payment error:", error);
    return errorResponse("Failed to confirm payment", 500);
  }
}

