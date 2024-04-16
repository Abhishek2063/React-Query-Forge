import React from 'react'

const FieldComponent = ({
  fields,
  query, setQuery,
  targetData
}) => {


  const handleFieldComponent = (targetValue) => {
    let originalString = JSON.stringify(query);
    // Create a copy of the old data
    let updatedData = JSON.parse(JSON.stringify(targetData));
    updatedData = {
      ...updatedData,
      field: targetValue?.value,
      formula: targetValue?.formula,
      type: targetValue?.type
    }
    // Replace all occurrences of findValue with newValue
    let updatedString = originalString.split(JSON.stringify(targetData)).join(JSON.stringify(updatedData));

    setQuery(JSON.parse(updatedString));
  }
  return (
    <>
    <select
  value={targetData ? targetData.field : ''}
  onChange={(e) => handleFieldComponent(e.target.value)}
  style={{
    width: '100%',
    height: '2.25rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  }}
>
  <option value="">Select...</option>
  {fields.map((db) => (
    <option key={db.id} value={db}>
      {db.name}
    </option>
  ))}
</select>

    </>
  )
}

export default FieldComponent