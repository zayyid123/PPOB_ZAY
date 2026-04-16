import type { ApiResponse } from "./api";

export type ResponseBalance = ApiResponse<{
    balance: number;
}>

export type ResponseTopUp = ApiResponse<{
    balance: number;
}>