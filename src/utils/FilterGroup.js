import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import CombinatorComponent from './CombinatorComponent';
import FieldComponent from './FieldComponent';


let colorCodes = [
    "#67e8f9",
    "#22d3ee",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#a5b4fc",
    "#818cf8",
    "#6366f1",
    "#c4b5fd",
    "#a78bfa",
    "#8b5cf6"
]



const FilterGroup = ({ query,
     setQuery, 
     allowedRemoveForge,
     allowedDuplicateForge,
     allowedAddNewForge,
     allowedAddGroupForge,
     allowedRemoveGroupForge,
     fields,
     rules,
      level = 0,
      ...props
    }) => {

    const colorIndex = level % colorCodes.length; // Calculate the index based on the level and array length
    const color = colorCodes[colorIndex]; // Get the color from the array using the index

    const handleDuplicate = (targetData) => {
        let originalString = JSON.stringify(query);
        const duplicateData = duplicateObjectWithNewId(targetData);

        // Find the position of the value to update
        let position = originalString.indexOf(JSON.stringify(targetData));

        // Check if the value was found
        if (position !== -1) {
            // Insert the new value after the found value
            let updatedString = originalString.substring(0, position + JSON.stringify(targetData).length) +
                "," + JSON.stringify(duplicateData) +
                originalString.substring(position + JSON.stringify(targetData).length);
            setQuery(JSON.parse(updatedString));
        }
    };

    const duplicateObjectWithNewId = (obj) => {
        let duplicateObj = { ...obj, id: uuidv4() };
        if (duplicateObj?.rules && Array.isArray(duplicateObj?.rules)) {
            duplicateObj.rules = duplicateObj?.rules.map(rule => duplicateObjectWithNewId(rule));
        }
        return duplicateObj;
    };

    const handleRemove = (targetData) => {
        let originalString = JSON.stringify(query);
        let targetString = JSON.stringify(targetData);

        // Find the position of the targetData in the originalString
        let position = originalString.indexOf(targetString);

        // Check if the value was found
        if (position !== -1) {
            // Remove the found value
            let updatedString = originalString.substring(0, position) +
                originalString.substring(position + targetString.length);

            // Remove trailing comma if present
            updatedString = updatedString.replace(/,{2,}/g, ',');

            // Remove leading comma if present
            updatedString = updatedString.replace(/(^,)|(,$)/g, '');

            // Replace [,{ with [{
            updatedString = updatedString.replace(/\[\s*,\s*{/g, '[{');

            // Replace },] with }]
            updatedString = updatedString.replace(/}\s*,\s*]/g, '}]');
            // Output the updated string
            setQuery(JSON.parse(updatedString));
        }
    };



    const handleAddRule = (targetData,fields) => {
        let originalString = JSON.stringify(query);
        // Create a copy of the old data
        const updatedData = JSON.parse(JSON.stringify(targetData));
        // Create a new rule object with a unique ID
        const newRule = {
            id: uuidv4(),
            field: fields[0]?.id,
            operator: 'equals',
            value: '',
            formula : fields[0]?.formula,
            type : fields[0]?.type
        };

        // Check if targetData is an array and add the new rule object to it
        if (Array.isArray(updatedData.rules)) {
            updatedData.rules.push(newRule);
        }

        // Replace all occurrences of findValue with newValue
        let updatedString = originalString.split(JSON.stringify(targetData)).join(JSON.stringify(updatedData));

        setQuery(JSON.parse(updatedString));

    };

    const handleAddGroup = (targetData) => {
        let originalString = JSON.stringify(query);
        // Create a copy of the old data
        const updatedData = JSON.parse(JSON.stringify(targetData));
        // Create a new rule object with a unique ID
        const newRule = {
            id: uuidv4(),
            combinator: "and",
            rules: []
        };
        // If rules array doesn't exist or has zero length
        updatedData.rules.push(newRule);
        // Replace all occurrences of findValue with newValue
        let updatedString = originalString.split(JSON.stringify(targetData)).join(JSON.stringify(updatedData));

        setQuery(JSON.parse(updatedString));
    };

    const handleRemoveGroup = (targetData) => {
        let originalString = JSON.stringify(query);
        let targetString = JSON.stringify(targetData);

        // Find the position of the targetData in the originalString
        let position = originalString.indexOf(targetString);
        // Check if the value was found
        if (position !== -1 && position !== 0) {
            // Remove the found value
            let updatedString = originalString.substring(0, position) +
                originalString.substring(position + targetString.length);

            // Remove trailing comma if present
            updatedString = updatedString.replace(/,{2,}/g, ',');

            // Remove leading comma if present
            updatedString = updatedString.replace(/(^,)|(,$)/g, '');

            // Replace [,{ with [{
            updatedString = updatedString.replace(/\[\s*,\s*{/g, '[{');

            // Replace },] with }]
            updatedString = updatedString.replace(/}\s*,\s*]/g, '}]');
            // Output the updated string
            setQuery(JSON.parse(updatedString));
        }
    }


    return (
        <div
            className="rounded-md p-4"
            style={{ border: `1px solid ${color}`, backgroundColor: `${color}`, width: "100%", padding : "10px" }}
        >
            {rules?.rules.map((rule, index) => (
                <div key={rule.id} >
                 {!rule?.combinator &&   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
  <CombinatorComponent
    query={query}
    setQuery={setQuery}
    index={index}
    combinator={rules ? rules.combinator : ''}
    targetData={rules}
  />
  <FieldComponent
    fields={fields}
    query={query}
    setQuery={setQuery}
    targetData={rule}
  />
  {props.children}
{allowedRemoveForge &&  <button
    style={{
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    }}
    onClick={() => handleRemove(rule)}
  >
    Remove Rule
  </button>}
{allowedDuplicateForge &&  <button
    style={{
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    }}
    onClick={() => handleDuplicate(rule)}
  >
    Add Duplicate
  </button>}
</div>
}

                    {rule?.rules && (
                          <div style={{width: "100%", display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <CombinatorComponent
                            query={query}
                            setQuery={setQuery}
                            index={level + 1}
                            combinator={rules?.combinator}
                            targetData={rules}
                        />
                        <FilterGroup
                            query={query}
                            setQuery={setQuery}
                            allowedRemoveForge={allowedRemoveForge}
                            allowedDuplicateForge={allowedDuplicateForge}
                            allowedAddNewForge={allowedAddNewForge}
                            allowedAddGroupForge={allowedAddGroupForge}
                            allowedRemoveGroupForge={allowedRemoveGroupForge}
                            fields={fields}
                            rules={rule}
                            level={level + 1}
                        />
                        </div>
                        
                    )}
                </div>
            ))}
           <div className="flex justify-start mt-4">
{allowedAddNewForge &&    <button 
        style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            marginRight: '0.5rem' // Added spacing between buttons
        }}
        onClick={() => handleAddRule(rules, fields)}
    >
        Add New Rule
    </button>}
{allowedAddGroupForge &&    <button 
        style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            marginRight: '0.5rem' // Added spacing between buttons
        }}
        onClick={() => handleAddGroup(rules)}
    >
        Add Group
    </button>}
{allowedRemoveGroupForge && level === 0 &&    <button 
        style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#FF0000',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
        }}
        onClick={() => handleRemoveGroup(rules)}
    >
        Remove Group
    </button>}
</div>

        </div>
    );
};

export default FilterGroup