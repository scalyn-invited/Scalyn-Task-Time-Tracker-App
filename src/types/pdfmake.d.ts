declare module 'pdfmake' {
  const pdfmake: any;
  export default pdfmake;
}

declare module 'pdfmake/js/Printer' {
  const PdfPrinter: any;
  export default PdfPrinter;
}

declare module 'pdfmake/interfaces' {
  export type TDocumentDefinitions = any;
  export type TableCell = any;
}
