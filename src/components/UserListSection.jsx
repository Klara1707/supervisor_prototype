import React from "react";

function UserListSection({ title, users, deleting, handleDeleteUser, hub, sectionRef, ariaLabelledby }) {
    // Generate a unique id for the section title if not provided
    const sectionId = ariaLabelledby || `${title.toLowerCase().replace(/\s+/g, '-')}-title`;
    return (
        <section className="userlist-section" id={title.replace(/\s+/g, "")} aria-labelledby={sectionId}> 
            <div ref={sectionRef} />
            <div className="admin-title-row"><h3 id={sectionId} style={{margin: 0}}><strong>{title}</strong></h3></div>
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
        </section>
    );
}

export default UserListSection;
