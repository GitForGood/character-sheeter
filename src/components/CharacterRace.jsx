import React from 'react';

const CharacterRace = ({ race }) => {
  if (!race) return null;
  
  // Function to format ability score increases
  const formatAbilityIncrease = () => {
    if (!race.abilityScoreIncrease) return 'None';
    
    const increases = [];
    for (const [ability, increase] of Object.entries(race.abilityScoreIncrease)) {
      if (increase > 0) {
        increases.push(`${ability.charAt(0).toUpperCase() + ability.slice(1)} +${increase}`);
      }
    }
    
    return increases.join(', ');
  };
  
  return (
    <section>
      <h2>Race</h2>
      <div className="race-info">
        <div className="info-grid">
          <div className="info-item">
            <label className="info-label">Race</label>
            <p className="info-value">
              {race.name || 'Unknown'}
              {race.subrace && ` (${race.subrace})`}
            </p>
          </div>
          
          <div className="info-item">
            <label className="info-label">Size</label>
            <p className="info-value">{race.size || 'Medium'}</p>
          </div>
          
          <div className="info-item">
            <label className="info-label">Ability Score Increase</label>
            <p className="info-value">{formatAbilityIncrease()}</p>
          </div>
        </div>
      </div>
      
      {race.traits && race.traits.length > 0 && (
        <section>
          <h3>Racial Traits</h3>
          <div className="traits-list">
            {race.traits.map((trait, index) => (
              <div key={index} className="trait-item">
                <h4 className="trait-name">{trait.name}</h4>
                <p className="trait-description">{trait.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {race.languages && race.languages.length > 0 && (
        <section>
          <h3>Languages</h3>
          <p className="languages">{race.languages.join(', ')}</p>
        </section>
      )}
    </section>
  );
};

export default CharacterRace;