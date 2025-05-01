import React, { useState } from 'react';
import '../styles/styles.css'; // We'll create this CSS file

const CharacterSheetApp = () => {
  const [character, setCharacter] = useState(null);
  const [jsonError, setJsonError] = useState(null);
  
  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        validateCharacter(json);
        setCharacter(json);
        setJsonError(null);
      } catch (error) {
        setJsonError(`Error parsing JSON: ${error.message}`);
        setCharacter(null);
      }
    };
    reader.readAsText(file);
  };
  
  // Basic validation to ensure the JSON matches the required schema structure
  const validateCharacter = (character) => {
    const requiredProperties = [
      'characterBasics',
      'abilities',
      'race',
      'class',
      'background',
      'equipment',
      'spellcasting'
    ];
    
    for (const prop of requiredProperties) {
      if (!character[prop]) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }
    
    // Validate characterBasics
    const requiredBasics = ['name', 'level', 'alignment', 'experiencePoints'];
    for (const prop of requiredBasics) {
      if (!character.characterBasics[prop]) {
        throw new Error(`Missing required property in characterBasics: ${prop}`);
      }
    }
    
    // Validate abilities
    const requiredAbilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    for (const ability of requiredAbilities) {
      if (!character.abilities[ability]) {
        throw new Error(`Missing required ability: ${ability}`);
      }
    }
  };
  
  // Function to export character as JSON file
  const exportCharacter = () => {
    if (!character) return;
    
    const jsonString = JSON.stringify(character, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.characterBasics.name || 'character'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Render character sheet content
  const renderCharacterSheet = () => {
    if (!character) return null;
    
    return (
      <div className="character-sheet">
        <CharacterBasics basics={character.characterBasics} />
        <AbilityScores abilities={character.abilities} />
        <CharacterRace race={character.race} />
        <CharacterClass characterClass={character.class} />
        <CharacterBackground background={character.background} />
        <Equipment equipment={character.equipment} />
        <Spellcasting spellcasting={character.spellcasting} />
      </div>
    );
  };
  
  return (
    <div className="app-container">
      <h1 className="app-title">D&D 5e Character Sheet</h1>
      
      <div className="upload-section">
        <h2 className="section-title">Import/Export Character</h2>
        <div className="upload-controls">
          <div>
            <label htmlFor="json-upload" className="form-label">
              Upload Character JSON
            </label>
            <input
              id="json-upload"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>
          
          <div>
            <button
              onClick={exportCharacter}
              disabled={!character}
              className="export-button"
            >
              Export Character
            </button>
          </div>
        </div>
        
        {jsonError && (
          <div className="error-message">
            {jsonError}
          </div>
        )}
      </div>
      
      {character ? (
        renderCharacterSheet()
      ) : (
        <div className="empty-state">
          <p>
            Upload a character JSON file to view and edit your character sheet.
          </p>
        </div>
      )}
    </div>
  );
};

// Component to display character basics
const CharacterBasics = ({ basics }) => {
  if (!basics) return null;
  
  return (
    <div className="section">
      <h2 className="section-title">Character Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <label className="info-label">Name</label>
          <p className="info-value">{basics.name || 'Unknown'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Level</label>
          <p className="info-value">{basics.level || '1'}</p>
        </div>
        <div className="info-item">
          <label className="info-label">Alignment</label>
          <p className="info-value">{basics.alignment || 'Unaligned'}</p>
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
        <div className="subsection">
          <h3 className="subsection-title">Hit Points</h3>
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
        </div>
      )}
    </div>
  );
};

// Component to display ability scores
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
    <div className="section">
      <h2 className="section-title">Ability Scores</h2>
      <div className="abilities-grid">
        {Object.keys(abilityNames).map((ability) => (
          <div key={ability} className="ability-box">
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
          </div>
        ))}
      </div>
    </div>
  );
};

