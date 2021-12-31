import type { ColumnDef } from '@mstr/react-ws-grid'
import { t } from '../../i18N/locale'

export const getColumnDefs = () => {
  const nameColumn: ColumnDef = {
    headerName: t('name'),
    field: 'name',
    tooltipField: 'name',
    lockVisible: true,
    sort: 'asc',
    // cellRenderer: 'nameCellRenderer',
  }

  const valueColumn: ColumnDef = {
    headerName: t('value'),
    field: 'value',
    editable: true,
    // cellEditor: 'valueCellEditor',
    // cellRenderer: 'valueCellRenderer',
  }

  return [nameColumn, valueColumn]
}

export const defaultColDef: ColumnDef = {
  sortable: true,
  resizable: true,
}
