import React from "react";
import ContentLoader from "react-content-loader";

function TableRow(props) {
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader
      viewBox="0 0 1060 40"
      height={40}
      width={1060}
      speed={2}
      {...props}
    >
      <rect x="30" y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x="80" y="10" rx="10" ry="6" width={100 * random} height="12" />
      <rect x="210" y="10" rx="10" ry="6" width={120 * random} height="12" />
      <rect x="360" y="10" rx="10" ry="6" width={100 * random} height="12" />
      <rect x="500" y="10" rx="10" ry="6" width={180 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={32 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={73 * random} height="12" />

      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  );
}

export default TableRow;
