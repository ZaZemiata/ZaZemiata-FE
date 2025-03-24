/**
 * useExcelExport hook
 *
 * @module useExcelExport.ts
 * @author Daniel Batanov <batanoff.s@protonmail.com>
 */

import { CrawledData, CrawledDataFilter, QueryParams } from "@/share/types";
import { useState } from "react";
import { utils, write } from "xlsx";
import { EXCEL } from "../constants/excel";
import { urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";

// Import httpService and get function
const { get } = httpService();

// ExportResult interface
interface ExportResult {
    success: boolean;
    error?: string;
}

// Custom hook for excel export functionality
const useExcelExport = (params: QueryParams) => {
    // State for exporting
    const [isExporting, setIsExporting] = useState(false);

    // fetch all data with no pagination or limit (needs API update)
    const fetchAllData = async (): Promise<CrawledData[]> => {
        try {
            // Extract only filtering parameters, excluding pagination
            const { page, ...filterParams } = params;
            const response = await get<CrawledDataFilter>(urlKeys.get.crawledData, filterParams);
            return response.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch data');
        }
    };

    // Create Excel workbook from data
    const createWorkbook = (data: CrawledData[]) => {

        // Create worksheet from data
        const workbook = utils.book_new();

        // Map data to Excel columns
        const worksheet = utils.json_to_sheet(data.map(item => ({
            ID: item.id,
            Text: item.text,
            Contractor: item.contractor,
            Date: new Date(item.date).toLocaleDateString('bg-BG'),
            Source: item.SourceUrls.Sources.display_name,
            Created: new Date(item.created_at).toLocaleDateString('bg-BG')
        })));

        // Set column widths for better readability
        const maxWidth = Object.keys(worksheet).reduce((max, cell) => {

            // Skip metadata cells
            if (cell[0] === '!') return max;

            // Get cell value or empty string
            const value = worksheet[cell].v?.toString() || '';

            // Return maximum length of all cells
            return Math.max(max, value.length);
        }, 10);

        // Set column widths
        worksheet['!cols'] = [
            { wch: Math.min(maxWidth, 15) },  // ID
            { wch: Math.min(maxWidth, 50) },  // Text
            { wch: Math.min(maxWidth, 30) },  // Contractor
            { wch: 15 },  // Date
            { wch: 20 },  // Source
            { wch: 15 }   // Created
        ];

        // Append worksheet to workbook
        utils.book_append_sheet(workbook, worksheet, EXCEL.SHEET_NAME);

        // Return workbook
        return workbook;
    };

    // Generate file name with current date
    const generateFileName = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        return `${currentDate}-${EXCEL.FILE_NAME_PREFIX}.xlsx`;
    };

    // Convert binary string to Blob
    const convertToBlob = (binaryString: string) => {

        // Convert binary string to ArrayBuffer
        const buffer = new ArrayBuffer(binaryString.length);

        // Create view from buffer
        const view = new Uint8Array(buffer);

        // Set view values
        for (let i = 0; i < binaryString.length; i++) {
            view[i] = binaryString.charCodeAt(i) & 0xff;
        }

        // Return Blob from buffer
        return new Blob([buffer], { type: EXCEL.EXCEL_MIME_TYPE });
    };


    // Trigger download of Excel file
    const triggerDownload = (url: string, fileName: string) => {

        // Create link element
        const link = document.createElement("a");

        // Set link properties
        link.href = url;
        link.download = fileName;

        // Append link to body, click it and remove it
        document.body.appendChild(link);

        // Click the link
        link.click();

        // Remove the link
        document.body.removeChild(link);
    };

    // Export Excel function
    const exportExcel = async (): Promise<ExportResult> => {

        // Set exporting state
        setIsExporting(true);

        // Try to Fetch data and create Excel file
        try {
            // Fetch all data
            const data = await fetchAllData();

            // Check if data is available
            if (!data?.length) return { success: false, error: "No data available for export" };

            // Create workbook and write binary string
            const workbook = createWorkbook(data);

            // Write binary string
            const binaryString = write(workbook, {
                bookType: "xlsx",
                type: "binary"
            });

            // Convert binary string to Blob
            const blob = convertToBlob(binaryString);

            // Create URL from Blob and trigger download
            const url = URL.createObjectURL(blob);

            // Generate file name
            const fileName = generateFileName();
            
            // Trigger download
            triggerDownload(url, fileName);

            // Revoke URL
            URL.revokeObjectURL(url);
            
            // Return success
            return { success: true };

        }

        // Catch any errors
        catch (error) {

            // Return error message
            return {
                success: false,
                error: error instanceof Error ? error.message : "Failed to export data"
            };

        } 

        // Finally, set exporting state to false
        finally {
            setIsExporting(false);
        }
    };

    // Return exportExcel function and export state
    return { exportExcel, isExporting };
};

// Export the custom hook
export default useExcelExport;
