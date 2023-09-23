import React from "react";
import TableRow from "./TableRow.jsx";

const TableLoader = (props) => (
  <>
    {Array(10)
      .fill("")
      .map((e, i) => (
        <TableRow
          key={i}
          style={{ opacity: Number(2 / i).toFixed(1) }}
          {...props}
        />
      ))}
  </>
);

export default TableLoader;
