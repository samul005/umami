import type { SVGProps } from 'react';

const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="vistiq-bg" x1="5" y1="4" x2="59" y2="61" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5146E5" />
        <stop offset="0.52" stopColor="#4263F5" />
        <stop offset="1" stopColor="#22B8F0" />
      </linearGradient>
      <linearGradient id="vistiq-shine" x1="12" y1="7" x2="52" y2="57" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity="0.18" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="16" fill="url(#vistiq-bg)" />
    <rect x="1" y="1" width="62" height="62" rx="16" fill="url(#vistiq-shine)" />
    <path
      d="M15 47.5H49"
      stroke="#FFFFFF"
      strokeOpacity="0.55"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <rect x="16" y="34" width="7" height="11" rx="2.2" fill="#FFFFFF" />
    <rect x="28.5" y="27" width="7" height="18" rx="2.2" fill="#FFFFFF" />
    <rect x="41" y="19" width="7" height="26" rx="2.2" fill="#FFFFFF" />
    <path
      d="M17.5 29.5L29.8 22.8L37.1 25.1L48 13.5"
      stroke="#FFFFFF"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="48" cy="13.5" r="3.2" fill="#FFFFFF" />
  </svg>
);

export default SvgLogo;
