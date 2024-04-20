
# React Query Forge

React Query Forge is a powerful package developed by Abhishek Garg that simplifies the process of building complex nested queries in React applications. Similar to a React query builder, React Query Forge excels in handling nested grouping with ease, presenting data in a tree-like structure for enhanced clarity and flexibility.

## Installation

To install React Query Forge, simply use npm:

```bash
npm install react-query-forge
```

## Usage

To use React Query Forge in your project, follow these steps:

1. Import the `QueryBuilder` component from `@abhishek2063/react-query-forge`.
2. Prepare your data and fields according to the required structure.

### Example

```javascript
import React, { useState } from 'react';
import { QueryBuilder } from '@abhishek2063/react-query-forge';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [data, setData] = useState({
    combinator: "and",
    rules: [
      {
        id: "ddb960db-e4c0-4664-aa39-16a32aa4599e",
        field: "",
        operator: '',
        value: '',
        formula: "",
        type: ""
      },
      {
        id: "ddb960db-e4c0-4664-aa39-16a32aa4599b",
        combinator: "and",
        rules: []
      }
    ]
  });

  const [fields] = useState([
    {
      id: uuidv4(),
      type: "status",
      value: "value 1",
      name: "Value 1",
      formula: ""
    },
    {
      id: uuidv4(),
      type: "status",
      value: "value 2",
      name: "Value 2",
      formula: ""
    },
    {
      id: uuidv4(),
      type: "status",
      value: "value 3",
      name: "Value 3",
      formula: ""
    }
  ]);

  return (
    <div>
      <h1>React Query Forge Example</h1>
      <QueryBuilder
        state={data}
        setState={setData}
        allowedRemoveForge={true}
        allowedDuplicateForge={true}
        allowedAddNewForge={true}
        allowedAddGroupForge={true}
        allowedRemoveGroupForge={true}
        fields={fields}
      />
    </div>
  );
}

export default App;
```

## Features

- **Nested Grouping:** Easily create complex nested queries with intuitive tree-like structures.
- **Flexible Configuration:** Customize query builder behavior with various configuration options.
- **Simple Integration:** Seamlessly integrate React Query Forge into your React projects with minimal setup.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/Abhishek2063/React-Query-Forge).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, feel free to reach out to Abhishek Garg at [abhishekgarg2063@gmail.com](mailto:abhishekgarg2063@gmail.com).

