import React from 'react';

function getFileIcon(name = '') {
  const ext = name.split('.').pop().toLowerCase();
  const icons = {
    js: '🟨', jsx: '🟨', ts: '🔷', tsx: '🔷',
    html: '🟧', css: '🔵', scss: '🔵',
    json: '🟩', md: '📝', py: '🐍',
    txt: '📄', svg: '🖼️',
  };
  return icons[ext] || '📄';
}

const FileTabs = ({ openFiles, fileSystem, activeFileId, onTabClick, onTabClose }) => {
  if (openFiles.length === 0) return null;

  return (
    <div
      className="file-tabs-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        minHeight: '52px',
        padding: '8px 12px',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'transparent',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {openFiles.map(fileId => {
        const node = fileSystem[fileId];
        if (!node) return null;
        const isActive = fileId === activeFileId;
        return (
          <div
            key={fileId}
            className={`file-tab ${isActive ? 'file-tab--active' : ''}`}
            onClick={() => onTabClick(fileId)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              maxWidth: '220px',
              minHeight: '38px',
              padding: '6px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: isActive
                ? '1px solid rgba(80,250,123,0.6)'
                : '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.2s ease',
            }}
          >
            <span className="file-tab-icon">{getFileIcon(node.name)}</span>
            <span
              className="file-tab-name"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {node.name}
            </span>
            <button
              className="file-tab-close"
              style={{
                marginLeft: '4px',
                flexShrink: 0,
              }}
              onClick={e => { e.stopPropagation(); onTabClose(fileId); }}
              title="Close"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FileTabs;
