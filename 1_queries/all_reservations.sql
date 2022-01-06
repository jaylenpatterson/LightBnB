SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN users ON guest_id = users.id
JOIN property_reviews ON reservations.id = reservation_id
WHERE users.id = 1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY start_date 
LIMIT 10;