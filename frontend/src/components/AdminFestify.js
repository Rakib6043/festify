import React, { useState } from "react";
import AdminFestifyList from "./AdminFestifyList";
import AdminFestifyEdit from "./AdminFestifyEdit";
import FestifyDetails from "./FestifyDetails";

const AdminFestify = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'edit', 'details'
  const [selectedFestify, setSelectedFestify] = useState(null);
  const [selectedFestifyId, setSelectedFestifyId] = useState(null);

  const handleEdit = (festify) => {
    setSelectedFestify(festify); // null for create, object for edit
    setCurrentView("edit");
  };

  const handleViewDetails = (festifyId) => {
    setSelectedFestifyId(festifyId);
    setCurrentView("details");
  };

  const handleSave = () => {
    setSelectedFestify(null);
    setCurrentView("list");
  };

  const handleCancel = () => {
    setSelectedFestify(null);
    setCurrentView("list");
  };

  const handleDelete = () => {
    setSelectedFestifyId(null);
    setCurrentView("list");
  };

  const handleBackToList = () => {
    setSelectedFestify(null);
    setSelectedFestifyId(null);
    setCurrentView("list");
  };

  // Render based on current view
  if (currentView === "edit") {
    return (
      <AdminFestifyEdit
        festify={selectedFestify}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (currentView === "details") {
    return (
      <FestifyDetails
        festifyId={selectedFestifyId}
        onBack={handleBackToList}
        onDelete={handleDelete}
      />
    );
  }

  // Default: List view
  return (
    <AdminFestifyList
      onEdit={handleEdit}
      onViewDetails={handleViewDetails}
      onBack={onBack}
    />
  );
};

export default AdminFestify;
