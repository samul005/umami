import type { SVGProps } from 'react';

const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="vistiq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#vistiq-bg)" />
    {/* Bar 1 */}
    <rect x="20" y="62" width="16" height="20" rx="8" fill="#ffffff" />
    {/* Bar 2 */}
    <rect x="42" y="50" width="16" height="32" rx="8" fill="#ffffff" />
    {/* Bar 3 */}
    <rect x="64" y="36" width="16" height="46" rx="8" fill="#ffffff" />
    {/* Upward trend curve */}
    <path
      d="M 22 54 C 36 50, 48 38, 70 24"
      stroke="#ffffff"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Target circle dot */}
    <circle cx="74" cy="21" r="6" fill="#ffffff" />
  </svg>
);

export default SvgLogo;
