export class FakeAPI {
    fetchPeople = async () => {
        const result = await fetch(
            "https://fakerapi.it/api/v2/persons?_quantity=15",
        );
        const resultJson = await result.json();

        console.log(resultJson);

        // Map fake API data to Person type
        return resultJson.data?.map((item: any) => ({
            id: item.id,
            Name: `${item.firstname} ${item.lastname}`,
            Phone_Number: item.phone,
            image: item.image,
            Text: `Gender: ${item.gender}`,
        })) || [];
    };
}
