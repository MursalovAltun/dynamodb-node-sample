import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";
import { Organization } from "../../../models";
import { TableName } from "./table-name";

export const create =
  (client: DynamoDBDocumentClient) => async (name: string) => {
    const organization: Organization = {
      id: uuid(),
      name,
    };

    await client.send(
      new PutCommand({ TableName, Item: organization, ReturnValues: "NONE" })
    );

    return organization;
  };
