\c SDC;

DROP SCHEMA IF EXISTS qna;
CREATE SCHEMA qna;


CREATE TABLE products (
  product_id int,
  question_id int
);

CREATE TABLE questions (
  question_id int,
  question_body varchar(255),
  question_date varchar(255),
  asker_name varchar(255),
  question_helpfulness int,
  reported varchar(255),
  product_id int, FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (question_id)
);

CREATE TABLE answers (
  body varchar(255),
  answer_date varchar(255),
  answerer_name varchar(255),
  helpfulness int,
  question_id int, FOREIGN KEY(question_id) REFERENCES questions(question_id)
)

CREATE TABLE phot