"use client"

import React from "react"
import { Button } from "./ui/button"

export default function RetryButton({
  children,
}: {
  children?: React.ReactNode
}) {
  const handleClick = () => {
    // Recarrega a página no cliente
    if (typeof window !== "undefined") window.location.reload()
  }

  return (
    <Button className="mt-4" onClick={handleClick}>
      {children ?? "Tentar novamente"}
    </Button>
  )
}
