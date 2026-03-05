import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  filters: Record<string, string>
  sort: {
    field: string | null
    direction: 'asc' | 'desc'
  }
}

const initialState: FilterState = {
  filters: {
    company: '',
    jobRole: '',
    cgpa: '',
    ctc: '',
    duration: ''
  },
  sort: {
    field: null,
    direction: 'asc'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload
      state.filters[field] = value
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setSort: (state, action: PayloadAction<{ field: string }>) => {
      const { field } = action.payload
      if (state.sort.field === field) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc'
      } else {
        state.sort.field = field
        state.sort.direction = 'asc'
      }
    }
  }
})

export const { setFilter, clearFilters, setSort } = filterSlice.actions
export default filterSlice.reducer
