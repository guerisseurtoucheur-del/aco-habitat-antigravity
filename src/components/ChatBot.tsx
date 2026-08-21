'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import styles from './ChatBot.module.css'

// Fonction pour convertir les liens markdown en HTML cliquables
function parseMarkdownLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: (string | { text: string; url: string })[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Ajouter le texte avant le lien
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // Ajouter le lien
    parts.push({ text: match[1], url: match[2] })
    lastIndex = match.index + match[0].length
  }

  // Ajouter le texte restant
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const quickQuestions = [
    "Comment reconnaitre la merule ?",
    "Quels sont les signes du capricorne ?",
    "Mon bois est humide, que faire ?",
  ]

  return (
    <>
      {/* Bulle d'invitation */}
      {!isOpen && (
        <button
          className={styles.inviteBubble}
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le chat expert"
        >
          Une question ?
        </button>
      )}

      {/* Bouton flottant */}
      <button 
        className={styles.floatingButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat expert"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Fenetre de chat */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.expertAvatar}>
                <img src="/expert-aco-habitat.jpeg" alt="Votre expert ACO-HABITAT" />
              </div>
              <div>
                <h3 className={styles.headerTitle}>Expert Bois</h3>
                <p className={styles.headerSubtitle}>35 ans d&apos;experience</p>
              </div>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Fermer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <div className={styles.welcomeIcon}>
                  <img src="/expert-aco-habitat.jpeg" alt="Votre expert ACO-HABITAT" />
                </div>
                <h4>Bonjour, je suis votre expert bois</h4>
                <p>Avec plus de 35 ans d&apos;experience dans le diagnostic des pathologies du bois, je peux vous aider a identifier merule, capricorne, vrillettes ou problemes d&apos;humidite.</p>
                
                <div className={styles.quickQuestions}>
                  <p className={styles.quickLabel}>Questions frequentes :</p>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className={styles.quickButton}
                      onClick={() => {
                        sendMessage({ text: question })
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                {message.role === 'assistant' && (
                  <div className={styles.messageAvatar}>
                    <img src="/expert-aco-habitat.jpeg" alt="Votre expert ACO-HABITAT" />
                  </div>
                )}
                <div className={styles.messageContent}>
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      const parsed = parseMarkdownLinks(part.text)
                      return (
                        <span key={index}>
                          {parsed.map((p, i) => 
                            typeof p === 'string' ? (
                              <span key={i}>{p}</span>
                            ) : (
                              <a 
                                key={i} 
                                href={p.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.chatLink}
                              >
                                {p.text}
                              </a>
                            )
                          )}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageAvatar}>
                  <img src="/expert-aco-habitat.jpeg" alt="Votre expert ACO-HABITAT" />
                </div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className={styles.input}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={styles.sendButton}
              disabled={isLoading || !input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
