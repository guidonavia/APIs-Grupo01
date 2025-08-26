import React from 'react'

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>¡Hola React + Vite! 🚀</h1>
        <p>Proyecto base listo para empezar.</p>
        <a
          className="app__link"
          href="https://vitejs.dev/guide/"
          target="_blank"
          rel="noreferrer"
        >
          Documentación Vite
        </a>
        {' · '}
        <a
          className="app__link"
          href="https://react.dev/learn"
          target="_blank"
          rel="noreferrer"
        >
          Documentación React
        </a>
      </header>
      <main>
        <p>Editá <code>src/App.jsx</code> y guardá para recargar.</p>
      </main>
    </div>
  )
}