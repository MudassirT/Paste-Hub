import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 2rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <span className="font-serif" style={{
          fontSize: '1.05rem',
          letterSpacing: '0.22em',
          color: 'var(--text)',
          fontWeight: 400,
          textTransform: 'uppercase',
        }}>
          PasteHub
        </span>
      </NavLink>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: isActive ? 'var(--text)' : 'var(--muted)',
            transition: 'color 0.2s ease',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/paste"
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: isActive ? 'var(--text)' : 'var(--muted)',
            transition: 'color 0.2s ease',
          })}
        >
          My Pastes
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
