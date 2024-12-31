import React, { useState, useEffect } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articleApi";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editArticle, setEditArticle] = useState(null);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  const handleAddArticle = (article) => {
    createArticle(article).then(() => fetchArticles().then(setArticles));
    setModalOpen(false);
  };

  const handleEditArticle = (article) => {
    updateArticle(editArticle.id, article).then(() =>
      fetchArticles().then(setArticles)
    );
    setModalOpen(false);
  };

  const handleDeleteArticle = (id) => {
    deleteArticle(id).then(() => fetchArticles().then(setArticles));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "published_date", headerName: "Published Date", width: 150 },
    { field: "related_articles", headerName: "related_articles Date", width: 150 },
  ];

  return (
    <div>
      <h1>Articles</h1>
      <button onClick={() => setModalOpen(true)}>Add Article</button>
      <DataTable
        rows={articles}
        columns={columns}
        onEdit={(article) => {
          setEditArticle(article);
          setModalOpen(true);
        }}
        onDelete={handleDeleteArticle}
      />
      {modalOpen && (
        <FormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={editArticle ? handleEditArticle : handleAddArticle}
          initialData={editArticle}
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description" },
            { name: "image_url", label: "Image URL" },
            { name: "published_date", label: "Published Date", type: "date" },
            { name: "related_articles", label: "related_articles"},
          ]}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
