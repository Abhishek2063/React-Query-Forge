import React, { useState } from 'react'
import QueryBuilder from './components/QueryBuilder'
import { v4 as uuidv4 } from 'uuid';
const App = () => {
  const [data,setData] = useState({
    combinator : "and",
    rules : [
      {
        id : uuidv4(),
            field: "",
            operator: '',
            value: '',
            formula : "",
            type : ""
      },
      {
        id: "ddb960db-e4c0-4664-aa39-16a32aa4599b",
        combinator: "and",
        rules: []
    }
    ]

  })
  const [fields] = useState([
    {
      id : uuidv4(),
      type : "status",
      value : "value 1",
      name : "Value 1",
      formula : ""
    },
    {
      id : uuidv4(),
      type : "status",
      value : "value 2",
      name : "Value 2",
      formula : ""
    },
    {
      id : uuidv4(),
      type : "status",
      value : "value 3",
      name : "Value 3",
      formula : ""
    }
  ])
  return (
    <div>
      <QueryBuilder 
      state={data}
      setState={setData}
      allowedRemoveForge = {true}
      allowedDuplicateForge = {true}
      allowedAddNewForge = {true}
      allowedAddGroupForge = {true}
      allowedRemoveGroupForge = {true}
      fields={fields}
      >
        </QueryBuilder>
    </div>
  )
}

export default App