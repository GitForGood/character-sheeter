import React from 'react';

const AbilityScores = ({ abilities }) => {
  if (!abilities) return null;
  
  const abilityNames = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  };
  
  const formatModifier = (mod) => {
    if (mod === undefined || mod === null) return '+0';
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };
  
  return (
    <section>
      <h2>Ability Scores</h2>
      <ul className="abilities-grid">
        {Object.keys(abilityNames).map((ability) => (
          <li key={ability} className="ability-box">
            <h3 className="ability-name">{abilityNames[ability]}</h3>
            <p className="ability-score">
              {abilities[ability]?.score || '10'}
            </p>
            <p className="ability-mod">
              {formatModifier(abilities[ability]?.modifier)}
            </p>
            <div className="saving-throw">
              <span className="save-label">Save: </span>
              {formatModifier(abilities[ability]?.savingThrow?.value)}
              {abilities[ability]?.savingThrow?.proficient && ' (P)'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AbilityScores;