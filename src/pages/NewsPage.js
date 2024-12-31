import React, { useState, useEffect } from "react";
import {
  fetchNews,
  createNews,
  updateNews,
  deleteNews,
} from "../api/newsApi";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNews, setEditNews] = useState(null);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  const handleAddNews = (newsItem) => {
    createNews(newsItem).then(() => fetchNews().then(setNews));
    setModalOpen(false);
  };

  const handleEditNews = (newsItem) => {
    updateNews(editNews.id, newsItem).then(() => fetchNews().then(setNews));
    setModalOpen(false);
  };

  const handleDeleteNews = (id) => {
    deleteNews(id).then(() => fetchNews().then(setNews));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "publish_date", headerName: "Publish Date", width: 150 },
  ];

  return (
    <div>
      <h1>News</h1>
      <button
        onClick={() => {
          setEditNews(null);
          setModalOpen(true);
        }}
      >
        Add News
      </button>
      <DataTable
        rows={news}
        columns={columns}
        onEdit={(newsItem) => {
          setEditNews(newsItem);
          setModalOpen(true);
        }}
        onDelete={handleDeleteNews}
      />
      {modalOpen && (
        <FormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={editNews ? handleEditNews : handleAddNews}
          initialData={editNews}
          fields={[
            { name: "title", label: "Title" },
            { name: "link", label: "Link" },
            { name: "description", label: "Description" },
            { name: "image_url", label: "Image URL" },
            { name: "source", label: "Source" },
            { name: "publish_date", label: "Publish Date", type: "date" },
          ]}
        />
      )}
    </div>
  );
};

export default NewsPage;
