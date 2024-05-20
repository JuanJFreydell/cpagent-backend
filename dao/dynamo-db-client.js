import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const putItem = async  (username) => {
  const command = new PutCommand({
    TableName: "cpagent-db",
    Item: {
      username
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

