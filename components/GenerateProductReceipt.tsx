import { getLocalStorageData } from "@/utils/storeData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateProductReceipt = () => {
        const soldItems = getLocalStorageData('soldItems')

        const handleGenerateReceipt = () => {

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 40; // left & right padding
        const contentWidth = pageWidth - margin * 2;

        const currentDate = new Date().toLocaleString();

        // Header: Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Products Receipt", pageWidth / 2, 50, { align: "center" });

        // Date Label
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text("Date:", margin, 80);

        doc.setFont("helvetica", "normal");
        doc.text(currentDate, margin + 40, 80);

        // Prepare table data
        const tableData = soldItems.map((item) => [
        item.productName,
        item.quantity.toString(),
        `$${item.price.toFixed(2)}`
        ]);

        // Table: AutoTable 
        autoTable(doc, {
        startY: 100,
        head: [["Product Name", "Quantity", "Price"]],
        body: soldItems.length > 0 ? tableData : [["", "No products found", ""]],
        margin: { left: margin, right: margin },
        theme: "grid",
        styles: {
            textColor: [0, 0, 0],
            font: "helvetica",
            fontSize: 13,
            halign: "center",
            cellPadding: 6,
        },
        headStyles: {
            fillColor: [0, 0, 0],
            textColor: 255,
            fontSize: 14,
            fontStyle: "bold",
            halign: "center",
        },
        columnStyles: {
            0: { cellWidth: contentWidth * 0.4 },
            1: { cellWidth: contentWidth * 0.3 },
            2: { cellWidth: contentWidth * 0.3 },
        },
        });

        // Total Amount
        const total = soldItems.reduce((acc, item) => acc + item.price, 0);
        const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 30;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);

        const labelX = pageWidth - margin - 150;
        const valueX = pageWidth - margin;

        const addRow = (label: string, value: string, y: number) => {
        doc.text(label, labelX, y, { align: "right" });
        doc.text(value, valueX, y, { align: "right" });
        };

        addRow("Subtotal: ", `$${total.toFixed(2)}`, finalY);
        addRow("Discount: ", `0`, finalY + 20);
        addRow("Total: ", `$${total.toFixed(2)}`, finalY + 40);
    
        // Open the PDF in a new window
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    }

    return (
        <>
            <button
                className="p-[4px_12px] text-[17px] bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded-[10px] transition duration-300 ease-in-out cursor-pointer hover:from-blue-900 hover:to-blue-600 hover:shadow-lg focus:outline-none"
                onClick={handleGenerateReceipt}
            >Generate Receipt</button>
        </>
    )
}

export default GenerateProductReceipt