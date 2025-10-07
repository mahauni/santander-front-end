import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../internals/data/gridData';
import { usePaginationTransactions } from '../hooks/usePaginationTransactions';
import { useState } from 'react';

export default function CustomizedDataGrid() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data: pagination, isLoading } = usePaginationTransactions(paginationModel.page, paginationModel.pageSize)

  if (!pagination) return

  return (
    <DataGrid
      checkboxSelection
      rows={pagination.data}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowCount={pagination.total}
      paginationMode='server'
      loading={isLoading}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
