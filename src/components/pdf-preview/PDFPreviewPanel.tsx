'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

type PDFPreviewPanelProps = {
  pdfFile: string | null
}

export default function PDFPreviewPanel({ pdfFile }: PDFPreviewPanelProps) {
  const [numPages, setNumPages] = useState<number | null>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  if (!pdfFile) {
    return <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">No PDF to preview</div>
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-h-screen overflow-auto"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={600}
            className="border-b border-gray-200"
          />
        ))}
      </Document>
    </div>
  )
}