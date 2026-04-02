import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown, X, ChevronsLeftRightEllipsis } from 'lucide-react';
import { PlacementRecord, SortConfig, SORTABLE_COLUMNS } from '@/types/placement';

interface DataTableProps {
  data: PlacementRecord[];
  onRowClick: (record: PlacementRecord) => void;
  onReadMore: (record: PlacementRecord) => void;
}

const DataTable = ({ data, onRowClick, onReadMore }: DataTableProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Prevent right-click on the table (scoped protection)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Get column headers dynamically from data
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((value) => value.trim() !== '');
  }, [filters]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((record) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = String(record[key]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === 'Date') {
        const dateA = new Date(aValue as string);
        const dateB = new Date(bValue as string);
        return sortConfig.direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Handle numeric sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string sorting
      const strA = String(aValue).toLowerCase();
      const strB = String(bValue).toLowerCase();
      if (sortConfig.direction === 'asc') {
        return strA.localeCompare(strB);
      }
      return strB.localeCompare(strA);
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key: string) => {
    if (!SORTABLE_COLUMNS.includes(key)) return;

    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const renderSortIcon = (column: string) => {
    if (!SORTABLE_COLUMNS.includes(column)) return null;

    if (sortConfig?.key === column) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      );
    }
    return <ArrowUpDown className="h-3 w-3 opacity-50" />;
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const formatCellValue = (value: string | number, column: string) => {
    if (column === 'Hiring Process') {
      return truncateText(String(value));
    }
    if (column === 'CTC (in LPA)' || column === 'Compensation in Internship') {
      if (value === 'N/A') return value;
      return typeof value === 'number'
        ? column === 'CTC (in LPA)'
          ? `₹${value} LPA`
          : `₹${value.toLocaleString()}`
        : value;
    }
    return String(value);
  };

  return (
    <div 
      className="space-y-4"
      onContextMenu={handleContextMenu}
    >
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Table Container with Scroll Indicator */}
      <div className="relative">
      {/* Scroll Indicator - absolute positioned like reference */}
      <div className="flex flex-row items-center gap-2 absolute top-[50%] right-[60px] z-30 rounded-full bg-black/30 border-2 border-white/30 px-5 py-3 cursor-default">
        <motion.div
          animate={{ x: [0, 4, 0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronsLeftRightEllipsis className="h-4 w-4" />
        </motion.div>
        <span className="hidden md:block text-sm">scroll</span>
      </div>

      <div 
        className="overflow-x-auto rounded-lg border border-white/10"
      >
          <table className="data-table min-w-full protected-content">
            <thead className="sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleSort(column)}
                        className={`flex items-center gap-2 text-left font-medium ${
                          SORTABLE_COLUMNS.includes(column) ? 'cursor-pointer hover:text-accent' : 'cursor-default'
                        }`}
                        disabled={!SORTABLE_COLUMNS.includes(column)}
                      >
                        <span className="whitespace-nowrap">{column}</span>
                        {renderSortIcon(column)}
                      </button>
                      <input
                        type="text"
                        placeholder={`Filter...`}
                        title={`Filter ${column}`}
                        value={filters[column] || ''}
                        onChange={(e) => handleFilterChange(column, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="data-table-filter rounded w-full min-w-[100px]"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((record, index) => (
                <motion.tr
                  key={record['S.No.'] || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  onClick={() => onRowClick(record)}
                  className="cursor-pointer border-b transition-colors hover:bg-table-row-hover"
                >
                  {columns.map((column) => (
                    <td key={column} className="px-4 py-3 text-sm">
                      {column === 'Hiring Process' ? (
                        <div className="max-w-xs">
                          <p className="line-clamp-3">{formatCellValue(record[column], column)}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onReadMore(record);
                            }}
                            className="read-more mt-1"
                          >
                            Read more →
                          </button>
                        </div>
                      ) : (
                        <span className="whitespace-nowrap">{formatCellValue(record[column], column)}</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>

          {sortedData.length === 0 && (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              No records found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
