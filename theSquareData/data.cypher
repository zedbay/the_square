CREATE (Informatique:Activity { entitled: 'Informatique' })
CREATE (Banque:Activity { entitled: 'Banque' })
CREATE (Commerce:Activity { entitled: 'Commerce' })
CREATE (Assurance:Activity { entitled: 'Assurance' })
CREATE (Communication:Activity { entitled: 'Communication' })
CREATE (Transports:Activity { entitled: 'Transports' })
CREATE (BTP:Activity { entitled: 'BTP' })
CREATE (Chimie:Activity { entitled: 'Chimie' })
CREATE (Agroalimentaire:Activity { entitled: 'Agroalimentaire' })
CREATE (Electronique:Activity { entitled: 'Electronique' })
CREATE (Ressource:Activity { entitled: 'Ressource humaine' })

CREATE (Dunder:Entreprise { name: 'Dunder Mifflin', email: 'dm@gmail.com', password: 'a'})
CREATE (Mind7:Entreprise { name: 'Mind7', email: 'm7@gmail.com', password: 'a'})
CREATE (Paul:Entreprise { name: 'Paul', email: 'p@gmail.com', password: 'a'})
CREATE (Google:Entreprise { name: 'Google', email: 'g@gmail.com', password: 'a'})

CREATE (Epitech:School { name: 'Epitech', email: 'epitech@gmail.com', password: 'a'})
CREATE (Descartes:School { name: 'Université Paris Descartes', email: 'upd@gmail.com', password: 'a'})
CREATE (Jules:School { name: 'Lycée Jules Vernes', email: 'ljc@gmail.com', password: 'a'})
CREATE (moulins:School { name: 'Collège les 3 moulins', email: 'clg3m@gmail.com', password: 'a'})

CREATE (Organisation:Skill { entitled: 'Organisation' })
CREATE (Autonomie:Skill { entitled: 'Autonomie' })
CREATE (Adaptation:Skill { entitled: 'Adaptation' })
CREATE (Cplus:Skill { entitled: 'C++' })
CREATE (équipe:Skill { entitled: 'Travail en équipe' })
CREATE (C:Skill { entitled: 'C' })
CREATE (PHP:Skill { entitled: 'PHP' })
CREATE (Java:Skill { entitled: 'Java' })
CREATE (Angular:Skill { entitled: 'Angular' })

CREATE (Cuisine:Hobby { entitled: 'Cuisine' })
CREATE (Escalade:Hobby { entitled: 'Escalade' })
CREATE (Programmation:Hobby { entitled: 'Programmation' })
CREATE (Couture:Hobby { entitled: 'Couture' })
CREATE (Randonnée:Hobby { entitled: 'Randonnée' })
CREATE (Voyage:Hobby { entitled: 'Voyage' })
CREATE (Musique:Hobby { entitled: 'Musique' })

CREATE (Michael:Person { name: 'Scott', firstName: 'Michael', email: 'sm@gmail.com', password: 'a', city: 'Scranton', entitled: 'Boss', birthDate: '2019-04-09T22:00:00.000Z', photo: 'sm.jpg'})
CREATE (Dwight:Person { name: 'Schrute', firstName: 'Dwight', email: 'sd@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'sd.jpeg'})
CREATE (Jim:Person { name: 'Halpert', firstName: 'Jim', email: 'hj@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hj.jpg'})
CREATE (Pam:Person { name: 'Beesly', firstName: 'Pam', email: 'bp@gmail.com', password: 'a', city: 'Scranton', entitled: 'Receptionist', birthDate: '2019-04-09T22:00:00.000Z', photo: 'bp.jpg'})
CREATE (Ryan:Person { name: 'Howard', firstName: 'Ryan', email: 'hr@gmail.com', password: 'a', city: 'Scranton', entitled: 'Temporary worker', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hr.jpg'})
CREATE (Andy:Person { name: 'Bernard', firstName: 'Andy', email: 'ba@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ba.jpg'})
CREATE (Stanley:Person { name: 'Hudson', firstName: 'Stanley', email: 'hs@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hs.jpg'})
CREATE (Kevin:Person { name: 'Malone', firstName: 'Kevin', email: 'mk@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'mk.jpg'})
CREATE (Angela:Person { name: 'Martin', firstName: 'Angela', email: 'ma@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ma.jpg'})
CREATE (Oscar:Person { name: 'Martinez', firstName: 'Oscar', email: 'mo@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'mo.jpg'})
CREATE (Phyllis:Person { name: 'Lapin', firstName: 'Phyllis', email: 'lp@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'lp.jpg'})
CREATE (Kelly:Person { name: 'Kapoor', firstName: 'Kelly', email: 'kk@gmail.com', password: 'a', city: 'Scranton', entitled: 'Communication', birthDate: '2019-04-09T22:00:00.000Z', photo: 'kk.jpg'})
CREATE (Creed:Person { name: 'Bratton', firstName: 'Creed', email: 'bc@gmail.com', password: 'a', city: 'Scranton', entitled: 'Quality control', birthDate: '2019-04-09T22:00:00.000Z', photo: 'br.jpg'})
CREATE (Toby:Person { name: 'Flenderson', firstName: 'Toby', email: 'ft@gmail.com', password: 'a', city: 'Scranton', entitled: 'Social assistant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ft.jpg'})
CREATE (Darryl:Person { name: 'Philbin', firstName: 'Darryl', email: 'pd@gmail.com', password: 'a', city: 'Scranton', entitled: 'Worker', birthDate: '2019-04-09T22:00:00.000Z', photo: 'pd.jpeg'})

CREATE (Creed)-[:FRIENDREQUEST]->(Angela)
CREATE (Creed)-[:FRIENDREQUEST]->(Toby)
CREATE (Creed)-[:FRIENDREQUEST]->(Kelly)

CREATE (Michael)-[:FRIEND]->(Jim)
CREATE (Michael)-[:FRIEND]->(Dwight)
CREATE (Michael)-[:FRIEND]->(Andy)

CREATE (Dwight)-[:FRIEND]->(Toby)
CREATE (Dwight)-[:FRIEND]->(Angela)

CREATE (Jim)-[:FRIEND]->(Pam)

CREATE (Pam)-[:FRIEND]->(Toby)
CREATE (Pam)-[:FRIEND]->(Angela)
CREATE (Pam)-[:FRIEND]->(Ryan)
CREATE (Pam)-[:FRIEND]->(Phyllis)

CREATE (Ryan)-[:FRIEND]->(Oscar)
CREATE (Ryan)-[:FRIEND]->(Kelly)

CREATE (Andy)-[:FRIEND]->(Kelly)
CREATE (Andy)-[:FRIEND]->(Oscar)

CREATE (Stanley)-[:FRIEND]->(Michael)
CREATE (Stanley)-[:FRIEND]->(Oscar)
CREATE (Stanley)-[:FRIEND]->(Darryl)

CREATE (Kevin)-[:FRIEND]->(Michael)

CREATE (Angela)-[:FRIEND]->(Kelly)

CREATE (Oscar)-[:FRIEND]->(Kelly)
CREATE (Oscar)-[:FRIEND]->(Kevin)

CREATE (Phyllis)-[:FRIEND]->(Kevin)
CREATE (Phyllis)-[:FRIEND]->(Stanley)

CREATE (Kelly)-[:FRIEND]->(Phyllis)

CREATE (Creed)-[:FRIEND]->(Stanley)

CREATE (Toby)-[:FRIEND]->(Andy)

CREATE (Darryl)-[:FRIEND]->(Andy)
CREATE (Darryl)-[:FRIEND]->(Phyllis)

CREATE (Michael)-[:STUDYIN]->(Descartes)
CREATE (Dwight)-[:STUDYIN]->(moulins)
CREATE (Jim)-[:STUDYIN]->(Descartes)
CREATE (Pam)-[:STUDYIN]->(moulins)
CREATE (Ryan)-[:STUDYIN]->(Epitech)
CREATE (Andy)-[:STUDYIN]->(moulins)
CREATE (Stanley)-[:STUDYIN]->(Epitech)
CREATE (Kevin)-[:STUDYIN]->(Jules)
CREATE (Angela)-[:STUDYIN]->(Epitech)
CREATE (Oscar)-[:STUDYIN]->(Descartes)
CREATE (Phyllis)-[:STUDYIN]->(Epitech)
CREATE (Kelly)-[:STUDYIN]->(Jules)
CREATE (Creed)-[:STUDYIN]->(moulins)
CREATE (Toby)-[:STUDYIN]->(moulins)
CREATE (Darryl)-[:STUDYIN]->(Epitech)

CREATE (Michael)-[:MASTERY]->(Organisation)
CREATE (Michael)-[:MASTERY]->(Angular)

CREATE (Dwight)-[:MASTERY]->(Autonomie)
CREATE (Dwight)-[:MASTERY]->(Organisation)

CREATE (Jim)-[:MASTERY]->(Autonomie)
CREATE (Jim)-[:MASTERY]->(Angular)

CREATE (Pam)-[:MASTERY]->(PHP)
CREATE (Pam)-[:MASTERY]->(Angular)

CREATE (Ryan)-[:MASTERY]->(Cplus)
CREATE (Ryan)-[:MASTERY]->(Angular)

CREATE (Andy)-[:MASTERY]->(PHP)
CREATE (Andy)-[:MASTERY]->(Adaptation)

CREATE (Stanley)-[:MASTERY]->(Adaptation)
CREATE (Stanley)-[:MASTERY]->(Angular)

CREATE (Kevin)-[:MASTERY]->(Angular)
CREATE (Kevin)-[:MASTERY]->(PHP)

CREATE (Angela)-[:MASTERY]->(Cplus)
CREATE (Angela)-[:MASTERY]->(Angular)

CREATE (Oscar)-[:MASTERY]->(Cplus)
CREATE (Oscar)-[:MASTERY]->(Adaptation)

CREATE (Phyllis)-[:MASTERY]->(PHP)
CREATE (Phyllis)-[:MASTERY]->(Autonomie)

CREATE (Kelly)-[:MASTERY]->(Adaptation)
CREATE (Kelly)-[:MASTERY]->(Angular)

CREATE (Creed)-[:MASTERY]->(Angular)
CREATE (Creed)-[:MASTERY]->(Cplus)

CREATE (Toby)-[:MASTERY]->(Angular)
CREATE (Toby)-[:MASTERY]->(Adaptation)

CREATE (Darryl)-[:MASTERY]->(Angular)
CREATE (Darryl)-[:MASTERY]->(Autonomie)

CREATE (Michael)-[:LOVE]->(Cuisine)
CREATE (Michael)-[:LOVE]->(Escalade)
CREATE (Michael)-[:LOVE]->(Randonnée)

CREATE (Kelly)-[:LOVE]->(Escalade)
CREATE (Kelly)-[:LOVE]->(Musique)
CREATE (Kelly)-[:LOVE]->(Voyage)

CREATE (Creed)-[:LOVE]->(Escalade)
CREATE (Creed)-[:LOVE]->(Voyage)
CREATE (Creed)-[:LOVE]->(Musique)

CREATE (Toby)-[:LOVE]->(Musique)
CREATE (Toby)-[:LOVE]->(Couture)
CREATE (Toby)-[:LOVE]->(Escalade)

CREATE (Darryl)-[:LOVE]->(Cuisine)
CREATE (Darryl)-[:LOVE]->(Musique)
CREATE (Darryl)-[:LOVE]->(Escalade)

CREATE (Dwight)-[:LOVE]->(Musique)
CREATE (Dwight)-[:LOVE]->(Voyage)
CREATE (Dwight)-[:LOVE]->(Couture)

CREATE (Jim)-[:LOVE]->(Musique)
CREATE (Jim)-[:LOVE]->(Escalade)
CREATE (Jim)-[:LOVE]->(Cuisine)

CREATE (Pam)-[:LOVE]->(Escalade)
CREATE (Pam)-[:LOVE]->(Voyage)
CREATE (Pam)-[:LOVE]->(Cuisine)

CREATE (Ryan)-[:LOVE]->(Cuisine)
CREATE (Ryan)-[:LOVE]->(Programmation)
CREATE (Ryan)-[:LOVE]->(Musique)

CREATE (Andy)-[:LOVE]->(Escalade)
CREATE (Andy)-[:LOVE]->(Voyage)
CREATE (Andy)-[:LOVE]->(Programmation)

CREATE (Stanley)-[:LOVE]->(Cuisine)
CREATE (Stanley)-[:LOVE]->(Programmation)
CREATE (Stanley)-[:LOVE]->(Escalade)

CREATE (Kevin)-[:LOVE]->(Voyage)
CREATE (Kevin)-[:LOVE]->(Cuisine)
CREATE (Kevin)-[:LOVE]->(Programmation)

CREATE (Angela)-[:LOVE]->(Escalade)
CREATE (Angela)-[:LOVE]->(Voyage)
CREATE (Angela)-[:LOVE]->(Programmation)

CREATE (Oscar)-[:LOVE]->(Programmation)
CREATE (Oscar)-[:LOVE]->(Voyage)
CREATE (Oscar)-[:LOVE]->(Couture)

CREATE (Phyllis)-[:LOVE]->(Voyage)
CREATE (Phyllis)-[:LOVE]->(Escalade)
CREATE (Phyllis)-[:LOVE]->(Programmation)


CREATE (Michael)-[:INACTIVITY]->(Commerce)
CREATE (Dwight)-[:INACTIVITY]->(Commerce)
CREATE (Jim)-[:INACTIVITY]->(Commerce)
CREATE (Pam)-[:INACTIVITY]->(Ressource)
CREATE (Ryan)-[:INACTIVITY]->(Commerce)
CREATE (Andy)-[:INACTIVITY]->(Commerce)
CREATE (Stanley)-[:INACTIVITY]->(Commerce)
CREATE (Kevin)-[:INACTIVITY]->(Banque)
CREATE (Angela)-[:INACTIVITY]->(Banque)
CREATE (Oscar)-[:INACTIVITY]->(Banque)
CREATE (Phyllis)-[:INACTIVITY]->(Commerce)
CREATE (Kelly)-[:INACTIVITY]->(Communication)
CREATE (Creed)-[:INACTIVITY]->(Informatique)
CREATE (Toby)-[:INACTIVITY]->(Ressource)
CREATE (Darryl)-[:INACTIVITY]->(BTP)

CREATE (Michael)-[:WORKIN]->(Dunder)
CREATE (Dwight)-[:WORKIN]->(Dunder)
CREATE (Jim)-[:WORKIN]->(Dunder)
CREATE (Pam)-[:WORKIN]->(Dunder)
CREATE (Ryan)-[:WORKIN]->(Dunder)
CREATE (Andy)-[:WORKIN]->(Dunder)
CREATE (Stanley)-[:WORKIN]->(Dunder)
CREATE (Kevin)-[:WORKIN]->(Dunder)
CREATE (Angela)-[:WORKIN]->(Dunder)
CREATE (Oscar)-[:WORKIN]->(Dunder)
CREATE (Phyllis)-[:WORKIN]->(Dunder)
CREATE (Kelly)-[:WORKIN]->(Dunder)
CREATE (Creed)-[:WORKIN]->(Dunder)
CREATE (Toby)-[:WORKIN]->(Dunder)
CREATE (Darryl)-[:WORKIN]->(Dunder)





