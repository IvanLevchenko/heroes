import React from "react";
import './Paginator.scss'

export default function Paginator({maxPages, selected, onSelectPage, count}) {

  let pages = new Array(Math.ceil(count / maxPages)).fill('').map((p, i) => p = i + 1)

  return (
    <div className="paginator">
      {pages.map(page => {
        return (
          <div 
            className={`paginator__page ${page == selected ? 'selected' : ''}`}
            onClick={() => onSelectPage(page)}
          >
            {page}
          </div>
        )
      })}
    </div>
  )
}