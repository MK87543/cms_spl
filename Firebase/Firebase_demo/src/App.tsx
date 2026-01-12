import { useState } from 'react';
import './App.css';
import { useHotWheels } from './hooks/useHotWheels';
import { useAuth } from './hooks/useAuth';
import { Card } from './components/Card';
import { Auth } from './components/Auth';
import type { HotWheel } from './types';

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const { hotWheels, loading: dataLoading, addHotWheel, deleteHotWheel, updateHotWheel } = useHotWheels();
  const [newCar, setNewCar] = useState({ name: '', series: '', year: new Date().getFullYear(), color: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (authLoading) {
    return <p>Loading Auth...</p>;
  }

  if (!user) {
    return <Auth />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.name || !newCar.series || !newCar.color) return;

    if (editingId) {
      updateHotWheel(editingId, newCar, imageFile || undefined);
      setEditingId(null);
    } else {
      addHotWheel(newCar, imageFile || undefined);
    }

    setNewCar({ name: '', series: '', year: new Date().getFullYear(), color: '' });
    setImageFile(null);
  };

  const startEditing = (car: HotWheel) => {
    setEditingId(car.id);
    setNewCar({ name: car.name, series: car.series, year: car.year, color: car.color });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <h2>{editingId ? 'Edit Car' : 'Add New Car'}</h2>
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
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
          <button type="submit">{editingId ? 'Update Car' : 'Add Car'}</button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setNewCar({ name: '', series: '', year: new Date().getFullYear(), color: '' });
              setImageFile(null);
            }} style={{ backgroundColor: '#999' }}>
              Cancel
            </button>
          )}
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
            <Card key={car.id} car={car} onDelete={deleteHotWheel} onEdit={startEditing} />
          ))}
          {hotWheels.length === 0 && <p>No cars in collection yet.</p>}
        </div>
      )}
    </div>
  );
}

export default App;
