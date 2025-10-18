import { useState } from 'react';
import './App.css';
import SegmentModal from './SegmentModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSegment = (segmentData) => {
    console.log('Sending data to server:', segmentData);
    // You would typically send this data to an API endpoint here.
    alert('Saving segment with data: ' + JSON.stringify(segmentData, null, 2));
    handleCloseModal();
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Segment Builder</h1>
      </header>
      <main>
        <button className="save-button" onClick={handleOpenModal}>
          Save segment
        </button>
      </main>

      {isModalOpen && (
        <SegmentModal
          onClose={handleCloseModal}
          onSave={handleSaveSegment}
        />
      )}
    </div>
  );
}

export default App;