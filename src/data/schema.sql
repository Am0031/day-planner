DROP DATABASE IF EXISTS day_planner_db;

CREATE DATABASE day_planner_db;

USE day_planner_db;

CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  timeKey INT NOT NULL,
  taskText VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);