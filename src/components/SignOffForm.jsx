import React from "react";

export default function SignOffForm({ name, date, onChange, onSignOff, signed }) {
    if (signed) {
        return (
            <div style={{ padding: '4px 0' }}>
                <div><strong>Date:</strong> <span style={{ fontWeight: 'bold' }}>{date}</span></div>
                <div><strong>Name:</strong> <span style={{ fontWeight: 'bold' }}>{name}</span></div>
            </div>
        );
    }
    return (
        <>
            <input
                type="date"
                value={date}
                onChange={e => onChange('date', e.target.value)}
                className="form-control mb-1"
            />
            <textarea
                value={name}
                onChange={e => onChange('name', e.target.value)}
                placeholder="Name assessor"
                className="form-control mb-1"
                style={{ minHeight: 32 }}
            />
            <button className="btn btn-primary btn-sm" onClick={onSignOff}>Sign Off</button>
        </>
    );
}