import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CommentsList from '../../components/comments/comments-list';


export default function ComentPage() {
  return (
    <Routes>
       <Route path="comments" element={<CommentsList />} />
    </Routes>
  );
}
