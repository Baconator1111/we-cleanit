update client_appointments
set residential_contacted = $1
where appointment_id = $2