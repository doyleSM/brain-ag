CREATE TABLE farmers (
    id UUID PRIMARY KEY,
    cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE farms (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    total_area DECIMAL(10,2) NOT NULL,
    cultivable_area DECIMAL(10,2) NOT NULL,
    vegetation_area DECIMAL(10,2) NOT NULL,
    farmer_id UUID REFERENCES farmers(id)
);


CREATE TABLE crops (
    id UUID PRIMARY KEY ,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE farms_crops (
    farm_id UUID REFERENCES farms(id),
    crop_id UUID REFERENCES crops(id),
    PRIMARY KEY (farm_id, crop_id)
);

CREATE INDEX idx_farmer_cpf_cnpj ON farmers (cpf_cnpj);

CREATE INDEX idx_farm_city ON farms (city);
CREATE INDEX idx_farm_state ON farms (state);
CREATE INDEX idx_farm_farmer_id ON farms (farmer_id);

CREATE INDEX idx_farm_crop_farm_id ON farms_crops (farm_id);
CREATE INDEX idx_farm_crop_crop_id ON farms_crops (crop_id);


CREATE INDEX idx_farm_id ON farms (id);
CREATE INDEX idx_farm_total_area ON farms (total_area);

CREATE INDEX idx_crop_id ON crops (id);

CREATE INDEX idx_farm_cultivable_area ON farms (cultivable_area);
CREATE INDEX idx_farm_vegetation_area ON farms (vegetation_area);


INSERT INTO crops (id, name) VALUES ('80c86689-72b4-4162-8f9e-8d2c23e4d685', 'soybean');
INSERT INTO crops (id, name) VALUES ('fe965a29-032a-4272-ad96-6d4bd6acd4c6', 'corn');
INSERT INTO crops (id, name) VALUES ('f9bad013-086d-4026-b2e6-5f366a879f11', 'cotton');
INSERT INTO crops (id, name) VALUES ('ec11bbf0-83ca-40cb-b64e-76888f04b4dc', 'coffee');
INSERT INTO crops (id, name) VALUES ('4362f0c7-fc53-496c-95c9-130f4b8eac25', 'sugarcane');




INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('c3b30e58-d9ca-491c-bc31-747a00ddface', '12345678909', 'João Silva');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('b463c293-dbe2-4385-b72c-9a4c1b58de45', '23456789012', 'Maria Souza');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('2eb7b14a-4e12-490b-bccf-46cd0284335f', '29230232696', 'José Santos');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('002be512-49f7-4295-9d9d-82aa6501af16', '84687577059', 'Ana Pereira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('eca10498-ec23-4561-b2dd-18983ab7bb16', '57208866058', 'Carlos Oliveira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('8d28bdaf-d95e-49a2-ad27-d534bccf8ff3', '10494813725', 'Fernanda Lima');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('d5bb55d9-0441-49b0-9cb9-33b9f078864b', '38157592831393', 'Ricardo Gomes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('629466f2-7bcd-4e95-bb01-29da7cc1ee6a', '07751886043040', 'Patrícia Mendes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('0b2f348b-83fb-4a30-9854-ff184516ba05', '19148090505390', 'Lucas Costa');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('493c43e2-652b-4b6f-9fa8-56884fbf2731', '24335259715088', 'Mariana Ribeiro');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('84983a9a-4c75-48d8-9024-84aaa6b4d25e', '02561912124', 'Gabriel Fernandes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('da2b2556-cc23-4c65-ad2e-6f5dbcbb3ba7', '29641312286', 'Camila Rocha');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('c4cb93d2-0628-4ebb-b64c-26ed12057d32', '08263463286965', 'Leonardo Alves');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('942c736d-89d7-4b44-8504-73dbb94a63ca', '20827307942', 'Juliana Carvalho');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('0a672c41-482a-4f7d-a6bc-c273eee9d539', '31374628298066', 'Pedro Martins');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('d6abee00-7ef6-4282-98e5-0a089f75d82f', '89254345806', 'Bruna Barros');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('4b2458d1-deee-45b8-bf22-40a64e5f6049', '81077885909844', 'Renato Batista');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('9e803c4c-fbdb-4152-a592-b5d4de7a7b14', '22714533566', 'Beatriz Teixeira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('a6a8c8de-aa00-4f5e-872b-9e7865acf84f', '36284040296', 'Felipe Lima');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('a68e4ce1-50ab-4b92-9ae0-8ae4052affa0', '17595588306500', 'Larissa Almeida');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('083d6cc8-8ad4-41ec-8536-e3610facf4f7', '78768099010', 'Thiago Correia');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('da51f323-bf83-4dea-8f8b-6a5ae5c8454b', '31660813293210', 'Aline Moreira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('18690dbe-9fea-47a7-86f0-be98b3e1c66c', '50199255270', 'Diego Araújo');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('f4481bd6-4d4e-4049-9f3c-9882eb581054', '09178389127', 'Paula Silva');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('432dc474-3139-4401-b02a-e5c54565940e', '62501568142444', 'Igor Santos');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('76c7ad63-9654-458e-9a8a-25dc3aa84801', '21065999607', 'Tatiane Ferreira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('e22fe4fe-11d0-48fa-9fa3-5e20a2d12c01', '78901234567', 'Sérgio Nogueira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('083558a0-0713-48a4-8bfa-cf735644317f', '27321511227', 'Elaine Souza');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('1d35fb0b-edb3-450d-881e-4bc45f46605b', '12999065326107', 'Marcos Lima');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('6690b612-f55a-4fd7-9704-130318ab346a', '05011402126', 'Simone Costa');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('8c72bf50-91d5-4ddf-833b-63236e0413c4', '98811745624', 'Julio Souza');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('b43251fc-03f6-4d74-aa1b-ee97e81a404d', '89030825377851', 'Alice Nunes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('5406296b-d9b7-43b6-a460-79657d2947c5', '15393354452', 'Rafael Barbosa');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('99395ba3-a10d-495c-9a0f-3e0aff711489', '10755090926', 'Luciana Rodrigues');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('6e881fe6-6ab4-4409-8543-796e2d91bc82', '73016488850414', 'Danilo Melo');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('93b79e47-8f7e-43a3-b3e4-ca1b209eca93', '58982710400', 'Vanessa Borges');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('ec4c6ecd-fb2d-4b94-a45d-ab38b9e12841', '99509116300', 'Eduardo Cardoso');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('b3a2ca02-6ba7-42b8-8b7c-e83979b7552f', '96403914090', 'Alessandra Vieira');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('f92fd0ee-9c04-403d-8c9c-72a88c0918ef', '03958680070430', 'Matheus Campos');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('c7860a90-a550-47b9-9881-6dc2e5c8ce3f', '03956851331', 'Sabrina Lopes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('8478978f-243a-4fe4-9f48-a34e4de94507', '62294079221', 'Rodrigo Farias');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('896d56c2-9b90-462e-956d-4f94f323fd76', '49213161610570', 'Bianca Duarte');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('c195cd92-0102-45b7-937a-652fa2fc140f', '29035736621', 'Fernando Moraes');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('f3332f3b-a926-4d84-bb5a-695d9f582d79', '37491124950', 'Nathalia Silva');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('203af678-da32-43c5-b44e-1596579283d8', '94070437117417', 'Fábio Rezende');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('adde165e-c542-412d-a019-03b31639056b', '72272474144', 'Isabel Gonçalves');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('5d606727-d789-4649-848f-241d98a1e395', '38914827283', 'Leandro Moura');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('d752015b-3ad5-4b7e-9afa-beff02a8574e', '88113261923', 'Gabriela Pinto');
INSERT INTO farmers (id, cpf_cnpj, name) VALUES ('c46ca087-2abb-4310-85a7-e7f778564958', '96404322557765', 'Bruno Rocha');



INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('ac5ea406-afe7-4f85-90ed-2c2b2ad463f6', 'Fazenda Bela Vista', 'Araraquara', 'SP', 500.00, 400.00, 100.00, 'c3b30e58-d9ca-491c-bc31-747a00ddface');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('eeffe1e8-d3cb-455c-89eb-e6f3be0771f3', 'Fazenda Santa Maria', 'Caldas Novas', 'GO', 750.00, 600.00, 150.00, 'b463c293-dbe2-4385-b72c-9a4c1b58de45');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('c99478aa-20ee-4fa5-b8ae-276808fc5128', 'Fazenda Boa Esperança', 'Arapiraca', 'AL', 600.00, 500.00, 100.00, '2eb7b14a-4e12-490b-bccf-46cd0284335f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('90bade5a-10d7-4003-b83e-33fb5e330c66', 'Fazenda Primavera', 'Juazeiro', 'BA', 550.00, 450.00, 100.00, '002be512-49f7-4295-9d9d-82aa6501af16');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('1a6265e0-16d7-46b0-ac54-c499f390e877', 'Fazenda Recanto Verde', 'Vitória da Conquista', 'BA', 800.00, 600.00, 200.00, 'eca10498-ec23-4561-b2dd-18983ab7bb16');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('5f8697dd-3f6b-4506-a666-fc8bc35605a4', 'Fazenda Santo Antônio', 'Caxias do Sul', 'RS', 920.00, 700.00, 220.00, '8d28bdaf-d95e-49a2-ad27-d534bccf8ff3');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('a2d025ae-12d0-4f2a-8c9c-bf3c1c35572f', 'Fazenda Nova Vida', 'Rondonópolis', 'MT', 700.00, 550.00, 150.00, 'd5bb55d9-0441-49b0-9cb9-33b9f078864b');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('28d8bf98-5c5b-4a1a-bbb0-9ae5f66958cd', 'Fazenda São José', 'Piracicaba', 'SP', 650.00, 500.00, 150.00, '629466f2-7bcd-4e95-bb01-29da7cc1ee6a');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('0b7acb70-b071-4ec4-9912-30d21499b398', 'Fazenda Estrela do Sul', 'Rio Verde', 'GO', 480.00, 400.00, 80.00, '0b2f348b-83fb-4a30-9854-ff184516ba05');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('e8d768eb-d586-4560-90f7-993df8480786', 'Fazenda Boa Vista', 'Campina Grande', 'PB', 550.00, 450.00, 100.00, '493c43e2-652b-4b6f-9fa8-56884fbf2731');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('d6d7fe53-eefe-47d0-b319-fa4e774ce82c', 'Fazenda Santa Rita', 'Uberaba', 'MG', 780.00, 600.00, 180.00, '84983a9a-4c75-48d8-9024-84aaa6b4d25e');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('c57f1cab-02e6-463f-b1be-2cf1edecbae5', 'Fazenda Paraíso', 'Itapeva', 'SP', 820.00, 650.00, 170.00, 'da2b2556-cc23-4c65-ad2e-6f5dbcbb3ba7');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', 'Fazenda Morro Azul', 'Pouso Alegre', 'MG', 600.00, 500.00, 100.00, 'c4cb93d2-0628-4ebb-b64c-26ed12057d32');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('db3c72f5-258c-4588-ae66-4163075b2a26', 'Fazenda Vista Alegre', 'Marília', 'SP', 620.00, 480.00, 140.00, '942c736d-89d7-4b44-8504-73dbb94a63ca');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', 'Fazenda Santa Cruz', 'São Carlos', 'SP', 640.00, 520.00, 120.00, '0a672c41-482a-4f7d-a6bc-c273eee9d539');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('8bbb3776-08fd-4e25-ae96-db95239690f3', 'Fazenda Boa Sorte', 'Feira de Santana', 'BA', 590.00, 470.00, 120.00, 'd6abee00-7ef6-4282-98e5-0a089f75d82f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('fa54b7fc-388c-4bd6-a161-1779d7c608d6', 'Fazenda São Luiz', 'Passo Fundo', 'RS', 870.00, 700.00, 170.00, '4b2458d1-deee-45b8-bf22-40a64e5f6049');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('8f8227dd-bdf0-4c93-b954-52eb6638bab4', 'Fazenda Santa Luzia', 'Campo Grande', 'MS', 750.00, 600.00, 150.00, '9e803c4c-fbdb-4152-a592-b5d4de7a7b14');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('230ab5e7-d704-42e1-aca0-00e53cfd271f', 'Fazenda Monte Alegre', 'Araxá', 'MG', 580.00, 470.00, 110.00, 'a6a8c8de-aa00-4f5e-872b-9e7865acf84f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('c382cab3-6f10-4ccd-8d75-e28cea9680b4', 'Fazenda Vale do Sol', 'Montes Claros', 'MG', 630.00, 520.00, 110.00, 'a68e4ce1-50ab-4b92-9ae0-8ae4052affa0');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('1df9b562-c660-40f8-89b6-8644dd9e0104', 'Fazenda Pôr do Sol', 'Dourados', 'MS', 820.00, 680.00, 140.00, '083d6cc8-8ad4-41ec-8536-e3610facf4f7');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', 'Fazenda Santa Clara', 'Londrina', 'PR', 700.00, 560.00, 140.00, 'da51f323-bf83-4dea-8f8b-6a5ae5c8454b');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('a00d142c-9301-4047-b14d-24b88362e37c', 'Fazenda Três Marias', 'Uberlândia', 'MG', 650.00, 520.00, 130.00, '18690dbe-9fea-47a7-86f0-be98b3e1c66c');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('e07f5f0a-9344-4ddf-89c2-7ea438d944c6', 'Fazenda Boa Fé', 'Santa Maria', 'RS', 870.00, 700.00, 170.00, 'f4481bd6-4d4e-4049-9f3c-9882eb581054');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('7e881637-2a51-4886-8ad7-f4d735408ef1', 'Fazenda Esperança', 'Guaratinguetá', 'SP', 680.00, 550.00, 130.00, '432dc474-3139-4401-b02a-e5c54565940e');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('8e61b235-fc1f-44e2-a72f-da702b40e927', 'Fazenda Novo Horizonte', 'Sinop', 'MT', 720.00, 590.00, 130.00, '76c7ad63-9654-458e-9a8a-25dc3aa84801');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('7d53fbe9-ddea-40d1-8dec-e329b0b40dfa', 'Fazenda Recanto da Paz', 'Itabuna', 'BA', 600.00, 480.00, 120.00, 'e22fe4fe-11d0-48fa-9fa3-5e20a2d12c01');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('245db709-88d6-4b5b-ad02-0c7f659c17e3', 'Fazenda Santo Amaro', 'Itumbiara', 'GO', 650.00, 520.00, 130.00, '083558a0-0713-48a4-8bfa-cf735644317f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('b1b6f9c2-1949-4f14-b51f-eb77186deb3a', 'Fazenda São Francisco', 'Anápolis', 'GO', 590.00, 480.00, 110.00, '1d35fb0b-edb3-450d-881e-4bc45f46605b');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('65c5004d-b278-4ab0-a761-343f27033c79', 'Fazenda Boa União', 'Ribeirão Preto', 'SP', 820.00, 680.00, 140.00, '6690b612-f55a-4fd7-9704-130318ab346a');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('2aeff279-784b-4a64-95ff-376f2fe44d11', 'Fazenda São Gabriel', 'Bauru', 'SP', 680.00, 550.00, 130.00, '8c72bf50-91d5-4ddf-833b-63236e0413c4');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('dd201653-358d-452e-b512-54beba0b23e0', 'Fazenda Santa Bárbara', 'Foz do Iguaçu', 'PR', 740.00, 600.00, 140.00, 'b43251fc-03f6-4d74-aa1b-ee97e81a404d');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('63711243-95c7-4157-8e99-4fcc435dd2aa', 'Fazenda Bela Aliança', 'Jataí', 'GO', 600.00, 480.00, 120.00, '5406296b-d9b7-43b6-a460-79657d2947c5');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('88f34026-f082-4d3f-9aa3-bcc830b01d85', 'Fazenda Água Limpa', 'Franca', 'SP', 640.00, 520.00, 120.00, '99395ba3-a10d-495c-9a0f-3e0aff711489');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('fd91bfac-243d-4228-9150-4301d653b4ba', 'Fazenda Sol Nascente', 'Catalão', 'GO', 700.00, 560.00, 140.00, '6e881fe6-6ab4-4409-8543-796e2d91bc82');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('30190616-2eb7-4ac4-87ab-4f790de60c9f', 'Fazenda Santo André', 'Ituiutaba', 'MG', 750.00, 600.00, 150.00, '93b79e47-8f7e-43a3-b3e4-ca1b209eca93');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('91b38ff4-1d11-4ad1-b06e-22104758814b', 'Fazenda Santo Antônio', 'Presidente Prudente', 'SP', 680.00, 550.00, 130.00, 'ec4c6ecd-fb2d-4b94-a45d-ab38b9e12841');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('a10ef4f8-8058-45aa-9453-70bca4b74f70', 'Fazenda Água Branca', 'Ponta Grossa', 'PR', 800.00, 650.00, 150.00, 'b3a2ca02-6ba7-42b8-8b7c-e83979b7552f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', 'Fazenda Estrela Guia', 'Três Lagoas', 'MS', 700.00, 560.00, 140.00, 'f92fd0ee-9c04-403d-8c9c-72a88c0918ef');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('75dbd9ac-06f5-46dd-bb89-e84d49b3b0c3', 'Fazenda Vale Verde', 'Avaré', 'SP', 820.00, 670.00, 150.00, 'c7860a90-a550-47b9-9881-6dc2e5c8ce3f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('edcedf66-f9b9-4ffa-a843-1ca3a10a9f5b', 'Fazenda Novo Mundo', 'Araguari', 'MG', 690.00, 560.00, 130.00, '8478978f-243a-4fe4-9f48-a34e4de94507');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('e9c6b87f-30ab-4f64-8b12-e8b815636540', 'Fazenda Santa Teresa', 'Varginha', 'MG', 600.00, 480.00, 120.00, '896d56c2-9b90-462e-956d-4f94f323fd76');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('d2097304-1e74-4cc7-bea7-f92e670f1751', 'Fazenda São Vicente', 'Campo Mourão', 'PR', 720.00, 590.00, 130.00, 'c195cd92-0102-45b7-937a-652fa2fc140f');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('2be7c040-1dfd-417b-a628-6dbe7f43e203', 'Fazenda Bela União', 'Curvelo', 'MG', 650.00, 520.00, 130.00, 'f3332f3b-a926-4d84-bb5a-695d9f582d79');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('29c5172d-9a15-435f-9130-bf603611470b', 'Fazenda Santa Helena', 'Guarapuava', 'PR', 680.00, 550.00, 130.00, '203af678-da32-43c5-b44e-1596579283d8');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('7ede476b-9d5f-44d4-aae9-ac22ed2026f9', 'Fazenda São Joaquim', 'Arapongas', 'PR', 600.00, 480.00, 120.00, 'adde165e-c542-412d-a019-03b31639056b');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('00334f8a-6a43-4817-8eee-7d12be3d8f02', 'Fazenda Santa Catarina', 'Barreiras', 'BA', 720.00, 590.00, 130.00, '5d606727-d789-4649-848f-241d98a1e395');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('e77a261c-f3ea-4a15-be3e-c0ceb54cbbc9', 'Fazenda Bela Vista', 'Ji-Paraná', 'RO', 800.00, 650.00, 150.00, 'd752015b-3ad5-4b7e-9afa-beff02a8574e');
INSERT INTO farms (id, name, city, state, total_area, cultivable_area, vegetation_area, farmer_id) VALUES ('26159fb7-3e51-4e28-8b33-81710b36cc88', 'Fazenda São Sebastião', 'Cacoal', 'RO', 680.00, 550.00, 130.00, 'c46ca087-2abb-4310-85a7-e7f778564958');



INSERT INTO farms_crops (farm_id, crop_id) VALUES ('ac5ea406-afe7-4f85-90ed-2c2b2ad463f6', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('ac5ea406-afe7-4f85-90ed-2c2b2ad463f6', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('eeffe1e8-d3cb-455c-89eb-e6f3be0771f3', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('eeffe1e8-d3cb-455c-89eb-e6f3be0771f3', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c99478aa-20ee-4fa5-b8ae-276808fc5128', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c99478aa-20ee-4fa5-b8ae-276808fc5128', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c99478aa-20ee-4fa5-b8ae-276808fc5128', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c99478aa-20ee-4fa5-b8ae-276808fc5128', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('90bade5a-10d7-4003-b83e-33fb5e330c66', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('90bade5a-10d7-4003-b83e-33fb5e330c66', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('90bade5a-10d7-4003-b83e-33fb5e330c66', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1a6265e0-16d7-46b0-ac54-c499f390e877', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1a6265e0-16d7-46b0-ac54-c499f390e877', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('5f8697dd-3f6b-4506-a666-fc8bc35605a4', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a2d025ae-12d0-4f2a-8c9c-bf3c1c35572f', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a2d025ae-12d0-4f2a-8c9c-bf3c1c35572f', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a2d025ae-12d0-4f2a-8c9c-bf3c1c35572f', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('28d8bf98-5c5b-4a1a-bbb0-9ae5f66958cd', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('28d8bf98-5c5b-4a1a-bbb0-9ae5f66958cd', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('28d8bf98-5c5b-4a1a-bbb0-9ae5f66958cd', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('28d8bf98-5c5b-4a1a-bbb0-9ae5f66958cd', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('0b7acb70-b071-4ec4-9912-30d21499b398', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('0b7acb70-b071-4ec4-9912-30d21499b398', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('0b7acb70-b071-4ec4-9912-30d21499b398', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('0b7acb70-b071-4ec4-9912-30d21499b398', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e8d768eb-d586-4560-90f7-993df8480786', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d6d7fe53-eefe-47d0-b319-fa4e774ce82c', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d6d7fe53-eefe-47d0-b319-fa4e774ce82c', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d6d7fe53-eefe-47d0-b319-fa4e774ce82c', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d6d7fe53-eefe-47d0-b319-fa4e774ce82c', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c57f1cab-02e6-463f-b1be-2cf1edecbae5', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c57f1cab-02e6-463f-b1be-2cf1edecbae5', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c57f1cab-02e6-463f-b1be-2cf1edecbae5', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('068d76b3-2972-4a75-9537-655d3e7bbfa5', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('db3c72f5-258c-4588-ae66-4163075b2a26', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('db3c72f5-258c-4588-ae66-4163075b2a26', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2cd300c0-636f-430d-828c-9b6e83ecb226', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8bbb3776-08fd-4e25-ae96-db95239690f3', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('fa54b7fc-388c-4bd6-a161-1779d7c608d6', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8f8227dd-bdf0-4c93-b954-52eb6638bab4', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8f8227dd-bdf0-4c93-b954-52eb6638bab4', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('230ab5e7-d704-42e1-aca0-00e53cfd271f', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c382cab3-6f10-4ccd-8d75-e28cea9680b4', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('c382cab3-6f10-4ccd-8d75-e28cea9680b4', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1df9b562-c660-40f8-89b6-8644dd9e0104', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1df9b562-c660-40f8-89b6-8644dd9e0104', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1df9b562-c660-40f8-89b6-8644dd9e0104', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('1df9b562-c660-40f8-89b6-8644dd9e0104', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('efbf6570-ec23-483c-a215-24a6f3c26ea7', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a00d142c-9301-4047-b14d-24b88362e37c', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a00d142c-9301-4047-b14d-24b88362e37c', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a00d142c-9301-4047-b14d-24b88362e37c', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e07f5f0a-9344-4ddf-89c2-7ea438d944c6', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e07f5f0a-9344-4ddf-89c2-7ea438d944c6', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e07f5f0a-9344-4ddf-89c2-7ea438d944c6', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e07f5f0a-9344-4ddf-89c2-7ea438d944c6', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7e881637-2a51-4886-8ad7-f4d735408ef1', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7e881637-2a51-4886-8ad7-f4d735408ef1', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8e61b235-fc1f-44e2-a72f-da702b40e927', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8e61b235-fc1f-44e2-a72f-da702b40e927', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8e61b235-fc1f-44e2-a72f-da702b40e927', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('8e61b235-fc1f-44e2-a72f-da702b40e927', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7d53fbe9-ddea-40d1-8dec-e329b0b40dfa', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7d53fbe9-ddea-40d1-8dec-e329b0b40dfa', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7d53fbe9-ddea-40d1-8dec-e329b0b40dfa', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7d53fbe9-ddea-40d1-8dec-e329b0b40dfa', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('245db709-88d6-4b5b-ad02-0c7f659c17e3', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('b1b6f9c2-1949-4f14-b51f-eb77186deb3a', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('b1b6f9c2-1949-4f14-b51f-eb77186deb3a', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('b1b6f9c2-1949-4f14-b51f-eb77186deb3a', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('b1b6f9c2-1949-4f14-b51f-eb77186deb3a', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('65c5004d-b278-4ab0-a761-343f27033c79', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('65c5004d-b278-4ab0-a761-343f27033c79', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2aeff279-784b-4a64-95ff-376f2fe44d11', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2aeff279-784b-4a64-95ff-376f2fe44d11', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('dd201653-358d-452e-b512-54beba0b23e0', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('dd201653-358d-452e-b512-54beba0b23e0', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('dd201653-358d-452e-b512-54beba0b23e0', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('dd201653-358d-452e-b512-54beba0b23e0', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('63711243-95c7-4157-8e99-4fcc435dd2aa', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('63711243-95c7-4157-8e99-4fcc435dd2aa', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('63711243-95c7-4157-8e99-4fcc435dd2aa', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('88f34026-f082-4d3f-9aa3-bcc830b01d85', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('88f34026-f082-4d3f-9aa3-bcc830b01d85', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('fd91bfac-243d-4228-9150-4301d653b4ba', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('fd91bfac-243d-4228-9150-4301d653b4ba', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('fd91bfac-243d-4228-9150-4301d653b4ba', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('fd91bfac-243d-4228-9150-4301d653b4ba', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('30190616-2eb7-4ac4-87ab-4f790de60c9f', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('30190616-2eb7-4ac4-87ab-4f790de60c9f', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('30190616-2eb7-4ac4-87ab-4f790de60c9f', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('30190616-2eb7-4ac4-87ab-4f790de60c9f', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('91b38ff4-1d11-4ad1-b06e-22104758814b', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a10ef4f8-8058-45aa-9453-70bca4b74f70', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a10ef4f8-8058-45aa-9453-70bca4b74f70', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a10ef4f8-8058-45aa-9453-70bca4b74f70', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('a10ef4f8-8058-45aa-9453-70bca4b74f70', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e13f5124-695b-4c1c-b51d-781c6ba48388', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('75dbd9ac-06f5-46dd-bb89-e84d49b3b0c3', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('75dbd9ac-06f5-46dd-bb89-e84d49b3b0c3', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('edcedf66-f9b9-4ffa-a843-1ca3a10a9f5b', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('edcedf66-f9b9-4ffa-a843-1ca3a10a9f5b', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('edcedf66-f9b9-4ffa-a843-1ca3a10a9f5b', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e9c6b87f-30ab-4f64-8b12-e8b815636540', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e9c6b87f-30ab-4f64-8b12-e8b815636540', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e9c6b87f-30ab-4f64-8b12-e8b815636540', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e9c6b87f-30ab-4f64-8b12-e8b815636540', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d2097304-1e74-4cc7-bea7-f92e670f1751', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d2097304-1e74-4cc7-bea7-f92e670f1751', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('d2097304-1e74-4cc7-bea7-f92e670f1751', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('2be7c040-1dfd-417b-a628-6dbe7f43e203', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('29c5172d-9a15-435f-9130-bf603611470b', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('29c5172d-9a15-435f-9130-bf603611470b', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('29c5172d-9a15-435f-9130-bf603611470b', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('29c5172d-9a15-435f-9130-bf603611470b', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('7ede476b-9d5f-44d4-aae9-ac22ed2026f9', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('00334f8a-6a43-4817-8eee-7d12be3d8f02', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('00334f8a-6a43-4817-8eee-7d12be3d8f02', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('00334f8a-6a43-4817-8eee-7d12be3d8f02', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e77a261c-f3ea-4a15-be3e-c0ceb54cbbc9', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e77a261c-f3ea-4a15-be3e-c0ceb54cbbc9', 'f9bad013-086d-4026-b2e6-5f366a879f11');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e77a261c-f3ea-4a15-be3e-c0ceb54cbbc9', 'ec11bbf0-83ca-40cb-b64e-76888f04b4dc');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('e77a261c-f3ea-4a15-be3e-c0ceb54cbbc9', '4362f0c7-fc53-496c-95c9-130f4b8eac25');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('26159fb7-3e51-4e28-8b33-81710b36cc88', '80c86689-72b4-4162-8f9e-8d2c23e4d685');
INSERT INTO farms_crops (farm_id, crop_id) VALUES ('26159fb7-3e51-4e28-8b33-81710b36cc88', '4362f0c7-fc53-496c-95c9-130f4b8eac25');


