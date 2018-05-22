insert into client_appointments (client_name,
                client_address,
                client_phone,
                client_email,
                residential_sqft_carpet,
                residential_sqft_grout,
                residential_upholstery,
                residential_extras,
                start_time,
                end_time,
                clean_time)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);

select *
from client_appointments;