import { useEffect, useState } from "react";
import axios from "axios";
import "../dashboard/adminCss/AdminSetting.css";

const AdminSetting = () => {
    const [adminEmail, setAdminEmail] = useState("");
    const [newData, setNewData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            const parsed = JSON.parse(storedAdmin);
            setAdminEmail(parsed.email);
            setNewData({
                email: parsed.email,
                password: "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8000/npm/admin/updateadmin", {
                oldEmail: adminEmail,
                email: newData.email,
                password: newData.password,
            });

            if (response.status === 200) {
                setMessage("Admin info updated successfully");
                setError("");
                localStorage.setItem("admin", JSON.stringify({ email: response.data.data.email }));
                setAdminEmail(response.data.data.email);
                setNewData({ email: response.data.data.email, password: "" });
            }
        } catch (err) {
            console.error("Update error:", err);
            setMessage("");
            setError(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="admin-settings-container">
            <h2>Admin Settings</h2>
            <form className="admin-settings-form" onSubmit={handleUpdate}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={newData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        required
                    />
                </div>

                <button type="submit">Update</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminSetting;
