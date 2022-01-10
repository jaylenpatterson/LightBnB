const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

const query = {
  text:`SELECT *
    FROM users
    WHERE email = $1`,
  values: [email]
}
  return pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      if (email === result.rows[0].email) {
        return result.rows[0];
      }
     
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = {
  text:`SELECT *
    FROM users
    WHERE id = $1`,
  values: [id]
}
  return pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      if (id === result.rows[0].id) {
        return result.rows[0];
      }
     
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
 const query = {
  text:`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `,
  values: [user.name, user.email, user.password]
}
  return pool
    .query(query)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = {
  text:`SELECT reservations.*, properties.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE property_reviews.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`,
  values: [guest_id, limit]
}
  return pool
    .query(query)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT *
    FROM properties 
    LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;


// const query = {
  //   text:`SELECT * 
  //   FROM properties 
  //   WHERE guest_id = $1
  //   limit $2;`,
  //   values: [guest_id, limit]
  // };

  // return pool
  //   .query(query)
  //   .then((result) => {
  //    return result.rows
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });