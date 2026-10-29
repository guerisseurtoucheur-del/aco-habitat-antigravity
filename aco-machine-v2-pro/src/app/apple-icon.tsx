import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 70,
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fbbf24',
          borderRadius: '24px',
          fontWeight: 'bold',
          border: '4px solid #fbbf24',
        }}
      >
        ACO
      </div>
    ),
    { ...size }
  );
}
