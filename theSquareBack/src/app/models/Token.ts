import { Entity } from "./entity/Entity";
import { Neo4j } from "../neo4j";
import { Router, Express } from "express";
import { v1 } from "neo4j-driver";
import * as crypto from "crypto-js";

export class Token {
  public expiration: Date;
  public entity: Entity;
  public token: string;

  constructor() { }

  public static add(idEntity: number, typeEntity: string, neo4j: Neo4j) {
    return Token.delete(idEntity, typeEntity, neo4j).then(() => {
      return neo4j.session
        .run(
          `MATCH (e:${typeEntity}) WHERE ID(e) = $idEntity CREATE (t:Token { date: $date, token: $token }), (e)-[:USE]->(t) RETURN t`,
          {
            idEntity: idEntity,
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toString(),
            token: crypto
              .SHA256(Date.now().toString() + idEntity.toString())
              .toString()
          }
        )
        .then(function (result) {
          return result.records[0].get(0).properties.token;
        });
    });
  }

  public static get(token: string, neo4j: Neo4j) {
    return neo4j.session
      .run(`MATCH (e)-[:USE]->(t:Token { token: "${token}" }) RETURN e`)
      .then(result => {
        return {
          id: result.records[0].get(0).identity,
          type: result.records[0].get(0).labels[0]
        };
      });
  }

  private static delete(idEntity: any, typeEntity: string, neo4j: Neo4j) {
    return neo4j.session
      .run(`MATCH (e:${typeEntity}) WHERE ID(e) = ${idEntity} MATCH (e)-[:USE]->(t:Token) DETACH DELETE t`)
      .then(() => {
        return;
      });
  }
}
