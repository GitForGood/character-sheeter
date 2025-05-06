import React from 'react';

const CharacterClass = ({ characterClass }) => {
  if (!characterClass) return null;
  
  return (
    <section>
      <h2>Class</h2>
      <div className="class-info">
        <p className="class-name">
          <span className="label">Class: </span>
          {characterClass.name || 'Unknown'}
          {characterClass.subclass && ` (${characterClass.subclass})`}
        </p>
        <p className="class-level">
          <span className="label">Level: </span>
          {characterClass.level || '1'}
        </p>
        <p className="hit-die">
          <span className="label">Hit Die: </span>
          {characterClass.hitDie || 'd8'}
        </p>
      </div>
      
      {characterClass.features && characterClass.features.length > 0 && (
        <section>
          <h3>Class Features</h3>
          <ul className="features-list">
            {characterClass.features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-name">{feature.name} (Level {feature.level}): </span>
                {feature.description}
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {characterClass.proficiencies && (
        <section>
          <h3>Proficiencies</h3>
          {characterClass.proficiencies.armor && (
            <p className="proficiency-item">
              <span className="label">Armor: </span>
              {characterClass.proficiencies.armor.join(', ')}
            </p>
          )}
          {characterClass.proficiencies.weapons && (
            <p className="proficiency-item">
              <span className="label">Weapons: </span>
              {characterClass.proficiencies.weapons.join(', ')}
            </p>
          )}
          {characterClass.proficiencies.tools && (
            <p className="proficiency-item">
              <span className="label">Tools: </span>
              {characterClass.proficiencies.tools.join(', ')}
            </p>
          )}
          {characterClass.proficiencies.savingThrows && (
            <p className="proficiency-item">
              <span className="label">Saving Throws: </span>
              {characterClass.proficiencies.savingThrows.map(s => 
                s.charAt(0).toUpperCase() + s.slice(1)
              ).join(', ')}
            </p>
          )}
        </section>
      )}
    </section>
  );
};

export default CharacterClass;