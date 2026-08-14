import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbgrkjba'
const WA_ENCODED = 'ODgwMTcyNjAwMzg5Ng==' // base64, decoded only at send time

function decode(s) {
  return atob(s)
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'good morning ☀️'
  if (hour >= 12 && hour < 17) return 'good afternoon 🌤️'
  if (hour >= 17 && hour < 21) return 'good evening 🌆'
  return 'up late? 🌙'
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z"></path>
    <path d="M4 6l8 7 8-7"></path>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.36 7.56L4 20l1.06-4.44A8.5 8.5 0 1 1 21 11.5z"></path>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13"></path>
    <path d="M22 2 15 22l-4-9-9-4 20-7z"></path>
  </svg>
)

export default function App() {
  const [theme, setTheme] = useState('light')
  const [tab, setTab] = useState('email')
  const [greeting, setGreeting] = useState('Hey there')

  const [name, setName] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [emailStatus, setEmailStatus] = useState('')
  const [sending, setSending] = useState(false)

  const [waMsg, setWaMsg] = useState('')
  const [waStatus, setWaStatus] = useState('')

  useEffect(() => {
    setGreeting(getGreeting())
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  async function sendEmail() {
    if (!emailMsg.trim()) {
      setEmailStatus('Write a message first.')
      return
    }
    setSending(true)
    setEmailStatus('Sending...')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Someone from the bio link',
          message: emailMsg.trim(),
        }),
      })
      if (res.ok) {
        setEmailStatus('Sent. Prince will get back to you.')
        setName('')
        setEmailMsg('')
      } else {
        setEmailStatus('Something went wrong. Try again?')
      }
    } catch {
      setEmailStatus('Could not send. Check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  function sendWhatsApp() {
    if (!waMsg.trim()) {
      setWaStatus('Write a message first.')
      return
    }
    const number = decode(WA_ENCODED)
    const url = `https://wa.me/${number}?text=${encodeURIComponent(waMsg.trim())}`
    window.open(url, '_blank')
    setWaStatus('Opening WhatsApp...')
  }

  return (
    <div className="scene">
      <motion.div
        className="blob blob-1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob blob-2"
        animate={{ x: [0, -25, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="blob blob-3"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="page"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="card" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
          <div className="top-row">
            <div className="eyebrow">
              <span className="dot" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={greeting}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {greeting}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle day and night mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex' }}
                >
                  {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          <h1>
            Hey, it's Prince.
            <br />
            Stepped away <span>for a bit</span>.
          </h1>

          <p className="lede">
            Ditched Insta and Facebook for a while, needed the headspace. Still reachable though, so drop a
            message below and pick whichever way's easier for you.
          </p>

          <div className="tabs">
            <motion.div
              className="tab-indicator"
              animate={{ x: tab === 'email' ? '0%' : '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              style={{ background: tab === 'email' ? 'var(--coral)' : 'var(--teal)' }}
            />
            <button className={`tab ${tab === 'email' ? 'active' : ''}`} onClick={() => setTab('email')}>
              <EmailIcon /> Email
            </button>
            <button className={`tab ${tab === 'wa' ? 'active' : ''}`} onClick={() => setTab('wa')}>
              <WhatsAppIcon /> WhatsApp
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <label htmlFor="emailName">who's this?</label>
                <input
                  id="emailName"
                  type="text"
                  placeholder="your name (so I know who's saying hi)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="emailMsg">what's up?</label>
                <textarea
                  id="emailMsg"
                  placeholder="say whatever's on your mind..."
                  value={emailMsg}
                  onChange={(e) => setEmailMsg(e.target.value)}
                />
                <motion.button
                  className="send-btn email-send"
                  onClick={sendEmail}
                  disabled={sending}
                  whileHover={{ y: -1, filter: 'brightness(1.07)' }}
                  whileTap={{ y: 0 }}
                >
                  <SendIcon /> send it
                </motion.button>
                <p className="hint">Lands straight in my inbox. No app opens, nothing shown.</p>
                <p className={`status ${emailStatus.startsWith('Sent') ? 'ok' : ''}`}>{emailStatus}</p>
              </motion.div>
            ) : (
              <motion.div
                key="wa"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <label htmlFor="waMsg">what's up?</label>
                <textarea
                  id="waMsg"
                  placeholder="type your message..."
                  value={waMsg}
                  onChange={(e) => setWaMsg(e.target.value)}
                />
                <motion.button
                  className="send-btn wa-send"
                  onClick={sendWhatsApp}
                  whileHover={{ y: -1, filter: 'brightness(1.07)' }}
                  whileTap={{ y: 0 }}
                >
                  <WhatsAppIcon /> send on whatsapp
                </motion.button>
                <p className="hint">Opens WhatsApp with your message ready, just hit send there.</p>
                <p className={`status ${waStatus.startsWith('Opening') ? 'ok' : ''}`}>{waStatus}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <footer>
          <strong>Prince</strong> · Dhaka · will hit you back once he's online again
        </footer>
      </motion.div>
    </div>
  )
}
