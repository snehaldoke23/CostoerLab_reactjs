import { useState } from 'react';

const availableSchemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function SegmentModal({ onClose, onSave }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');

  const handleAddSchema = () => {
    if (newSchema) {
      const selected = availableSchemas.find(s => s.value === newSchema);
      setSelectedSchemas([...selectedSchemas, { [selected.value]: selected.label }]);
      setNewSchema('');
    }
  };

  const handleDynamicSchemaChange = (index, newValue) => {
    const updatedSchemas = [...selectedSchemas];
    const oldKey = Object.keys(updatedSchemas[index])[0];
    const newSchemaObj = availableSchemas.find(s => s.value === newValue);
    updatedSchemas[index] = { [newSchemaObj.value]: newSchemaObj.label };
    setSelectedSchemas(updatedSchemas);
  };

  const getUnselectedOptions = (excludeValue = null) => {
    const usedValues = selectedSchemas.map(s => Object.keys(s)[0]);
    if (excludeValue) {
      const index = usedValues.indexOf(excludeValue);
      if (index > -1) {
        usedValues.splice(index, 1);
      }
    }
    return availableSchemas.filter(s => !usedValues.includes(s.value));
  };

  const handleSave = () => {
    if (!segmentName.trim()) {
      alert('Segment name cannot be empty.');
      return;
    }
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas,
    };
    onSave(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Saving Segment</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </header>
        <div className="modal-body">
          <label>
            Enter the Name of the Segment
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="e.g., Last 10 days blog visits"
            />
          </label>
          <p>To save your segment, you need to add the schemas to build the query</p>
          <div className="blue-box">
            {selectedSchemas.map((schema, index) => {
              const currentValue = Object.keys(schema)[0];
              return (
                <div key={index} className="schema-row">
                  <select
                    value={currentValue}
                    onChange={(e) => handleDynamicSchemaChange(index, e.target.value)}
                  >
                    <option value="" disabled>Select a schema</option>
                    {getUnselectedOptions(currentValue).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    <option key={currentValue} value={currentValue}>
                      {schema[currentValue]}
                    </option>
                  </select>
                </div>
              );
            })}
          </div>
          <div className="add-schema-controls">
            <select
              value={newSchema}
              onChange={(e) => setNewSchema(e.target.value)}
            >
              <option value="" disabled>Add schema to segment</option>
              {getUnselectedOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <a href="#" onClick={(e) => { e.preventDefault(); handleAddSchema(); }}>
              + Add new schema
            </a>
          </div>
        </div>
        <footer className="modal-footer">
          <button className="save-segment-button" onClick={handleSave}>
            Save the Segment
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default SegmentModal;