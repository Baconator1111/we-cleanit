create table users (
    user_id serial primary key,
    auth_id text
);

create table open_times (
    time_id serial primary key,
    open_start_time text,
    open_end_time text
);

create table client_appointments (
    appointment_id serial primary key,
    client_name varchar(50),
    client_address varchar(100),
    residential_sqft_carpet int,
    residential_sqft_grout int,
    residential_upholstery text,
    residential_extras text,
    start_time text,
    end_time text,
    clean_time int,
    residential_confirmed text,
    residential_contacted text
);

create table commercial (
    commercial_id serial primary key,
    company_name varchar(100),
    company_address varchar(100),
    company_sqft_carpet int,
    company_sqft_grout int,
    company_upholstery text,
    company_extras text,
    frequency text,
    company_confirmed text,
    company_contacted text
);

create table services (
    service_id serial primary key,
    carpet_price int,
    grout_price int
);

create table upholstery (
    upholstery_id serial primary key,
    upholstery_name text,
    upholstery_price int
);

create table extra_services (
    extra_id serial primary key,
    extra_name text,
    extra_description text
);

create table promotions (
    promotion_id serial primary key,
    promotion_name text,
    discount int,
    end_date text,
    affecting text
);