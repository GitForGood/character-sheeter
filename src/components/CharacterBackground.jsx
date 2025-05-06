import React from 'react';

const CharacterBackground = ({ background }) => {
  if (!background) return null;
  
  return (
    <section>
      <h2 >Background</h2>
      <p>
        <span className="label">Background: </span>
        {background.name || 'Unknown'}
      </p>
      
      {background.feature && (
        <div className="subsection">
          <h3 className="subsection-title">Feature: {background.feature.name}</h3>
          <p className="feature-description">{background.feature.description}</p>
        </div>
      )}
      
      <div className="characteristics-grid">
        {background.personalityTraits && (
          <div className="characteristic">
            <h3 className="characteristic-title">Personality Traits</h3>
            <p className="characteristic-text">{background.personalityTraits}</p>
          </div>
        )}
        
        {background.ideals && (
          <div className="characteristic">
            <h3 className="characteristic-title">Ideals</h3>
            <p className="characteristic-text">{background.ideals}</p>
          </div>
        )}
        
        {background.bonds && (
          <div className="characteristic">
            <h3 className="characteristic-title">Bonds</h3>
            <p className="characteristic-text">{background.bonds}</p>
          </div>
        )}
        
        {background.flaws && (
          <div className="characteristic">
            <h3 className="characteristic-title">Flaws</h3>
            <p className="characteristic-text">{background.flaws}</p>
          </div>
        )}
      </div>
      
      {background.proficiencies && (
        <div className="subsection">
          <h3 className="subsection-title">Background Proficiencies</h3>
          {background.proficiencies.skills && (
            <p className="proficiency-item">
              <span className="label">Skills: </span>
              {background.proficiencies.skills.join(', ')}
            </p>
          )}
          {background.proficiencies.tools && (
            <p className="proficiency-item">
              <span className="label">Tools: </span>
              {background.proficiencies.tools.join(', ')}
            </p>
          )}
          {background.proficiencies.languages && (
            <p className="proficiency-item">
              <span className="label">Languages: </span>
              {background.proficiencies.languages.join(', ')}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default CharacterBackground;