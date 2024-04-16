import React, { createContext, useMemo, useState } from 'react'
import { useController } from 'react-hook-form';
import FilterGroup from '../../../common/components/filterQueryModel/FilterGroup';


const FilterContext = createContext({
  query: {},
  setQuery: () => { },
})


const NotionLogicQueryBuilder = ({
  fields,
  control,
  name,
  allowGroups = true,
  filters,
  databaseId,
}) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    control,
    name,
  })

  const getInitialQuery = () => {
    const hasExistingFilters = Object.keys(filters).length > 0
    if (!hasExistingFilters) {
      return {
        combinator: 'and',
        rules: [
          {
            id : uuidv4(),
            field: fields[0]?.id,
            operator: 'equals',
            value: '',
            formula : fields[0]?.formula,
            type : fields[0]?.type
          },
        ],
      }
    } else {
      // adapt the forms filter to the query builder format
      return filters
    }
  }

  const handleChange = (query) => {

    onChange()
  }

  const initialQuery = getInitialQuery()

  const [query, setQuery] = useState(value || initialQuery)
  const providerValue = useMemo(() => {
    return {
      query: value || initialQuery,
      setQuery: handleChange,
    }
  }, [value, initialQuery, handleChange])
    return (
    <div>
      <h1>Filters</h1>
      <FilterContext.Provider value={providerValue}>
        <FilterGroup query={query} setQuery={setQuery} rules={query} fields={fields} />
      </FilterContext.Provider>

    </div>
  )
}

export default NotionLogicQueryBuilder