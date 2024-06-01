import React from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  height?: number;
  width?: number;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="green"
      />
    </svg>
  );
};
