import React from 'react';

export const OverlayUI = ({ titleRef, descRef, buttonRef }) => {
  const buttonHoverStyle = `
    .cta-button:hover {
      background-color: #000;
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
  `;

  return (
    <>
      <style>{buttonHoverStyle}</style>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '50%',
          paddingLeft: '10vw',
        }}>
          <h1 ref={titleRef} style={{
            fontFamily: '"Lily Script One", "Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#373F80',
            textShadow: '5px 3px 2px #EDCE8E',
            margin: 0,
            lineHeight: 1.1,
            opacity: 0,
          }}>
            Cloud Seven
          </h1>

          <p ref={descRef} style={{
            fontFamily: '"Poppins", "Helvetica Neue", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#444444',
            marginTop: '20px',
            maxWidth: '450px',
            lineHeight: 1.6,
            opacity: 0,
          }}>
            Cloud Seven is a <strong>Sparkling Rum.</strong> Cloud Seven is different from beer. Because we are low calories, made from sparkling rum and fruit juice.
          </p>

          <button ref={buttonRef} className="cta-button" style={{
            fontFamily: '"Poppins", "Helvetica Neue", sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#ffffff',
            backgroundColor: '#373F80',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '30px',
            pointerEvents: 'all',
            transition: 'all 0.3s ease',
            opacity: 0,
          }}>
            DISCOVER THE FLAVOR
          </button>
        </div>
      </div>
    </>
  );
};

OverlayUI.displayName = 'OverlayUI';