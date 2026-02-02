import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProtectedTableProps {
  children: React.ReactNode;
  className?: string;
}

interface ProtectedTableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

/**
 * A table wrapper that applies view-only protections:
 * - Text selection disabled on table cells
 * - Right-click disabled on the entire table
 */
export const ProtectedTable: React.FC<ProtectedTableProps> = ({
  children,
  className,
}) => {
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  return (
    <div
      className={cn('select-none', className)}
      onContextMenu={handleContextMenu}
    >
      <Table>
        {children}
      </Table>
    </div>
  );
};

/**
 * Protected table cell with text selection disabled
 */
export const ProtectedTableCell: React.FC<ProtectedTableCellProps> = ({
  children,
  className,
  colSpan,
}) => {
  return (
    <TableCell className={cn('select-none', className)} colSpan={colSpan}>
      {children}
    </TableCell>
  );
};

// Re-export standard table components for convenience
export { TableBody, TableHead, TableHeader, TableRow };

export default ProtectedTable;
