import type { ApiResponse } from "./api";

export type ResponseBalance = ApiResponse<{
    balance: number;
}>