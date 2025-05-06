import Ajv from 'ajv';
//import { fullCharacterSchema } from './fullCharacterSchema';
import * as data from './pc_schema.json'
// Compile schema

// Initialize Ajv
const ajv = new Ajv({ allErrors: true });

// Compile the schema
const validate = ajv.compile(data);

/**
 * Validates a character object against the full JSON schema
 * @param {Object} character - The character object to validate
 * @returns {Object} - Result object with isValid flag and any errors
 */
export const validateCharacterWithAjv = (character) => {
  const isValid = validate(character);
  
  if (!isValid) {
    // Format error messages
    const errors = validate.errors.map(error => {
      const path = error.instancePath || '';
      const property = error.params.missingProperty || '';
      const message = error.message || '';
      
      return `${path}${property ? '/' + property : ''} ${message}`;
    });
    
    return {
      isValid: false,
      errors
    };
  }
  
  return {
    isValid: true,
    errors: []
  };
};

/**
 * A simpler validation function that doesn't require Ajv
 * @param {Object} character - The character object to validate
 * @throws {Error} - Throws an error if validation fails
 */
export const validateCharacter = (character) => {
  // Validate required top-level properties
  for (const prop of fullCharacterSchema.required) {
    if (!character[prop]) {
      throw new Error(`Missing required property: ${prop}`);
    }
  }
  
  // Validate characterBasics
  for (const prop of fullCharacterSchema.properties.characterBasics.required) {
    if (!character.characterBasics[prop]) {
      throw new Error(`Missing required property in characterBasics: ${prop}`);
    }
  }
  
  // Validate abilities
  for (const ability of fullCharacterSchema.properties.abilities.required) {
    if (!character.abilities[ability]) {
      throw new Error(`Missing required ability: ${ability}`);
    }
  }
  
  return true;
};