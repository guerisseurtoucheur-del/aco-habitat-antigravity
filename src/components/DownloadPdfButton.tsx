'use client'

import { useState } from 'react'

interface DownloadPdfButtonProps {
  sessionId: string
  reportRef: string
  className?: string
}

export function DownloadPdfButton({ sessionId, reportRef, className }: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      const response = await fetch(`/api/resultats/${sessionId}/pdf`)
      
      if (!response.ok) {
        throw new Error('Erreur lors du telechargement')
      }
      
      const blob = await response.blob()
      const filename = `Rapport_DIAGNOSTIC-BOIS_${reportRef}.pdf`
      
      // Detecter iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      
      if (isIOS) {
        // Sur iOS, ouvrir dans un nouvel onglet avec le blob URL
        // L'utilisateur pourra ensuite utiliser le bouton "Partager" pour sauvegarder
        const blobUrl = URL.createObjectURL(blob)
        const newTab = window.open(blobUrl, '_blank')
        
        // Si le nouvel onglet est bloque, proposer une alternative
        if (!newTab) {
          // Creer un lien temporaire
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
        
        // Liberer la memoire apres un delai
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000)
      } else {
        // Sur les autres plateformes, utiliser la methode standard
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      }
    } catch (error) {
      console.error('[DownloadPdfButton] Erreur:', error)
      alert('Erreur lors du telechargement. Veuillez reessayer.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={className}
    >
      {isDownloading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
          </svg>
          Telechargement...
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Telecharger le PDF — {reportRef}
        </>
      )}
    </button>
  )
}
