insert into commercial (company_name,
            company_address,
            company_sqft_carpet,
            company_sqft_grout,
            company_upholstery,
            company_extras,
            start_time,
            frequency)
values ($1, $2, $3, $4, $5, $6, $7, $8);

select * 
from commercial;