import React, { useEffect, useState } from 'react';

const CharacterSkills = ({ skills, abilities, characterClass, background, proficiencyBonus = 2 }) => {
  const [calculatedSkills, setCalculatedSkills] = useState([]);
  
  // Map of skill display names and their associated ability
  const skillDetails = {
    acrobatics: { name: 'Acrobatics', ability: 'dexterity' },
    animalHandling: { name: 'Animal Handling', ability: 'wisdom' },
    arcana: { name: 'Arcana', ability: 'intelligence' },
    athletics: { name: 'Athletics', ability: 'strength' },
    deception: { name: 'Deception', ability: 'charisma' },
    history: { name: 'History', ability: 'intelligence' },
    insight: { name: 'Insight', ability: 'wisdom' },
    intimidation: { name: 'Intimidation', ability: 'charisma' },
    investigation: { name: 'Investigation', ability: 'intelligence' },
    medicine: { name: 'Medicine', ability: 'wisdom' },
    nature: { name: 'Nature', ability: 'intelligence' },
    perception: { name: 'Perception', ability: 'wisdom' },
    performance: { name: 'Performance', ability: 'charisma' },
    persuasion: { name: 'Persuasion', ability: 'charisma' },
    religion: { name: 'Religion', ability: 'intelligence' },
    sleightOfHand: { name: 'Sleight of Hand', ability: 'dexterity' },
    stealth: { name: 'Stealth', ability: 'dexterity' },
    survival: { name: 'Survival', ability: 'wisdom' }
  };

  // Get the abbreviation for an ability
  const getAbilityAbbr = (ability) => {
    const abbrs = {
      strength: 'STR',
      dexterity: 'DEX',
      constitution: 'CON',
      intelligence: 'INT',
      wisdom: 'WIS',
      charisma: 'CHA'
    };
    return abbrs[ability] || ability.substring(0, 3).toUpperCase();
  };

  // Format a modifier value
  const formatModifier = (mod) => {
    if (mod === undefined || mod === null) return '+0';
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Convert skill name from background/class (e.g. "Insight") to key (e.g. "insight")
  const getSkillKey = (skillName) => {
    if (!skillName) return null;
    // Convert first character to lowercase
    const normalized = skillName.trim().charAt(0).toLowerCase() + skillName.trim().slice(1);
    
    // Handle multi-word skills like "Sleight of Hand"
    return Object.keys(skillDetails).find(key => {
      return skillDetails[key].name.toLowerCase() === normalized.toLowerCase() || 
             key.toLowerCase() === normalized.toLowerCase();
    });
  };

  // Get proficient skills from background and class
  const getProficientSkills = () => {
    const proficientSkills = new Set();
    
    // Add skills from background
    if (background && background.proficiencies && background.proficiencies.skills) {
      background.proficiencies.skills.forEach(skill => {
        const skillKey = getSkillKey(skill);
        if (skillKey) proficientSkills.add(skillKey);
      });
    }
    
    // Add skills from class
    if (characterClass && characterClass.proficiencies && characterClass.proficiencies.skills) {
      characterClass.proficiencies.skills.forEach(skill => {
        const skillKey = getSkillKey(skill);
        if (skillKey) proficientSkills.add(skillKey);
      });
    }
    
    return proficientSkills;
  };

  // Calculate skill modifiers and proficiencies
  useEffect(() => {
    if (!abilities) return;
    
    // Get set of proficient skills
    const proficientSkills = getProficientSkills();
    
    // Create list of skills with calculated values
    const skillsList = Object.keys(skillDetails).map(skillKey => {
      // Get skill data from provided skills object, or create empty object
      const skill = (skills && skills[skillKey]) || {};
      const detail = skillDetails[skillKey];
      
      // Get ability modifier
      const abilityMod = abilities[detail.ability]?.modifier || 0;
      
      // Determine if skill is proficient
      // Priority: 1. Explicitly set in skills object, 2. From background/class proficiencies
      const isProficient = skill.proficient !== undefined 
        ? skill.proficient 
        : proficientSkills.has(skillKey);
      
      // Calculate total modifier
      let totalModifier = abilityMod;
      if (isProficient) totalModifier += proficiencyBonus;
      if (skill.expertise) totalModifier += proficiencyBonus;
      
      // Use explicit value if provided
      const finalValue = skill.value !== undefined ? skill.value : totalModifier;
      
      return {
        key: skillKey,
        name: detail.name,
        ability: detail.ability,
        abilityAbbr: getAbilityAbbr(detail.ability),
        abilityMod: abilityMod,
        proficient: isProficient,
        expertise: skill.expertise || false,
        value: finalValue,
        source: isProficient && !skill.proficient 
          ? (proficientSkills.has(skillKey) && background?.proficiencies?.skills?.includes(detail.name) 
            ? 'Background' 
            : 'Class')
          : null
      };
    });
    
    setCalculatedSkills(skillsList);
  }, [skills, abilities, background, characterClass, proficiencyBonus]);

  if (!abilities) return null;
  
  return (
    <section>
      <h2>Skills</h2>
      
      <div className="table-container">
        <table className="data-table skills-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Ability</th>
              <th>Proficient</th>
              <th>Expertise</th>
              <th>Modifier</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {calculatedSkills.map((skill) => (
              <tr key={skill.key} className={skill.proficient ? 'skill-proficient-row' : ''}>
                <td className="skill-name">{skill.name}</td>
                <td className="skill-ability">{skill.abilityAbbr}</td>
                <td className="skill-proficient">
                  {skill.proficient ? '✓' : ''}
                </td>
                <td className="skill-expertise">
                  {skill.expertise ? '✓' : ''}
                </td>
                <td className="skill-modifier">
                  {formatModifier(skill.value)}
                </td>
                <td className="skill-source">
                  {skill.source || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="skill-legend">
        <p><strong>Proficiency Bonus:</strong> {formatModifier(proficiencyBonus)}</p>
      </div>
    </section>
  );
};

export default CharacterSkills;