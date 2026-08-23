"use client"

import { useEffect, useRef } from "react"
import JsBarcode from "jsbarcode"

export function BarcodeImage({ value, height = 60 }: { value: string; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: "EAN13",
          width: 2,
          height,
          fontSize: 14,
          margin: 8,
          background: "#ffffff",
          lineColor: "#000000",
        })
      } catch {
        // Invalid barcode value, skip rendering
      }
    }
  }, [value, height])

  return <svg ref={svgRef} />
}