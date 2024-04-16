import React from 'react'

const capitalizeFirstLetter = (string) => {
    if (typeof string === 'undefined') {
      return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  
const CombinatorComponent = ({
    query,
    setQuery,
    index,
    combinator,
    targetData
  }) => {
  
    const handleCombinatorValue = (value) => {
      let originalString = JSON.stringify(query);
      // Create a copy of the old data
      let updatedData = JSON.parse(JSON.stringify(targetData));
      updatedData = {
        ...updatedData,
        combinator : value
      }
      // Replace all occurrences of findValue with newValue
      let updatedString = originalString.split(JSON.stringify(targetData)).join(JSON.stringify(updatedData));
  
      setQuery(JSON.parse(updatedString));
    }
  
    return (
      <>
        {index === 0 && <div>Where</div>}
        {index === 1 && <div>
          <select
  value={combinator}
  onChange={(e) => handleCombinatorValue(e.target.value)}
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
  <option value="and">And</option>
  <option value="or">OR</option>
</select>
        </div>}
        {index >= 2 && <span>{capitalizeFirstLetter(combinator)}</span>}
      </>
    )
  
  }
  

export default CombinatorComponent