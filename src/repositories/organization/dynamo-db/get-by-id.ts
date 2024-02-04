import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Organization } from "../../../models";
import { TableName } from "./table-name";

export const getById =
  (client: DynamoDBDocumentClient) => async (id: string) => {
    const { Item } = await client.send(
      new GetCommand({
        TableName,
        Key: { id },
      })
    );

    return Item as Organization;
  };
