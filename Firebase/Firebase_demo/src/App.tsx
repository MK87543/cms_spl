import { useState } from 'react';
import './App.css';
import { useHotWheels } from './hooks/useHotWheels';
import { useAuth } from './hooks/useAuth';
import { Card } from './components/Card';
import { Auth } from './components/Auth';

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const { hotWheels, loading: dataLoading, addHotWheel, deleteHotWheel } = useHotWheels();
  const [newCar, setNewCar] = useState({ name: '', series: '', year: new Date().getFullYear(), color: '' });

  if (authLoading) {
    return <p>Loading Auth...</p>;
  }

  if (!user) {
    return <Auth />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.name || !newCar.series || !newCar.color) return;
    addHotWheel(newCar);
    setNewCar({ name: '', series: '', year: new Date().getFullYear(), color: '' });
  };

  const addSampleData = async () => {
    const sampleData = [
      { name: 'Twin Mill', series: 'Sweet 16', year: 1969, color: 'Antifreeze' },
      { name: 'Bone Shaker', series: 'Featherweight', year: 2006, color: 'Flat Black' },
      { name: 'Deora II', series: 'HW Wave Cravers', year: 2000, color: 'Blue' },
      { name: 'Sharkruiser', series: 'Beast Bashers', year: 1987, color: 'Red' }
    ];

    for (const car of sampleData) {
      await addHotWheel(car);
    }
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Hot Wheels Collection</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user.email}</span>
          <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#ff4444' }}>Sign Out</button>
        </div>
      </div>

      <div className="add-form" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>Add New Car</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Name"
            value={newCar.name}
            onChange={e => setNewCar({ ...newCar, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Series"
            value={newCar.series}
            onChange={e => setNewCar({ ...newCar, series: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={newCar.year}
            onChange={e => setNewCar({ ...newCar, year: parseInt(e.target.value) })}
            required
          />
          <input
            type="text"
            placeholder="Color"
            value={newCar.color}
            onChange={e => setNewCar({ ...newCar, color: e.target.value })}
            required
          />
          <button type="submit">Add Car</button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={addSampleData} style={{ backgroundColor: '#646cff' }}>
            Add Sample Data
          </button>
        </div>
      </div>

      {dataLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {hotWheels.map(car => (
            <Card key={car.id} car={car} onDelete={deleteHotWheel} />
          ))}
          {hotWheels.length === 0 && <p>No cars in collection yet.</p>}
        </div>
      )}
    </div>
  );
}

export default App;
