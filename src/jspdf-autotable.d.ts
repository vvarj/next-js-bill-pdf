import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number; // The final Y position after the table is drawn
    };
  }
}
