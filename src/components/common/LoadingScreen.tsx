'use client';
import { Logo } from '@/components/svg';

export function LoadingScreen({ message }: { message?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--zen-surface-raised, #ffffff)',
        zIndex: 9999,
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'vistiq-pulse 1.8s ease-in-out infinite',
        }}
      >
        <Logo width={56} height={56} />
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: '15px',
          color: 'var(--zen-fg, #111827)',
          letterSpacing: '-0.01em',
        }}
      >
        Vistiq Analytics
      </div>
      <div
        style={{
          width: '120px',
          height: '3px',
          backgroundColor: 'var(--zen-surface-sunken, #e5e7eb)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '40%',
            backgroundColor: 'var(--zen-primary, #2563eb)',
            borderRadius: '999px',
            animation: 'vistiq-slide 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes vistiq-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.88;
          }
        }
        @keyframes vistiq-slide {
          0% {
            left: -40%;
          }
          50% {
            left: 50%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
