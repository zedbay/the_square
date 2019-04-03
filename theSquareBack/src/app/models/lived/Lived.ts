import { Entity } from "../entity/Entity";
import { Formation } from "./Formation";
import { Neo4j } from "../../neo4j";
import { Express } from "express";

export class Lived {
  public entitled: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public entity: Entity;

  constructor() {}

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    Formation.mountRoutes(express, neo4j);
  }
}
