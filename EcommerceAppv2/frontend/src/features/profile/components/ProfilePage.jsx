import React, { useState } from "react";
import { useAuth } from "../../user/context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    return <div className="profile-container">No hay usuario autenticado.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <span role="img" aria-label="avatar" style={{ fontSize: 64 }}>👤</span>
        </div>
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <label>Email:</label>
          <div className="profile-value">{user.email}</div>
        </div>
        <div className="profile-info">
          <label>Contraseña:</label>
          <div className="profile-value">
            {showPassword ? user.password : "••••••••"}
          </div>
          <button className="profile-btn" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          </button>
        </div>
      </div>
      <style>{`
        .profile-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .profile-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(60,60,120,0.10);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 350px;
          width: 100%;
          text-align: center;
        }
        .profile-avatar {
          margin-bottom: 1.2rem;
        }
        .profile-info {
          margin-bottom: 1.5rem;
        }
        .profile-info label {
          display: block;
          font-weight: 600;
          color: #6366f1;
          margin-bottom: 0.2rem;
        }
        .profile-value {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #22223b;
        }
        .profile-btn {
          background: linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%);
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          padding: 0.5rem 1.2rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .profile-btn:hover {
          background: linear-gradient(90deg, #4338ca 0%, #818cf8 100%);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
