import React from "react";

export default function SignOffForm({ name, date, onChange, onSignOff, signed }) {
    // Always use empty string for undefined/null to keep controlled
    const safeName = typeof name === 'string' ? name : '';
    const safeDate = typeof date === 'string' ? date : '';
    if (signed) {
        return (
            <div style={{ padding: '4px 0' }}>
                <div><strong>Date:</strong> <span style={{ fontWeight: 'bold' }}>{safeDate}</span></div>
                <div><strong>Name:</strong> <span style={{ fontWeight: 'bold' }}>{safeName}</span></div>
            </div>
        );
    }
    return (
        <>
            <input
                type="date"
                value={safeDate}
                onChange={e => onChange('date', e.target.value)}
                className="form-control mb-1"
            />
            <textarea
                value={safeName}
                onChange={e => onChange('name', e.target.value)}
                placeholder="Name assessor"
                className="form-control mb-1"
                style={{ minHeight: 32 }}
            />
            <button className="btn btn-primary btn-sm" onClick={onSignOff}>Sign Off</button>
        </>
    );
}