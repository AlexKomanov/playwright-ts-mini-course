import {expect, test} from '@playwright/test'

interface IResponse {
    name?: string;
    job?: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }

test.describe.parallel("API Tests Block", () => {

    const baseUrl = 'https://reqres.in';

    test("Validate getting a single user by API call", async({request}) => {

        const responseUserId2Data = {
            "data": {
              "id": 2,
              "email": "janet.weaver@reqres.in",
              "first_name": "Janet",
              "last_name": "Weaver",
              "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            "support": {
              "url": "https://reqres.in/#support-heading",
              "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
          }

        const singleUserResponse = await request.get(`${baseUrl}/api/users/2`);
        expect(singleUserResponse.status()).toBe(200);
        expect(singleUserResponse.statusText()).toBe('OK');
        expect(await singleUserResponse.json()).toEqual(responseUserId2Data);
       

    })

    test("Validate user creation by API call", async({request}) => {

        const data = {
            "name": "alex",
            "job": "developer"
        }

        const userCreationResponse = await request.post(`${baseUrl}/api/users`, {data});
        expect(userCreationResponse.status()).toBe(201);
        expect(userCreationResponse.statusText()).toBe("Created");
        const jsonResponse: IResponse = await userCreationResponse.json();
        expect(jsonResponse.name).toEqual(data.name);
        expect(jsonResponse.job).toEqual(data.job);
        expect(jsonResponse.createdAt).toBeDefined();
        expect(jsonResponse.id).toBeDefined();
       
    })

    test("Validate update information by PATCH API method", async({request}) => {

      const data = {
        "name": "morpheus",
        "job": "zion resident"
    }

      const updatedUserResponse = await request.patch(`${baseUrl}/api/users/2`, {data});
      const jsonResponse: IResponse = await updatedUserResponse.json();
      expect(updatedUserResponse.status()).toBe(200);
      expect(updatedUserResponse.statusText()).toBe("OK");
      expect(jsonResponse.name).toEqual(data.name);
      expect(jsonResponse.job).toEqual(data.job);
      expect(jsonResponse.updatedAt).toBeDefined();
    })

    test('Validate user was deleted by API call', async ({request}) => {
      const deletedUserResponse = await request.delete(`${baseUrl}/api/users/2`);
      expect(deletedUserResponse.status()).toBe(204);
      expect(deletedUserResponse.statusText()).toBe("No Content");
    })


})

