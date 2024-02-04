import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { OrganizationRepository } from "..";
import { Organization } from "../../../models";

const TableName = "Organizations";

export const DynamoDbOrganizationRepository = (
  client: DynamoDBClient
): OrganizationRepository => ({
  create: async (name: string): Promise<Organization> => {
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    const organization: Organization = {
      id: uuid(),
      name,
    };

    await ddbDocClient.send(
      new PutCommand({ TableName, Item: organization, ReturnValues: "NONE" })
    );

    return organization;
  },

  getById: async (id: string): Promise<Organization> => {
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    const { Item } = await ddbDocClient.send(
      new GetCommand({
        TableName,
        Key: { id },
      })
    );

    return Item as Organization;
  },
});
