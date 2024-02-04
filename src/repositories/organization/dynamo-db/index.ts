import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { OrganizationRepository } from "..";
import { create } from "./create";
import { getById } from "./get-by-id";

export const DynamoDbOrganizationRepository = (
  client: DynamoDBClient
): OrganizationRepository => {
  const documentClient = DynamoDBDocumentClient.from(client);

  return {
    create: create(documentClient),
    getById: getById(documentClient),
  };
};
