import React from 'react';
import FilterGroup from '../utils/FilterGroup';

const QueryBuilder = (props) => {
  const filterGroupStyle = {
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={filterGroupStyle}>
      <h2 style={{ marginBottom: '10px' }}>Filter Group</h2>
      
      <div style={{ border: "1px solid #ccc",backgroundColor : "#f5f5f5"}}>
      <FilterGroup
        query={props.state}
        setQuery={props.setState}
        allowedRemoveForge={props.allowedRemoveForge || true}
        allowedDuplicateForge={props.allowedDuplicateForge || true}
        allowedAddNewForge={props.allowedAddNewForge || true}
        allowedAddGroupForge={props.allowedAddGroupForge || true}
        allowedRemoveGroupForge={props.allowedRemoveGroupForge || true}
        fields={props.fields}
        rules = {props.state}
        {...props}
      >

        </FilterGroup>
        </div>
    </div>
  );
};

export default QueryBuilder;
