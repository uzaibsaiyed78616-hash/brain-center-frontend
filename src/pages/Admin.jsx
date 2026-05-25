import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaCloudUploadAlt, FaTrash, FaPlus, FaFileUpload, FaLink, FaUserGraduate, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'manage'
    const [allUnits, setAllUnits] = useState([]);
    const [unitData, setUnitData] = useState({ 
        unitNumber: 1, 
        title: '', 
        resources: [] 
    });

    useEffect(() => { 
        fetchUnits(); 
    }, []);

    const fetchUnits = async () => {
        try {
            const res = await axios.get('https://brain-center-backend-sahk.onrender.com/api/units');
            setAllUnits(res.data);
        } catch (err) {
            console.error("Units fetch error:", err);
        }
    };

    const handleFileUpload = async (index, file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        
        setLoading(true);
        try {
            const res = await axios.post('https://brain-center-backend-sahk.onrender.com/api/units/upload', formData);
            const updatedResources = [...unitData.resources];
            updatedResources[index].url = res.data.url;
            setUnitData({ ...unitData, resources: updatedResources });
            alert("File Upload Success!");
        } catch (err) { 
            alert("Upload Failed!"); 
        }
        setLoading(false);
    };

    const addResourceField = () => {
        setUnitData({
            ...unitData,
            resources: [...unitData.resources, { type: 'pdf', title: '', url: '' }]
        });
    };

    const deleteUnit = async (id) => {
        if (window.confirm("Delete this unit?")) {
            try {
                await axios.delete(`https://brain-center-backend-sahk.onrender.com/api/units/${id}`);
                fetchUnits();
                alert("Unit Deleted!");
            } catch (err) {
                alert("Delete failed.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (unitData.resources.length === 0) {
            alert("Please add at least one resource!");
            return;
        }

        setLoading(true);
        try {
            await axios.post('https://brain-center-backend-sahk.onrender.com/api/units/add', unitData);
            alert("Unit Published!");
            setUnitData({ unitNumber: parseInt(unitData.unitNumber) + 1, title: '', resources: [] });
            fetchUnits();
        } catch (err) { 
            alert("Error saving unit"); 
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <button 
                        onClick={() => navigate('/units')} 
                        className="flex items-center gap-2 font-black text-slate-400 hover:text-indigo-600 transition-all uppercase text-xs tracking-widest"
                    >
                        <FaArrowLeft /> Exit Admin
                    </button>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate('/admin/users')}
                            className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        >
                            <FaUserGraduate size={14} /> Student Analytics
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Side: Upload Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-white">
                            <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <FaCloudUploadAlt size={24} />
                                    <h2 className="text-xl font-black italic">Upload Content</h2>
                                </div>
                                <div className="bg-white/20 p-2 px-4 rounded-xl font-black text-xs">
                                    UNIT # 
                                    <input 
                                        type="number" 
                                        className="bg-transparent w-8 text-center outline-none border-b-2 border-white/30 ml-1" 
                                        value={unitData.unitNumber} 
                                        onChange={(e) => setUnitData({...unitData, unitNumber: e.target.value})} 
                                    />
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <input 
                                    required 
                                    value={unitData.title}
                                    placeholder="Unit Title (e.g. Intro to HTML)" 
                                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-700 border-2 border-transparent focus:border-indigo-100 transition-all" 
                                    onChange={(e) => setUnitData({...unitData, title: e.target.value})} 
                                />

                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-black text-slate-400 text-[10px] uppercase tracking-widest">Resources</span>
                                    <button type="button" onClick={addResourceField} className="text-indigo-600 font-bold text-xs hover:underline">
                                        + Add Field
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    {unitData.resources.map((res, index) => (
                                        <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <select 
                                                    className="p-2 rounded-xl font-bold text-xs bg-white border" 
                                                    value={res.type} 
                                                    onChange={(e) => {
                                                        const updated = [...unitData.resources];
                                                        updated[index].type = e.target.value;
                                                        setUnitData({...unitData, resources: updated});
                                                    }}
                                                >
                                                    <option value="pdf">📄 PDF</option>
                                                    <option value="video">🎥 Video</option>
                                                    <option value="audio">🎵 Audio</option>
                                                    <option value="googleForm">📝 Quiz</option>
                                                </select>
                                                <input 
                                                    placeholder="Title" 
                                                    className="p-2 rounded-xl font-bold text-xs bg-white border" 
                                                    value={res.title} 
                                                    onChange={(e) => {
                                                        const updated = [...unitData.resources];
                                                        updated[index].title = e.target.value;
                                                        setUnitData({...unitData, resources: updated});
                                                    }} 
                                                />
                                            </div>

                                            {res.type === 'googleForm' ? (
                                                <input 
                                                    placeholder="Paste Link" 
                                                    className="w-full p-2 bg-white border rounded-xl text-xs" 
                                                    value={res.url} 
                                                    onChange={(e) => {
                                                        const updated = [...unitData.resources];
                                                        updated[index].url = e.target.value;
                                                        setUnitData({...unitData, resources: updated});
                                                    }} 
                                                />
                                            ) : (
                                                <input 
                                                    type="file" 
                                                    className="text-[10px] w-full" 
                                                    onChange={(e) => handleFileUpload(index, e.target.files[0])} 
                                                />
                                            )}
                                            
                                            <button 
                                                type="button" 
                                                onClick={() => setUnitData({...unitData, resources: unitData.resources.filter((_, i) => i !== index)})}
                                                className="absolute top-2 right-2 text-rose-400 hover:text-rose-600"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all uppercase tracking-widest shadow-lg shadow-indigo-100"
                                >
                                    {loading ? "Processing..." : "Publish Unit"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Manage List */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-white">
                            <div className="flex items-center gap-2 mb-6 text-slate-800">
                                <FaTools className="text-indigo-500" />
                                <h3 className="font-black italic">Live Units</h3>
                            </div>
                            
                            <div className="space-y-3">
                                {allUnits.map(u => (
                                    <div key={u._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-[10px] font-black text-indigo-600 shadow-sm border">{u.unitNumber}</span>
                                            <span className="font-bold text-slate-700 text-sm truncate max-w-[120px]">{u.title}</span>
                                        </div>
                                        <button onClick={() => deleteUnit(u._id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;