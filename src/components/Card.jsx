import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ 
  title, 
  summary, 
  tag, 
  image,
  linkTo = "/news", 
  isHighlighted = false,
  className = "" 
}) {
  // Create a clean class name from the tag
  const categoryClass = tag ? `category-${tag.toLowerCase().replace(/\s+/g, '-')}` : 'category-general';

  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <div className={`card interactive ${isHighlighted ? 'highlighted-card' : ''} ${categoryClass} ${className}`}>
        {image && (
          <div className="card-image-container" style={{height: '160px', overflow: 'hidden', borderRadius: '12px', marginBottom: '16px'}}>
            <img src={image} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        )}
        <div className="card-content">
          {tag && <span className="tag">{tag}</span>}
          <h3 className="card-title font-bold mt-2" style={{lineHeight: '1.25', margin: '4px 0 8px 0'}}>{title}</h3>
          {summary && <p className="card-summary text-secondary text-sm" style={{lineHeight: '1.6'}}>{summary}</p>}
        </div>
      </div>
    </Link>
  );
}
