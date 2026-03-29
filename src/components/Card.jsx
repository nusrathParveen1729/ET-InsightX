import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ 
  title, 
  summary, 
  tag, 
  image,
  source,
  publishedAt,
  externalUrl,
  linkTo = "/news", 
  isHighlighted = false,
  className = "" 
}) {
  const categoryClass = tag ? `category-${tag.toLowerCase().replace(/\s+/g, '-')}` : 'category-general';
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';
  const articleData = { title, description: summary, image, source, publishedAt, url: externalUrl || linkTo };

  return (
    <Link to={linkTo} state={{ article: articleData }} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`card interactive flex flex-col h-full ${isHighlighted ? 'highlighted-card' : ''} ${categoryClass} ${className}`}>
        {image && (
          <div className="card-image-container" style={{height: '160px', overflow: 'hidden', borderRadius: '12px', marginBottom: '16px'}}>
            <img src={image} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        )}
        <div className="card-content flex flex-col h-full">
          <div className="flex justify-between items-center mb-1">
             {tag && <span className="tag">{tag}</span>}
             {source && <span className="text-xs text-gray-500 font-semibold">{source}</span>}
          </div>
          <h3 className="card-title font-bold mt-2" style={{lineHeight: '1.25', margin: '4px 0 8px 0'}}>{title}</h3>
          {summary && <p className="card-summary text-secondary text-sm" style={{lineHeight: '1.6'}}>{summary}</p>}
          {formattedDate && <span className="text-xs text-gray-400 mt-auto pt-2 block">{formattedDate}</span>}
        </div>
      </div>
    </Link>
  );
}
