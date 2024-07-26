CREATE TABLE farmer (
    id UUID PRIMARY KEY,
    cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE farm (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    total_area DECIMAL(10,2) NOT NULL,
    cultivable_area DECIMAL(10,2) NOT NULL,
    vegetation_area DECIMAL(10,2) NOT NULL,
    farmer_id UUID REFERENCES farmer(id)
);


CREATE TABLE crop (
    id UUID PRIMARY KEY ,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE farm_crop (
    farm_id UUID REFERENCES farm(id),
    crop_id UUID REFERENCES crop(id),
    PRIMARY KEY (farm_id, crop_id)
);

CREATE INDEX idx_farmer_cpf_cnpj ON farmer (cpf_cnpj);

CREATE INDEX idx_farm_city ON farm (city);
CREATE INDEX idx_farm_state ON farm (state);
CREATE INDEX idx_farm_farmer_id ON farm (farmer_id);

CREATE INDEX idx_farm_crop_farm_id ON farm_crop (farm_id);
CREATE INDEX idx_farm_crop_crop_id ON farm_crop (crop_id);


CREATE INDEX idx_farm_id ON farm (id);
CREATE INDEX idx_farm_total_area ON farm (total_area);

CREATE INDEX idx_crop_id ON crop (id);

CREATE INDEX idx_farm_cultivable_area ON farm (cultivable_area);
CREATE INDEX idx_farm_vegetation_area ON farm (vegetation_area);


INSERT INTO crop (id, name) VALUES
    ('80c86689-72b4-4162-8f9e-8d2c23e4d685', 'soybean'),
    ('fe965a29-032a-4272-ad96-6d4bd6acd4c6', 'corn'),
    ('f9bad013-086d-4026-b2e6-5f366a879f11', 'cotton'),
    ('ec11bbf0-83ca-40cb-b64e-76888f04b4dc', 'coffee'),
    ('4362f0c7-fc53-496c-95c9-130f4b8eac25', 'sugarcane');
