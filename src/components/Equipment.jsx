import React from 'react';

const Equipment = ({ equipment }) => {
  if (!equipment) return null;
  
  return (
    <section>
      <h2>Equipment</h2>

      {equipment.currency && (
        <section>
          <h3>Currency</h3>
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
        </section>
      )}
      
      {equipment.armor && equipment.armor.length > 0 && (
        <section>
          <h3 >Armor</h3>
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
        </section>
      )}
      
      {equipment.weapons && equipment.weapons.length > 0 && (
        <section>
          <h3>Weapons</h3>
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
        </section>
      )}
      
      {equipment.items && equipment.items.length > 0 && (
        <section>
          <h3>Items</h3>
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
        </section>
      )}
      
      {equipment.magicItems && equipment.magicItems.length > 0 && (
        <section>
          <h3>Magic Items</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Rarity</th>
                  <th>Attuned</th>
                </tr>
              </thead>
              <tbody>
                {equipment.magicItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.rarity}</td>
                    <td>{item.attuned ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
};

export default Equipment;