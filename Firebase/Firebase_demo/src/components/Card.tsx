import React from 'react';
import type { HotWheel } from '../types';

interface CardProps {
    car: HotWheel;
    onDelete: (id: string) => void;
    onEdit: (car: HotWheel) => void;
}

export const Card: React.FC<CardProps> = ({ car, onDelete, onEdit }) => {
    return (
        <div className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px', width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0 }}>{car.name}</h3>
            {car.imageUrl && <img src={car.imageUrl} alt={car.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />}
            <div style={{ fontSize: '0.9em' }}>
                <p style={{ margin: '4px 0' }}><strong>Series:</strong> {car.series}</p>
                <p style={{ margin: '4px 0' }}><strong>Year:</strong> {car.year}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                    onClick={() => onEdit(car)}
                    style={{
                        backgroundColor: '#646cff',
                        color: 'white',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(car.id)}
                    style={{
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
