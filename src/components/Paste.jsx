import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reomveFromPastes } from '../features/pasteSlice'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const pastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(reomveFromPastes(pasteId))
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  function getPreview(content) {
    return content.length > 120 ? content.substring(0, 120) + '…' : content
  }

  // Icon components
  const EditIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )

  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )

  const ShareIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )

  const TrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  )

  const SearchIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )

  const FileIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )

  const iconBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--muted)',
    transition: 'border-color 0.2s, color 0.2s',
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
        fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
        fontWeight: 400,
        lineHeight: 1.2,
        color: 'var(--text)',
        letterSpacing: '-0.01em',
        marginBottom: '0.5rem',
      }}>
        My Pastes
      </h1>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--muted)',
        marginBottom: '2rem',
      }}>
        Manage and organize your saved content
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
        <span style={{
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--muted)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
        }}>
          <SearchIcon />
        </span>
        <input
          id="search-pastes"
          type="text"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--border)',
            padding: '0.5rem 0.5rem 0.5rem 1.6rem',
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--muted)'}
          onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
        />
      </div>

      {/* Empty state */}
      {filteredData.length === 0 ? (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}>
          <FileIcon />
          <p style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 400 }}>
            No pastes found
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
            {searchTerm ? 'Try a different search term' : 'Create your first paste to get started.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {filteredData.map((paste, index) => (
            <div
              key={paste._id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.2rem 1.2rem',
                marginBottom: '0.6rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--faint)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.6rem' }}>
                <h2 style={{
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  lineHeight: 1.3,
                  flex: 1,
                }}>
                  {paste.title}
                </h2>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <NavLink to={`/?pasteId=${paste._id}`} style={{ display: 'contents' }}>
                    <button
                      id={`edit-${paste._id}`}
                      style={iconBtn}
                      title="Edit"
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.color = 'var(--text)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                    >
                      <EditIcon />
                    </button>
                  </NavLink>
                  <button
                    id={`copy-${paste._id}`}
                    style={iconBtn}
                    title="Copy"
                    onClick={() => { navigator.clipboard.writeText(paste.content); toast.success('Copied!') }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    <CopyIcon />
                  </button>
                  <button
                    id={`share-${paste._id}`}
                    style={iconBtn}
                    title="Share"
                    onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/?pasteId=${paste._id}`); toast.success('Link copied!') }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.color = 'var(--text)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    <ShareIcon />
                  </button>
                  <button
                    id={`delete-${paste._id}`}
                    style={{ ...iconBtn }}
                    title="Delete"
                    onClick={() => handleDelete(paste._id)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6b4a4a'; e.currentTarget.style.color = '#c08080' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginBottom: '0.8rem',
              }}>
                {getPreview(paste.content)}
              </p>

              {/* Date */}
              <p style={{
                fontSize: '0.72rem',
                color: 'var(--faint)',
                letterSpacing: '0.04em',
              }}>
                {formatDate(paste.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Paste
