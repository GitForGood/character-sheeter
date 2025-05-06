import React from 'react';

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
    <section>
      <h2>Spellcasting</h2>
      
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
        <section>
          <h3>Spell Slots</h3>
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
        </section>
      )}
      
      <section className="spells-by-level">
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
      </section>
    </section>
  );
};

export default Spellcasting;