import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Organization } from "../models";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TableName = "Organizations";

interface OrganizationRepository {
    create: (name: string) => Promise<Organization>;

    getById: (id: string) => Promise<Organization>;
}

export const OrganizationRepositoryImpl = (client: DynamoDBClient): OrganizationRepository => ({
    create: async (name: string): Promise<Organization> => {
        const ddbDocClient = DynamoDBDocumentClient.from(client);

        const organization = new Organization(name);
        
        await ddbDocClient.send(new PutCommand({TableName, Item: organization, ReturnValues: 'NONE'}));

        return organization;
    },

    getById: async (id: string): Promise<Organization> => {
        const ddbDocClient = DynamoDBDocumentClient.from(client);

        const {Item} = await ddbDocClient.send(new GetCommand({
            TableName,
            Key: {id},
        }));

        return Item as Organization;
    }
});