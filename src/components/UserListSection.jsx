import React from "react";

function UserListSection({ title, users, deleting, handleDeleteUser, hub, sectionRef }) {
    return (
        <div className="" id={title.replace(/\s+/g, "")}> 
            <div ref={sectionRef} />
            <h3><strong>{title}</strong></h3>
            {users.map((user, idx) => {
                const key = user.email || user.username;
                return (
                    <div key={key || user.full_name || idx} className="user-bordered-container">
                        <div className="admin-subject-row">
                            <span className="admin-subject-label">
                                {user.full_name}
                                {key ? ` (${key})` : ""}
                            </span>
                            {key && (
                                <button
                                    className="admin-action-btn"
                                    onClick={() => handleDeleteUser(key, hub)}
                                    disabled={!!deleting[key]}
                                >
                                    {deleting[key] ? "Deleting..." : "Delete user"}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserListSection;
