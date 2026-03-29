import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ 
  title, 
  summary, 
  tag, 
  linkTo = "/news", 
  isHighlighted = false,
  className = "" 
}) {
  return (
    <Link to={linkTo}>
      <div className={`card interactive ${isHighlighted ? 'highlighted-card' : ''} ${className}`}>
        {tag && <span className="tag">{tag}</span>}
        <h3 className="card-title">{title}</h3>
        {summary && <p className="card-summary text-secondary text-sm">{summary}</p>}
      </div>
    </Link>
  );
}
