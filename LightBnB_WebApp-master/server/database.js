const db = require('./db/index.js')

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email])
  .then(res => res.rows[0])
  .catch(err => err.stack)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [id])
  .then(res => res.rows[0])
  .catch(err => err.stack)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name, user.email, user.password];
  return db.query(`
    INSERT INTO users
    (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, values)
  .then (res => res.rows[0])
  .catch (err => err.stack);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];
  return db.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE end_date < now()::date
  AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date   
  LIMIT $2;
  `, values)
  .then(res => res.rows)
  .catch(err => err.stack)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const values = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    values.push(`%${options.city.toLowerCase()}%`);
    queryString += `WHERE lower(city) LIKE $${values.length} `;
  }

  if (options.owner_id && values.length === 0) {
    values.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${values.length}`;
  } else if (options.owner_id) {
    values.push(`${options.owner_id}`)
    queryString += `AND owner_id = $${values.length}`;
  }

  if (options.minimum_price_per_night && values.length === 0) {
    values.push(`${options.minimum_price_per_night}`);
    queryString += `WHERE cost_per_night >= $${values.length}`;
  } else if (options.minimum_price_per_night) {
    values.push(`${options.minimum_price_per_night}`)
    queryString += `AND cost_per_night >= $${values.length}`;
  }

  if (options.maximum_price_per_night && values.length === 0) {
    values.push(`${options.maximum_price_per_night}`);
    queryString += `WHERE cost_per_night <= $${values.length}`;
  } else if (options.maximum_price_per_night) {
    values.push(`${options.maximum_price_per_night}`)
    queryString += `AND cost_per_night <= $${values.length}`;
  }
  
  if (options.minimum_rating && values.length === 0) {
    values.push(`${options.minimum_rating}`);
    queryString += `WHERE (SELECT avg(property_reviews.rating) as average_rating FROM property_reviews) >= $${values.length}`;
  } else if (options.minimum_rating) {
    values.push(`${options.minimum_rating}`)
    queryString += `AND (SELECT avg(property_reviews.rating) as average_rating FROM property_reviews) >= $${values.length}`;
  }

  values.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;

  return db.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
   return error('query error', err.stack)
  })
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];
  return db.query(`
    INSERT INTO properties
    ( owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, values)
  .then (res => res.rows[0])
  .catch (err => err.stack);
}

exports.addProperty = addProperty;