// Component to display race information
const CharacterRace = ({ race }) => {
  if (!race) return null;
  
  return (
    <div className="section">
      <h2 className="section-title">Race</h2>
      <div className="race-info">
        <p className="race-name">
          <span className="label">Race: </span>
          {race.name || 'Unknown'}
          {race.subrace && ` (${race.subrace})`}
        </p>
        <p className="race-size">
          <span className="label">Size: </span>
          {race.size || 'Medium'}
        </p>
      </div>
      
      {race.traits && race.traits.length > 0 && (
        <div className="subsection">
          <h3 className="subsection-title">Racial Traits</h3>
          <ul className="traits-list">
            {race.traits.map((trait, index) => (
              <li key={index} className="trait-item">
                <span className="trait-name">{trait.name}: </span>
                {trait.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {race.languages && race.languages.length > 0 && (
        <div className="subsection">
          <h3 className="subsection-title">Languages</h3>
          <p className="languages">{race.languages.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

// Component to display class information
const CharacterClass = ({ characterClass }) => {
  if (!characterClass) return null;
  
  return (
    <div className="section">
      <h2 className="section-title">Class</h2>
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
        <div className="subsection">
          <h3 className="subsection-title">Class Features</h3>
          <ul className="features-list">
            {characterClass.features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-name">{feature.name} (Level {feature.level}): </span>
                {feature.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {characterClass.proficiencies && (
        <div className="subsection">
          <h3 className="subsection-title">Proficiencies</h3>
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
        </div>
      )}
    </div>
  );
};

// Component to display background information
const CharacterBackground = ({ background }) => {
  if (!background) return null;
  
  return (
    <div className="section">
      <h2 className="section-title">Background</h2>
      <p className="background-name">
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
    </div>
  );
};

// Component to display equipment
const Equipment = ({ equipment }) => {
  if (!equipment) return null;
  
  return (
    <div className="section">
      <h2 className="section-title">Equipment</h2>
      
      {equipment.currency && (
        <div className="subsection">
          <h3 className="subsection-title">Currency</h3>
          <div className="currency-grid">
            <div className="currency-item">
              <span className="label">CP: </span>
              {equipment.currency.copper || 0}
            </div>
            <div className="currency-item">
              <span className="label">SP: </span>
              {equipment.currency.silver || 0}
            </div>
            <div className="currency-item">
              <span className="label">EP: </span>
              {equipment.currency.electrum || 0}
            </div>
            <div className="currency-item">
              <span className="label">GP: </span>
              {equipment.currency.gold || 0}
            </div>
            <div className="currency-item">
              <span className="label">PP: </span>
              {equipment.currency.platinum || 0}
            </div>
          </div>
        </div>
      )}
      
      {equipment.armor && equipment.armor.length > 0 && (
        <div className="subsection">
          <h3 className="subsection-title">Armor</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>AC</th>
                  <th>Equipped</th>
                </tr>
              </thead>
              <tbody>
                {equipment.armor.map((armor, index) => (
                  <tr key={index}>
                    <td>{armor.name}</td>
                    <td>{armor.type}</td>
                    <td>{armor.baseAC}</td>
                    <td>{armor.equipped ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {equipment.weapons && equipment.weapons.length > 0 && (
        <div className="subsection">
          <h3 className="subsection-title">Weapons</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Damage</th>
                  <th>Equipped</th>
                </tr>
              </thead>
              <tbody>
                {equipment.weapons.map((weapon, index) => (
                  <tr key={index}>
                    <td>{weapon.name}</td>
                    <td>{weapon.type}</td>
                    <td>{`${weapon.damage} ${weapon.damageType}`}</td>
                    <td>{weapon.equipped ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {equipment.items && equipment.items.length > 0 && (
        <div className="subsection">
          <h3 className="subsection-title">Items</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {equipment.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Component to display spellcasting information
const Spellcasting = ({ spellcasting }) => {
  if (!spellcasting || !spellcasting.spells || spellcasting.spells.length === 0) return null;
  
  // Group spells by level
  const spellsByLevel = {};
  spellcasting.spells.forEach(spell => {
    const level = spell.level;
    if (!spellsByLevel[level]) {
      spellsByLevel[level] = [];
    }
    spellsByLevel[level].push(spell);
  });
  
  // Get sorted spell levels
  const sortedLevels = Object.keys(spellsByLevel).sort((a, b) => Number(a) - Number(b));
  
  return (
    <div className="section">
      <h2 className="section-title">Spellcasting</h2>
      
      <div className="spellcasting-info">
        <div className="spellcasting-stats">
          <div className="spellcasting-stat">
            <label className="info-label">Spellcasting Ability</label>
            <p className="info-value">
              {spellcasting.ability ? spellcasting.ability.charAt(0).toUpperCase() + spellcasting.ability.slice(1) : 'None'}
            </p>
          </div>
          <div className="spellcasting-stat">
            <label className="info-label">Spell Save DC</label>
            <p className="info-value">{spellcasting.spellSaveDC || '-'}</p>
          </div>
          <div className="spellcasting-stat">
            <label className="info-label">Spell Attack Bonus</label>
            <p className="info-value">{spellcasting.spellAttackBonus ? `+${spellcasting.spellAttackBonus}` : '-'}</p>
          </div>
        </div>
      </div>
      
      {spellcasting.spellSlots && (
        <div className="subsection">
          <h3 className="subsection-title">Spell Slots</h3>
          <div className="spell-slots-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
              <div key={level} className="spell-slot">
                <div className="spell-slot-level">Level {level}</div>
                <div className="spell-slot-count">
                  {spellcasting.spellSlots[level] ? 
                    `${spellcasting.spellSlots[level].used || 0}/${spellcasting.spellSlots[level].total || 0}` : 
                    '0/0'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="spells-by-level">
        <h3 className="subsection-title">Spells</h3>
        
        {sortedLevels.map(level => (
          <div key={level} className="spell-level-group">
            <h4 className="spell-level-title">
              {level === '0' ? 'Cantrips' : `Level ${level} Spells`}
            </h4>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Casting Time</th>
                    <th>Range</th>
                    <th>Prepared</th>
                  </tr>
                </thead>
                <tbody>
                  {spellsByLevel[level].map((spell, index) => (
                    <tr key={index}>
                      <td>{spell.name}</td>
                      <td>{spell.school}</td>
                      <td>{spell.castingTime}</td>
                      <td>{spell.range}</td>
                      <td>
                        {level === '0' ? 'Always' : (spell.prepared ? 'Yes' : 'No')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSheetApp;