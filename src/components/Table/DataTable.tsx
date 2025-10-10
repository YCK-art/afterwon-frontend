'use client'

import { useState, useRef, useEffect } from 'react'
import { FiDownload, FiTrash, FiX, FiCheck } from 'react-icons/fi'
import { FaFileCsv, FaFileExcel } from 'react-icons/fa'

// Tooltip component for column headers
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}

interface DataTableProps {
  data: any[]
  columns: string[]
  filename: string
  chartData?: any
  onTableChange?: (updatedData: { data: any[], columns: string[] }) => void
}

export default function DataTable({ data, columns, filename, onTableChange }: DataTableProps) {
  const [_columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({})
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const downloadMenuRef = useRef<HTMLDivElement>(null)
  const [localData, setLocalData] = useState(data)
  const [localColumns, setLocalColumns] = useState(columns)
  const [editingCell, setEditingCell] = useState<{ rowIndex: number, column: string } | null>(null)
  const [editValue, setEditValue] = useState('')
  const initialDataRef = useRef(true)

  // 칼럼은 항상 모두 표시
  const visibleColumns = localColumns

  // 모든 행 표시
  const visibleRows = localData

  // 초기 렌더링 시에만 data를 설정 (이후에는 로컬 상태만 사용)
  useEffect(() => {
    if (initialDataRef.current) {
      setLocalData(data)
      setLocalColumns(columns)
      initialDataRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle double-click to auto-resize column
  const handleColumnResize = (columnName: string) => {
    // Calculate optimal width based on content
    const maxContentLength = Math.max(
      columnName.length,
      ...data.slice(0, 100).map(row => String(row[columnName] || '').length) // Sample first 100 rows for performance
    )
    const optimalWidth = Math.min(Math.max(maxContentLength * 8 + 32, 180), 400) // 8px per char + padding, min 180px, max 400px

    setColumnWidths(prev => ({
      ...prev,
      [columnName]: optimalWidth
    }))
  }

  // Download as CSV
  const downloadCSV = () => {
    const csvContent = [
      columns.join(','), // Header row
      ...data.map(row => columns.map(col => {
        const value = row[col]
        // Escape commas and quotes in cell values
        if (value === null || value === undefined) return ''
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename.replace(/\.(csv|xlsx?)$/i, '') + '.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowDownloadMenu(false)
  }

  // Download as XLSX (using a simple XML format)
  const downloadXLSX = () => {
    // Create a simple XLSX-compatible XML structure
    const worksheetXML = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Sheet1">
  <Table>
   <Row>
    ${columns.map(col => `<Cell><Data ss:Type="String">${escapeXML(col)}</Data></Cell>`).join('')}
   </Row>
   ${data.map(row => `<Row>${columns.map(col => {
     const value = row[col]
     if (value === null || value === undefined) return '<Cell><Data ss:Type="String"></Data></Cell>'
     const isNumber = !isNaN(Number(value)) && value !== ''
     return `<Cell><Data ss:Type="${isNumber ? 'Number' : 'String'}">${escapeXML(String(value))}</Data></Cell>`
   }).join('')}</Row>`).join('\n   ')}
  </Table>
 </Worksheet>
</Workbook>`

    const blob = new Blob([worksheetXML], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename.replace(/\.(csv|xlsx?)$/i, '') + '.xlsx')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowDownloadMenu(false)
  }

  // Helper function to escape XML special characters
  const escapeXML = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  // 행 삭제
  const handleDeleteRow = (rowIndex: number) => {
    const updatedData = localData.filter((_, index) => index !== rowIndex)
    setLocalData(updatedData)
    if (onTableChange) {
      onTableChange({ data: updatedData, columns: localColumns })
    }
  }

  // 칼럼 삭제
  const handleDeleteColumn = (columnName: string) => {
    const updatedColumns = localColumns.filter(col => col !== columnName)
    const updatedData = localData.map(row => {
      const newRow = { ...row }
      delete newRow[columnName]
      return newRow
    })
    setLocalColumns(updatedColumns)
    setLocalData(updatedData)
    if (onTableChange) {
      onTableChange({ data: updatedData, columns: updatedColumns })
    }
  }

  // 셀 편집 시작
  const handleCellDoubleClick = (rowIndex: number, column: string) => {
    setEditingCell({ rowIndex, column })
    setEditValue(String(localData[rowIndex][column] || ''))
  }

  // 셀 편집 완료
  const handleCellEditComplete = () => {
    if (editingCell) {
      const updatedData = [...localData]
      updatedData[editingCell.rowIndex][editingCell.column] = editValue
      setLocalData(updatedData)
      setEditingCell(null)
      if (onTableChange) {
        onTableChange({ data: updatedData, columns: localColumns })
      }
    }
  }

  // 셀 편집 취소
  const handleCellEditCancel = () => {
    setEditingCell(null)
    setEditValue('')
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No data available
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-4xl overflow-visible">
      {/* Table Content */}
      <div className="max-h-[500px] overflow-auto rounded-t-xl">
          <table className="w-auto table-auto mx-auto">
            <thead className="sticky top-0">
              <tr className="bg-orange-50 border-b border-orange-200">
                <th className="px-2 py-1.5 text-center font-semibold text-orange-800 bg-orange-50 sticky top-0 left-0 z-50 border-r border-orange-200 text-[11px] uppercase tracking-wider w-12">
                  #
                </th>
                {visibleColumns.map((column, index) => (
                  <th
                    key={index}
                    className="px-2 py-1.5 text-center font-semibold text-orange-800 border-r border-orange-100 text-[11px] uppercase tracking-wider relative group sticky top-0 bg-orange-50 whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip content={column.length > 20 ? column : ''}>
                        <span className="cursor-help font-medium">
                          {column}
                        </span>
                      </Tooltip>

                      {/* 칼럼 삭제 버튼 */}
                      {onTableChange && (
                        <button
                          onClick={() => handleDeleteColumn(column)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                          title="Delete column"
                        >
                          <FiTrash className="w-3 h-3 text-red-500" />
                        </button>
                      )}

                      {/* Modern resize handle */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-3 cursor-col-resize opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                        onDoubleClick={() => handleColumnResize(column)}
                        title="Double-click to auto-resize"
                      >
                        <div className="w-0.5 h-4 bg-orange-400 rounded-full"></div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {visibleRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-orange-50 transition-colors duration-150 group"
                >
                  <td className="px-2 py-1.5 font-medium text-orange-600 bg-orange-50 sticky left-0 z-20 border-r border-orange-100 text-[11px] w-12 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span>{rowIndex + 1}</span>
                      {/* 행 삭제 버튼 */}
                      {onTableChange && (
                        <button
                          onClick={() => handleDeleteRow(rowIndex)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                          title="Delete row"
                        >
                          <FiTrash className="w-3 h-3 text-red-500" />
                        </button>
                      )}
                    </div>
                  </td>
                  {visibleColumns.map((column, colIndex) => {
                    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.column === column
                    return (
                      <td
                        key={colIndex}
                        className="px-2 py-1.5 text-gray-800 border-r border-gray-50 text-[11px] align-middle text-center whitespace-nowrap"
                        onDoubleClick={() => onTableChange && handleCellDoubleClick(rowIndex, column)}
                      >
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCellEditComplete()
                                if (e.key === 'Escape') handleCellEditCancel()
                              }}
                              className="w-full px-1 py-0.5 border border-orange-300 rounded text-[11px] focus:outline-none focus:border-orange-500"
                              autoFocus
                            />
                            <button
                              onClick={handleCellEditComplete}
                              className="p-0.5 hover:bg-green-100 rounded"
                              title="Save"
                            >
                              <FiCheck className="w-3 h-3 text-green-500" />
                            </button>
                            <button
                              onClick={handleCellEditCancel}
                              className="p-0.5 hover:bg-red-100 rounded"
                              title="Cancel"
                            >
                              <FiX className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        ) : (
                          <div className="max-w-full flex items-center justify-center cursor-pointer" title={onTableChange ? "Double-click to edit" : ""}>
                            {row[column] !== null && row[column] !== undefined
                              ? <span className="text-gray-900">{String(row[column])}</span>
                              : <span className="text-gray-400 italic font-light">—</span>
                            }
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Modern Footer */}
      <div className="bg-orange-50 px-6 py-4 border-t border-orange-100 rounded-b-xl relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-orange-800">
            <span className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="font-medium">{filename}</span>
            </span>
            <span className="text-orange-400">•</span>
            <span>{data.length.toLocaleString()} rows</span>
            <span className="text-orange-400">•</span>
            <span>{columns.length} columns</span>
          </div>
          <div ref={downloadMenuRef} className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="flex items-center justify-center w-8 h-8 text-orange-700 hover:bg-orange-100 rounded-lg transition-colors"
              title="Download"
            >
              <FiDownload className="w-5 h-5" />
            </button>

            {/* Download Dropdown Menu */}
            {showDownloadMenu && (
              <div className="absolute top-full right-0 mt-2 bg-orange-50 border border-orange-200 rounded-lg shadow-lg z-[9999] min-w-[180px]">
                <button
                  onClick={downloadCSV}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-100 transition-colors rounded-t-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <FaFileCsv className="w-3 h-3 text-green-500" />
                  Download CSV
                </button>
                <button
                  onClick={downloadXLSX}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-100 transition-colors rounded-b-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <FaFileExcel className="w-3 h-3 text-green-600" />
                  Download XLSX
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}