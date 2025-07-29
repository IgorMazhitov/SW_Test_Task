
/**
 * @fileoverview Helper utilities and shared functions organized by domain
 * This file contains utility functions organized into namespaces by domain
 * Import specific functions using destructuring: import { ActionHelpers } from "../common/helpers";
 */

import { ActionType } from "../../types/action.types";

/**
 * Format request data for logs display
 * Truncates long request data for better display
 */
export const formatRequestForLogs = (requestData: string): string => {
  if (!requestData) return '';
  try {
    const parsed = JSON.parse(requestData);
    return JSON.stringify(parsed, null, 2).substring(0, 200) + (JSON.stringify(parsed).length > 200 ? '...' : '');
  } catch (e) {
    return requestData.substring(0, 200) + (requestData.length > 200 ? '...' : '');
  }
};

/**
 * Format response data for logs display
 * Truncates long response data for better display
 */
export const formatResponseForLogs = (responseData: string): string => {
  if (!responseData) return '';
  try {
    const parsed = JSON.parse(responseData);
    return JSON.stringify(parsed, null, 2).substring(0, 200) + (JSON.stringify(parsed).length > 200 ? '...' : '');
  } catch (e) {
    return responseData.substring(0, 200) + (responseData.length > 200 ? '...' : '');
  }
};

/**
 * Generate a random matrix for interactive display
 * Used by the Greetings component
 * @param matrix Initial matrix structure
 * @returns Matrix with random values
 */
export const getRandomMatrix = (matrix: number[][]): number[][] => {
  return matrix.map(row => 
    row.map(() => Math.round(Math.random()))
  );
};
 
/**
 * Constants and helpers related to actions
 */
export namespace ActionHelpers {
  /**
   * Mapping for action types with undefined option for filtering
   * Used for filtering actions by type with an ALL option that maps to undefined
   */
  export const typeMappingWithUndefined: Record<string, ActionType | undefined> = {
    ALL: undefined,
    ...Object.fromEntries(Object.values(ActionType).map((type) => [type, type])),
  };
  
  /**
   * Columns for actions table
   * Used to define the columns in the actions table
   */
  export const columnsForActionsTable: string[] = [
    'id',
    'type',
    'description',
    'approved',
    'requestedTime',
    'approvedTime',
    'approve',
    'decline'
  ];
  
  /**
   * Filter columns based on user role
   * @param isAdmin Whether the current user is an admin
   * @returns Filtered columns based on permissions
   */
  export const filterColumnsForActionsTable = (isAdmin: boolean): string[] => {
    return isAdmin 
      ? columnsForActionsTable
      : columnsForActionsTable.filter(col => col !== 'approve' && col !== 'decline');
  };

  /**
   * Mapping for action types excluding item-related types
   * Used for action type dropdown without the 'item' type actions
   */
  export const typeMapping: Record<string, ActionType> = {
    ...Object.fromEntries(
      Object.values(ActionType)
        .map((type) => [type, type])
        .filter((type) => type[0] !== "item")
    ),
  };

  /**
   * Column definitions for actions table
   */
  export const tableColumns: string[] = [
    "userId",
    "type",
    "description",
    "id",
    "approved",
    "active",
    "itemId",
    "requestedTime",
    "text",
    "approvedTime",
    "approvedBy",
    "approve",
    "decline",
  ];

  /**
   * Filters table columns based on user's admin status
   * Removes approval/decline actions for non-admin users
   */
  export const getFilteredTableColumns = (isUserAdmin: boolean): string[] => {
    if (!isUserAdmin) {
      return tableColumns.filter(
        (column) => column !== "approve" && column !== "decline"
      );
    }
    return tableColumns;
  };
}

/**
 * Utility functions
 */
export namespace Utilities {
  /**
   * Generates a random binary matrix from input matrix
   * @param matrix - Input matrix to randomize
   * @returns A matrix with random 0s and 1s
   */
  export const generateRandomMatrix = (matrix: number[][]): number[][] => {
    return matrix.map((row: number[]) => 
      row.map(() => Math.random() > 0.5 ? 1 : 0)
    );
  };

  /**
   * Safely parses JSON with error handling
   * @param jsonString - JSON string to parse
   * @returns Parsed object or null if invalid
   */
  export const safeJsonParse = <T>(jsonString: string): T | null => {
    if (!jsonString) return null;
    
    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return null;
    }
  };
}

/**
 * Log formatting helpers
 */
export namespace LogHelpers {
  /**
   * Formats API request data for log display
   * @param jsonRequest - JSON string representing the request
   */
  export const formatRequest = (jsonRequest: string): string => {
    if (!jsonRequest) return "No request data";
    
    const request = Utilities.safeJsonParse<{url: string; method: string; body: any}>(jsonRequest);
    if (!request) return "Invalid request data";
    
    const { url, method, body } = request;
    const formattedRequestBody = JSON.stringify(body);

    return `${method} ${url}\n${
      formattedRequestBody !== "{}" ? formattedRequestBody : "No request body"
    }`;
  };

  /**
   * Formats API response data for log display
   * @param jsonResponse - JSON string representing the response
   */
  export const formatResponse = (jsonResponse: string): string => {
    if (!jsonResponse) return "No response data";
    
    const response = Utilities.safeJsonParse<{status: number}>(jsonResponse);
    if (!response) return "Invalid response data";
    
    return `Status: ${response.status}`;
  };
}

/**
 * User-related helpers
 */
export namespace UserHelpers {
  /**
   * Column definitions for user management table
   */
  export const tableColumns: string[] = [
    "id",
    "role",
    "userName",
    "email",
    "Actions"
  ];

  /**
   * Filters table columns based on user's admin status
   * @param isUserAdmin - Whether the current user has admin privileges
   */
  export const getFilteredTableColumns = (isUserAdmin: boolean): string[] => {
    if (!isUserAdmin) {
      return tableColumns.filter(
        column => column !== "password" && column !== "created_at" && column !== "email"
      );
    }
    return tableColumns;
  };
}
