import React from 'react';

const CharacterBasics = ({ basics }) => {
  if (!basics) return null;
  
  return (
    <section>
      <h2>Character Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <label className="info-label">Name</label>
          <p className="info-value">{basics.name || 'Unknown'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Alignment</label>
          <p className="info-value">{basics.alignment || 'Unaligned'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Level</label>
          <p className="info-value">{basics.level || '1'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Experience Points</label>
          <p className="info-value">{basics.experiencePoints || '0'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Proficiency Bonus</label>
          <p className="info-value">{`+${basics.proficiencyBonus || '2'}`}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Armor Class</label>
          <p className="info-value">{basics.armorClass || '10'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Initiative</label>
          <p className="info-value">{`+${basics.initiative || '0'}`}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Speed</label>
          <p className="info-value">{`${basics.speed || '30'} ft`}</p>
        </div>
      </div>
      
      {basics.hitPoints && (
        <section>
          <h3>Hit Points</h3>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Maximum</label>
              <p className="info-value">{basics.hitPoints.maximum || '0'}</p>
            </div>
            <div className="info-item">
              <label className="info-label">Current</label>
              <p className="info-value">{basics.hitPoints.current || '0'}</p>
            </div>
            <div className="info-item">
              <label className="info-label">Temporary</label>
              <p className="info-value">{basics.hitPoints.temporary || '0'}</p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default CharacterBasics;