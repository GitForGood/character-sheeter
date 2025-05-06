import React, { useState } from 'react';
import CharacterBasics from './components/CharacterBasics';
import AbilityScores from './components/AbilityScores';
import CharacterRace from './components/CharacterRace';
import CharacterClass from './components/CharacterClass';
import CharacterBackground from './components/CharacterBackground';
import CharacterSkills from './components/CharacterSkills';
import Equipment from './components/Equipment';
import Spellcasting from './components/Spellcasting';
import { validateCharacterWithAjv } from './schema/schemaValidator';
import './styles/styles.css';

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
        
        // Validate using Ajv
        const validationResult = validateCharacterWithAjv(json);
        
        if (!validationResult.isValid) {
          // Join all errors into a single message
          const errorMessage = validationResult.errors.join('\n');
          setJsonError(`Validation errors: \n${errorMessage}`);
          setCharacter(null);
          return;
        }
        
        setCharacter(json);
        setJsonError(null);
      } catch (error) {
        setJsonError(`Error parsing JSON: ${error.message}`);
        setCharacter(null);
      }
    };
    reader.readAsText(file);
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
      <article className="character-sheet">
        <CharacterBasics basics={character.characterBasics} />
        <AbilityScores abilities={character.abilities} />
        <CharacterRace race={character.race} />
        <CharacterSkills 
          skills={character.skills} 
          abilities={character.abilities}
          characterClass={character.class}
          background={character.background}
          proficiencyBonus={character.characterBasics.proficiencyBonus || 2}
        />
        <CharacterClass characterClass={character.class} />
        <CharacterBackground background={character.background} />
        <Equipment equipment={character.equipment} />
        <Spellcasting spellcasting={character.spellcasting} />
      </article>
    );
  };
  
  return (
    <div className="app-container">
      <h1 className="app-title">D&D 5e Character Sheet</h1>
      
      <section>
        <h2>Import/Export Character</h2>
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
            <pre>{jsonError}</pre>
          </div>
        )}
      </section>
      
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

export default CharacterSheetApp;