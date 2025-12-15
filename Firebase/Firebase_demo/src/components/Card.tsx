import React from 'react';
import type { HotWheel } from '../types';

interface CardProps {
    car: HotWheel;
    onDelete: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ car, onDelete }) => {
    return (
        <div className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px', width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0 }}>{car.name}</h3>
            <div style={{ fontSize: '0.9em' }}>
                <p style={{ margin: '4px 0' }}><strong>Series:</strong> {car.series}</p>
                <p style={{ margin: '4px 0' }}><strong>Year:</strong> {car.year}</p>
                <p style={{ margin: '4px 0' }}><strong>Color:</strong> {car.color}</p>
            </div>
            <button
                onClick={() => onDelete(car.id)}
                style={{
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
            >
                Delete
            </button>
        </div>
    );
};
