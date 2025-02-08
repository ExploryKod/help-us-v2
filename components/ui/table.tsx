"use client";

import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface TableComponentProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  onRowSelection?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onRowClick?: (record: T) => void;
}

const TableComponent = <T extends { key: React.Key }>({
  columns,
  data,
  onRowSelection,
  onRowClick,
}: TableComponentProps<T>) => {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">("checkbox");

  const rowSelection: TableProps<T>["rowSelection"] = onRowSelection
    ? {
        type: selectionType,
        onChange: onRowSelection,
      }
    : undefined;

  return (
    <div>
      <Divider />
      <Table<T>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record),
        })}
      />
    </div>
  );
};

export default TableComponent;
