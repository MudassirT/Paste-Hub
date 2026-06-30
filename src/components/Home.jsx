import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateToPastes, addToPastes } from '../features/pasteSlice'
import toast from 'react-hot-toast'

const Home = () => {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)
  const [isLoading, setIsLoading] = useState(false)

  const canSave = title.trim().length > 0 && value.trim().length > 0

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId)
      if (paste) {
        setTitle(paste.title)
        setValue(paste.content)
      }
    }
  }, [pasteId, allPastes])

  function handleSave() {
    if (!title.trim()) { toast.error('Please enter a title'); return }
    if (!value.trim()) { toast.error('Please enter some content'); return }

    setIsLoading(true)
    setTimeout(() => {
      const paste = {
        title: title.trim(),
        content: value.trim(),
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
      }
      if (pasteId) {
        dispatch(updateToPastes(paste))
      } else {
        dispatch(addToPastes(paste))
      }
      setTitle('')
      setValue('')
      setSearchParams({})
      setIsLoading(false)
    }, 300)
  }

  function handleClear() {
    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <main className="fade-up" style={{
      minHeight: 'calc(100vh - 60px)',
      padding: '3.5rem 2rem 3rem',
      maxWidth: '720px',
      margin: '0 auto',
    }}>
      {/* Heading */}
      <h1 className="font-serif" style={{
        fontSize: 'clamp(2rem, 5vw, 2.8rem)',
        fontWeight: 400,
        lineHeight: 1.2,
        color: 'var(--text)',
        marginBottom: '3rem',
        letterSpacing: '-0.01em',
      }}>
        {pasteId ? 'Edit your paste' : 'Create your next paste'}
      </h1>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Title field */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.6rem',
          }}>
            Title
          </label>
          <input
            id="paste-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title..."
            maxLength="100"
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.85rem 1rem',
              fontSize: '0.95rem',
              color: 'var(--text)',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--muted)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Content field */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.6rem',
          }}>
            Content
          </label>
          <textarea
            id="paste-content"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            rows={16}
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.85rem 1rem',
              fontSize: '0.9rem',
              color: 'var(--text)',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: 1.7,
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--muted)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Footer bar */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              {canSave ? 'Ready to save' : 'Fill title and content to enable saving'}
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
            {pasteId && (
              <button
                id="clear-btn"
                onClick={handleClear}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '0.45rem 1rem',
                  fontSize: '0.8rem',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--muted)'; e.target.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
              >
                Clear
              </button>
            )}
            <button
              id="save-btn"
              onClick={handleSave}
              disabled={isLoading || !canSave}
              style={{
                background: canSave ? 'var(--text)' : 'var(--faint)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.45rem 1.2rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: canSave ? 'var(--bg)' : 'var(--muted)',
                cursor: canSave ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s, opacity 0.2s',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? 'Saving...' : pasteId ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Home
