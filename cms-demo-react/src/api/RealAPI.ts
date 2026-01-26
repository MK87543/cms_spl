import type { PeopleAPI } from "./PeopleAPI";

export class RealAPI implements PeopleAPI {
    fetchPeople = async () => {
        const result = await fetch("http://localhost:8055/items/People");
        const resultJson = await result.json();

        console.log(resultJson);

        // Map data and prepend base URL to image paths
        return resultJson.data?.map((item: any) => ({
            ...item,
            image: `http://localhost:8055/assets/${item.image}`,
        })) || [];
    };
}
