update client_appointments
set residential_confirmed = $1
where appointment_id = $2